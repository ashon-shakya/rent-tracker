"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Users, Settings, LogOut } from "lucide-react";

export function DesktopNavigation({ initial }: { initial: string }) {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 fixed inset-y-0 left-0 bg-white border-r border-slate-100 px-4 py-6 z-10 shadow-sm">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl uppercase">
          {initial}
        </div>
        <span className="text-xl font-bold">RentTracker</span>
      </div>
      <nav className="flex-1 space-y-2">
        <NavItem href="/dashboard" icon={<Home />} label="Home" active={pathname === "/dashboard"} />
        <NavItem href="/dashboard/rents" icon={<FileText />} label="Agreements" active={pathname.startsWith("/dashboard/rents")} />
        <NavItem href="/dashboard/tenants" icon={<Users />} label="Tenants" active={pathname.startsWith("/dashboard/tenants")} />
        <NavItem href="/dashboard/settings" icon={<Settings />} label="Settings" active={pathname.startsWith("/dashboard/settings")} />
      </nav>
      
      <div className="mt-auto">
        <a href="/api/auth/signout" className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors text-red-500 hover:bg-red-50 font-medium">
          <LogOut />
          <span>Sign Out</span>
        </a>
      </div>
    </aside>
  );
}

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-100 flex items-center justify-around h-16 px-4 z-50 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <MobileNavItem href="/dashboard" icon={<Home size={24} />} active={pathname === "/dashboard"} />
      <MobileNavItem href="/dashboard/rents" icon={<FileText size={24} />} active={pathname.startsWith("/dashboard/rents")} />
      <MobileNavItem href="/dashboard/tenants" icon={<Users size={24} />} active={pathname.startsWith("/dashboard/tenants")} />
      <MobileNavItem href="/dashboard/settings" icon={<Settings size={24} />} active={pathname.startsWith("/dashboard/settings")} />
    </nav>
  );
}

function NavItem({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors ${
        active
          ? "bg-blue-600 text-white shadow-md shadow-blue-200"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
}

function MobileNavItem({ href, icon, active }: { href: string; icon: React.ReactNode; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-colors ${
        active ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "text-slate-400"
      }`}
    >
      {icon}
    </Link>
  );
}
