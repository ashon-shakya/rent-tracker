"use client";

import { Save, User, Bell, Shield, Key } from "lucide-react";
import { useState } from "react";
import { updateUserProfile } from "@/actions/userActions";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { USER_ICONS, getUserIcon } from "@/components/UserIcon";

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      disabled={pending}
      className="flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-sm shadow-violet-200"
    >
      <Save size={18} />
      {pending ? "Saving..." : "Save Changes"}
    </Button>
  );
}

interface SettingsFormProps {
  name: string;
  email: string;
  initial: string;
  icon: string;
}

export default function SettingsForm({ name, email, initial, icon }: SettingsFormProps) {
  const [selectedIcon, setSelectedIcon] = useState(icon || "");
  const [showIconPicker, setShowIconPicker] = useState(false);

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
          
          <form action={updateUserProfile} className="space-y-6">
            <input type="hidden" name="icon" value={selectedIcon} />
            
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-3xl font-bold border-4 border-white shadow-sm uppercase">
                  {selectedIcon ? getUserIcon(selectedIcon, 36) : initial}
                </div>
                <div>
                  <button 
                    type="button" 
                    onClick={() => setShowIconPicker(!showIconPicker)}
                    className="text-sm font-bold text-violet-600 hover:text-violet-700 bg-violet-50 px-4 py-2 rounded-xl transition-colors"
                  >
                    Change Icon
                  </button>
                </div>
              </div>
              
              {showIconPicker && (
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <p className="text-sm font-bold text-slate-600 mb-3">Choose a profile icon:</p>
                  <div className="flex flex-wrap gap-3">
                    {USER_ICONS.map((ico) => (
                      <button
                        key={ico.name}
                        type="button"
                        onClick={() => setSelectedIcon(ico.name)}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                          selectedIcon === ico.name 
                            ? "bg-violet-500 text-white shadow-md scale-105" 
                            : "bg-white text-slate-400 hover:bg-slate-100 border border-slate-200"
                        }`}
                      >
                        {ico.icon}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setSelectedIcon("")}
                      className={`px-3 h-12 rounded-xl flex items-center justify-center transition-all text-sm font-bold ${
                        selectedIcon === "" 
                          ? "bg-violet-500 text-white shadow-md scale-105" 
                          : "bg-white text-slate-400 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      Use Initial
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  defaultValue={name}
                  className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-violet-400 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Email Address</label>
                <input 
                  type="email" 
                  defaultValue={email}
                  disabled
                  className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed outline-none"
                />
                <p className="text-xs font-medium text-slate-400 mt-1">Email cannot be changed since you are using Google Authentication.</p>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 flex justify-end">
              <SaveButton />
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}

function SettingsTab({ icon, label, active }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button type="button" className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors text-left ${
      active 
        ? "bg-white text-violet-600 shadow-sm font-bold" 
        : "text-slate-500 hover:bg-slate-50 font-medium"
    }`}>
      {icon}
      <span>{label}</span>
    </button>
  );
}
