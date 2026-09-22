"use client";

import { ArrowLeft, CreditCard } from "lucide-react";
import Link from "next/link";
import { logPayment } from "@/actions/paymentActions";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { use } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      disabled={pending}
      className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 shadow-sm flex items-center gap-2"
    >
      <CreditCard size={18} />
      {pending ? "Logging..." : "Log Payment"}
    </Button>
  );
}

export default function LogPaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const rentAgreementId = resolvedParams.id;
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="animate-in fade-in duration-500 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href={`/dashboard/rents/${rentAgreementId}`}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Log Payment</h1>
          <p className="text-slate-500 font-medium">Record a rent payment</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-50 p-6 md:p-10">
        <form action={logPayment} className="space-y-6">
          <input type="hidden" name="rentAgreementId" value={rentAgreementId} />
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Amount Paid</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-slate-400 font-bold">$</span>
              <input 
                required
                name="paidAmount"
                type="number" 
                min="0"
                step="0.01"
                placeholder="750.00"
                className="w-full bg-slate-50 border-none rounded-xl pl-8 pr-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Period Start Date</label>
              <input 
                required
                name="periodStartDate"
                type="date" 
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Period End Date</label>
              <input 
                required
                name="periodEndDate"
                type="date" 
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Due Date</label>
              <input 
                required
                name="dueDate"
                type="date"
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Date Paid</label>
              <input 
                required
                name="paidDate"
                type="date"
                defaultValue={today}
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
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
