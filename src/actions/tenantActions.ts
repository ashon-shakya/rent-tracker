"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongoose";
import Tenant from "@/models/Tenant";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "dummy");

export async function inviteTenant(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");

  await dbConnect();

  const rentAgreementId = formData.get("rentAgreementId") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  const RentAgreement = (await import("@/models/RentAgreement")).default;
  const rentAgreement = await RentAgreement.findById(rentAgreementId);

  if (!rentAgreement || rentAgreement.ownerEmail !== session.user.email) {
    throw new Error("Only the agreement owner can invite tenants");
  }

  if (!email.toLowerCase().endsWith("@gmail.com")) {
    throw new Error("Only Gmail accounts are allowed.");
  }

  const rentShareParts = parseFloat(formData.get("rentShareParts") as string) || 1;
  const bondShareParts = parseFloat(formData.get("bondShareParts") as string) || 1;
  const utilityShareParts = parseFloat(formData.get("utilityShareParts") as string) || 1;

  await Tenant.create({
    rentAgreementId,
    name,
    email,
    rentShareParts,
    bondShareParts,
    utilityShareParts,
  });

  // Send invitation email
  const address = rentAgreement.address || "your rent tracker";
  const appUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  if (process.env.RESEND_API_KEY) {
    try {
      const { error } = await resend.emails.send({
        from: "Rent Tracker <onboarding@resend.dev>",
        to: email,
        subject: `You've been invited to track rent for ${address}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #4c1d95;">Rent Tracker</h1>
            <p>Hi ${name},</p>
            <p><strong>${session.user.name}</strong> has invited you to join the rent tracker for <strong>${address}</strong>.</p>
            <p>Login with your email address to view your rent dashboard and payment history.</p>
            <br/>
            <a href="${appUrl}/dashboard" style="background-color:#7c3aed;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">View Dashboard</a>
          </div>
        `,
      });

      if (error) {
        console.warn(`[Resend Email Skipped]: ${error.message}`);
      }
    } catch (e) {
      console.error("Failed to send email via Resend:", e);
    }
  } else {
    console.log(`
      ================================================
      [EMAIL MOCK] - Set RESEND_API_KEY to send real emails
      To: ${email}
      Subject: You've been invited to track rent for ${address}
      Body: ${session.user.name} invited you.
      Link: ${appUrl}/dashboard
      ================================================
    `);
  }

  revalidatePath(`/dashboard/rents/${rentAgreementId}`);
  revalidatePath(`/dashboard/tenants`);
  redirect(`/dashboard/rents/${rentAgreementId}`);
}

export async function getTenantsByRentAgreement(rentAgreementId: string) {
  await dbConnect();
  const tenants = await Tenant.find({ rentAgreementId }).lean();
  return JSON.parse(JSON.stringify(tenants));
}

export async function updateTenant(tenantId: string, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");

  await dbConnect();

  const currentTenant = await Tenant.findById(tenantId);
  if (!currentTenant) throw new Error("Tenant not found");

  const RentAgreement = (await import("@/models/RentAgreement")).default;
  const rentAgreement = await RentAgreement.findById(currentTenant.rentAgreementId);
  if (!rentAgreement || rentAgreement.ownerEmail !== session.user.email) {
    throw new Error("Only the agreement owner can update tenant settings");
  }

  const rentShareParts = parseFloat(formData.get("rentShareParts") as string) || 1;
  const bondShareParts = parseFloat(formData.get("bondShareParts") as string) || 1;
  const utilityShareParts = parseFloat(formData.get("utilityShareParts") as string) || 1;

  const tenant = await Tenant.findByIdAndUpdate(
    tenantId,
    { $set: { rentShareParts, bondShareParts, utilityShareParts } },
    { new: true }
  );

  if (tenant) {
    revalidatePath(`/dashboard/rents/${tenant.rentAgreementId}`);
    revalidatePath(`/dashboard/tenants`);
  }
}

export async function deleteTenant(tenantId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");

  await dbConnect();

  const tenantToDelete = await Tenant.findById(tenantId);
  if (!tenantToDelete) return;

  const RentAgreement = (await import("@/models/RentAgreement")).default;
  const rentAgreement = await RentAgreement.findById(tenantToDelete.rentAgreementId);
  if (!rentAgreement || rentAgreement.ownerEmail !== session.user.email) {
    throw new Error("Only the agreement owner can delete tenants");
  }

  const tenant = await Tenant.findByIdAndDelete(tenantId);

  if (tenant) {
    revalidatePath(`/dashboard/rents/${tenant.rentAgreementId}`);
    revalidatePath(`/dashboard/tenants`);
  }
}

export async function getAllTenants() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return [];

  await dbConnect();

  const RentAgreement = (await import("@/models/RentAgreement")).default;
  const userRents = await RentAgreement.find({ ownerEmail: session.user.email }).select("_id");
  const userRentIds = userRents.map((r) => r._id);

  const tenants = await Tenant.find({ rentAgreementId: { $in: userRentIds } })
    .populate("rentAgreementId")
    .lean();
  return JSON.parse(JSON.stringify(tenants));
}

export async function getTenantsByUserEmail(email: string) {
  await dbConnect();
  const tenants = await Tenant.find({ email }).lean();
  return JSON.parse(JSON.stringify(tenants));
}
