"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongoose";
import RentAgreement from "@/models/RentAgreement";
import Tenant from "@/models/Tenant";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createRentAgreement(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  await dbConnect();

  const address = formData.get("address") as string;
  const icon = formData.get("icon") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const rentAmount = parseFloat(formData.get("rentAmount") as string);
  const bondAmount = parseFloat(formData.get("bondAmount") as string);
  const rentDueDays = parseInt(formData.get("rentDueDays") as string, 10);

  await RentAgreement.create({
    ownerEmail: session.user.email,
    address,
    icon,
    startDate: new Date(startDate),
    endDate: endDate ? new Date(endDate) : undefined,
    rentAmount,
    bondAmount,
    rentDueDays,
  });

  revalidatePath("/dashboard/rents");
  revalidatePath("/dashboard");
  redirect("/dashboard/rents");
}

export async function getRentAgreements() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return [];
  }
  const email = session.user.email;

  await dbConnect();

  // Lazy migration: If there are any agreements without an owner, assign them to the current user
  await RentAgreement.updateMany(
    { ownerEmail: { $exists: false } },
    { $set: { ownerEmail: email } }
  );

  // Find all agreements where the user is a tenant
  const userTenancies = await Tenant.find({ email }).lean();
  const tenantAgreementIds = userTenancies.map((t) => t.rentAgreementId);

  // Fetch all agreements where the user is the owner OR a tenant
  const rents = await RentAgreement.find({
    $or: [{ ownerEmail: email }, { _id: { $in: tenantAgreementIds } }],
  })
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(rents));
}

export async function getRentAgreementById(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;

  await dbConnect();

  try {
    const rent = await RentAgreement.findById(id).lean();
    return rent ? JSON.parse(JSON.stringify(rent)) : null;
  } catch (error) {
    console.error("Failed to fetch rent agreement by id", error);
    return null;
  }
}

export async function updateRentAgreement(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");

  await dbConnect();

  const id = formData.get("id") as string;
  const address = formData.get("address") as string;
  const icon = formData.get("icon") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const rentAmount = parseFloat(formData.get("rentAmount") as string);
  const bondAmount = parseFloat(formData.get("bondAmount") as string);
  const rentDueDays = parseInt(formData.get("rentDueDays") as string, 10);

  const rentAgreement = await RentAgreement.findById(id);
  if (!rentAgreement || rentAgreement.ownerEmail !== session.user.email) {
    throw new Error("Only the agreement owner can update the agreement");
  }

  await RentAgreement.findByIdAndUpdate(id, {
    address,
    icon,
    startDate: new Date(startDate),
    endDate: endDate ? new Date(endDate) : undefined,
    rentAmount,
    bondAmount,
    rentDueDays,
  });

  revalidatePath(`/dashboard/rents/${id}`);
  revalidatePath("/dashboard/rents");
  revalidatePath("/dashboard");
  redirect(`/dashboard/rents/${id}`);
}

export async function updateRentAgreementAdminShares(id: string, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");

  await dbConnect();

  const adminRentShareParts = parseFloat(formData.get("rentShareParts") as string) || 1;
  const adminBondShareParts = parseFloat(formData.get("bondShareParts") as string) || 1;
  const adminUtilityShareParts = parseFloat(formData.get("utilityShareParts") as string) || 1;

  const rentAgreement = await RentAgreement.findById(id);
  if (!rentAgreement || rentAgreement.ownerEmail !== session.user.email) {
    throw new Error("Only the agreement owner can update admin shares");
  }

  await RentAgreement.findByIdAndUpdate(id, {
    adminRentShareParts,
    adminBondShareParts,
    adminUtilityShareParts,
  });

  revalidatePath(`/dashboard/rents/${id}`);
}

export async function deleteRentAgreement(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");

  await dbConnect();

  const Payment = (await import("@/models/Payment")).default;

  const rentAgreement = await RentAgreement.findById(id);
  if (!rentAgreement || rentAgreement.ownerEmail !== session.user.email) {
    throw new Error("Only the agreement owner can delete the agreement");
  }

  // Delete all related records
  await Promise.all([
    Payment.deleteMany({ rentAgreementId: id }),
    Tenant.deleteMany({ rentAgreementId: id }),
    RentAgreement.findByIdAndDelete(id),
  ]);

  revalidatePath("/dashboard/rents");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/activity");
  revalidatePath("/dashboard/tenants");
  redirect("/dashboard/rents");
}
