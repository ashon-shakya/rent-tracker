"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Users, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { getUserIcon } from "./UserIcon";
import { useSidebar } from "./SidebarContext";

export function DesktopNavigation({ initial, userIcon }: { initial: string; userIcon?: string }) {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <aside
      className={`hidden md:flex flex-col fixed inset-y-0 left-0 bg-white border-r border-violet-50 py-6 z-20 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20 px-3" : "w-64 px-4"
      }`}
    >
      {/* Sidebar Header */}
      <div className="relative mb-8">
        <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between px-2"}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-violet-500 flex items-center justify-center text-white font-bold text-xl uppercase shadow-sm shadow-violet-200 shrink-0"
              title={isCollapsed ? "RentTracker" : undefined}
            >
              {userIcon ? getUserIcon(userIcon, 20) : initial}
            </div>
            {!isCollapsed && (
              <span className="text-xl font-bold text-slate-800 whitespace-nowrap transition-opacity duration-200">
                RentTracker
              </span>
            )}
          </div>
          {!isCollapsed && (
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-xl text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"
              title="Collapse sidebar"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft size={20} />
            </button>
          )}
        </div>

        {isCollapsed && (
          <div className="flex justify-center mt-3">
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-xl text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"
              title="Expand sidebar"
              aria-label="Expand sidebar"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 space-y-1.5">
        <NavItem
          href="/dashboard"
          icon={<Home size={20} />}
          label="Home"
          active={pathname === "/dashboard"}
          isCollapsed={isCollapsed}
        />
        <NavItem
          href="/dashboard/rents"
          icon={<FileText size={20} />}
          label="Agreements"
          active={pathname.startsWith("/dashboard/rents")}
          isCollapsed={isCollapsed}
        />
        <NavItem
          href="/dashboard/tenants"
          icon={<Users size={20} />}
          label="Tenants"
          active={pathname.startsWith("/dashboard/tenants")}
          isCollapsed={isCollapsed}
        />
        <NavItem
          href="/dashboard/settings"
          icon={<Settings size={20} />}
          label="Settings"
          active={pathname.startsWith("/dashboard/settings")}
          isCollapsed={isCollapsed}
        />
      </nav>

      {/* Footer / Sign Out */}
      <div className="mt-auto">
        <Link
          href="/api/auth/signout"
          title={isCollapsed ? "Sign Out" : undefined}
          className={`flex items-center ${
            isCollapsed ? "justify-center px-0 py-3" : "gap-3 px-4 py-3"
          } rounded-2xl transition-colors text-rose-400 hover:bg-rose-50 hover:text-rose-500 font-medium`}
        >
          <div className="shrink-0 flex items-center justify-center">
            <LogOut size={20} />
          </div>
          {!isCollapsed && <span className="whitespace-nowrap">Sign Out</span>}
        </Link>
      </div>
    </aside>
  );
}

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur-lg border-t border-violet-50 flex items-center justify-around h-16 px-2 z-50 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
      <MobileNavItem href="/dashboard" icon={<Home size={22} />} active={pathname === "/dashboard"} title="Home" />
      <MobileNavItem href="/dashboard/rents" icon={<FileText size={22} />} active={pathname.startsWith("/dashboard/rents")} title="Agreements" />
      <MobileNavItem href="/dashboard/tenants" icon={<Users size={22} />} active={pathname.startsWith("/dashboard/tenants")} title="Tenants" />
      <MobileNavItem href="/dashboard/settings" icon={<Settings size={22} />} active={pathname.startsWith("/dashboard/settings")} title="Settings" />
      <MobileNavItem href="/api/auth/signout" icon={<LogOut size={22} />} isSignOut title="Sign Out" />
    </nav>
  );
}

function NavItem({
  href,
  icon,
  label,
  active,
  isCollapsed,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  isCollapsed?: boolean;
}) {
  return (
    <Link
      href={href}
      title={isCollapsed ? label : undefined}
      className={`flex items-center ${
        isCollapsed ? "justify-center px-0 py-3" : "gap-3 px-4 py-3"
      } rounded-2xl transition-all duration-200 ${
        active
          ? "bg-violet-100 text-violet-700 font-semibold"
          : "text-slate-400 hover:bg-violet-50 hover:text-slate-700"
      }`}
    >
      <div className="shrink-0 flex items-center justify-center">{icon}</div>
      {!isCollapsed && <span className="font-medium whitespace-nowrap">{label}</span>}
    </Link>
  );
}

function MobileNavItem({
  href,
  icon,
  active,
  isSignOut,
  title,
}: {
  href: string;
  icon: React.ReactNode;
  active?: boolean;
  isSignOut?: boolean;
  title?: string;
}) {
  return (
    <Link
      href={href}
      title={title}
      aria-label={title}
      className={`flex flex-col items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 ${
        isSignOut
          ? "text-rose-400 hover:bg-rose-50 hover:text-rose-500"
          : active
          ? "bg-violet-100 text-violet-600"
          : "text-slate-400 hover:bg-violet-50 hover:text-slate-700"
      }`}
    >
      {icon}
    </Link>
  );
}
