import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./mongodb";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // This is a placeholder for standard credentials login.
        // If we want to implement real email/password login, we need to query
        // the Mongoose User model and verify the password here.
        if (credentials?.email === "test@example.com" && credentials?.password === "password") {
          return { id: "1", name: "Test User", email: "test@example.com" };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt", // Use JWT since CredentialsProvider requires it
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user }) {
      if (user.email && !user.email.toLowerCase().endsWith('@gmail.com')) {
        // Reject login if it's not a gmail address
        return '/login?error=GmailRequired';
      }
      return true;
    },
    async session({ session, token }) {
      if (session?.user) {
        // Add the user ID to the session from the JWT token
        (session.user as any).id = token.sub;
      }
      return session;
    }
  }
};
