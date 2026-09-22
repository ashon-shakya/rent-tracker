"use client";

import { ArrowLeft, CreditCard } from "lucide-react";
import Link from "next/link";
import { logPayment } from "@/actions/paymentActions";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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

interface PaymentFormProps {
  rentAgreementId: string;
  defaultPeriodStartDate: string;
  defaultPeriodEndDate: string;
  defaultDueDate: string;
  defaultPaidDate: string;
  defaultAmount: number;
  bondAmount: number;
  tenants: any[];
  adminName: string;
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
}: PaymentFormProps) {
  const [paymentType, setPaymentType] = useState<"RENT" | "BOND">("RENT");

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
          <p className="text-slate-400 font-medium">Record a rent payment</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100/60 p-6 md:p-10">
        <form action={logPayment} className="space-y-6">
          <input type="hidden" name="rentAgreementId" value={rentAgreementId} />
          <input type="hidden" name="type" value={paymentType} />

          {/* Payment Type Toggle */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600">Payment Type</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setPaymentType("RENT")}
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
                onClick={() => setPaymentType("BOND")}
                className={`flex-1 py-3 rounded-xl font-medium transition-all text-sm ${
                  paymentType === "BOND"
                    ? "bg-sky-100 text-sky-700 ring-2 ring-sky-300"
                    : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                }`}
              >
                Bond Payment
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600">Amount Paid</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-slate-300 font-bold">$</span>
              <input 
                required
                name="paidAmount"
                type="number" 
                min="0"
                step="0.01"
                defaultValue={paymentType === "BOND" ? bondAmount : defaultAmount}
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
                <option key={t._id} value={t.name}>{t.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paymentType === "RENT" && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600">Period Start Date</label>
                  <input 
                    required
                    name="periodStartDate"
                    type="date"
                    defaultValue={defaultPeriodStartDate}
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-violet-400 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600">Period End Date</label>
                  <input 
                    required
                    name="periodEndDate"
                    type="date"
                    defaultValue={defaultPeriodEndDate}
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-violet-400 outline-none transition-all"
                  />
                </div>

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
