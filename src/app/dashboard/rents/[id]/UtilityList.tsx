"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Calendar, DollarSign, Zap, CheckCircle2, Clock, X } from "lucide-react";
import { getUtilityIcon, UTILITY_CATEGORIES, UTILITY_ICONS } from "@/components/UtilityIcon";
import { createUtility, updateUtility, deleteUtility } from "@/actions/utilityActions";
import { Button } from "@/components/ui/button";

export interface UtilityData {
  _id: string;
  rentAgreementId: string;
  title: string;
  category: string;
  icon: string;
  billingPeriod: "weekly" | "fortnightly" | "monthly" | "quarterly" | "annually";
  startDate: string;
  endDate?: string;
  amount?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface UtilityListProps {
  utilities: UtilityData[];
  rentAgreementId: string;
  isAdmin: boolean;
}

const BILLING_PERIOD_LABELS: Record<string, string> = {
  weekly: "Weekly",
  fortnightly: "Fortnightly",
  monthly: "Monthly",
  quarterly: "Quarterly",
  annually: "Annually",
};

export default function UtilityList({ utilities, rentAgreementId, isAdmin }: UtilityListProps) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingUtility, setEditingUtility] = useState<UtilityData | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states for Add / Edit
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("electricity");
  const [icon, setIcon] = useState("Zap");
  const [billingPeriod, setBillingPeriod] = useState<UtilityData["billingPeriod"]>("monthly");
  const [startDate, setStartDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");

  const openAddModal = () => {
    setTitle("");
    setCategory("electricity");
    setIcon("Zap");
    setBillingPeriod("monthly");
    setStartDate(new Date().toISOString().split("T")[0]);
    setEndDate("");
    setAmount("");
    setNotes("");
    setIsAddOpen(true);
  };

  const openEditModal = (u: UtilityData) => {
    setEditingUtility(u);
    setTitle(u.title);
    setCategory(u.category || "electricity");
    setIcon(u.icon || "Zap");
    setBillingPeriod(u.billingPeriod || "monthly");
    setStartDate(u.startDate ? new Date(u.startDate).toISOString().split("T")[0] : "");
    setEndDate(u.endDate ? new Date(u.endDate).toISOString().split("T")[0] : "");
    setAmount(u.amount !== undefined && u.amount !== null ? String(u.amount) : "");
    setNotes(u.notes || "");
  };

  const handleCategoryChange = (newCat: string) => {
    setCategory(newCat);
    const catObj = UTILITY_CATEGORIES.find((c) => c.id === newCat);
    if (catObj) {
      setIcon(catObj.defaultIcon);
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("rentAgreementId", rentAgreementId);
      formData.append("title", title);
      formData.append("category", category);
      formData.append("icon", icon);
      formData.append("billingPeriod", billingPeriod);
      formData.append("startDate", startDate);
      if (endDate) formData.append("endDate", endDate);
      if (amount) formData.append("amount", amount);
      if (notes) formData.append("notes", notes);

      await createUtility(formData);
      setIsAddOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUtility) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("utilityId", editingUtility._id);
      formData.append("rentAgreementId", rentAgreementId);
      formData.append("title", title);
      formData.append("category", category);
      formData.append("icon", icon);
      formData.append("billingPeriod", billingPeriod);
      formData.append("startDate", startDate);
      if (endDate) formData.append("endDate", endDate);
      if (amount) formData.append("amount", amount);
      if (notes) formData.append("notes", notes);

      await updateUtility(formData);
      setEditingUtility(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (utilityId: string) => {
    setIsSubmitting(true);
    try {
      await deleteUtility(utilityId, rentAgreementId);
      setDeletingId(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100/60 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Utilities</h3>
          <p className="text-xs text-slate-400 font-medium">Track gas, electricity, internet, water & recurring services</p>
        </div>
        {isAdmin && (
          <Button
            onClick={openAddModal}
            className="flex items-center gap-1.5 bg-violet-500 hover:bg-violet-600 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all shadow-sm shadow-violet-200"
          >
            <Plus size={16} /> Add Utility
          </Button>
        )}
      </div>

      {/* Utilities List */}
      {utilities.length === 0 ? (
        <div className="bg-slate-50/70 border border-dashed border-slate-200 rounded-2xl p-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center mx-auto mb-3">
            <Zap size={24} />
          </div>
          <p className="text-sm font-bold text-slate-700 mb-1">No utilities added yet</p>
          <p className="text-xs text-slate-400 max-w-xs mx-auto mb-4">
            Add recurring utilities like gas usage, electricity, water, or internet with custom billing cycles.
          </p>
          {isAdmin && (
            <Button
              onClick={openAddModal}
              className="bg-violet-500 hover:bg-violet-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm"
            >
              Add First Utility
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {utilities.map((u) => {
            const isEnded = u.endDate && new Date(u.endDate) <= new Date();
            const formattedStart = new Date(u.startDate).toLocaleDateString("en-GB");
            const formattedEnd = u.endDate ? new Date(u.endDate).toLocaleDateString("en-GB") : null;

            return (
              <div
                key={u._id}
                className={`relative rounded-2xl p-4 border transition-all overflow-hidden ${
                  isEnded
                    ? "bg-slate-50/60 border-slate-200 opacity-75"
                    : "bg-white border-slate-100 hover:border-violet-200 hover:shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isEnded
                          ? "bg-slate-200 text-slate-500"
                          : "bg-violet-100 text-violet-600 shadow-sm shadow-violet-100"
                      }`}
                    >
                      {getUtilityIcon(u.icon, 20)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-slate-800 text-sm truncate" title={u.title}>
                        {u.title}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-violet-50 text-violet-600 capitalize shrink-0">
                          {BILLING_PERIOD_LABELS[u.billingPeriod] || u.billingPeriod}
                        </span>
                        {isEnded ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-200 text-slate-600 flex items-center gap-1 shrink-0">
                            <Clock size={10} /> Ended
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 flex items-center gap-1 shrink-0">
                            <CheckCircle2 size={10} /> Active
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {isAdmin && (
                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      <button
                        onClick={() => openEditModal(u)}
                        className="p-1.5 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
                        title="Edit Utility"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => setDeletingId(u._id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Utility"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-y-1.5 gap-x-4 pt-2.5 border-t border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center gap-1 text-slate-400">
                    <Calendar size={12} className="shrink-0" />
                    <span>Start Date:</span>
                    <span className="font-semibold text-slate-700 ml-1">{formattedStart}</span>
                  </div>
                  {formattedEnd && (
                    <div className="flex items-center gap-1 text-slate-400">
                      <Calendar size={12} className="shrink-0" />
                      <span>End Date:</span>
                      <span className="font-semibold text-slate-700 ml-1">{formattedEnd}</span>
                    </div>
                  )}
                  {u.amount !== undefined && u.amount !== null && (
                    <div className="flex items-center gap-1 text-slate-400">
                      <DollarSign size={12} className="shrink-0" />
                      <span>Est. Cost:</span>
                      <span className="font-bold text-slate-800 ml-1">${u.amount.toLocaleString()}</span>
                    </div>
                  )}
                  {u.notes && (
                    <p className="w-full text-[11px] text-slate-400 italic pt-1 truncate" title={u.notes}>
                      {u.notes}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Utility Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-xl border border-slate-100 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Add Utility</h3>
                <p className="text-xs text-slate-400 font-medium">Add a recurring utility or service</p>
              </div>
              <button
                onClick={() => setIsAddOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Utility Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gas Meter, Gigabit Fiber, Water Usage"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
                  >
                    {UTILITY_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Billing Period *</label>
                  <select
                    value={billingPeriod}
                    onChange={(e) => setBillingPeriod(e.target.value as UtilityData["billingPeriod"])}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="fortnightly">Fortnightly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
                  </select>
                </div>
              </div>

              {/* Icon Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Choose Utility Icon</label>
                <div className="grid grid-cols-6 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  {UTILITY_ICONS.map((ico) => (
                    <button
                      key={ico.name}
                      type="button"
                      onClick={() => setIcon(ico.name)}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                        icon === ico.name
                          ? "bg-violet-500 text-white border-violet-500 shadow-md scale-105"
                          : "bg-white text-slate-500 border-slate-200 hover:bg-slate-100"
                      }`}
                      title={ico.label}
                    >
                      {getUtilityIcon(ico.name, 18)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">End Date (Optional)</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Estimated / Fixed Cost ($)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Optional rate or cost"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddOpen(false)}
                  className="rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-xl px-6"
                >
                  {isSubmitting ? "Adding..." : "Save Utility"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Utility Modal */}
      {editingUtility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-xl border border-slate-100 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Edit Utility</h3>
                <p className="text-xs text-slate-400 font-medium">Update utility details or set an end date</p>
              </div>
              <button
                onClick={() => setEditingUtility(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Utility Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
                  >
                    {UTILITY_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Billing Period *</label>
                  <select
                    value={billingPeriod}
                    onChange={(e) => setBillingPeriod(e.target.value as UtilityData["billingPeriod"])}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="fortnightly">Fortnightly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
                  </select>
                </div>
              </div>

              {/* Icon Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Choose Utility Icon</label>
                <div className="grid grid-cols-6 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  {UTILITY_ICONS.map((ico) => (
                    <button
                      key={ico.name}
                      type="button"
                      onClick={() => setIcon(ico.name)}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                        icon === ico.name
                          ? "bg-violet-500 text-white border-violet-500 shadow-md scale-105"
                          : "bg-white text-slate-500 border-slate-200 hover:bg-slate-100"
                      }`}
                      title={ico.label}
                    >
                      {getUtilityIcon(ico.name, 18)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">End Date (Optional)</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Set an end date if this utility has ended.</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Estimated / Fixed Cost ($)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Optional rate or cost"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingUtility(null)}
                  className="rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-xl px-6"
                >
                  {isSubmitting ? "Updating..." : "Update Utility"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-xl border border-slate-100 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Delete Utility?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to remove this utility from the agreement?
              </p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDeletingId(null)}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleDelete(deletingId)}
                className="bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl px-6"
              >
                {isSubmitting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
