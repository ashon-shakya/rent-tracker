import Link from "next/link";
import { Plus, Home, ChevronRight, Building, Tent, Castle, Hotel } from "lucide-react";
import { getRentAgreements } from "@/actions/rentActions";

const getIcon = (name: string) => {
  switch (name) {
    case "Building": return <Building size={24} />;
    case "Tent": return <Tent size={24} />;
    case "Castle": return <Castle size={24} />;
    case "Hotel": return <Hotel size={24} />;
    default: return <Home size={24} />;
  }
};

export default async function RentsListPage() {
  const rents = await getRentAgreements();
  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Agreements</h1>
          <p className="text-slate-500 font-medium">Manage your active leases</p>
        </div>
        <Link href="/dashboard/rents/new">
          <button className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 shadow-md shadow-blue-200 text-white hover:bg-blue-700 transition-colors">
            <Plus size={24} strokeWidth={2.5} />
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rents.length > 0 ? (
          rents.map((rent: any) => (
            <Link key={rent._id} href={`/dashboard/rents/${rent._id}`}>
              <div className="bg-white p-6 rounded-[2rem] shadow-sm flex flex-col gap-4 border border-slate-50 hover:shadow-md transition-all cursor-pointer group h-full">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 relative overflow-hidden">
                    {getIcon(rent.icon)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">{rent.address}</h3>
                    <p className="text-sm font-medium text-slate-500">Active Lease</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shrink-0">
                    <ChevronRight size={20} />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-auto pt-2">
                  <div className="bg-[#f3f4f9] p-3 rounded-xl">
                    <p className="text-xs font-medium text-slate-500 mb-1">Total Rent</p>
                    <p className="text-sm font-bold text-slate-900">${rent.rentAmount} / {rent.rentDueDays}d</p>
                  </div>
                  <div className="bg-[#f3f4f9] p-3 rounded-xl">
                    <p className="text-xs font-medium text-slate-500 mb-1">Tenants</p>
                    <p className="text-sm font-bold text-slate-900">Invite Pending</p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="bg-[#f8f9fc] border-2 border-dashed border-slate-200 p-6 rounded-[2rem] flex flex-col items-center justify-center gap-4 text-center min-h-[200px] md:col-span-2">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-slate-400 shadow-sm">
              <Home size={28} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">No leases yet</h3>
              <p className="text-sm font-medium text-slate-500">Create your first rent agreement to get started.</p>
            </div>
            <Link href="/dashboard/rents/new">
              <button className="text-blue-600 font-bold text-sm px-6 py-2 rounded-xl hover:bg-blue-50 transition-colors">
                + New Agreement
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
