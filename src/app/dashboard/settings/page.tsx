import { getUserProfile } from "@/actions/userActions";
import SettingsForm from "./SettingsForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return null; // Or handle unauthorized
  }

  const userProfile = await getUserProfile();
  
  const initial = session.user.name?.[0] || session.user.email[0] || "U";
  
  return (
    <SettingsForm 
      name={userProfile?.name || session.user.name || ""} 
      email={session.user.email} 
      initial={initial}
      icon={userProfile?.icon || ""}
    />
  );
}
