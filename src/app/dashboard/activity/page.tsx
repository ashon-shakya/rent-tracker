"use client";

import { Wallet, ChevronLeft, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ActivityPage() {
  const router = useRouter();

  return (
    <div className="max-w-2xl mx-auto min-h-screen md:min-h-0 bg-white md:bg-transparent animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex items-center gap-4 p-4 mb-4">
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f3f4f9] text-slate-700 hover:bg-slate-200 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-900">All Activity</h1>
      </div>

      {/* Activity Timeline */}
      <div className="px-4 pb-8 space-y-6">
        
        <div>
          <h2 className="text-sm font-bold text-slate-500 mb-4 px-2">July 2026</h2>
          <div className="bg-[#f3f4f9] rounded-3xl p-2 space-y-2 border border-slate-50">
            <ActivityRow 
              title="Rent paid by Jane Doe" 
              subtitle="24 Jul 2026, 10:00 AM" 
              amount="+$450.00"
              type="received"
            />
            <ActivityRow 
              title="You paid rent" 
              subtitle="17 Jul 2026, 09:30 AM" 
              amount="-$450.00"
              type="sent"
            />
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold text-slate-500 mb-4 px-2">June 2026</h2>
          <div className="bg-[#f3f4f9] rounded-3xl p-2 space-y-2 border border-slate-50">
            <ActivityRow 
              title="Rent paid by Jane Doe" 
              subtitle="24 Jun 2026, 11:15 AM" 
              amount="+$450.00"
              type="received"
            />
            <ActivityRow 
              title="You paid rent" 
              subtitle="17 Jun 2026, 08:20 AM" 
              amount="-$450.00"
              type="sent"
            />
          </div>
        </div>

      </div>

    </div>
  );
}

function ActivityRow({ title, subtitle, amount, type }: { title: string, subtitle: string, amount: string, type: 'sent' | 'received' }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-slate-50 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          type === 'received' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
        }`}>
          {type === 'received' ? <ArrowDownRight size={20} /> : <ArrowUpRight size={20} />}
        </div>
        <div>
          <h4 className="font-bold text-slate-900">{title}</h4>
          <p className="text-xs font-medium text-slate-500">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`font-bold ${type === 'received' ? 'text-green-600' : 'text-slate-900'}`}>
          {amount}
        </span>
      </div>
    </div>
  );
}
