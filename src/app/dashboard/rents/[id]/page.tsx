import { ArrowLeft, Edit2, CreditCard, UserPlus, Building, Tent, Castle, Hotel, Home } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getRentAgreementById } from "@/actions/rentActions";
import { getTenantsByRentAgreement } from "@/actions/tenantActions";
import { getPaymentsByRentAgreement } from "@/actions/paymentActions";
import { getUtilitiesByRentAgreement } from "@/actions/utilityActions";
import { notFound } from "next/navigation";
import PaymentList from "./PaymentList";
import TenantList from "./TenantList";
import UtilityList from "./UtilityList";

const getIcon = (name: string) => {
  switch (name) {
    case "Building": return <Building size={40} />;
    case "Tent": return <Tent size={40} />;
    case "Castle": return <Castle size={40} />;
    case "Hotel": return <Hotel size={40} />;
    default: return <Home size={40} />;
  }
};

export default async function RentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email || "";

  const rent = await getRentAgreementById(resolvedParams.id);
  if (!rent) {
    notFound();
  }

  const tenants = await getTenantsByRentAgreement(resolvedParams.id);
  const payments = await getPaymentsByRentAgreement(resolvedParams.id);
  const utilities = await getUtilitiesByRentAgreement(resolvedParams.id);

  const startDate = new Date(rent.startDate).toLocaleDateString("en-GB");
  const isAdmin = userEmail === rent.ownerEmail;

  return (
    <div className="max-w-8xl mx-auto min-h-[calc(100vh-6rem)] md:min-h-0 animate-in fade-in duration-500">

      {/* Header */}
      <div className="flex items-center justify-between p-4 mb-4 md:px-0">
        <Link
          href="/dashboard/rents"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-500 hover:bg-violet-50 hover:text-violet-600 transition-colors shadow-sm"
        >
          <ArrowLeft size={20} />
        </Link>
        {isAdmin && (
          <Link
            href={`/dashboard/rents/${resolvedParams.id}/edit`}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-500 hover:bg-violet-50 hover:text-violet-600 transition-colors shadow-sm"
          >
            <Edit2 size={18} />
          </Link>
        )}
      </div>

      {/* Profile/Main Info */}
      <div className="flex flex-col items-center mb-8 px-4 md:px-0">
        <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-md mb-4 border-4 border-white bg-violet-50 flex items-center justify-center text-violet-500">
          {getIcon(rent.icon)}
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{rent.address}</h2>
        <p className="text-slate-400 font-medium">Active Lease</p>

        {/* Action Buttons */}
        <div className="flex w-full max-w-md gap-4 mt-6">
          <Link href={`/dashboard/rents/${resolvedParams.id}/payment`} className="flex-1 bg-violet-500 hover:bg-violet-600 text-white py-3 rounded-2xl font-medium flex items-center justify-center gap-2 shadow-md shadow-violet-200 transition-all">
            <CreditCard size={18} /> Log Payment
          </Link>
          {isAdmin && (
            <Link href={`/dashboard/rents/${resolvedParams.id}/invite`} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-2xl font-medium flex items-center justify-center gap-2 shadow-md transition-all">
              <UserPlus size={18} /> Invite
            </Link>
          )}
        </div>
      </div>

      {/* Desktop: Agreement details + Utilities + Payments */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-8 gap-8 px-4 md:px-0">

        {/* Left Column: Rent Details + Tenants + Utilities */}
        <div className="md:col-span-3 lg:col-span-3 space-y-8">
          {/* Rent Details Card */}
          <div>
            <h3 className="text-slate-800 font-bold mb-4 px-2">Rent details</h3>
            <div className="bg-white rounded-3xl p-6 grid grid-cols-2 gap-4 border border-slate-100/60 shadow-sm">
              <div>
                <p className="text-xs font-medium text-slate-400 mb-2">Start date</p>
                <div className="bg-[#f8f7fc] rounded-xl px-4 py-3 text-sm font-bold text-slate-800">
                  {startDate}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 mb-2">Rent cycle</p>
                <div className="bg-[#f8f7fc] rounded-xl px-4 py-3 text-sm font-bold text-slate-800">
                  Every {rent.rentDueDays} days
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 mb-2">Total rent</p>
                <div className="bg-[#f8f7fc] rounded-xl px-4 py-3 text-sm font-bold text-slate-800">
                  ${rent.rentAmount.toLocaleString()}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 mb-2">Bond money</p>
                <div className="bg-[#f8f7fc] rounded-xl px-4 py-3 text-sm font-bold text-slate-800">
                  ${rent.bondAmount.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Tenants Information */}
          <TenantList tenants={tenants} rent={rent} isAdmin={isAdmin} />

          {/* Utilities Information */}
          <UtilityList utilities={utilities} rentAgreementId={resolvedParams.id} isAdmin={isAdmin} />
        </div>

        {/* Right Column: Payment History Table */}
        <div className="md:col-span-3 lg:col-span-5">
          <PaymentList payments={payments} rentAgreementId={resolvedParams.id} tenants={tenants} rent={rent} isAdmin={isAdmin} />
        </div>

      </div>

    </div>
  );
}
