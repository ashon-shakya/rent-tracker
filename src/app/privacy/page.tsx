import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Eye, Database, Mail, FileText, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — RentTracker",
  description: "Learn how RentTracker collects, uses, and safeguards your shared tenancy and expense data.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 24, 2026";

  return (
    <div className="min-h-screen bg-[#f8f7fc] text-slate-800 selection:bg-violet-100">
      {/* Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#f8f7fc]/85 backdrop-blur-lg border-b border-violet-50/80">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-violet-600 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              R
            </div>
            <span className="font-bold text-slate-900 text-sm">RentTracker</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 sm:py-16">
        <div className="bg-white rounded-[2.5rem] border border-slate-200/70 p-6 sm:p-12 shadow-sm space-y-10">
          {/* Title Header */}
          <div className="border-b border-slate-100 pb-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-bold border border-violet-100">
              <ShieldCheck size={14} className="text-violet-600" />
              <span>Transparency & Privacy</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Last Updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Summary Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-[#f8f7fc] border border-violet-50">
            <div className="flex items-start gap-3">
              <Lock size={18} className="text-violet-600 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Never Sold</h4>
                <p className="text-[11px] text-slate-500">Your personal & rental data is never sold or rented to advertisers.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Database size={18} className="text-violet-600 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Encrypted Storage</h4>
                <p className="text-[11px] text-slate-500">Industry-standard encrypted database authentication via MongoDB.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Eye size={18} className="text-violet-600 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">You Are In Control</h4>
                <p className="text-[11px] text-slate-500">Access, export, or request deletion of your records anytime.</p>
              </div>
            </div>
          </div>

          {/* Body Sections */}
          <div className="space-y-8 text-sm text-slate-600 leading-relaxed font-normal">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="text-violet-600 font-mono text-base">1.</span>
                Introduction
              </h2>
              <p>
                Welcome to <strong>RentTracker</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). We provide a collaborative web platform designed to help roommates, housemates, and tenants record shared rent agreements, calculate bond divisions, monitor utility bills, and log payment receipts transparently.
              </p>
              <p>
                This Privacy Policy explains what information we collect when you use RentTracker, how that information is used and stored, and your rights regarding your personal information.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="text-violet-600 font-mono text-base">2.</span>
                Information We Collect
              </h2>
              <p>We collect information you provide directly to us when using the service:</p>
              <ul className="space-y-2 pl-4 list-disc marker:text-violet-500">
                <li>
                  <strong className="text-slate-800">Account & Profile Information:</strong> When you sign in via Google OAuth, we receive your name, email address, profile picture (or default icon), and unique account identifier provided by Google through NextAuth.
                </li>
                <li>
                  <strong className="text-slate-800">Lease Agreement Data:</strong> Property addresses, rent amounts, payment cycles (e.g., weekly, fortnightly, monthly), bond amounts, and agreement start/end dates.
                </li>
                <li>
                  <strong className="text-slate-800">Roommate & Tenant Information:</strong> Names, email addresses, and proportional share weights (e.g. rent parts, bond parts, utility parts) assigned to each person in a household.
                </li>
                <li>
                  <strong className="text-slate-800">Utilities & Services Data:</strong> Service provider names (e.g., electricity, internet, gas, water), billing periods, estimated costs, and billing cycle dates.
                </li>
                <li>
                  <strong className="text-slate-800">Payment Logs & Receipts:</strong> Records of payment amounts, payer names, coverage dates, settlement statuses, and generated digital receipt cards.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="text-violet-600 font-mono text-base">3.</span>
                How We Use Your Information
              </h2>
              <p>We use your information exclusively to provide and improve the RentTracker application:</p>
              <ul className="space-y-2 pl-4 list-disc marker:text-violet-500">
                <li>To calculate fair, mathematically exact proportional shares for rent, bonds, and utilities.</li>
                <li>To maintain your shared household ledger and display historical payment records and analytics.</li>
                <li>To send transactional emails when you invite a roommate to join your rental agreement.</li>
                <li>To maintain secure authentication sessions and protect against unauthorized account access.</li>
                <li>To generate downloadable visual receipts for you to share proof of payment with roommates.</li>
              </ul>
              <div className="p-3.5 rounded-xl bg-violet-50/60 border border-violet-100 text-xs text-violet-900 font-medium">
                <strong>Our Promise:</strong> We do not sell, rent, monetize, or disclose your personal records to third-party data brokers or marketing advertisers under any circumstances.
              </div>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="text-violet-600 font-mono text-base">4.</span>
                Third-Party Service Providers
              </h2>
              <p>We work with trusted infrastructure providers to operate the application securely:</p>
              <ul className="space-y-2 pl-4 list-disc marker:text-violet-500">
                <li>
                  <strong className="text-slate-800">Google OAuth (Google Identity Services):</strong> Used strictly for user authentication. We only request the standard identity scope (<code className="text-xs bg-slate-100 px-1 py-0.5 rounded">openid email profile</code>) to verify your account.
                </li>
                <li>
                  <strong className="text-slate-800">MongoDB Atlas:</strong> Cloud database infrastructure where agreement and payment data are securely hosted with encryption at rest and in transit.
                </li>
                <li>
                  <strong className="text-slate-800">Resend:</strong> Transactional email service utilized solely to deliver roommate invitation emails when triggered by the agreement owner.
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="text-violet-600 font-mono text-base">5.</span>
                Data Retention and Account Deletion
              </h2>
              <p>
                We retain your records for as long as your account remains active. Agreement owners have full control to edit, delete payments, remove utilities, and remove agreements directly inside the dashboard.
              </p>
              <p>
                If you wish to permanently delete your account and all associated tenancy records from our database, you can contact us at{" "}
                <a href="mailto:dingosloth@gmail.com" className="text-violet-600 font-semibold underline">
                  dingosloth@gmail.com
                </a>
                . All associated data will be removed within 30 days of verified request.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="text-violet-600 font-mono text-base">6.</span>
                Security
              </h2>
              <p>
                We employ industry-standard administrative and technical safeguards to protect your personal information against unauthorized access, loss, or misuse, including HTTPS/TLS encryption for all network traffic, secure database authentication, and strict session token management.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="text-violet-600 font-mono text-base">7.</span>
                Contact Us
              </h2>
              <p>
                If you have questions, feedback, or data requests regarding this Privacy Policy, please reach out to us at:
              </p>
              <div className="p-4 rounded-2xl bg-[#f8f7fc] border border-slate-200/80 inline-block">
                <p className="font-bold text-slate-900">RentTracker Support</p>
                <p className="text-slate-500 text-xs">
                  Email:{" "}
                  <a href="mailto:dingosloth@gmail.com" className="text-violet-600 font-semibold underline">
                    dingosloth@gmail.com
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-400 text-xs font-medium border-t border-slate-100 bg-[#f8f7fc]">
        &copy; {new Date().getFullYear()} RentTracker. All rights reserved.
      </footer>
    </div>
  );
}
