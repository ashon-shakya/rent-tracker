"use client";

import { ArrowLeft, UserPlus } from "lucide-react";
import Link from "next/link";
import { inviteTenant } from "@/actions/tenantActions";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { use } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      disabled={pending}
      className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-8 shadow-sm flex items-center gap-2"
    >
      <UserPlus size={18} />
      {pending ? "Inviting..." : "Send Invite"}
    </Button>
  );
}

export default function InviteTenantPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const rentAgreementId = resolvedParams.id;

  return (
    <div className="animate-in fade-in duration-500 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href={`/dashboard/rents/${rentAgreementId}`}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Invite Roommate</h1>
          <p className="text-slate-500 font-medium">Add someone to this rent agreement</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-50 p-6 md:p-10">
        <form action={inviteTenant} className="space-y-6">
          <input type="hidden" name="rentAgreementId" value={rentAgreementId} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Full Name</label>
              <input 
                required
                name="name"
                type="text" 
                placeholder="e.g. Jane Doe"
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Email Address</label>
              <input 
                required
                name="email"
                type="email" 
                placeholder="jane@example.com"
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Rent Share (Parts)</label>
              <input 
                required
                name="rentShareParts"
                type="number"
                defaultValue="1"
                min="0"
                step="0.01"
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Bond Share (Parts)</label>
              <input 
                required
                name="bondShareParts"
                type="number"
                defaultValue="1"
                min="0"
                step="0.01"
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
