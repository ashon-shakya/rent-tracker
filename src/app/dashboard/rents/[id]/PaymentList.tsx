"use client";

import { useState, useRef } from "react";
import { Wallet, Trash2, X, Receipt, CheckCircle2, Clock, Copy, Check, ShieldCheck, ShieldAlert } from "lucide-react";
import { deletePayments, togglePaymentSettlement, bulkTogglePaymentSettlement } from "@/actions/paymentActions";
import { getUtilityIcon } from "@/components/UtilityIcon";
import { toBlob } from "html-to-image";

export interface PaymentItem {
  _id: string;
  rentAgreementId: string;
  type: "RENT" | "BOND" | "UTILITY";
  utilityId?: string;
  utilityTitle?: string;
  utilityCategory?: string;
  utilityIcon?: string;
  paidAmount: number;
  paidBy?: string;
  paidDate: string;
  periodStartDate?: string;
  periodEndDate?: string;
  status: string;
  isSettled?: boolean;
  settledAt?: string;
}

export interface TenantItem {
  _id: string;
  name: string;
  rentShareParts?: number;
  bondShareParts?: number;
  utilityShareParts?: number;
}

export interface RentAgreementItem {
  adminRentShareParts?: number;
  adminBondShareParts?: number;
  adminUtilityShareParts?: number;
}

interface PaymentListProps {
  payments: PaymentItem[];
  rentAgreementId: string;
  tenants?: TenantItem[];
  rent: RentAgreementItem;
  isAdmin: boolean;
}

