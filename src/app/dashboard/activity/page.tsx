import { Wallet, ChevronLeft, ArrowDownRight } from "lucide-react";
import Link from "next/link";
import { getAllPayments } from "@/actions/paymentActions";

export default async function ActivityPage() {
  const payments = await getAllPayments();

  return (
    <div className="max-w-3xl mx-auto min-h-screen md:min-h-0 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex items-center gap-4 p-4 mb-4 md:px-0">
        <Link 
          href="/dashboard"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-500 hover:bg-violet-50 hover:text-violet-600 transition-colors shadow-sm"
        >
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold text-slate-800">All Activity</h1>
      </div>

      {/* Activity Timeline */}
      <div className="px-4 md:px-0 pb-8 space-y-3">
        {payments.length > 0 ? (
          payments.map((p: any) => (
            <div key={p._id} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-slate-100/60 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-emerald-50 text-emerald-500">
                  <ArrowDownRight size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Payment — ${p.paidAmount.toLocaleString()}</h4>
                  <p className="text-xs font-medium text-slate-400">
                    {p.rentAgreementId?.address || "Rent Agreement"} · Paid {new Date(p.paidDate).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full">{p.status}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100/60">
            <Wallet size={48} className="mx-auto text-slate-200 mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">No activity yet</h3>
            <p className="text-slate-400 font-medium">Payments will appear here once you log them.</p>
          </div>
        )}
      </div>

    </div>
  );
}
