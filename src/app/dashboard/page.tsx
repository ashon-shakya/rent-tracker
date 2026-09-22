import { Bell, Plus, Home, PieChart, Wallet, Calendar, ChevronRight, User, Activity } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getRentAgreements } from "@/actions/rentActions";
import { getAllPayments } from "@/actions/paymentActions";
import { getUserProfile } from "@/actions/userActions";
import { getTenantsByUserEmail } from "@/actions/tenantActions";
import PaymentChart from "@/components/PaymentChart";
import { getUserIcon } from "@/components/UserIcon";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const initial = session?.user?.name?.[0] || session?.user?.email?.[0] || "U";
  const name = session?.user?.name || "User";
  const userEmail = session?.user?.email || "";

  const rents = await getRentAgreements();
  const allPayments = await getAllPayments();
  const myTenancies = await getTenantsByUserEmail(userEmail);
  const userProfile = await getUserProfile();
  
  const totalRents = rents.length;
  const totalBond = rents.reduce((sum: number, rent: any) => sum + rent.bondAmount, 0);

  // Calculate my share
  let myShareStr = "--";
  if (rents.length > 0) {
      const totalMyShare = rents.reduce((sum: number, rent: any) => sum + rent.rentAmount, 0);
      myShareStr = `$${totalMyShare.toLocaleString()}`;
  }

  // Calculate next due date from payments
  let nextDueStr = "--";
  const rentPayments = allPayments.filter((p: any) => p.type === 'RENT' || !p.type);
  if (rentPayments.length > 0) {
      const latestPayment = rentPayments[0]; 
      const nextDue = new Date(latestPayment.periodEndDate);
      nextDue.setDate(nextDue.getDate() + 1);
      nextDueStr = nextDue.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  } else if (rents.length > 0) {
      const firstRent = new Date(rents[0].startDate);
      nextDueStr = firstRent.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  }

  // Process data for the chart (last 6 months ideally, but we'll just group by month string)
  const chartDataMap: Record<string, { rent: number, bond: number }> = {};
  [...allPayments].reverse().forEach((p: any) => {
    const d = new Date(p.paidDate);
    const month = d.toLocaleDateString('en-GB', { month: 'short' });
    if (!chartDataMap[month]) chartDataMap[month] = { rent: 0, bond: 0 };
    if (p.type === 'BOND') {
      chartDataMap[month].bond += p.paidAmount;
    } else {
      chartDataMap[month].rent += p.paidAmount;
    }
  });
  const chartData = Object.keys(chartDataMap).map(month => ({
    month,
    rent: chartDataMap[month].rent,
    bond: chartDataMap[month].bond,
  }));


  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-500 max-w-6xl">
      
      {/* Header Profile Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-sm border-2 border-white bg-violet-100 flex items-center justify-center text-violet-600 font-bold text-2xl uppercase">
            {userProfile?.icon ? getUserIcon(userProfile.icon, 28) : initial}
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Welcome, {name}</h1>
            <p className="text-sm text-slate-400 font-medium">Tenant</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/rents/new" className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm text-slate-500 hover:text-violet-600 transition-colors">
            <Plus size={20} strokeWidth={2.5} />
          </Link>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm text-slate-500 hover:text-violet-600 transition-colors relative">
            <Bell size={20} strokeWidth={2.5} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-400 rounded-full border border-white"></span>
          </button>
        </div>
      </div>

      {/* Rent Summary Grid */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-4">Rent Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SummaryCard 
            icon={<Home className="text-violet-500" size={22} />}
            label="Active Leases"
            value={totalRents.toString().padStart(2, '0')}
            bgColor="bg-violet-50"
          />
          <SummaryCard 
            icon={<Wallet className="text-sky-500" size={22} />}
            label="Total Bond"
            value={`$${totalBond.toLocaleString()}`}
            bgColor="bg-sky-50"
          />
          <SummaryCard 
            icon={<PieChart className="text-rose-400" size={22} />}
            label="My Share"
            value={myShareStr}
            subtext="/ cycle"
            bgColor="bg-rose-50"
          />
          <SummaryCard 
            icon={<Calendar className="text-amber-500" size={22} />}
            label="Next Due"
            value={nextDueStr}
            bgColor="bg-amber-50"
          />
        </div>
      </div>

      {/* Payment History Chart */}
      <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100/60">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-800">Payment History</h2>
          <span className="text-sm font-medium text-slate-400 bg-slate-50 px-3 py-1 rounded-full">Monthly</span>
        </div>
        
        <PaymentChart data={chartData} />
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
          <Link href="/dashboard/activity" className="text-sm font-semibold text-violet-500 hover:text-violet-600 transition-colors">
            View all &gt;
          </Link>
        </div>
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100/60 p-2 flex flex-col gap-2">
          {allPayments.length > 0 ? (
            allPayments.slice(0, 3).map((p: any) => (
              <Link key={p._id} href={`/dashboard/rents/${p.rentAgreementId?._id || p.rentAgreementId}`}>
                <ActivityItem 
                  title={`${p.type || 'RENT'} Payment`} 
                  subtitle={`${p.rentAgreementId?.address || 'Rent Agreement'} • Paid ${new Date(p.paidDate).toLocaleDateString('en-GB')}`}
                  amount={`+$${p.paidAmount.toLocaleString()}`} 
                />
              </Link>
            ))
          ) : (
            <div className="text-center py-8 px-4">
              <p className="text-sm font-medium text-slate-400">No recent activity to show.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

function SummaryCard({ icon, label, value, subtext, bgColor }: { icon: React.ReactNode, label: string, value: string, subtext?: string, bgColor?: string }) {
  return (
    <div className="bg-white p-5 rounded-[1.5rem] shadow-sm flex flex-col items-center justify-center text-center gap-2 border border-slate-100/60 hover:shadow-md transition-shadow">
      <div className={`w-11 h-11 rounded-xl ${bgColor || 'bg-violet-50'} flex items-center justify-center mb-1`}>
        {icon}
      </div>
      <p className="text-sm font-medium text-slate-400">{label}</p>
      <div className="flex items-baseline gap-1">
        <h3 className="text-2xl font-black text-slate-800">{value}</h3>
        {subtext && <span className="text-sm font-medium text-slate-300">{subtext}</span>}
      </div>
    </div>
  );
}

function ActivityItem({ title, subtitle, amount }: { title: string, subtitle: string, amount: string }) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-violet-50/50 rounded-2xl transition-colors cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-100 transition-colors">
          <Wallet size={20} />
        </div>
        <div>
          <h4 className="font-bold text-slate-800">{title}</h4>
          <p className="text-xs font-medium text-slate-400">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`font-bold ${amount.startsWith('+') ? 'text-emerald-500' : 'text-slate-800'}`}>
          {amount}
        </span>
        <ChevronRight size={18} className="text-slate-300" />
      </div>
    </div>
  );
}
