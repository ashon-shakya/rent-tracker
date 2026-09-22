"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongoose";
import RentAgreement from "@/models/RentAgreement";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createRentAgreement(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
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

  const rent = await RentAgreement.create({
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
  if (!session?.user) {
    return [];
  }

  await dbConnect();
  
  // Note: In a fully complete app, we would query the `Tenant` model to find rents linked to this user.
  // For this prototype, we'll fetch all rents since we don't have the tenant linking logic built yet.
  const rents = await RentAgreement.find({}).sort({ createdAt: -1 }).lean();
  
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
    return null;
  }
}

