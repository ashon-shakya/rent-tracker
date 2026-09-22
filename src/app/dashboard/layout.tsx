import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DesktopNavigation, MobileNavigation } from "@/components/Navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  // Get first letter of name or email for avatar
  const initial = session?.user?.name?.[0] || session?.user?.email?.[0] || "U";

  return (
    <div className="min-h-screen bg-[#f3f4f9] text-slate-900 pb-20 md:pb-0 md:pl-64">
      <DesktopNavigation initial={initial} />

      {/* Main Content Area */}
      <main className="max-w-3xl mx-auto md:mx-0 md:max-w-7xl p-4 md:p-8">
        {children}
      </main>

      <MobileNavigation />
    </div>
  );
}
