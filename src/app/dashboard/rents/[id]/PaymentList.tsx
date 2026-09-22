"use client";

import { useState } from "react";
import { Wallet, Trash2, X, Receipt } from "lucide-react";
import { deletePayments } from "@/actions/paymentActions";
import { useRouter } from "next/navigation";

interface PaymentListProps {
  payments: any[];
  rentAgreementId: string;
  tenants?: any[];
  rent: any;
  isAdmin: boolean;
}

export default function PaymentList({ payments, rentAgreementId, tenants = [], rent, isAdmin }: PaymentListProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const router = useRouter();

  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(payments.map(p => p._id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelect = (e: React.MouseEvent | React.ChangeEvent, id: string) => {
    e.stopPropagation();
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} payment(s)?`)) return;

    setIsDeleting(true);
    try {
      await deletePayments(selectedIds, rentAgreementId);
      setSelectedIds([]);
    } catch (e) {
      console.error(e);
      alert("Failed to delete payments");
    } finally {
      setIsDeleting(false);
    }
  };

  const openPaymentModal = (payment: any) => {
    setSelectedPayment(payment);
  };

  const closePaymentModal = () => {
    setSelectedPayment(null);
  };

  // Helper to calculate the share breakdown
  const calculateShares = (payment: any) => {
    const isBond = payment.type === "BOND";
    const totalAmount = payment.paidAmount || 0;

    // Use admin shares from rent agreement (default to 1 if not set)
    const adminPart = isBond 
      ? (rent?.adminBondShareParts ?? 1) 
      : (rent?.adminRentShareParts ?? 1);
    let totalParts = adminPart;

    const tenantShares = tenants.map(t => {
      const parts = isBond ? (t.bondShareParts || 0) : (t.rentShareParts || 0);
      totalParts += parts;
      return { name: t.name, parts };
    });

    if (totalParts === 0) totalParts = 1; // Fallback to avoid division by zero

    const breakdown = tenantShares.map(ts => ({
      name: ts.name,
      amount: totalAmount * (ts.parts / totalParts),
      parts: ts.parts
    }));

    // Add Admin (Owner)
    breakdown.push({
      id: 'admin',
      name: 'Owner',
      amount: totalAmount * (adminPart / totalParts),
      parts: adminPart
    });

    return { breakdown, totalParts };
  };

  return (
    <div className="lg:col-span-2">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-slate-800 font-bold">Payment History</h3>

        {isAdmin && selectedIds.length > 0 && (
          <button
            onClick={handleDeleteSelected}
            disabled={isDeleting}
            className="flex items-center gap-2 text-sm font-bold text-rose-500 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
          >
            <Trash2 size={16} />
            {isDeleting ? "Deleting..." : `Delete (${selectedIds.length})`}
          </button>
        )}
      </div>

      {payments.length > 0 ? (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-3xl border border-slate-100/60 shadow-sm overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100/60 bg-[#f8f7fc]">
                  {isAdmin && (
                    <th className="text-left px-6 py-4 w-12">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-600 cursor-pointer accent-violet-600"
                        checked={selectedIds.length === payments.length && payments.length > 0}
                        onChange={toggleSelectAll}
                      />
                    </th>
                  )}
                  <th className="text-left px-2 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Paid By</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Period</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Paid</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {payments.map((p: any) => (
                  <tr
                    key={p._id}
                    className="hover:bg-violet-50/30 transition-colors cursor-pointer"
                    onClick={() => openPaymentModal(p)}
                  >
                    {isAdmin && (
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-600 cursor-pointer accent-violet-600"
                          checked={selectedIds.includes(p._id)}
                          onChange={(e) => toggleSelect(e, p._id)}
                        />
                      </td>
                    )}
                    <td className="px-2 py-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${p.type === "BOND"
                        ? "bg-sky-50 text-sky-600"
                        : "bg-violet-50 text-violet-600"
                        }`}>
                        {p.type || "RENT"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-800">${p.paidAmount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-600">{p.paidBy || "Me"}</td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {new Date(p.periodStartDate).toLocaleDateString("en-GB")} — {new Date(p.periodEndDate).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">{new Date(p.paidDate).toLocaleDateString("en-GB")}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full">{p.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {payments.map((p: any) => (
              <div
                key={p._id}
                onClick={() => openPaymentModal(p)}
                className={`bg-white rounded-2xl px-5 py-4 flex items-center justify-between shadow-sm border cursor-pointer ${selectedIds.includes(p._id) ? "border-violet-300 bg-violet-50/50" : "border-slate-100/60"
                  } transition-colors`}
              >
                <div className="flex items-center gap-4">
                  {isAdmin && (
                    <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-600 cursor-pointer accent-violet-600"
                        checked={selectedIds.includes(p._id)}
                        onChange={(e) => toggleSelect(e, p._id)}
                      />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-slate-800">${p.paidAmount.toLocaleString()}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.type === "BOND" ? "bg-sky-50 text-sky-600" : "bg-violet-50 text-violet-600"
                        }`}>
                        {p.type || "RENT"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      By: <span className="font-medium text-slate-600">{p.paidBy || "Me"}</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {new Date(p.periodStartDate).toLocaleDateString("en-GB")} — {new Date(p.periodEndDate).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full">{p.status}</span>
                  <p className="text-xs text-slate-300 mt-1">{new Date(p.paidDate).toLocaleDateString("en-GB")}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-100/60 shadow-sm text-center py-16">
          <Wallet className="mx-auto text-slate-200 mb-3" size={32} />
          <p className="text-sm font-medium text-slate-300">No payments logged yet.</p>
          <p className="text-xs text-slate-300 mt-1">Click "Log Payment" to get started.</p>
        </div>
      )}

      {/* Payment Breakdown Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={closePaymentModal}>
          <div className="bg-white rounded-[2rem] w-full max-w-md shadow-xl overflow-hidden animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-[#f8f7fc]/50">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${selectedPayment.type === "BOND" ? "bg-sky-100 text-sky-500" : "bg-violet-100 text-violet-600"
                  }`}>
                  <Receipt size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Payment Details</h3>
                  <p className="text-xs font-medium text-slate-400">{new Date(selectedPayment.paidDate).toLocaleDateString("en-GB")}</p>
                </div>
              </div>
              <button onClick={closePaymentModal} className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-slate-400 hover:text-slate-600 shadow-sm transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex justify-between items-end border-b border-slate-100 pb-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Amount</p>
                  <p className="text-3xl font-black text-slate-800">${selectedPayment.paidAmount.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-slate-400 mb-1">Paid By</p>
                  <p className="text-sm font-bold text-slate-600">{selectedPayment.paidBy || "Me"}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-800 mb-4">Share Breakdown</p>
                <div className="space-y-3">
                  {calculateShares(selectedPayment).breakdown.map((share, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-slate-50 p-3 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-400 uppercase">
                          {share.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-700">{share.name}</p>
                          <p className="text-xs font-medium text-slate-400">{share.parts} part(s)</p>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-slate-800">
                        ${share.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
