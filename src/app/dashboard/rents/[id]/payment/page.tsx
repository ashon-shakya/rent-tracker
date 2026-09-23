import { getRentAgreementById } from "@/actions/rentActions";
import { getLastPayment, getLastPaymentForUtility } from "@/actions/paymentActions";
import { getTenantsByRentAgreement } from "@/actions/tenantActions";
import { getUtilitiesByRentAgreement } from "@/actions/utilityActions";
import { notFound } from "next/navigation";
import PaymentForm from "./PaymentForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { UtilityData } from "../UtilityList";

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function subtractDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() - days);
  return d.toISOString().split("T")[0];
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
  const utilities = await getUtilitiesByRentAgreement(rentAgreementId);

  const today = new Date().toISOString().split("T")[0];
  const rentDueDays = rent.rentDueDays || 7;

  let periodStartDate: string;
  if (lastPayment?.periodEndDate) {
    periodStartDate = addDays(new Date(lastPayment.periodEndDate).toISOString().split("T")[0], 1);
  } else {
    periodStartDate = new Date(rent.startDate).toISOString().split("T")[0];
  }

  const periodEndDate = addDays(periodStartDate, rentDueDays - 1);
  const dueDate = subtractDays(periodStartDate, 1);

  // Fetch last payment for each utility to provide initial period dates
  const utilityLastPayments: Record<string, { periodEndDate?: string }> = {};
  await Promise.all(
    utilities.map(async (u: UtilityData) => {
      const lastUtilPayment = await getLastPaymentForUtility(rentAgreementId, u._id);
      if (lastUtilPayment) {
        utilityLastPayments[u._id] = {
          periodEndDate: lastUtilPayment.periodEndDate
            ? new Date(lastUtilPayment.periodEndDate).toISOString().split("T")[0]
            : undefined,
        };
      }
    })
  );

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
      utilities={utilities}
      utilityLastPayments={utilityLastPayments}
    />
  );
}