export default function PaymentList({ payments, rentAgreementId, tenants = [], rent, isAdmin }: PaymentListProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isBulkSettling, setIsBulkSettling] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentItem | null>(null);
  const [isUpdatingSettlement, setIsUpdatingSettlement] = useState(false);
  const [isCopyingImage, setIsCopyingImage] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(payments.map((p) => p._id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelect = (e: React.MouseEvent | React.ChangeEvent, id: string) => {
    e.stopPropagation();
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
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

  const handleBulkSettlement = async (targetState: boolean) => {
    if (selectedIds.length === 0) return;
    setIsBulkSettling(true);
    try {
      await bulkTogglePaymentSettlement(selectedIds, targetState, rentAgreementId);
      setSelectedIds([]);
    } catch (e) {
      console.error(e);
      alert("Failed to update settlement status for selected payments");
    } finally {
      setIsBulkSettling(false);
    }
  };

  const openPaymentModal = (payment: PaymentItem) => {
    setSelectedPayment(payment);
    setCopySuccess(false);
  };

  const closePaymentModal = () => {
    setSelectedPayment(null);
    setCopySuccess(false);
  };

  const handleToggleSettlement = async () => {
    if (!selectedPayment) return;
    const nextState = !selectedPayment.isSettled;
    setIsUpdatingSettlement(true);
    try {
      await togglePaymentSettlement(selectedPayment._id, nextState, rentAgreementId);
      setSelectedPayment((prev) => (prev ? { ...prev, isSettled: nextState } : null));
    } catch (e) {
      console.error(e);
      alert("Failed to update settlement status");
    } finally {
      setIsUpdatingSettlement(false);
    }
  };

  const handleCopyImage = async () => {
    if (!modalRef.current) return;
    setIsCopyingImage(true);
    try {
      const blob = await toBlob(modalRef.current, {
        cacheBust: true,
        backgroundColor: "#ffffff",
        pixelRatio: 2,
      });

      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob,
          }),
        ]);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
      }
    } catch (err) {
      console.error("Failed to copy image to clipboard", err);
      alert("Unable to copy image to clipboard automatically. Try again or take a screenshot.");
    } finally {
      setIsCopyingImage(false);
    }
  };

  // Helper to calculate the share breakdown based on payment type (RENT, BOND, UTILITY)
  const calculateShares = (payment: PaymentItem) => {
    const isBond = payment.type === "BOND";
    const isUtility = payment.type === "UTILITY";
    const totalAmount = payment.paidAmount || 0;

    const adminPart = isBond
      ? (rent?.adminBondShareParts ?? 1)
      : isUtility
      ? (rent?.adminUtilityShareParts ?? 1)
      : (rent?.adminRentShareParts ?? 1);
    let totalParts = adminPart;

    const tenantShares = tenants.map((t) => {
      const parts = isBond
        ? (t.bondShareParts ?? 1)
        : isUtility
        ? (t.utilityShareParts ?? 1)
        : (t.rentShareParts ?? 1);
      totalParts += parts;
      return { name: t.name, parts };
    });

    if (totalParts === 0) totalParts = 1;

    const breakdown: { id?: string; name: string; amount: number; parts: number }[] = tenantShares.map(
      (ts) => ({
        name: ts.name,
        amount: totalAmount * (ts.parts / totalParts),
        parts: ts.parts,
      })
    );

    // Add Admin (Owner)
    breakdown.push({
      id: "admin",
      name: "Owner",
      amount: totalAmount * (adminPart / totalParts),
      parts: adminPart,
    });

    return { breakdown, totalParts };
  };

  const getTypeBadge = (payment: PaymentItem) => {
    if (payment.type === "BOND") {
      return <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sky-50 text-sky-600">BOND</span>;
    }
    if (payment.type === "UTILITY") {
      return (
        <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 px-3 py-1 rounded-xl border border-amber-200/60 shadow-2xs">
          <div className="w-5 h-5 rounded-md bg-amber-200/70 text-amber-800 flex items-center justify-center shrink-0">
            {getUtilityIcon(payment.utilityIcon, 12, "", payment.utilityCategory, payment.utilityTitle)}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-xs">{payment.utilityTitle || "Utility"}</span>
            {payment.utilityCategory && (
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-md bg-amber-200/50 text-amber-900">
                {payment.utilityCategory}
              </span>
            )}
          </div>
        </div>
      );
    }
    return <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-violet-50 text-violet-600">RENT</span>;
  };

  const getSettledBadge = (isSettled?: boolean) => {
    if (isSettled) {
      return (
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full inline-flex items-center gap-1">
          <CheckCircle2 size={12} /> Settled
        </span>
      );
    }
    return (
      <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-full inline-flex items-center gap-1">
        <Clock size={12} /> Unsettled
      </span>
    );
  };

  return (
    <div className="lg:col-span-2">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-slate-800 font-bold">Payment History</h3>

        {isAdmin && selectedIds.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleBulkSettlement(true)}
              disabled={isBulkSettling || isDeleting}
              className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
              title="Mark selected payments as settled"
            >
              <CheckCircle2 size={14} />
              {isBulkSettling ? "Updating..." : `Settle (${selectedIds.length})`}
            </button>
            <button
              onClick={() => handleBulkSettlement(false)}
              disabled={isBulkSettling || isDeleting}
              className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
              title="Mark selected payments as unsettled"
            >
              <Clock size={14} />
              {isBulkSettling ? "Updating..." : `Unsettle (${selectedIds.length})`}
            </button>
            <button
              onClick={handleDeleteSelected}
              disabled={isDeleting || isBulkSettling}
              className="flex items-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
              title="Delete selected payments"
            >
              <Trash2 size={14} />
              {isDeleting ? "Deleting..." : `Delete (${selectedIds.length})`}
            </button>
          </div>
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
                  <th className="text-left px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Type / Utility</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Paid By</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Period</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Paid Date</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Settled</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {payments.map((p) => (
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
                    <td className="px-4 py-4">{getTypeBadge(p)}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-800">${p.paidAmount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-600">{p.paidBy || "Me"}</td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {p.periodStartDate && p.periodEndDate
                        ? `${new Date(p.periodStartDate).toLocaleDateString("en-GB")} — ${new Date(
                            p.periodEndDate
                          ).toLocaleDateString("en-GB")}`
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {new Date(p.paidDate).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-4">{getSettledBadge(p.isSettled)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {payments.map((p) => (
              <div
                key={p._id}
                onClick={() => openPaymentModal(p)}
                className={`bg-white rounded-2xl px-5 py-4 flex items-center justify-between shadow-sm border cursor-pointer ${
                  selectedIds.includes(p._id) ? "border-violet-300 bg-violet-50/50" : "border-slate-100/60"
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
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-bold text-slate-800">${p.paidAmount.toLocaleString()}</p>
                      {getTypeBadge(p)}
                    </div>
                    <p className="text-xs text-slate-400">
                      By: <span className="font-medium text-slate-600">{p.paidBy || "Me"}</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {p.periodStartDate && p.periodEndDate
                        ? `${new Date(p.periodStartDate).toLocaleDateString("en-GB")} — ${new Date(
                            p.periodEndDate
                          ).toLocaleDateString("en-GB")}`
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  {getSettledBadge(p.isSettled)}
                  <p className="text-xs text-slate-300">{new Date(p.paidDate).toLocaleDateString("en-GB")}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-100/60 shadow-sm text-center py-16">
          <Wallet className="mx-auto text-slate-200 mb-3" size={32} />
          <p className="text-sm font-medium text-slate-300">No payments logged yet.</p>
          <p className="text-xs text-slate-300 mt-1">Click &quot;Log Payment&quot; to get started.</p>
        </div>
      )}

      {/* Payment Breakdown & Receipt Modal */}
      {selectedPayment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closePaymentModal}
        >
          <div
            className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Action Bar / Modal Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-[#f8f7fc]/80 px-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyImage}
                  disabled={isCopyingImage}
                  className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                    copySuccess
                      ? "bg-emerald-500 text-white shadow-sm"
                      : "bg-violet-100 text-violet-700 hover:bg-violet-200"
                  }`}
                  title="Copy Receipt Image to Clipboard"
                >
                  {copySuccess ? (
                    <>
                      <Check size={14} /> Copied Image!
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> {isCopyingImage ? "Capturing..." : "Copy Image"}
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={closePaymentModal}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-slate-400 hover:text-slate-600 shadow-sm transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Printable / Capturable Receipt Card Area */}
            <div ref={modalRef} className="p-6 space-y-6 bg-white">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${
                      selectedPayment.type === "BOND"
                        ? "bg-sky-100 text-sky-600"
                        : selectedPayment.type === "UTILITY"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-violet-100 text-violet-600"
                    }`}
                  >
                    {selectedPayment.type === "UTILITY" ? (
                      getUtilityIcon(
                        selectedPayment.utilityIcon,
                        22,
                        "",
                        selectedPayment.utilityCategory,
                        selectedPayment.utilityTitle
                      )
                    ) : (
                      <Receipt size={22} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">
                      {selectedPayment.type === "UTILITY"
                        ? selectedPayment.utilityTitle || "Utility Payment"
                        : selectedPayment.type === "BOND"
                        ? "Bond Payment"
                        : "Rent Payment"}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-xs font-medium text-slate-400">
                        Date: {new Date(selectedPayment.paidDate).toLocaleDateString("en-GB")}
                      </p>
                      {selectedPayment.type === "UTILITY" && selectedPayment.utilityCategory && (
                        <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                          {selectedPayment.utilityCategory}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Amount & Paid By */}
              <div className="flex justify-between items-end bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Amount</p>
                  <p className="text-3xl font-black text-slate-800">
                    ${selectedPayment.paidAmount.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-slate-400 mb-1">Paid By</p>
                  <p className="text-sm font-bold text-slate-700">{selectedPayment.paidBy || "Me"}</p>
                </div>
              </div>

              {/* Period Dates if present */}
              {selectedPayment.periodStartDate && selectedPayment.periodEndDate && (
                <div className="flex items-center justify-between text-xs bg-slate-50/50 px-4 py-2.5 rounded-xl border border-slate-100 text-slate-600">
                  <span className="font-medium text-slate-400">Billing Period:</span>
                  <span className="font-bold text-slate-800">
                    {new Date(selectedPayment.periodStartDate).toLocaleDateString("en-GB")} —{" "}
                    {new Date(selectedPayment.periodEndDate).toLocaleDateString("en-GB")}
                  </span>
                </div>
              )}

              {/* Settlement Status Display & Admin Toggle */}
              <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {selectedPayment.isSettled ? (
                      <ShieldCheck size={18} className="text-emerald-500" />
                    ) : (
                      <ShieldAlert size={18} className="text-amber-500" />
                    )}
                    <div>
                      <p className="text-xs font-bold text-slate-700">Settlement Status</p>
                      <p className="text-[11px] font-medium text-slate-400">
                        {selectedPayment.isSettled ? "Payment is fully settled" : "Payment has not been marked as settled"}
                      </p>
                    </div>
                  </div>
                  {getSettledBadge(selectedPayment.isSettled)}
                </div>

                {isAdmin && (
                  <div className="pt-2 border-t border-slate-200/60 flex justify-end">
                    <button
                      type="button"
                      disabled={isUpdatingSettlement}
                      onClick={handleToggleSettlement}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                        selectedPayment.isSettled
                          ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                          : "bg-emerald-500 text-white hover:bg-emerald-600 shadow-xs"
                      }`}
                    >
                      {isUpdatingSettlement
                        ? "Updating..."
                        : selectedPayment.isSettled
                        ? "Mark as Unsettled"
                        : "Mark as Settled"}
                    </button>
                  </div>
                )}
              </div>

              {/* Share Breakdown */}
              <div>
                <p className="text-sm font-bold text-slate-800 mb-3">
                  Share Breakdown ({selectedPayment.type === "UTILITY" ? "Utility Shares" : selectedPayment.type === "BOND" ? "Bond Shares" : "Rent Shares"})
                </p>
                <div className="space-y-2">
                  {calculateShares(selectedPayment).breakdown.map((share, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 uppercase">
                          {share.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-700">{share.name}</p>
                          <p className="text-xs font-medium text-slate-400">{share.parts} part(s)</p>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-slate-800">
                        ${share.amount.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Receipt Footer Info */}
              <div className="pt-2 text-center text-[10px] text-slate-400 font-medium">
                RentTracker • Shared Receipt Breakdown
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
