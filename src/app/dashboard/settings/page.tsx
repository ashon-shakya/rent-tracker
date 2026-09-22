"use client";

import { Save, User, Bell, Shield, Key } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function SettingsPage() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "";
  const userEmail = session?.user?.email || "";
  const initial = session?.user?.name?.[0] || session?.user?.email?.[0] || "U";
  
  const [loading, setLoading] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Settings saved successfully!");
    }, 1000);
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-500 font-medium">Manage your account preferences</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Settings Navigation */}
        <div className="lg:w-64 space-y-2">
          <SettingsTab icon={<User size={18} />} label="Profile Details" active />
          <SettingsTab icon={<Bell size={18} />} label="Notifications" />
          <SettingsTab icon={<Shield size={18} />} label="Privacy & Security" />
          <SettingsTab icon={<Key size={18} />} label="Connected Accounts" />
        </div>

        {/* Settings Form */}
        <div className="flex-1 bg-white rounded-[2rem] shadow-sm border border-slate-50 p-6 md:p-10">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Profile Details</h2>
          
          <form onSubmit={handleSave} className="space-y-6">
            
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold border-4 border-white shadow-sm uppercase">
                {initial}
              </div>
              <div>
                <button type="button" className="text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-xl transition-colors">
                  Change Photo
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Full Name</label>
                <input 
                  type="text" 
                  defaultValue={userName}
                  className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Email Address</label>
                <input 
                  type="email" 
                  defaultValue={userEmail}
                  disabled
                  className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed outline-none"
                />
                <p className="text-xs font-medium text-slate-400 mt-1">Email cannot be changed since you are using Google Authentication.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                />
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 flex justify-end">
              <button 
                type="submit" 
                disabled={loading}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-sm shadow-blue-200 disabled:opacity-70"
              >
                <Save size={18} />
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}

function SettingsTab({ icon, label, active }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors text-left ${
      active 
        ? "bg-white text-blue-600 shadow-sm font-bold" 
        : "text-slate-500 hover:bg-slate-50 font-medium"
    }`}>
      {icon}
      <span>{label}</span>
    </button>
  );
}
