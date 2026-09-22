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
  const type = (formData.get("type") as string) as "RENT" | "BOND" || "RENT";
  const paidAmount = parseFloat(formData.get("paidAmount") as string);
  const periodStartDate = formData.get("periodStartDate") as string;
  const periodEndDate = formData.get("periodEndDate") as string;
  const dueDate = formData.get("dueDate") as string;
  const paidDate = formData.get("paidDate") as string;
  const paidBy = formData.get("paidBy") as string;

  await Payment.create({
    rentAgreementId,
    type,
    paidAmount,
    periodStartDate: new Date(periodStartDate),
    periodEndDate: new Date(periodEndDate),
    dueDate: new Date(dueDate),
    paidDate: new Date(paidDate),
    paidBy,
    status: 'PAID'
  });

  revalidatePath(`/dashboard/rents/${rentAgreementId}`);
  revalidatePath(`/dashboard/activity`);
  revalidatePath(`/dashboard`);
  redirect(`/dashboard/rents/${rentAgreementId}`);
}

export async function getPaymentsByRentAgreement(rentAgreementId: string) {
  await dbConnect();
  const payments = await Payment.find({ rentAgreementId }).sort({ periodStartDate: -1 }).lean();
  return JSON.parse(JSON.stringify(payments));
}

export async function getLastPayment(rentAgreementId: string) {
  await dbConnect();
  const payment = await Payment.findOne({ rentAgreementId }).sort({ periodEndDate: -1 }).lean();
  return payment ? JSON.parse(JSON.stringify(payment)) : null;
}

export async function deletePayments(paymentIds: string[], rentAgreementId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Unauthorized");

  await dbConnect();
  
  const RentAgreement = (await import("@/models/RentAgreement")).default;
  const rentAgreement = await RentAgreement.findById(rentAgreementId);
  if (!rentAgreement || rentAgreement.ownerEmail !== session.user.email) {
    throw new Error("Only the agreement owner can delete payments");
  }

  await Payment.deleteMany({ _id: { $in: paymentIds } });
  
  revalidatePath(`/dashboard/rents/${rentAgreementId}`);
  revalidatePath('/dashboard');
}

export async function getAllPayments() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return [];

  await dbConnect();
  
  const RentAgreement = (await import("@/models/RentAgreement")).default;
  const userRents = await RentAgreement.find({ ownerEmail: session.user.email }).select('_id');
  const userRentIds = userRents.map(r => r._id);

  const Tenant = (await import("@/models/Tenant")).default;
  const userTenancies = await Tenant.find({ email: session.user.email }).lean();
  const tenantRentIds = userTenancies.map(t => t.rentAgreementId);

  const allRentIds = [...userRentIds, ...tenantRentIds];

  const payments = await Payment.find({ rentAgreementId: { $in: allRentIds } }).sort({ paidDate: -1 }).populate('rentAgreementId').lean();
  return JSON.parse(JSON.stringify(payments));
}
