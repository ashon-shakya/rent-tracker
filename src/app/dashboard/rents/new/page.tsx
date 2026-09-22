"use client";

import { useState } from "react";
import { Home, Building, Tent, Castle, Hotel } from "lucide-react";
import { createRentAgreement } from "@/actions/rentActions";
import { SubmitButton } from "./SubmitButton";

const ICONS = [
  { name: "Home", icon: <Home size={24} /> },
  { name: "Building", icon: <Building size={24} /> },
  { name: "Tent", icon: <Tent size={24} /> },
  { name: "Castle", icon: <Castle size={24} /> },
  { name: "Hotel", icon: <Hotel size={24} /> },
];

export default function AddRentPage() {
  const [selectedIcon, setSelectedIcon] = useState("Home");

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Add Rent Agreement</h1>
          <p className="text-slate-500 font-medium">Create a new shared lease</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-50 p-6 md:p-10 max-w-2xl">
        <form action={createRentAgreement} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Property Address</label>
            <input 
              required
              name="address"
              type="text" 
              placeholder="e.g. 123 Main St, Apt 4B"
              className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700">Property Icon</label>
            <div className="flex gap-4">
              {ICONS.map((ico) => (
                <button
                  key={ico.name}
                  type="button"
                  onClick={() => setSelectedIcon(ico.name)}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                    selectedIcon === ico.name 
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200 scale-105" 
                      : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                  }`}
                >
                  {ico.icon}
                </button>
              ))}
            </div>
            <input type="hidden" name="icon" value={selectedIcon} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Start Date</label>
              <input 
                required
                name="startDate"
                type="date" 
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">End Date (Optional)</label>
              <input 
                name="endDate"
                type="date" 
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Total Rent Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-slate-400 font-bold">$</span>
                  <input 
                  required
                  name="rentAmount"
                  type="number" 
                  min="0"
                  step="0.01"
                  placeholder="2000"
                  className="w-full bg-slate-50 border-none rounded-xl pl-8 pr-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Total Bond Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-slate-400 font-bold">$</span>
                <input 
                  required
                  name="bondAmount"
                  type="number" 
                  min="0"
                  step="0.01"
                  placeholder="4000"
                  className="w-full bg-slate-50 border-none rounded-xl pl-8 pr-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Rent Due Every (Days)</label>
            <select name="rentDueDays" className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none transition-all appearance-none cursor-pointer">
              <option value="7">Weekly (7 days)</option>
              <option value="14">Fortnightly (14 days)</option>
              <option value="30">Monthly (30 days)</option>
            </select>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-4">
            <a 
              href="/dashboard/rents"
              className="text-slate-500 hover:text-slate-700 px-4 font-medium"
            >
              Cancel
            </a>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
