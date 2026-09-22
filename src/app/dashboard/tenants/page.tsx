import { Search, UserPlus, Filter, MoreVertical, Mail, Phone, MapPin } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getAllTenants } from "@/actions/tenantActions";

export default async function TenantsPage() {
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name || "User";
  const userEmail = session?.user?.email || "";
  const userInitial = userName[0] || "U";
  
  const tenants = await getAllTenants();

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tenants & Roommates</h1>
          <p className="text-slate-500 font-medium">Manage your shared living network</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Tenants List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center bg-white rounded-2xl px-4 py-3 shadow-sm border border-slate-50">
            <Search size={20} className="text-slate-400 mr-3" />
            <input 
              type="text" 
              placeholder="Search roommates..."
              className="bg-transparent border-none outline-none w-full text-sm font-medium text-slate-900 placeholder:text-slate-400"
            />
          </div>

          {/* Roommates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Active Session User (You) */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-50 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold uppercase shadow-sm">
                  {userInitial}
                </div>
                <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">Admin (You)</span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-1">{userName}</h3>
              
              <div className="space-y-3 mt-6 pt-6 border-t border-slate-50">
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <Mail size={16} className="text-slate-400" />
                  <span className="truncate">{userEmail}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <MapPin size={16} className="text-slate-400" />
                  <span className="truncate">Multiple properties</span>
                </div>
              </div>
            </div>

            {/* Invited Tenants */}
            {tenants.map((tenant: any) => (
              <div key={tenant._id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-50 group hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-xl font-bold uppercase shadow-sm">
                    {tenant.name[0] || "T"}
                  </div>
                  <button className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-1">{tenant.name}</h3>
                <p className="text-sm font-medium text-slate-400">Rent Share: {tenant.rentShareParts} parts</p>
                
                <div className="space-y-3 mt-6 pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <Mail size={16} className="text-slate-400" />
                    <span className="truncate">{tenant.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <MapPin size={16} className="text-slate-400" />
                    <span className="truncate">{tenant.rentAgreementId?.address || "Unknown Property"}</span>
                  </div>
                </div>
              </div>
            ))}

          </div>

          {tenants.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-50 mt-6">
              <UserPlus size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">No roommates yet</h3>
              <p className="text-slate-500 font-medium mb-6">Invite roommates to a rent agreement to see them here.</p>
            </div>
          )}
        </div>

        {/* The Invite Widget has been moved to individual rent agreements */}

      </div>
    </div>
  );
}
