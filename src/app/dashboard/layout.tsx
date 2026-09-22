import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DesktopNavigation, MobileNavigation } from "@/components/Navigation";
import { getUserProfile } from "@/actions/userActions";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const userProfile = await getUserProfile();
  const initial = session?.user?.name?.[0] || session?.user?.email?.[0] || "U";
  const userIcon = userProfile?.icon || "";

  return (
    <div className="min-h-screen bg-[#f8f7fc] text-slate-800 pb-20 md:pb-0 md:pl-64">
      <DesktopNavigation initial={initial} userIcon={userIcon} />

      {/* Main Content Area */}
      <main className="mx-auto md:mx-0 p-4 md:p-8">
        {children}
      </main>

      <MobileNavigation />
    </div>
  );
}
