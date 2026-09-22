"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = () => {
    setLoading(true);
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-[#f3f4f9] flex flex-col items-center justify-center p-4 selection:bg-blue-100">
      
      <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium">
        <ArrowLeft size={20} /> Back to Home
      </Link>

      <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-2xl shadow-sm">
            R
          </div>
          <span className="text-2xl font-bold text-slate-900">RentTracker</span>
        </div>

        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 p-8 md:p-10 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h1>
            <p className="text-slate-500 font-medium">Sign in to manage your rent and roommates.</p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 py-3.5 px-4 rounded-xl font-bold hover:bg-slate-50 transition-all focus:ring-4 focus:ring-blue-100 disabled:opacity-70"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {loading ? "Signing in..." : "Continue with Google"}
            </button>
            
            <div className="relative flex items-center justify-center my-6">
              <div className="border-t border-slate-200 w-full"></div>
              <span className="bg-white px-4 text-xs font-bold text-slate-400 absolute">OR</span>
            </div>

            <p className="text-center text-sm font-medium text-slate-500">
              Only Google authentication is currently supported for maximum security and ease of use.
            </p>
          </div>
        </div>

        <p className="text-center text-sm font-medium text-slate-400 mt-8">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
