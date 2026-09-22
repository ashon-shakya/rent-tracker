"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongoose";
import Tenant from "@/models/Tenant";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function inviteTenant(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");

  await dbConnect();

  const rentAgreementId = formData.get("rentAgreementId") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const rentShareParts = parseFloat(formData.get("rentShareParts") as string) || 1;
  const bondShareParts = parseFloat(formData.get("bondShareParts") as string) || 1;

  await Tenant.create({
    rentAgreementId,
    name,
    email,
    rentShareParts,
    bondShareParts,
  });

  revalidatePath(`/dashboard/rents/${rentAgreementId}`);
  revalidatePath(`/dashboard/tenants`);
  redirect(`/dashboard/rents/${rentAgreementId}`);
}

export async function getTenantsByRentAgreement(rentAgreementId: string) {
  await dbConnect();
  const tenants = await Tenant.find({ rentAgreementId }).lean();
  return JSON.parse(JSON.stringify(tenants));
}

export async function getAllTenants() {
  await dbConnect();
  // In a real app we would filter by rentAgreements belonging to the session user.
  // We'll just fetch all for now since we don't have the user->rent join setup.
  const tenants = await Tenant.find({}).populate('rentAgreementId').lean();
  return JSON.parse(JSON.stringify(tenants));
}
