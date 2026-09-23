"use client";

import { ArrowLeft, CreditCard, Zap } from "lucide-react";
import Link from "next/link";
import { logPayment } from "@/actions/paymentActions";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getUtilityIcon } from "@/components/UtilityIcon";
import { UtilityData } from "../UtilityList";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="bg-violet-500 hover:bg-violet-600 text-white rounded-xl px-8 shadow-sm shadow-violet-200 flex items-center gap-2"
    >
      <CreditCard size={18} />
      {pending ? "Logging..." : "Log Payment"}
    </Button>
  );
}

interface TenantData {
  _id: string;
  name: string;
}

interface PaymentFormProps {
  rentAgreementId: string;
  defaultPeriodStartDate: string;
  defaultPeriodEndDate: string;
  defaultDueDate: string;
  defaultPaidDate: string;
  defaultAmount: number;
  bondAmount: number;
  tenants: TenantData[];
  adminName: string;
  utilities?: UtilityData[];
  utilityLastPayments?: Record<string, { periodEndDate?: string }>;
}

function computeUtilityDates(
  utility: UtilityData,
  lastPaymentEndDate?: string
): { startDate: string; endDate: string } {
  let start: Date;
  if (lastPaymentEndDate) {
    start = new Date(lastPaymentEndDate);
    start.setDate(start.getDate() + 1);
  } else if (utility?.startDate) {
    start = new Date(utility.startDate);
  } else {
    start = new Date();
  }

  const end = new Date(start);
  const period = utility?.billingPeriod || "monthly";

  switch (period) {
    case "weekly":
      end.setDate(end.getDate() + 6);
      break;
    case "fortnightly":
      end.setDate(end.getDate() + 13);
      break;
    case "monthly":
      end.setMonth(end.getMonth() + 1);
      end.setDate(end.getDate() - 1);
      break;
    case "quarterly":
      end.setMonth(end.getMonth() + 3);
      end.setDate(end.getDate() - 1);
      break;
    case "annually":
      end.setFullYear(end.getFullYear() + 1);
      end.setDate(end.getDate() - 1);
      break;
    default:
      end.setMonth(end.getMonth() + 1);
      end.setDate(end.getDate() - 1);
      break;
  }

  return {
    startDate: start.toISOString().split("T")[0],
    endDate: end.toISOString().split("T")[0],
  };
}

