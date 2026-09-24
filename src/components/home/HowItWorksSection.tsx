"use client";

import React, { useState } from "react";
import {
  FileText,
  Users,
  Zap,
  CreditCard,
  Receipt,
  CheckCircle2,
  Calendar,
  DollarSign,
  Sparkles,
  Home,
  Flame,
  Wifi,
  Edit2,
  Trash2,
  Copy,
  Check,
  ShieldAlert,
  Clock,
  ArrowLeft,
  UserPlus,
  Plus,
  X,
} from "lucide-react";

export function HowItWorksSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [copiedReceipt, setCopiedReceipt] = useState(false);

  const handleCopyReceipt = () => {
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2000);
  };

  const steps = [
    {
      step: "01",
      badge: "Step 1: Agreement Setup",
      title: "Create an Agreement for the Property",
      subtitle: "Define address, rent cycle days, total rent & bond",
      description:
        "Everything in RentTracker is built around Agreements (RentAgreement). You configure the property address, total recurring rent ($750), cycle frequency in days (rentDueDays: 14), and total bond ($3,000). The agreement tracks its own admin share baseline.",
      icon: FileText,
      accentColor: "from-violet-500 to-indigo-600",
      badgeColor: "bg-violet-100 text-violet-700 border-violet-200",
    },
    {
      step: "02",
      badge: "Step 2: Tenants & Shared Parts",
      title: "Invite Tenants & Configure Shared Parts",
      subtitle: "Assign distinct parts for Rent (R), Bond (B), and Utilities (U)",
      description:
        "Tenants are invited by name and email. Instead of inflexible percentages, RentTracker assigns distinct shared parts (R, B, U) to each person. If someone works from home or uses more power, allocate them U: 2p without changing their rent share.",
      icon: Users,
      accentColor: "from-fuchsia-500 to-pink-600",
      badgeColor: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200",
    },
    {
      step: "03",
      badge: "Step 3: Utilities Setup",
      title: "Attach Utilities to the Agreement",
      subtitle: "Organize electricity, gas, internet, and water accounts",
      description:
        "Add recurring utility accounts directly under the agreement. Each utility tracks its category icon (Zap, Flame, Wifi, Droplets), billing frequency (monthly, quarterly), start date, and estimated cost, showing Active or Ended coverage.",
      icon: Zap,
      accentColor: "from-amber-500 to-orange-600",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    },
    {
      step: "04",
      badge: "Step 4: Payment Logging",
      title: "Log Payments (RENT, BOND, or UTILITY)",
      subtitle: "Record transactions with dates, payer, and settlement status",
      description:
        "Payments are entered with strict types: RENT, BOND, or UTILITY. Selecting a utility automatically links the utility and calculates the billing period range. Payments record the payee, amount, and an isSettled toggle.",
      icon: CreditCard,
      accentColor: "from-emerald-500 to-teal-600",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    },
    {
      step: "05",
      badge: "Step 5: Share Breakdown & Receipts",
      title: "View Share Breakdown & Copy Receipt Card",
      subtitle: "Exact dollar splits per person with 1-click clipboard image export",
      description:
        "Clicking any payment in the table opens the actual Payment Breakdown modal. It computes each tenant's share: Total × (Tenant Parts ÷ Total Parts). Click 'Copy Image' to copy the visual receipt card directly to your clipboard for WhatsApp.",
      icon: Receipt,
      accentColor: "from-sky-500 to-blue-600",
      badgeColor: "bg-sky-100 text-sky-800 border-sky-200",
    },
  ];

  const currentStep = steps[activeStepIndex];

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 bg-white border-y border-slate-100">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-bold border border-violet-100">
            <Sparkles size={14} className="text-violet-600" />
            <span>Interactive Application Walkthrough</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            How RentTracker Works
          </h2>
          <p className="text-slate-500 text-base sm:text-lg font-medium leading-relaxed">
            Everything is structured around <strong className="text-slate-800">Agreements</strong> for{" "}
            <strong className="text-slate-800">Rents</strong>, <strong className="text-slate-800">Bonds</strong>, and{" "}
            <strong className="text-slate-800">Utilities</strong> using their respective{" "}
            <strong className="text-violet-600 font-bold">Shared Parts (R, B, U)</strong>.
          </p>
        </div>

        {/* Step Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 bg-slate-50/80 rounded-2xl border border-slate-200/60 max-w-4xl mx-auto">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isSelected = activeStepIndex === idx;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-white text-violet-700 shadow-sm border border-slate-200/80"
                    : "text-slate-500 hover:text-slate-900 hover:bg-white/60"
                }`}
              >
                <Icon size={16} className={isSelected ? "text-violet-600" : "text-slate-400"} />
                <span className="hidden sm:inline">Step {idx + 1}</span>
                <span className="sm:hidden">{s.step}</span>
              </button>
            );
          })}
        </div>

        {/* Step Showcase Card: Left Explanation + Right Real UI Component */}
        <div className="bg-[#f8f7fc] rounded-[2.5rem] p-6 sm:p-10 lg:p-12 border border-slate-200/70 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Process Explanation */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-extrabold text-slate-300 font-mono">
                {currentStep.step}
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${currentStep.badgeColor}`}>
                {currentStep.badge}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                {currentStep.title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-violet-600">
                {currentStep.subtitle}
              </p>
              <p className="text-slate-600 font-medium text-sm leading-relaxed pt-1">
                {currentStep.description}
              </p>
            </div>

            {/* Step specific highlight cards */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Application Blueprint Feature
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 font-medium">
                {activeStepIndex === 0 && (
                  <>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      Rent cycle days configuration (e.g. 14 days, 30 days)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      Automatic calculations for bond deposit tracking
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      Direct invite links and owner permissions management
                    </li>
                  </>
                )}
                {activeStepIndex === 1 && (
                  <>
                    <li className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 font-mono">
                        R: 1p
                      </span>
                      <span>Rent Share Parts (e.g. 1 part each for 3 people = 1/3)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-700 font-mono">
                        B: 1p
                      </span>
                      <span>Bond Share Parts (tracks individual security deposit shares)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-mono">
                        U: 2p
                      </span>
                      <span>Utility Share Parts (independent from rent for fair bills)</span>
                    </li>
                  </>
                )}
                {activeStepIndex === 2 && (
                  <>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      Multi-category icons: Zap (Electricity), Flame (Gas), Wifi (Internet)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      Flexible billing cycles: Monthly, Quarterly, Fortnightly
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      Est. cost tracking with active/ended status visibility
                    </li>
                  </>
                )}
                {activeStepIndex === 3 && (
                  <>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      Strict payment categories: RENT, BOND, and UTILITY
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      Automatic billing period date ranges from cycle length
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      Toggleable settlement status (Settled vs Pending)
                    </li>
                  </>
                )}
                {activeStepIndex === 4 && (
                  <>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      Formula: Total × (Tenant Parts ÷ Total Parts)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      1-click &quot;Copy Image&quot; converts receipt to PNG on clipboard
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      Zero ambiguity: perfect for sharing in flatmate group chats
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Right Column: Actual Application UI Component Replica */}
          <div className="lg:col-span-6 w-full">
            {/* Step 1 Graphic: Actual Rent Details Page Component */}
            {activeStepIndex === 0 && (
              <div className="space-y-4">
                {/* Real Header Bar */}
                <div className="flex items-center justify-between p-2 mb-1">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-500 shadow-sm">
                    <ArrowLeft size={18} />
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-500 shadow-sm">
                    <Edit2 size={16} />
                  </div>
                </div>

                {/* Real Profile / Main Info Section */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-md mb-3 border-4 border-white bg-violet-50 flex items-center justify-center text-violet-500">
                    <Home size={36} />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">42 Wallaby Way, Sydney NSW</h2>
                  <p className="text-slate-400 font-medium text-xs mt-0.5">Active Lease</p>

                  {/* Real Action Buttons */}
                  <div className="flex w-full max-w-sm gap-3 mt-4">
                    <div className="flex-1 bg-violet-500 text-white py-2.5 rounded-2xl font-medium flex items-center justify-center gap-2 shadow-md shadow-violet-200 text-xs">
                      <CreditCard size={15} /> Log Payment
                    </div>
                    <div className="flex-1 bg-slate-800 text-white py-2.5 rounded-2xl font-medium flex items-center justify-center gap-2 shadow-md text-xs">
                      <UserPlus size={15} /> Invite
                    </div>
                  </div>
                </div>

                {/* Real Rent details Card */}
                <div>
                  <h3 className="text-slate-800 font-bold mb-3 px-2 text-sm">Rent details</h3>
                  <div className="bg-white rounded-3xl p-5 grid grid-cols-2 gap-3 border border-slate-100/60 shadow-sm">
                    <div>
                      <p className="text-[11px] font-medium text-slate-400 mb-1.5">Start date</p>
                      <div className="bg-[#f8f7fc] rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800">
                        25/09/2026
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-slate-400 mb-1.5">Rent cycle</p>
                      <div className="bg-[#f8f7fc] rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800">
                        Every 14 days
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-slate-400 mb-1.5">Total rent</p>
                      <div className="bg-[#f8f7fc] rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800">
                        $750
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-slate-400 mb-1.5">Bond money</p>
                      <div className="bg-[#f8f7fc] rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800">
                        $3,000
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 Graphic: Actual Tenants Table Component */}
            {activeStepIndex === 1 && (
              <div>
                <h3 className="text-slate-800 font-bold mb-3 px-2 text-sm">Tenants</h3>
                <div className="bg-white rounded-3xl border border-slate-100/60 shadow-sm overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-100/60 bg-[#f8f7fc]">
                        <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Role/Shares
                        </th>
                        <th className="text-right px-4 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {/* Owner Row */}
                      <tr className="hover:bg-violet-50/30 transition-colors">
                        <td className="px-4 py-3.5 text-sm font-medium text-slate-800">Owner</td>
                        <td className="px-4 py-3.5 text-xs text-slate-400">owner@example.com</td>
                        <td className="px-4 py-3.5">
                          <div className="flex gap-1 flex-wrap">
                            <span className="text-[10px] font-bold text-violet-600 bg-violet-50 px-2 py-1 rounded-full">
                              R: 1p
                            </span>
                            <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-1 rounded-full">
                              B: 1p
                            </span>
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-full">
                              U: 1p
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <div className="flex justify-end gap-1">
                            <button
                              className="p-1.5 rounded-full text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"
                              title="Edit Admin Shares"
                            >
                              <Edit2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Tenant 1 Row */}
                      <tr className="hover:bg-violet-50/30 transition-colors bg-violet-50/20">
                        <td className="px-4 py-3.5 text-sm font-medium text-slate-800">Tenant 1</td>
                        <td className="px-4 py-3.5 text-xs text-slate-400">tenant1@example.com</td>
                        <td className="px-4 py-3.5">
                          <div className="flex gap-1 flex-wrap">
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-full">
                              R: 1p
                            </span>
                            <span className="text-[10px] font-bold text-sky-500 bg-sky-50 px-2 py-1 rounded-full">
                              B: 1p
                            </span>
                            <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-1 rounded-full border border-amber-200">
                              U: 2p
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <div className="flex justify-end gap-1">
                            <button
                              className="p-1.5 rounded-full text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"
                              title="Edit Tenant Shares"
                            >
                              <Edit2 size={15} />
                            </button>
                            <button
                              className="p-1.5 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Delete Tenant"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Tenant 2 Row */}
                      <tr className="hover:bg-violet-50/30 transition-colors">
                        <td className="px-4 py-3.5 text-sm font-medium text-slate-800">Tenant 2</td>
                        <td className="px-4 py-3.5 text-xs text-slate-400">tenant2@example.com</td>
                        <td className="px-4 py-3.5">
                          <div className="flex gap-1 flex-wrap">
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-full">
                              R: 1p
                            </span>
                            <span className="text-[10px] font-bold text-sky-500 bg-sky-50 px-2 py-1 rounded-full">
                              B: 1p
                            </span>
                            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                              U: 1p
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <div className="flex justify-end gap-1">
                            <button
                              className="p-1.5 rounded-full text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"
                              title="Edit Tenant Shares"
                            >
                              <Edit2 size={15} />
                            </button>
                            <button
                              className="p-1.5 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Delete Tenant"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Step 3 Graphic: Actual Utility Cards Component */}
            {activeStepIndex === 2 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2 px-1">
                  <h3 className="text-slate-800 font-bold text-sm">Utilities</h3>
                  <div className="bg-violet-500 text-white rounded-2xl px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-violet-200">
                    <Plus size={14} /> Add Utility
                  </div>
                </div>

                {/* Real Utility Card 1 */}
                <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm transition-all hover:shadow-md hover:border-violet-100 relative">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-violet-100 text-violet-600 shadow-sm shadow-violet-100">
                        <Flame size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-slate-800 text-sm truncate">Red Energy Gas</h4>
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-violet-50 text-violet-600 capitalize shrink-0">
                            Quarterly
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 flex items-center gap-1 shrink-0">
                            <CheckCircle2 size={10} /> Active
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      <button className="p-1.5 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-y-1.5 gap-x-4 pt-2.5 border-t border-slate-100 text-xs text-slate-500">
                    <div className="flex items-center gap-1 text-slate-400">
                      <Calendar size={12} className="shrink-0" />
                      <span>Start Date:</span>
                      <span className="font-semibold text-slate-700 ml-1">01/07/2026</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                      <DollarSign size={12} className="shrink-0" />
                      <span>Est. Cost:</span>
                      <span className="font-bold text-slate-800 ml-1">$160.00</span>
                    </div>
                  </div>
                </div>

                {/* Real Utility Card 2 */}
                <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm transition-all hover:shadow-md hover:border-violet-100 relative">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-violet-100 text-violet-600 shadow-sm shadow-violet-100">
                        <Wifi size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-slate-800 text-sm truncate">Dodo Unlimited NBN</h4>
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-violet-50 text-violet-600 capitalize shrink-0">
                            Monthly
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 flex items-center gap-1 shrink-0">
                            <CheckCircle2 size={10} /> Active
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      <button className="p-1.5 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-y-1.5 gap-x-4 pt-2.5 border-t border-slate-100 text-xs text-slate-500">
                    <div className="flex items-center gap-1 text-slate-400">
                      <Calendar size={12} className="shrink-0" />
                      <span>Start Date:</span>
                      <span className="font-semibold text-slate-700 ml-1">01/08/2026</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                      <DollarSign size={12} className="shrink-0" />
                      <span>Est. Cost:</span>
                      <span className="font-bold text-slate-800 ml-1">$62.99</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 Graphic: Actual Payment History Table Component */}
            {activeStepIndex === 3 && (
              <div>
                <h3 className="text-slate-800 font-bold mb-3 px-2 text-sm">Payment History</h3>
                <div className="bg-white rounded-3xl border border-slate-100/60 shadow-sm overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-100/60 bg-[#f8f7fc]">
                        <th className="text-left px-5 py-3.5 w-10">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-slate-300 text-violet-600 accent-violet-600"
                            defaultChecked
                          />
                        </th>
                        <th className="text-left px-3 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Type / Utility
                        </th>
                        <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Paid By
                        </th>
                        <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Period
                        </th>
                        <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Settled
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {/* RENT Row */}
                      <tr className="hover:bg-violet-50/30 transition-colors">
                        <td className="px-5 py-3.5">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-slate-300 text-violet-600 accent-violet-600"
                            defaultChecked
                          />
                        </td>
                        <td className="px-3 py-3.5">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-violet-50 text-violet-600 border border-violet-100 shadow-2xs">
                            RENT
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-sm font-bold text-slate-800">$750.00</td>
                        <td className="px-4 py-3.5 text-xs font-medium text-slate-600">Owner</td>
                        <td className="px-4 py-3.5 text-xs text-slate-400">25/09 — 08/10</td>
                        <td className="px-4 py-3.5">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 inline-flex items-center gap-1">
                            <CheckCircle2 size={12} /> Settled
                          </span>
                        </td>
                      </tr>

                      {/* BOND Row */}
                      <tr className="hover:bg-violet-50/30 transition-colors">
                        <td className="px-5 py-3.5">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-slate-300 text-violet-600 accent-violet-600"
                            defaultChecked
                          />
                        </td>
                        <td className="px-3 py-3.5">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-600 border border-sky-100 shadow-2xs">
                            BOND
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-sm font-bold text-slate-800">$3,000.00</td>
                        <td className="px-4 py-3.5 text-xs font-medium text-slate-600">Owner</td>
                        <td className="px-4 py-3.5 text-xs text-slate-400">Security Deposit</td>
                        <td className="px-4 py-3.5">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 inline-flex items-center gap-1">
                            <CheckCircle2 size={12} /> Settled
                          </span>
                        </td>
                      </tr>

                      {/* UTILITY Row */}
                      <tr className="hover:bg-violet-50/30 transition-colors bg-amber-50/20">
                        <td className="px-5 py-3.5">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-slate-300 text-violet-600 accent-violet-600"
                          />
                        </td>
                        <td className="px-3 py-3.5">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100 shadow-2xs">
                            <Zap size={13} />
                            Electricity
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-sm font-bold text-slate-800">$160.00</td>
                        <td className="px-4 py-3.5 text-xs font-medium text-slate-600">Owner</td>
                        <td className="px-4 py-3.5 text-xs text-slate-400">01/07 — 30/09</td>
                        <td className="px-4 py-3.5">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/60 inline-flex items-center gap-1">
                            <Clock size={12} /> Pending
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Step 5 Graphic: Actual Receipt Breakdown Modal Component */}
            {activeStepIndex === 4 && (
              <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden border border-slate-100 mx-auto">
                {/* Real Modal Top Action Bar */}
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-[#f8f7fc]/80 px-6">
                  <button
                    onClick={handleCopyReceipt}
                    className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                      copiedReceipt
                        ? "bg-emerald-500 text-white shadow-sm"
                        : "bg-violet-100 text-violet-700 hover:bg-violet-200"
                    }`}
                  >
                    {copiedReceipt ? (
                      <>
                        <Check size={14} /> Copied Image!
                      </>
                    ) : (
                      <>
                        <Copy size={14} /> Copy Image
                      </>
                    )}
                  </button>

                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
                    <X size={16} />
                  </div>
                </div>

                {/* Real Printable / Capturable Receipt Card Area */}
                <div className="p-6 space-y-5 bg-white">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm bg-amber-100 text-amber-700">
                        <Zap size={22} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-base">Red Energy Electricity</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-xs font-medium text-slate-400">Date: 25/09/2026</p>
                          <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                            ELECTRICITY
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Real Amount & Paid By */}
                  <div className="flex justify-between items-end bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Total Amount
                      </p>
                      <p className="text-3xl font-black text-slate-800 font-mono">$160.00</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-slate-400 mb-1">Paid By</p>
                      <p className="text-sm font-bold text-slate-700">Owner</p>
                    </div>
                  </div>

                  {/* Real Period Box */}
                  <div className="flex items-center justify-between text-xs bg-slate-50/50 px-4 py-2.5 rounded-xl border border-slate-100 text-slate-600">
                    <span className="font-medium text-slate-400">Billing Period:</span>
                    <span className="font-bold text-slate-800">01/07/2026 — 30/09/2026</span>
                  </div>

                  {/* Real Settlement Status Display */}
                  <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldAlert size={18} className="text-amber-500" />
                        <div>
                          <p className="text-xs font-bold text-slate-700">Settlement Status</p>
                          <p className="text-[11px] font-medium text-slate-400">
                            Payment has not been marked as settled
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/60 inline-flex items-center gap-1">
                        <Clock size={12} /> Pending
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 flex justify-end">
                      <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-500 text-white shadow-xs">
                        Mark as Settled
                      </span>
                    </div>
                  </div>

                  {/* Real Share Breakdown using calculateShares */}
                  <div>
                    <p className="text-sm font-bold text-slate-800 mb-3">
                      Share Breakdown (Utility Shares • 4 Parts Total)
                    </p>
                    <div className="space-y-2">
                      {/* Owner */}
                      <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 uppercase">
                            O
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-700">Owner</p>
                            <p className="text-xs font-medium text-slate-400">1 part(s)</p>
                          </div>
                        </div>
                        <p className="text-sm font-bold text-slate-800 font-mono">$40.00</p>
                      </div>

                      {/* Tenant 1 */}
                      <div className="flex items-center justify-between bg-violet-50/50 p-3 rounded-xl border border-violet-100">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs font-bold">
                            T1
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-700">Tenant 1</p>
                            <p className="text-xs font-semibold text-violet-600">2 part(s)</p>
                          </div>
                        </div>
                        <p className="text-sm font-bold text-violet-700 font-mono">$80.00</p>
                      </div>

                      {/* Tenant 2 */}
                      <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 uppercase">
                            T2
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-700">Tenant 2</p>
                            <p className="text-xs font-medium text-slate-400">1 part(s)</p>
                          </div>
                        </div>
                        <p className="text-sm font-bold text-slate-800 font-mono">$40.00</p>
                      </div>
                    </div>
                  </div>

                  {/* Real Footer Info */}
                  <div className="pt-2 text-center text-[10px] text-slate-400 font-medium">
                    RentTracker • Shared Receipt Breakdown
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reference Guide to the 3 Systems */}
        <div className="pt-8">
          <div className="text-center mb-10 max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl font-bold text-slate-900">
              Understanding the 3 Shared Parts Systems
            </h3>
            <p className="text-slate-500 text-sm font-medium">
              RentTracker gives you independent control over rent, bond, and utility shares so no one overpays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Rent Parts */}
            <div className="p-6 rounded-3xl bg-[#f8f7fc] border border-violet-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-violet-100 text-violet-700 font-mono">
                  R: Xp
                </span>
                <span className="text-xs text-slate-400 font-medium">rentShareParts</span>
              </div>
              <h4 className="font-bold text-slate-900 text-base">Rent Share Parts</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Applies when logging payments of type <code className="bg-white px-1 rounded text-violet-600 font-mono font-bold">RENT</code>. Divides the agreement&apos;s recurring lease rent by total rent parts.
              </p>
              <div className="bg-white p-3 rounded-xl border border-slate-100 text-xs text-slate-700 font-mono">
                Example: $750 rent split across 3 parts = <strong>$250 / part</strong>
              </div>
            </div>

            {/* Bond Parts */}
            <div className="p-6 rounded-3xl bg-[#f8f7fc] border border-sky-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sky-100 text-sky-700 font-mono">
                  B: Yp
                </span>
                <span className="text-xs text-slate-400 font-medium">bondShareParts</span>
              </div>
              <h4 className="font-bold text-slate-900 text-base">Bond Share Parts</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Applies when logging payments of type <code className="bg-white px-1 rounded text-sky-600 font-mono font-bold">BOND</code>. Allocates the security deposit lodged so each tenant knows what is returned at lease end.
              </p>
              <div className="bg-white p-3 rounded-xl border border-slate-100 text-xs text-slate-700 font-mono">
                Example: $3,000 bond split across 3 parts = <strong>$1,000 / part</strong>
              </div>
            </div>

            {/* Utility Parts */}
            <div className="p-6 rounded-3xl bg-[#f8f7fc] border border-amber-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-mono">
                  U: Zp
                </span>
                <span className="text-xs text-slate-400 font-medium">utilityShareParts</span>
              </div>
              <h4 className="font-bold text-slate-900 text-base">Utility Share Parts</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Applies when logging payments of type <code className="bg-white px-1 rounded text-amber-700 font-mono font-bold">UTILITY</code>. Allows utility shares to differ from rent (e.g. higher electricity share for work-from-home).
              </p>
              <div className="bg-white p-3 rounded-xl border border-slate-100 text-xs text-slate-700 font-mono">
                Example: $160 bill split across 4 parts = <strong>$40 / part</strong> (2p = $80)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
