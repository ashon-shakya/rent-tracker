import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="min-h-screen bg-[#f3f4f9] text-slate-900 font-sans selection:bg-blue-100">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-sm">
            R
          </div>
          <span className="text-xl font-bold text-slate-900">RentTracker</span>
        </div>
        <div className="flex gap-4">
          <Link href="#about" className="hidden sm:block text-slate-600 hover:text-blue-600 font-medium px-4 py-2 transition-colors">
            About
          </Link>
          <Link href="#contact" className="hidden sm:block text-slate-600 hover:text-blue-600 font-medium px-4 py-2 transition-colors">
            Contact
          </Link>
          {session ? (
            <Link href="/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 shadow-sm">
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/api/auth/signin">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 shadow-sm">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 max-w-6xl mx-auto flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl leading-tight">
          Manage your shared rent, <span className="text-blue-600">stress free.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
          The all-in-one dashboard to track rent agreements, split bonds, log payments, and collaborate with your roommates in absolute harmony.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
          {session ? (
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200 transition-all">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/api/auth/signin" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200 transition-all">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need in one place</h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">Say goodbye to confusing excel sheets and forgotten payments.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Track Payments"
              description="Keep a detailed log of every rent period, who paid, and when it's due next. Visualized beautifully."
            />
            <FeatureCard 
              title="Split the Bond"
              description="Easily calculate and track bond shares among multiple tenants in a lease so everyone knows what they are owed."
            />
            <FeatureCard 
              title="Invite Roommates"
              description="Share the rent agreement with your roommates so everyone stays on the same page and gets notified."
            />
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">Designed for modern living</h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              We built RentTracker with the same aesthetic you expect from your favorite apps. Soft corners, clear typography, and a soothing color palette. It's not just a tool; it's a pleasant experience.
            </p>
            <ul className="space-y-3 pt-4">
              <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-blue-600" size={20} /> Real-time payment tracking</li>
              <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-blue-600" size={20} /> Secure Google Authentication</li>
              <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-blue-600" size={20} /> Beautiful mobile-first design</li>
            </ul>
          </div>
          <div className="flex-1 w-full bg-[#f8f9fc] rounded-[2rem] p-8 flex items-center justify-center border border-slate-100 min-h-[300px]">
            {/* Abstract UI representation */}
            <div className="w-full max-w-sm space-y-4">
              <div className="h-16 bg-white rounded-2xl shadow-sm flex items-center px-4 gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full"></div>
                <div className="h-4 bg-slate-100 rounded flex-1"></div>
              </div>
              <div className="h-32 bg-white rounded-2xl shadow-sm p-4 flex flex-col justify-between">
                <div className="h-4 w-1/3 bg-slate-100 rounded"></div>
                <div className="h-8 w-1/2 bg-blue-50 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Get in touch</h2>
            <p className="text-slate-500 font-medium">Have questions or need help setting up your lease? We're here for you.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center gap-3 p-6">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-2">
                <Mail size={24} />
              </div>
              <h3 className="font-bold text-slate-900">Email Us</h3>
              <p className="text-slate-500 text-sm">support@renttracker.com</p>
            </div>
            <div className="flex flex-col items-center gap-3 p-6">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-2">
                <Phone size={24} />
              </div>
              <h3 className="font-bold text-slate-900">Call Us</h3>
              <p className="text-slate-500 text-sm">+1 (555) 123-4567</p>
            </div>
            <div className="flex flex-col items-center gap-3 p-6">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-2">
                <MapPin size={24} />
              </div>
              <h3 className="font-bold text-slate-900">Visit Us</h3>
              <p className="text-slate-500 text-sm">123 Tech Lane, CA 90001</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-400 text-sm font-medium border-t border-slate-100 bg-[#f8f9fc]">
        &copy; {new Date().getFullYear()} RentTracker. All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string, description: string }) {
  return (
    <div className="bg-[#f8f9fc] p-8 rounded-[2rem] border border-slate-50 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300">
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed font-medium">{description}</p>
    </div>
  );
}
