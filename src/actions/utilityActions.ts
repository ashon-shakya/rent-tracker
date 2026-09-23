"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongoose";
import Utility from "@/models/Utility";
import RentAgreement from "@/models/RentAgreement";
import { revalidatePath } from "next/cache";

export async function createUtility(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  await dbConnect();

  const rentAgreementId = formData.get("rentAgreementId") as string;
  const title = formData.get("title") as string;
  const category = (formData.get("category") as string) || "electricity";
  const icon = (formData.get("icon") as string) || "Zap";
  const billingPeriod = (formData.get("billingPeriod") as string) || "monthly";
  const startDateStr = formData.get("startDate") as string;
  const endDateStr = formData.get("endDate") as string;
  const amountStr = formData.get("amount") as string;
  const notes = formData.get("notes") as string;

  const rentAgreement = await RentAgreement.findById(rentAgreementId);
  if (!rentAgreement || rentAgreement.ownerEmail !== session.user.email) {
    throw new Error("Only the agreement owner can add utilities");
  }

  await Utility.create({
    rentAgreementId,
    title,
    category,
    icon,
    billingPeriod,
    startDate: new Date(startDateStr),
    endDate: endDateStr ? new Date(endDateStr) : undefined,
    amount: amountStr ? parseFloat(amountStr) : undefined,
    notes: notes || undefined,
  });

  revalidatePath(`/dashboard/rents/${rentAgreementId}`);
  revalidatePath("/dashboard/rents");
}

export async function updateUtility(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  await dbConnect();

  const utilityId = formData.get("utilityId") as string;
  const rentAgreementId = formData.get("rentAgreementId") as string;
  const title = formData.get("title") as string;
  const category = (formData.get("category") as string) || "electricity";
  const icon = (formData.get("icon") as string) || "Zap";
  const billingPeriod = (formData.get("billingPeriod") as string) || "monthly";
  const startDateStr = formData.get("startDate") as string;
  const endDateStr = formData.get("endDate") as string;
  const amountStr = formData.get("amount") as string;
  const notes = formData.get("notes") as string;

  const rentAgreement = await RentAgreement.findById(rentAgreementId);
  if (!rentAgreement || rentAgreement.ownerEmail !== session.user.email) {
    throw new Error("Only the agreement owner can edit utilities");
  }

  await Utility.findByIdAndUpdate(utilityId, {
    title,
    category,
    icon,
    billingPeriod,
    startDate: new Date(startDateStr),
    endDate: endDateStr ? new Date(endDateStr) : null,
    amount: amountStr ? parseFloat(amountStr) : null,
    notes: notes || null,
  });

  revalidatePath(`/dashboard/rents/${rentAgreementId}`);
  revalidatePath("/dashboard/rents");
}

export async function deleteUtility(utilityId: string, rentAgreementId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  await dbConnect();

  const rentAgreement = await RentAgreement.findById(rentAgreementId);
  if (!rentAgreement || rentAgreement.ownerEmail !== session.user.email) {
    throw new Error("Only the agreement owner can delete utilities");
  }

  await Utility.findByIdAndDelete(utilityId);

  revalidatePath(`/dashboard/rents/${rentAgreementId}`);
  revalidatePath("/dashboard/rents");
}

export async function getUtilitiesByRentAgreement(rentAgreementId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return [];
  }

  await dbConnect();

  const utilities = await Utility.find({ rentAgreementId }).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(utilities));
}
