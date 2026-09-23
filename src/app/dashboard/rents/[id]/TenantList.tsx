"use client";

import { useState } from "react";
import { Edit2, X, Save, Trash2 } from "lucide-react";
import { updateTenant, deleteTenant } from "@/actions/tenantActions";
import { updateRentAgreementAdminShares } from "@/actions/rentActions";

export interface TenantData {
  _id: string;
  name: string;
  email: string;
  rentShareParts: number;
  bondShareParts: number;
  utilityShareParts: number;
}

export interface RentData {
  _id: string;
  ownerEmail: string;
  adminRentShareParts?: number;
  adminBondShareParts?: number;
  adminUtilityShareParts?: number;
}

interface TenantListProps {
  tenants: TenantData[];
  rent: RentData;
  isAdmin: boolean;
}

export default function TenantList({ tenants, rent, isAdmin }: TenantListProps) {
  const [editingTenant, setEditingTenant] = useState<Partial<TenantData> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleEditClick = (tenant: Partial<TenantData>) => {
    setEditingTenant(tenant);
  };

  const closeEdit = () => {
    setEditingTenant(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingTenant?._id) return;
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    try {
      if (editingTenant._id === "admin") {
        await updateRentAgreementAdminShares(rent._id, formData);
      } else {
        await updateTenant(editingTenant._id, formData);
      }
      setEditingTenant(null);
    } catch (error) {
      console.error(error);
      alert("Failed to update share.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (tenant: TenantData) => {
    if (!confirm(`Are you sure you want to remove ${tenant.name} from this agreement?`)) return;
    try {
      await deleteTenant(tenant._id);
    } catch (error) {
      console.error(error);
      alert("Failed to remove tenant.");
    }
  };

  return (
    <div>
      <h3 className="text-slate-800 font-bold mb-4 px-2">Tenants</h3>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-3xl border border-slate-100/60 shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100/60 bg-[#f8f7fc]">
              <th className="text-left px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Name</th>
              <th className="text-left px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Email</th>
              <th className="text-left px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Role/Shares</th>
              <th className="text-right px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            <tr className="hover:bg-violet-50/30 transition-colors">
              <td className="px-4 py-4 text-sm font-medium text-slate-800">Owner</td>
              <td className="px-4 py-4 text-sm text-slate-400">{rent.ownerEmail}</td>
              <td className="px-4 py-4">
                <div className="flex gap-1 flex-wrap">
                  <span className="text-[10px] font-bold text-violet-600 bg-violet-50 px-2 py-1 rounded-full">
                    R: {rent.adminRentShareParts ?? 1}p
                  </span>
                  <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-1 rounded-full">
                    B: {rent.adminBondShareParts ?? 1}p
                  </span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-full">
                    U: {rent.adminUtilityShareParts ?? 1}p
                  </span>
                </div>
              </td>
              <td className="px-4 py-4 text-right">
                {isAdmin && (
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() =>
                        handleEditClick({
                          _id: "admin",
                          name: "Owner",
                          rentShareParts: rent.adminRentShareParts ?? 1,
                          bondShareParts: rent.adminBondShareParts ?? 1,
                          utilityShareParts: rent.adminUtilityShareParts ?? 1,
                        })
                      }
                      className="p-1.5 rounded-full text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"
                      title="Edit Admin Shares"
                    >
                      <Edit2 size={16} />
                    </button>
                  </div>
                )}
              </td>
            </tr>
            {tenants.map((t) => (
              <tr key={t._id} className="hover:bg-violet-50/30 transition-colors">
                <td className="px-4 py-4 text-sm font-medium text-slate-800">{t.name}</td>
                <td className="px-4 py-4 text-sm text-slate-400">{t.email}</td>
                <td className="px-4 py-4">
                  <div className="flex gap-1 flex-wrap">
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-full">
                      R: {t.rentShareParts ?? 1}p
                    </span>
                    <span className="text-[10px] font-bold text-sky-500 bg-sky-50 px-2 py-1 rounded-full">
                      B: {t.bondShareParts ?? 1}p
                    </span>
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                      U: {t.utilityShareParts ?? 1}p
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  {isAdmin && (
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => handleEditClick(t)}
                        className="p-1.5 rounded-full text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"
                        title="Edit Shares"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(t)}
                        className="p-1.5 rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                        title="Remove Tenant"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tenants.length === 0 && (
          <div className="text-center py-6 border-t border-slate-50">
            <p className="text-sm font-medium text-slate-300">No other roommates added.</p>
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden bg-white rounded-3xl p-6 space-y-4 border border-slate-100/60 shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center justify-between ml-2">
            <p className="text-xs font-medium text-slate-400">Owner</p>
            {isAdmin && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    handleEditClick({
                      _id: "admin",
                      name: "Owner",
                      rentShareParts: rent.adminRentShareParts ?? 1,
                      bondShareParts: rent.adminBondShareParts ?? 1,
                      utilityShareParts: rent.adminUtilityShareParts ?? 1,
                    })
                  }
                  className="p-1.5 rounded-full text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"
                  title="Edit Shares"
                >
                  <Edit2 size={16} />
                </button>
              </div>
            )}
          </div>
          <div className="bg-[#f8f7fc] rounded-xl px-4 py-3 flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-800">{rent.ownerEmail}</span>
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs font-bold text-violet-600">Rent: {rent.adminRentShareParts ?? 1}p</span>
              <span className="text-xs font-bold text-sky-600">Bond: {rent.adminBondShareParts ?? 1}p</span>
              <span className="text-xs font-bold text-amber-600">Utility: {rent.adminUtilityShareParts ?? 1}p</span>
            </div>
          </div>
        </div>
        {tenants.map((t) => (
          <div key={t._id} className="space-y-2">
            <div className="flex items-center justify-between ml-2">
              <p className="text-xs font-medium text-slate-400">{t.name}</p>
              {isAdmin && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEditClick(t)}
                    className="p-1.5 rounded-full text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"
                    title="Edit Shares"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(t)}
                    className="p-1.5 rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                    title="Remove Tenant"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>
            <div className="bg-[#f8f7fc] rounded-xl px-4 py-3 flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-800">{t.email}</span>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-500">Rent: {t.rentShareParts ?? 1}p</span>
                <span className="text-xs font-bold text-sky-500">Bond: {t.bondShareParts ?? 1}p</span>
                <span className="text-xs font-bold text-amber-600">Utility: {t.utilityShareParts ?? 1}p</span>
              </div>
            </div>
          </div>
        ))}
        {tenants.length === 0 && (
          <div className="text-center pt-2">
            <p className="text-sm font-medium text-slate-300">No other roommates added.</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingTenant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] w-full max-w-md shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-[#f8f7fc]/50">
              <h3 className="font-bold text-slate-800 text-lg">Edit {editingTenant.name}&apos;s Shares</h3>
              <button
                onClick={closeEdit}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-slate-400 hover:text-slate-600 shadow-sm transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Rent Share Parts</label>
                  <input
                    type="number"
                    name="rentShareParts"
                    step="0.01"
                    min="0"
                    defaultValue={editingTenant.rentShareParts ?? 1}
                    required
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                  />
                  <p className="text-xs text-slate-400 font-medium">How many parts of the rent they pay.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Bond Share Parts</label>
                  <input
                    type="number"
                    name="bondShareParts"
                    step="0.01"
                    min="0"
                    defaultValue={editingTenant.bondShareParts ?? 1}
                    required
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Utility Share Parts</label>
                  <input
                    type="number"
                    name="utilityShareParts"
                    step="0.01"
                    min="0"
                    defaultValue={editingTenant.utilityShareParts ?? 1}
                    required
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                  />
                  <p className="text-xs text-slate-400 font-medium">How many parts of utilities they pay.</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md shadow-violet-200 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Save size={18} />
                {isSaving ? "Saving..." : "Save Shares"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