export default function PaymentForm({
  rentAgreementId,
  defaultPeriodStartDate,
  defaultPeriodEndDate,
  defaultDueDate,
  defaultPaidDate,
  defaultAmount,
  bondAmount,
  tenants,
  adminName,
  utilities = [],
  utilityLastPayments = {},
}: PaymentFormProps) {
  const [paymentType, setPaymentType] = useState<"RENT" | "BOND" | "UTILITY">("RENT");
  const [selectedUtilityId, setSelectedUtilityId] = useState<string>(
    utilities.length > 0 ? utilities[0]._id : ""
  );

  const [periodStartDate, setPeriodStartDate] = useState(defaultPeriodStartDate);
  const [periodEndDate, setPeriodEndDate] = useState(defaultPeriodEndDate);
  const [paidAmount, setPaidAmount] = useState<number | string>(defaultAmount);

  const handleTypeChange = (type: "RENT" | "BOND" | "UTILITY") => {
    setPaymentType(type);
    if (type === "RENT") {
      setPeriodStartDate(defaultPeriodStartDate);
      setPeriodEndDate(defaultPeriodEndDate);
      setPaidAmount(defaultAmount);
    } else if (type === "BOND") {
      setPaidAmount(bondAmount);
    } else if (type === "UTILITY" && utilities.length > 0) {
      const activeUtil = utilities.find((u) => u._id === selectedUtilityId) || utilities[0];
      if (activeUtil) {
        setSelectedUtilityId(activeUtil._id);
        const lastPay = utilityLastPayments[activeUtil._id];
        const computed = computeUtilityDates(activeUtil, lastPay?.periodEndDate);
        setPeriodStartDate(computed.startDate);
        setPeriodEndDate(computed.endDate);
        setPaidAmount(activeUtil.amount !== undefined && activeUtil.amount !== null ? activeUtil.amount : "");
      }
    }
  };

  const handleUtilityChange = (utilityId: string) => {
    setSelectedUtilityId(utilityId);
    const activeUtil = utilities.find((u) => u._id === utilityId);
    if (activeUtil) {
      const lastPay = utilityLastPayments[utilityId];
      const computed = computeUtilityDates(activeUtil, lastPay?.periodEndDate);
      setPeriodStartDate(computed.startDate);
      setPeriodEndDate(computed.endDate);
      setPaidAmount(activeUtil.amount !== undefined && activeUtil.amount !== null ? activeUtil.amount : "");
    }
  };

  const selectedUtility = utilities.find((u) => u._id === selectedUtilityId);

  return (
    <div className="animate-in fade-in duration-500 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href={`/dashboard/rents/${rentAgreementId}`}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-500 hover:bg-violet-50 hover:text-violet-600 transition-colors shadow-sm"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Log Payment</h1>
          <p className="text-slate-400 font-medium">Record a rent, bond, or utility payment</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100/60 p-6 md:p-10">
        <form action={logPayment} className="space-y-6">
          <input type="hidden" name="rentAgreementId" value={rentAgreementId} />
          <input type="hidden" name="type" value={paymentType} />
          {paymentType === "UTILITY" && (
            <>
              <input type="hidden" name="utilityId" value={selectedUtilityId} />
              <input type="hidden" name="utilityTitle" value={selectedUtility?.title || ""} />
              <input type="hidden" name="utilityCategory" value={selectedUtility?.category || ""} />
              <input type="hidden" name="utilityIcon" value={selectedUtility?.icon || ""} />
            </>
          )}

          {/* Payment Type Toggle */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600">Payment Type</label>
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => handleTypeChange("RENT")}
                className={`flex-1 py-3 rounded-xl font-medium transition-all text-sm ${
                  paymentType === "RENT"
                    ? "bg-violet-100 text-violet-700 ring-2 ring-violet-300"
                    : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                }`}
              >
                Rent Payment
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange("BOND")}
                className={`flex-1 py-3 rounded-xl font-medium transition-all text-sm ${
                  paymentType === "BOND"
                    ? "bg-sky-100 text-sky-700 ring-2 ring-sky-300"
                    : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                }`}
              >
                Bond Payment
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange("UTILITY")}
                className={`flex-1 py-3 rounded-xl font-medium transition-all text-sm flex items-center justify-center gap-1.5 ${
                  paymentType === "UTILITY"
                    ? "bg-amber-100 text-amber-700 ring-2 ring-amber-300"
                    : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                }`}
              >
                <Zap size={16} /> Utility
              </button>
            </div>
          </div>

          {/* Utility Selector (when UTILITY type selected) */}
          {paymentType === "UTILITY" && (
            <div className="space-y-2 bg-amber-50/50 p-4 rounded-2xl border border-amber-100/80">
              <label className="text-sm font-bold text-amber-900">Select Utility *</label>
              {utilities.length === 0 ? (
                <div className="text-xs text-amber-700 font-medium">
                  No utilities added to this agreement yet. Please add utilities in the agreement details page first.
                </div>
              ) : (
                <div className="space-y-3">
                  <select
                    value={selectedUtilityId}
                    onChange={(e) => handleUtilityChange(e.target.value)}
                    className="w-full bg-white border border-amber-200 rounded-xl px-4 py-3 text-slate-800 font-medium focus:ring-2 focus:ring-amber-400 outline-none transition-all cursor-pointer"
                  >
                    {utilities.map((u) => (
                      <option key={u._id} value={u._id}>
                        {u.title} ({u.category} - {u.billingPeriod})
                      </option>
                    ))}
                  </select>

                  {selectedUtility && (
                    <div className="flex items-center gap-3 text-xs text-amber-800 bg-white/80 px-3 py-2 rounded-xl border border-amber-100">
                      <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        {getUtilityIcon(selectedUtility.icon, 16)}
                      </div>
                      <div>
                        <span className="font-bold">{selectedUtility.title}</span> • Billing cycle:{" "}
                        <span className="font-semibold capitalize">{selectedUtility.billingPeriod}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Amount Paid Field */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600">Amount Paid ($)</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-slate-300 font-bold">$</span>
              <input
                required
                name="paidAmount"
                type="number"
                min="0"
                step="0.01"
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-xl pl-8 pr-4 py-3 text-slate-800 focus:ring-2 focus:ring-violet-400 outline-none transition-all"
              />
            </div>
          </div>

          {/* Paid By Field */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600">Paid By</label>
            <select
              required
              name="paidBy"
              className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-violet-400 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value={adminName}>{adminName} (You)</option>
              {tenants.map((t) => (
                <option key={t._id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(paymentType === "RENT" || paymentType === "UTILITY") && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600">Period Start Date</label>
                  <input
                    required
                    name="periodStartDate"
                    type="date"
                    value={periodStartDate}
                    onChange={(e) => setPeriodStartDate(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-violet-400 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600">Period End Date</label>
                  <input
                    required
                    name="periodEndDate"
                    type="date"
                    value={periodEndDate}
                    onChange={(e) => setPeriodEndDate(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-violet-400 outline-none transition-all"
                  />
                </div>

                {paymentType === "RENT" && (
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600">Due Date</label>
                    <input
                      required
                      name="dueDate"
                      type="date"
                      defaultValue={defaultDueDate}
                      className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-violet-400 outline-none transition-all"
                    />
                  </div>
                )}
              </>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-600">Date Paid</label>
              <input
                required
                name="paidDate"
                type="date"
                defaultValue={defaultPaidDate}
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-violet-400 outline-none transition-all"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
