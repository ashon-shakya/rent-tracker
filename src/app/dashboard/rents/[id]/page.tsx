import { ArrowLeft, Edit2, Phone, MessageSquare, CreditCard, UserPlus, Building, Tent, Castle, Hotel, Home } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getRentAgreementById } from "@/actions/rentActions";
import { getTenantsByRentAgreement } from "@/actions/tenantActions";
import { notFound } from "next/navigation";

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
  const userName = session?.user?.name || "User";
  const userEmail = session?.user?.email || "";
  
  const rent = await getRentAgreementById(resolvedParams.id);
  if (!rent) {
    notFound();
  }
  
  const tenants = await getTenantsByRentAgreement(resolvedParams.id);

  const startDate = new Date(rent.startDate).toLocaleDateString("en-GB");

  return (
    <div className="max-w-4xl mx-auto min-h-[calc(100vh-6rem)] md:min-h-0 bg-white md:bg-transparent animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 mb-4 md:px-0">
        <Link 
          href="/dashboard/rents"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f3f4f9] text-slate-700 hover:bg-slate-200 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f3f4f9] text-slate-700 hover:bg-slate-200 transition-colors">
          <Edit2 size={18} />
        </button>
      </div>

      {/* Profile/Main Info */}
      <div className="flex flex-col items-center mb-8 px-4 md:px-0">
        <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-md mb-4 border-4 border-white bg-blue-100 flex items-center justify-center text-blue-600">
           {getIcon(rent.icon)}
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{rent.address}</h2>
        <p className="text-slate-500 font-medium">Active Lease</p>

        {/* Action Buttons */}
        <div className="flex w-full gap-4 mt-6">
          <Link href={`/dashboard/rents/${resolvedParams.id}/payment`} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-medium flex items-center justify-center gap-2 shadow-md shadow-blue-200 transition-all">
            <CreditCard size={18} /> Log Payment
          </Link>
          <Link href={`/dashboard/rents/${resolvedParams.id}/invite`} className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-2xl font-medium flex items-center justify-center gap-2 shadow-md transition-all">
            <UserPlus size={18} /> Invite
          </Link>
        </div>
      </div>

      {/* Content Grid for Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:px-0">
        
        {/* Rent Details Card */}
        <div className="px-4 md:px-0 mb-6 md:mb-0">
          <h3 className="text-slate-900 font-bold mb-4 px-2">Rent details</h3>
          <div className="bg-[#f3f4f9] rounded-3xl p-6 grid grid-cols-2 gap-4 border border-slate-50">
            <div>
              <p className="text-xs font-medium text-slate-500 mb-2">Start date</p>
              <div className="bg-white rounded-xl px-4 py-3 text-sm font-bold text-slate-900 shadow-sm">
                {startDate}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-2">Rent cycle</p>
              <div className="bg-white rounded-xl px-4 py-3 text-sm font-bold text-slate-900 shadow-sm">
                Every {rent.rentDueDays} days
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-2">Total rent</p>
              <div className="bg-white rounded-xl px-4 py-3 text-sm font-bold text-slate-900 shadow-sm">
                ${rent.rentAmount.toLocaleString()}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-2">Bond money</p>
              <div className="bg-white rounded-xl px-4 py-3 text-sm font-bold text-slate-900 shadow-sm">
                ${rent.bondAmount.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Tenants Information */}
        <div className="px-4 md:px-0 pb-8">
          <h3 className="text-slate-900 font-bold mb-4 px-2">Tenants</h3>
          <div className="bg-[#f3f4f9] rounded-3xl p-6 space-y-4 border border-slate-50">
            
            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-500 ml-2">{userName} (You)</p>
              <div className="bg-white rounded-xl px-4 py-3 flex justify-between shadow-sm">
                <span className="text-sm font-medium text-slate-900">{userEmail}</span>
                <span className="text-sm font-bold text-blue-600">Admin</span>
              </div>
            </div>
            
            {tenants.map((t: any) => (
              <div key={t._id} className="space-y-2">
                <p className="text-xs font-medium text-slate-500 ml-2">{t.name}</p>
                <div className="bg-white rounded-xl px-4 py-3 flex justify-between shadow-sm">
                  <span className="text-sm font-medium text-slate-900">{t.email}</span>
                  <span className="text-sm font-bold text-slate-500">Rent: {t.rentShareParts} parts</span>
                </div>
              </div>
            ))}

            {tenants.length === 0 && (
              <div className="text-center pt-2">
                <p className="text-sm font-medium text-slate-400">No other roommates added.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
