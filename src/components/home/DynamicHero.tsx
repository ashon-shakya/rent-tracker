"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowLeft,
  Edit2,
  Home,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Receipt,
  Calendar,
  Copy,
  Check,
  Plus,
  Minus,
  CreditCard,
  UserPlus,
} from "lucide-react";

interface DynamicHeroProps {
  isLoggedIn: boolean;
}

type PaymentType = "RENT" | "BOND" | "UTILITY";

export function DynamicHero({ isLoggedIn }: DynamicHeroProps) {
  // Interactive Agreement State
  const [selectedType, setSelectedType] = useState<PaymentType>("RENT");

  // Shared Parts configuration
  const [adminParts] = useState({ rent: 1, bond: 1, utility: 1 });
  const [tenant1Parts, setTenant1Parts] = useState({ rent: 1, bond: 1, utility: 2 });
  const [tenant2Parts] = useState({ rent: 1, bond: 1, utility: 1 });

  const [copied, setCopied] = useState(false);

  // Payment amounts based on selected type
  const paymentDetails = {
    RENT: {
      title: "Rent Payment",
      amount: 750,
      cycle: "Every 14 days",
      dates: "25/09/2026 — 08/10/2026",
      key: "rent" as const,
      color: "text-violet-600 bg-violet-50 border-violet-100",
    },
    BOND: {
      title: "Bond Deposit",
      amount: 3000,
      cycle: "One-off deposit",
      dates: "Security Lodgment",
      key: "bond" as const,
      color: "text-sky-600 bg-sky-50 border-sky-100",
    },
    UTILITY: {
      title: "Red Energy Electricity",
      amount: 160,
      cycle: "Quarterly bill",
      dates: "01/07/2026 — 30/09/2026",
      key: "utility" as const,
      color: "text-amber-800 bg-amber-50 border-amber-200",
    },
  };

  const current = paymentDetails[selectedType];
  const partKey = current.key;

  // Exact RentTracker formula: totalAmount * (tenantParts / totalParts)
  const totalParts =
    adminParts[partKey] + tenant1Parts[partKey] + tenant2Parts[partKey];

  const adminShare = Math.round((current.amount * adminParts[partKey]) / totalParts);
  const tenant1Share = Math.round((current.amount * tenant1Parts[partKey]) / totalParts);
  const tenant2Share = Math.round((current.amount * tenant2Parts[partKey]) / totalParts);

  const handleCopyDemo = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative px-4 sm:px-6 pt-12 pb-24 max-w-7xl mx-auto overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-violet-300/30 via-pink-200/20 to-sky-200/20 blur-3xl -z-10 rounded-full pointer-events-none" />

      {/* Hero Header & Headline */}
      <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
        {/* Dynamic Live Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-violet-100 shadow-sm text-xs font-semibold text-slate-700 animate-in fade-in zoom-in-95 duration-500">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-600"></span>
          </span>
          <span className="font-bold text-slate-900">RentTracker</span>
          <span className="text-slate-300">•</span>
          <span className="text-violet-700 font-bold">Agreements, Shared Parts & Settlements</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
          Manage shared rent agreements,{" "}
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-rose-400 bg-clip-text text-transparent">
            stress free.
          </span>
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
          Create rental agreements, allocate distinct shared parts for <strong className="text-slate-700">Rents</strong>, <strong className="text-slate-700">Bonds</strong>, and <strong className="text-slate-700">Utilities</strong>, and reconcile payments with 1-click receipts.
        </p>

        {/* CTA Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full sm:w-auto">
          {isLoggedIn ? (
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto text-base font-bold px-8 py-6 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/25 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Go to Dashboard</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          ) : (
            <Link href="/api/auth/signin" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto text-base font-bold px-8 py-6 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/25 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Get Started with Google</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          )}

          <a href="#how-it-works" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-base font-semibold px-7 py-6 rounded-2xl bg-white hover:bg-violet-50 text-slate-700 border-slate-200 hover:border-violet-200 transition-all"
            >
              See Agreement Workflow
            </Button>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span>Dedicated Rent, Bond & Utility Parts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span>Recurring Utility Cycles</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span>Instant PNG Clipboard Receipts</span>
          </div>
        </div>
      </div>

      {/* Dynamic Interactive Demo Display */}
      <div className="mt-14 relative max-w-5xl mx-auto">
        {/* Floating Satellite Badge: Reconciled Status */}
        <div className="hidden lg:flex items-center gap-3 p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-violet-100 shadow-[0_10px_30px_rgba(124,58,237,0.12)] absolute -top-4 -right-6 z-20 animate-float-gentle [animation-delay:2s]">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">Payment Settled</p>
            <p className="text-[11px] text-emerald-600 font-bold">✓ All Tenant Shares Reconciled</p>
          </div>
        </div>

        {/* Main Agreement Interactive Card - Aligned with Actual Rent Details Component */}
        <div className="bg-white/95 backdrop-blur-2xl rounded-[2.5rem] border border-violet-100/80 shadow-[0_20px_60px_rgba(124,58,237,0.08)] p-6 sm:p-8 lg:p-10 space-y-6">
          {/* Header Bar matching actual agreement page: Back Arrow & Edit button */}
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 border border-slate-100 shadow-xs">
              <ArrowLeft size={16} />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Live Agreement View
              </span>
            </div>
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 border border-slate-100 shadow-xs">
              <Edit2 size={15} />
            </div>
          </div>

          {/* Profile / Main Info Section */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-md mb-2 border-4 border-white bg-violet-50 flex items-center justify-center text-violet-500">
              <Home size={28} />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">42 Wallaby Way, Sydney NSW</h2>
            <p className="text-slate-400 font-medium text-xs">Active Lease</p>

            {/* Action Buttons matching actual app */}
            <div className="flex w-full max-w-sm gap-3 mt-4">
              <div className="flex-1 bg-violet-500 text-white py-2.5 rounded-2xl font-medium flex items-center justify-center gap-2 shadow-md shadow-violet-200 text-xs">
                <CreditCard size={15} /> Log Payment
              </div>
              <div className="flex-1 bg-slate-800 text-white py-2.5 rounded-2xl font-medium flex items-center justify-center gap-2 shadow-md text-xs">
                <UserPlus size={15} /> Invite
              </div>
            </div>
          </div>

          {/* Payment Type Selector matching PaymentList badges */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Select Payment To Calculate
            </span>
            <div className="flex items-center gap-2 p-1 bg-slate-100/80 rounded-2xl border border-slate-200/60 w-full sm:w-auto">
              {(["RENT", "BOND", "UTILITY"] as PaymentType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    selectedType === type
                      ? type === "BOND"
                        ? "bg-sky-600 text-white shadow-sm"
                        : type === "UTILITY"
                        ? "bg-amber-600 text-white shadow-sm"
                        : "bg-violet-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white"
                  }`}
                >
                  {type === "BOND" && <ShieldCheck size={14} />}
                  {type === "UTILITY" && <Zap size={14} />}
                  {type === "RENT" && <Receipt size={14} />}
                  <span>{type}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Current Payment Details & Total Amount Banner */}
          <div className="bg-[#f8f7fc] p-5 rounded-2xl border border-slate-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-md border ${current.color}`}>
                  {selectedType}
                </span>
                <span className="text-xs font-bold text-slate-500">{current.cycle}</span>
              </div>
              <h4 className="text-lg font-bold text-slate-800">{current.title}</h4>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5 font-medium">
                <Calendar size={13} /> Period: {current.dates}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Bill Amount</p>
              <p className="text-3xl font-black text-slate-900 font-mono">
                ${current.amount.toLocaleString()}
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                Split across <strong className="text-slate-800 font-mono">{totalParts} total parts</strong>
              </p>
            </div>
          </div>

          {/* Interactive Shared Parts & Tenant Breakdown List - Matching TenantList & Modal */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
              <span>Tenant & Assigned Shared Parts ({partKey.toUpperCase()} PARTS)</span>
              <span>Calculated Share Amount</span>
            </div>

            {/* Owner Row */}
            <div className="p-4 rounded-2xl border border-slate-100 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 font-bold text-sm flex items-center justify-center uppercase">
                  O
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="font-bold text-slate-800 text-sm">Owner</h5>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-50 text-violet-700">
                      R: {adminParts.rent}p
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700">
                      B: {adminParts.bond}p
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800">
                      U: {adminParts.utility}p
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">owner@example.com</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6">
                <span className="text-xs font-semibold text-slate-500 font-mono">
                  {adminParts[partKey]} of {totalParts} parts
                </span>
                <span className="text-lg font-extrabold text-slate-900 font-mono">
                  ${adminShare.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Tenant 1 Row (Interactive Stepper) */}
            <div className="p-4 rounded-2xl border border-violet-200 bg-violet-50/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-600 text-white font-bold text-xs flex items-center justify-center">
                  T1
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="font-bold text-slate-800 text-sm">Tenant 1</h5>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-50 text-violet-700">
                      R: {tenant1Parts.rent}p
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700">
                      B: {tenant1Parts.bond}p
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                      U: {tenant1Parts.utility}p (Interactive)
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">tenant1@example.com • Adjust parts &rarr;</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                {/* Stepper for Tenant 1's active parts */}
                <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-xl border border-violet-200 shadow-2xs">
                  <button
                    onClick={() =>
                      setTenant1Parts((prev) => ({
                        ...prev,
                        [partKey]: Math.max(1, prev[partKey] - 1),
                      }))
                    }
                    className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-violet-100 flex items-center justify-center text-slate-700 hover:text-violet-700"
                    title="Decrease parts"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-xs font-bold text-violet-800 px-1 font-mono">
                    {tenant1Parts[partKey]}p
                  </span>
                  <button
                    onClick={() =>
                      setTenant1Parts((prev) => ({
                        ...prev,
                        [partKey]: Math.min(5, prev[partKey] + 1),
                      }))
                    }
                    className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-violet-100 flex items-center justify-center text-slate-700 hover:text-violet-700"
                    title="Increase parts"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                <span className="text-lg font-extrabold text-violet-700 font-mono">
                  ${tenant1Share.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Tenant 2 Row */}
            <div className="p-4 rounded-2xl border border-slate-100 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 font-bold text-xs flex items-center justify-center">
                  T2
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="font-bold text-slate-800 text-sm">Tenant 2</h5>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-50 text-violet-700">
                      R: {tenant2Parts.rent}p
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700">
                      B: {tenant2Parts.bond}p
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800">
                      U: {tenant2Parts.utility}p
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">tenant2@example.com</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6">
                <span className="text-xs font-semibold text-slate-500 font-mono">
                  {tenant2Parts[partKey]} of {totalParts} parts
                </span>
                <span className="text-lg font-extrabold text-slate-900 font-mono">
                  ${tenant2Share.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Card Footer with Copy Receipt Simulation matching actual modal */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-500">
              <CheckCircle2 size={16} className="text-emerald-500" />
              <span>
                Sum of shares matches total:{" "}
                <strong className="text-slate-800 font-mono">
                  ${(adminShare + tenant1Share + tenant2Share).toLocaleString()}
                </strong>
              </span>
            </div>

            <button
              onClick={handleCopyDemo}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
                copied
                  ? "bg-emerald-500 text-white shadow-xs"
                  : "bg-violet-100 text-violet-700 hover:bg-violet-200"
              }`}
            >
              {copied ? (
                <>
                  <Check size={14} /> Receipt Image Copied!
                </>
              ) : (
                <>
                  <Copy size={14} /> Copy Receipt Breakdown
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
