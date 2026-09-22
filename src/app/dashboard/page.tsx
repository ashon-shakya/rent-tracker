import { Bell, Plus, Home, PieChart, Wallet, Calendar, ChevronRight, User, Activity } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getRentAgreements } from "@/actions/rentActions";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const initial = session?.user?.name?.[0] || session?.user?.email?.[0] || "U";
  const name = session?.user?.name || "User";
  const rents = await getRentAgreements();
  const totalRents = rents.length;
  const totalBond = rents.reduce((sum: number, rent: any) => sum + rent.bondAmount, 0);
  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-500">
      
      {/* Header Profile Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-sm border-2 border-white bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl uppercase">
            {initial}
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">{name}</h1>
            <p className="text-sm text-slate-500 font-medium">Tenant</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm text-slate-700 hover:text-blue-600 transition-colors">
            <Plus size={20} strokeWidth={2.5} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm text-slate-700 hover:text-blue-600 transition-colors relative">
            <Bell size={20} strokeWidth={2.5} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
        </div>
      </div>

      {/* Rent Summary Grid */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4">Rent Summary</h2>
        <div className="grid grid-cols-2 gap-4">
          <SummaryCard 
            icon={<Home className="text-blue-600" size={24} />}
            label="Active Leases"
            value={totalRents.toString().padStart(2, '0')}
          />
          <SummaryCard 
            icon={<Wallet className="text-blue-600" size={24} />}
            label="Total Bond"
            value={`$${totalBond.toLocaleString()}`}
          />
          <SummaryCard 
            icon={<PieChart className="text-blue-600" size={24} />}
            label="My Share"
            value="--"
            subtext="/ week"
          />
          <SummaryCard 
            icon={<Calendar className="text-blue-600" size={24} />}
            label="Next Due"
            value="--"
          />
        </div>
      </div>

      {/* Payment History Chart (Mockup) */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900">Payment History</h2>
          <span className="text-sm font-medium text-slate-500 bg-slate-50 px-3 py-1 rounded-full">Monthly</span>
        </div>
        
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Activity className="text-slate-200 mb-2" size={32} />
          <p className="text-sm font-medium text-slate-400">No payment history yet.</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
          <Link href="/dashboard/activity" className="text-sm font-semibold text-slate-500 hover:text-blue-600">
            View all &gt;
          </Link>
        </div>
        <div className="bg-white rounded-[2rem] shadow-sm p-2 flex flex-col gap-2">
          <div className="text-center py-6 px-4">
            <p className="text-sm font-medium text-slate-400">No recent activity to show.</p>
          </div>
        </div>
      </div>

    </div>
  );
}

function SummaryCard({ icon, label, value, subtext }: { icon: React.ReactNode, label: string, value: string, subtext?: string }) {
  return (
    <div className="bg-white p-5 rounded-[2rem] shadow-sm flex flex-col items-center justify-center text-center gap-2 border border-slate-50 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-1">
        {icon}
      </div>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <div className="flex items-baseline gap-1">
        <h3 className="text-2xl font-black text-slate-900">{value}</h3>
        {subtext && <span className="text-sm font-medium text-slate-400">{subtext}</span>}
      </div>
    </div>
  );
}

function ActivityItem({ title, subtitle, amount }: { title: string, subtitle: string, amount: string }) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
          <Wallet size={20} />
        </div>
        <div>
          <h4 className="font-bold text-slate-900">{title}</h4>
          <p className="text-xs font-medium text-slate-500">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`font-bold ${amount.startsWith('+') ? 'text-green-500' : 'text-slate-900'}`}>
          {amount}
        </span>
        <ChevronRight size={18} className="text-slate-400" />
      </div>
    </div>
  );
}
