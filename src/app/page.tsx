import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle2, ShieldCheck, Sparkles, Zap, HeartHandshake } from "lucide-react";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { DynamicHero } from "@/components/home/DynamicHero";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-[#f8f7fc] text-slate-800 selection:bg-violet-100">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-[#f8f7fc]/85 backdrop-blur-lg border-b border-violet-50/80">
        <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-sm shadow-violet-200 group-hover:scale-105 transition-transform">
              R
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              RentTracker
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="#how-it-works"
              className="hidden md:block text-sm font-semibold text-slate-600 hover:text-violet-600 px-3 py-2 rounded-xl hover:bg-violet-50/50 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#features"
              className="hidden md:block text-sm font-semibold text-slate-600 hover:text-violet-600 px-3 py-2 rounded-xl hover:bg-violet-50/50 transition-colors"
            >
              Features
            </a>
            <a
              href="#contact"
              className="hidden md:block text-sm font-semibold text-slate-600 hover:text-violet-600 px-3 py-2 rounded-xl hover:bg-violet-50/50 transition-colors"
            >
              Contact
            </a>

            {session ? (
              <Link href="/dashboard">
                <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-5 py-2 font-bold shadow-sm shadow-violet-300">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/api/auth/signin">
                <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-5 py-2 font-bold shadow-sm shadow-violet-300">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </nav>
      </header>

      {/* Dynamic Hero Section with Interactive Split Calculator */}
      <DynamicHero isLoggedIn={!!session} />

      {/* Step-by-Step How To Section with Concrete Examples */}
      <HowItWorksSection />

      {/* Core Features Overview */}
      <section id="features" className="px-6 py-24 bg-[#f8f7fc]">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-600 bg-violet-50 px-3 py-1 rounded-full border border-violet-100">
              Built for Shared Living
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything roommates need in one place
            </h2>
            <p className="text-slate-500 font-medium">
              Say goodbye to confusing excel sheets, split delays, and forgotten utility bills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={CheckCircle2}
              title="Automated Payment Cycles"
              description="Keep a structured ledger of every rent cycle, exact amounts due, and payment verification timestamps with live charts."
              accent="violet"
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Proportional Bond Safeguard"
              description="Log and divide bond payments securely by custom room weights so each tenant knows exactly what they are owed when moving out."
              accent="sky"
            />
            <FeatureCard
              icon={Zap}
              title="Recurring Utility Management"
              description="Organize electricity, gas, internet, and water accounts with separate billing cycles and transparent tenant share tracking."
              accent="rose"
            />
          </div>
        </div>
      </section>

      {/* Modern Living Experience Banner */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-sm border border-slate-200/70 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-violet-700 bg-violet-50 px-3 py-1 rounded-full">
              <HeartHandshake size={14} />
              <span>Roommate Harmony</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-snug">
              Designed to eliminate house money awkwardness
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              We built RentTracker with the intuitive polish and clarity you expect from modern software. Clear math, automated calculations, and instant digital proof cards make shared living simple and completely transparent.
            </p>
            <ul className="space-y-3 pt-2">
              <li className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                <CheckCircle2 className="text-violet-600 shrink-0" size={18} />
                Real-time rent & utility payment reconciliation
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                <CheckCircle2 className="text-violet-600 shrink-0" size={18} />
                Secure NextAuth & Google Authentication
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                <CheckCircle2 className="text-violet-600 shrink-0" size={18} />
                1-Click downloadable image receipts for WhatsApp & Messenger
              </li>
            </ul>
          </div>

          <div className="flex-1 w-full bg-[#f8f7fc] rounded-[2rem] p-6 sm:p-8 flex items-center justify-center border border-violet-100">
            <div className="w-full max-w-sm space-y-4">
              <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center font-bold text-sm">
                    🏠
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 text-sm">Active Lease</h5>
                    <p className="text-xs text-slate-400">Next due in 4 days</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-violet-700 bg-violet-50 px-2.5 py-1 rounded-lg">
                  $750/fortnight
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-100 space-y-2.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Bond Lodged</span>
                  <span className="font-bold text-slate-800">$3,000 Total</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full w-full" />
                </div>
                <p className="text-[11px] text-emerald-600 font-semibold pt-1">
                  ✓ 100% of tenant shares settled
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-20 bg-white border-t border-slate-100">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Get in touch</h2>
            <p className="text-slate-500 font-medium">
              Have questions, feedback, or need help setting up your house lease? We're here to help.
            </p>
          </div>

          <div className="flex justify-center">
            <a
              href="mailto:dingosloth@gmail.com"
              className="group flex flex-col items-center gap-3 p-8 rounded-3xl bg-[#f8f7fc] border border-slate-100 hover:border-violet-200 hover:shadow-md transition-all max-w-sm w-full"
            >
              <div className="w-14 h-14 bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center mb-1 group-hover:scale-110 transition-transform shadow-xs">
                <Mail size={24} />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Email Us</h3>
              <p className="text-violet-600 font-bold text-sm group-hover:underline">
                dingosloth@gmail.com
              </p>
              <span className="text-slate-400 text-xs font-medium">
                Click to send us a message anytime
              </span>
            </a>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-8 px-6 text-slate-400 text-xs font-medium border-t border-slate-100 bg-[#f8f7fc]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} RentTracker. Shared Rent, Bond & Utility Management. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-violet-600 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/terms" className="hover:text-violet-600 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  accent,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  accent?: string;
}) {
  const bgMap: Record<string, string> = {
    violet: "bg-violet-50/60 border-violet-100 text-violet-600",
    sky: "bg-sky-50/60 border-sky-100 text-sky-600",
    rose: "bg-rose-50/60 border-rose-100 text-rose-500",
  };
  const accentClasses = bgMap[accent || "violet"] || bgMap.violet;

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200/70 hover:shadow-lg hover:shadow-slate-200/40 transition-all duration-300 space-y-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${accentClasses}`}>
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="text-slate-500 leading-relaxed font-medium text-sm">{description}</p>
    </div>
  );
}
