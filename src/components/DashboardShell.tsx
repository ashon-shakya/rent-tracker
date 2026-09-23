"use client";

import React from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { DesktopNavigation, MobileNavigation } from "./Navigation";
import { useSidebar } from "./SidebarContext";
import { getUserIcon } from "./UserIcon";

export function DashboardShell({
  children,
  initial,
  userIcon,
}: {
  children: React.ReactNode;
  initial: string;
  userIcon?: string;
}) {
  const { isCollapsed } = useSidebar();

  return (
    <div
      className={`min-h-screen bg-[#f8f7fc] text-slate-800 pb-20 md:pb-0 transition-all duration-300 ease-in-out ${
        isCollapsed ? "md:pl-20" : "md:pl-64"
      }`}
    >
      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-violet-50 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-400 to-violet-500 flex items-center justify-center text-white font-bold text-lg uppercase shadow-sm shadow-violet-200 shrink-0">
            {userIcon ? getUserIcon(userIcon, 18) : initial}
          </div>
          <span className="text-lg font-bold text-slate-800">RentTracker</span>
        </div>
        <Link
          href="/api/auth/signout"
          title="Sign Out"
          aria-label="Sign Out"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-100 text-xs font-semibold transition-colors"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </Link>
      </header>

      <DesktopNavigation initial={initial} userIcon={userIcon} />

      {/* Main Content Area */}
      <main className="mx-auto md:mx-0 p-4 md:p-8">
        {children}
      </main>

      <MobileNavigation />
    </div>
  );
}
