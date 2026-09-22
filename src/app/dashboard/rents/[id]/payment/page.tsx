import { getRentAgreementById } from "@/actions/rentActions";
import { getLastPayment } from "@/actions/paymentActions";
import { getTenantsByRentAgreement } from "@/actions/tenantActions";
import { notFound } from "next/navigation";
import PaymentForm from "./PaymentForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

function subtractDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0];
}

export default async function LogPaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const rentAgreementId = resolvedParams.id;
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name || "Me (Admin)";

  const rent = await getRentAgreementById(rentAgreementId);
  if (!rent) notFound();

  const tenants = await getTenantsByRentAgreement(rentAgreementId);
  const lastPayment = await getLastPayment(rentAgreementId);
  const today = new Date().toISOString().split('T')[0];
  const rentDueDays = rent.rentDueDays || 7;

  let periodStartDate: string;
  if (lastPayment) {
    // Next period starts the day after the last period ended
    periodStartDate = addDays(lastPayment.periodEndDate.split('T')[0], 1);
  } else {
    // First payment - use the rent start date
    periodStartDate = new Date(rent.startDate).toISOString().split('T')[0];
  }

  const periodEndDate = addDays(periodStartDate, rentDueDays - 1);
  const dueDate = subtractDays(periodStartDate, 1);

  return (
    <PaymentForm
      rentAgreementId={rentAgreementId}
      defaultPeriodStartDate={periodStartDate}
      defaultPeriodEndDate={periodEndDate}
      defaultDueDate={dueDate}
      defaultPaidDate={today}
      defaultAmount={rent.rentAmount}
      bondAmount={rent.bondAmount}
      tenants={tenants}
      adminName={userName}
    />
  );
}
