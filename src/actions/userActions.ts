"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

export async function getUserProfile() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  await dbConnect();
  const user = await User.findOne({ email: session.user.email }).lean();
  return user ? JSON.parse(JSON.stringify(user)) : null;
}

export async function updateUserProfile(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Unauthorized");

  await dbConnect();

  const name = formData.get("name") as string;
  const icon = formData.get("icon") as string;

  await User.findOneAndUpdate(
    { email: session.user.email },
    { $set: { name, icon } }
  );

  revalidatePath("/dashboard/settings");
  revalidatePath("/dashboard");
}
