import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserProfile } from "@/actions/userActions";
import { SidebarProvider } from "@/components/SidebarContext";
import { DashboardShell } from "@/components/DashboardShell";

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
    <SidebarProvider>
      <DashboardShell initial={initial} userIcon={userIcon}>
        {children}
      </DashboardShell>
    </SidebarProvider>
  );
}
