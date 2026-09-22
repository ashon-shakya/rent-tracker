"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongoose";
import Payment from "@/models/Payment";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function logPayment(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");

  await dbConnect();

  const rentAgreementId = formData.get("rentAgreementId") as string;
  const paidAmount = parseFloat(formData.get("paidAmount") as string);
  const periodStartDate = formData.get("periodStartDate") as string;
  const periodEndDate = formData.get("periodEndDate") as string;
  const dueDate = formData.get("dueDate") as string;
  const paidDate = formData.get("paidDate") as string;

  await Payment.create({
    rentAgreementId,
    paidAmount,
    periodStartDate: new Date(periodStartDate),
    periodEndDate: new Date(periodEndDate),
    dueDate: new Date(dueDate),
    paidDate: new Date(paidDate),
    status: 'PAID'
  });

  revalidatePath(`/dashboard/rents/${rentAgreementId}`);
  revalidatePath(`/dashboard/activity`);
  redirect(`/dashboard/rents/${rentAgreementId}`);
}
