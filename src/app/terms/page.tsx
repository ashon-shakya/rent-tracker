import Link from "next/link";
import { ArrowLeft, FileText, AlertCircle, Scale, ShieldAlert, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Terms and Conditions — RentTracker",
  description: "Terms and Conditions of use for the RentTracker shared rent and utility management platform.",
};

export default function TermsPage() {
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
              <Scale size={14} className="text-violet-600" />
              <span>User Agreement</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Terms & Conditions
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Last Updated: {lastUpdated}
            </p>
          </div>

          {/* Critical Disclaimer Banner */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs sm:text-sm space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-800">
              <AlertCircle size={18} className="shrink-0" />
              <span>Important Financial & Legal Notice</span>
            </div>
            <p className="leading-relaxed text-amber-800/90 font-medium">
              RentTracker is an informational calculation and record-keeping tool built to assist housemates with shared expense tracking. RentTracker is <strong>not a bank, money transmitter, escrow agent, or property management agency</strong>. We do not hold, collect, or transmit rental or bond funds. All monetary transfers happen directly between tenants and their landlords or roommates.
            </p>
          </div>

          {/* Body Sections */}
          <div className="space-y-8 text-sm text-slate-600 leading-relaxed font-normal">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="text-violet-600 font-mono text-base">1.</span>
                Acceptance of Terms
              </h2>
              <p>
                By accessing, browsing, or creating an account on <strong>RentTracker</strong> (&ldquo;Service&rdquo;), you agree to be bound by these Terms and Conditions (&ldquo;Terms&rdquo;). If you do not agree to these Terms, please do not use the Service.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="text-violet-600 font-mono text-base">2.</span>
                Description of the Service
              </h2>
              <p>
                RentTracker provides software tools that allow users to register residential tenancy details, configure customized share weights for roommates, track recurring household utility bills, record payment logs, and generate shareable receipt summaries.
              </p>
              <p>
                You acknowledge that:
              </p>
              <ul className="space-y-2 pl-4 list-disc marker:text-violet-500">
                <li>RentTracker does not verify whether landlords have received actual funds or whether lease agreements comply with local state residential tenancy acts.</li>
                <li>Users remain solely responsible for paying their legal rent and utilities directly to their authorized landlord, real estate agent, or utility supplier on time.</li>
                <li>The platform provides mathematical calculations based on the exact numbers, dates, and share parts input by users. Erroneous input will result in inaccurate calculations.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="text-violet-600 font-mono text-base">3.</span>
                User Accounts and Google Sign-In
              </h2>
              <p>
                To access features of RentTracker, you must sign in using a valid Google Account. You agree to:
              </p>
              <ul className="space-y-2 pl-4 list-disc marker:text-violet-500">
                <li>Provide accurate, current, and complete information during registration.</li>
                <li>Maintain the security and confidentiality of your credentials.</li>
                <li>Accept full responsibility for all activities that occur under your account.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="text-violet-600 font-mono text-base">4.</span>
                Acceptable Use Policy
              </h2>
              <p>You agree not to use RentTracker to:</p>
              <ul className="space-y-2 pl-4 list-disc marker:text-violet-500">
                <li>Submit intentionally fraudulent, deceptive, or defamatory rental information.</li>
                <li>Use invitation mechanisms to send unsolicited spam to third parties.</li>
                <li>Attempt to probe, reverse-engineer, disrupt, or compromise the platform or database infrastructure.</li>
                <li>Engage in harassment, extortion, or fraudulent billing claims against housemates.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="text-violet-600 font-mono text-base">5.</span>
                Disputes Between Roommates
              </h2>
              <p>
                RentTracker provides an objective record of entries logged by agreement members. However, RentTracker is not an arbiter, mediator, or legal representative in disputes between tenants, roommates, or landlords. Any contractual, monetary, or tenancy disagreements must be resolved independently between the involved parties or through local residential tenancy tribunals.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="text-violet-600 font-mono text-base">6.</span>
                Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by applicable law, RentTracker and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, goodwill, eviction costs, or utility service disconnections arising from your use of or inability to use the Service.
              </p>
              <p>
                The Service is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind, whether express or implied.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="text-violet-600 font-mono text-base">7.</span>
                Modifications to Terms
              </h2>
              <p>
                We reserve the right to modify or replace these Terms at any time. When changes occur, the updated date at the top of this document will be revised. Continued use of RentTracker following any changes constitutes acceptance of the new Terms.
              </p>
            </section>

            {/* Section 8 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="text-violet-600 font-mono text-base">8.</span>
                Contact Information
              </h2>
              <p>
                For any questions or legal inquiries regarding these Terms & Conditions, please contact:
              </p>
              <div className="p-4 rounded-2xl bg-[#f8f7fc] border border-slate-200/80 inline-block">
                <p className="font-bold text-slate-900">RentTracker Legal Inquiries</p>
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
