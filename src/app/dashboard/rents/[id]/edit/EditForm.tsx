"use client";

import { useState } from "react";
import { ArrowLeft, Home, Building, Tent, Castle, Hotel } from "lucide-react";
import Link from "next/link";
import { updateRentAgreement, deleteRentAgreement } from "@/actions/rentActions";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const ICONS = [
  { name: "Home", icon: <Home size={24} /> },
  { name: "Building", icon: <Building size={24} /> },
  { name: "Tent", icon: <Tent size={24} /> },
  { name: "Castle", icon: <Castle size={24} /> },
  { name: "Hotel", icon: <Hotel size={24} /> },
];

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      disabled={pending}
      className="bg-violet-500 hover:bg-violet-600 text-white rounded-xl px-8 shadow-sm shadow-violet-200"
    >
      {pending ? "Saving..." : "Save Changes"}
    </Button>
  );
}

interface EditFormProps {
  id: string;
  address: string;
  icon: string;
  startDate: string;
  endDate: string;
  rentAmount: number;
  bondAmount: number;
  rentDueDays: number;
}

export default function EditForm({
  id, address, icon, startDate, endDate, rentAmount, bondAmount, rentDueDays
}: EditFormProps) {
  const [selectedIcon, setSelectedIcon] = useState(icon);

  return (
    <div className="animate-in fade-in duration-500 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href={`/dashboard/rents/${id}`}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-500 hover:bg-violet-50 hover:text-violet-600 transition-colors shadow-sm"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Edit Agreement</h1>
          <p className="text-slate-400 font-medium">Update your lease details</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100/60 p-6 md:p-10">
        <form action={updateRentAgreement} className="space-y-6">
          <input type="hidden" name="id" value={id} />

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600">Property Address</label>
            <input 
              required
              name="address"
              type="text"
              defaultValue={address}
              className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-violet-400 outline-none transition-all"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-600">Property Icon</label>
            <div className="flex gap-4">
              {ICONS.map((ico) => (
                <button
                  key={ico.name}
                  type="button"
                  onClick={() => setSelectedIcon(ico.name)}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                    selectedIcon === ico.name 
                      ? "bg-violet-500 text-white shadow-md shadow-violet-200 scale-105" 
                      : "bg-slate-50 text-slate-400 hover:bg-violet-50"
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
              <label className="text-sm font-bold text-slate-600">Start Date</label>
              <input 
                required
                name="startDate"
                type="date"
                defaultValue={startDate}
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-violet-400 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-600">End Date (Optional)</label>
              <input 
                name="endDate"
                type="date"
                defaultValue={endDate}
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-violet-400 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-600">Total Rent Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-slate-300 font-bold">$</span>
                <input 
                  required
                  name="rentAmount"
                  type="number"
                  min="0"
                  step="0.01"
                  defaultValue={rentAmount}
                  className="w-full bg-slate-50 border-none rounded-xl pl-8 pr-4 py-3 text-slate-800 focus:ring-2 focus:ring-violet-400 outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-600">Total Bond Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-slate-300 font-bold">$</span>
                <input 
                  required
                  name="bondAmount"
                  type="number"
                  min="0"
                  step="0.01"
                  defaultValue={bondAmount}
                  className="w-full bg-slate-50 border-none rounded-xl pl-8 pr-4 py-3 text-slate-800 focus:ring-2 focus:ring-violet-400 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600">Rent Period (Days)</label>
            <select 
              name="rentDueDays" 
              defaultValue={rentDueDays}
              className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-violet-400 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="7">Weekly (7 days)</option>
              <option value="14">Fortnightly (14 days)</option>
              <option value="30">Monthly (30 days)</option>
            </select>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={async () => {
                if (confirm("Are you sure you want to delete this agreement? This action cannot be undone and will delete all related payments and tenants.")) {
                  await deleteRentAgreement(id);
                }
              }}
              className="text-rose-500 hover:text-rose-600 font-medium flex items-center gap-2 px-2"
            >
              <Trash2 size={18} />
              <span className="hidden sm:inline">Delete Agreement</span>
            </button>
            <div className="flex items-center gap-4">
              <Link 
                href={`/dashboard/rents/${id}`}
                className="text-slate-400 hover:text-slate-600 px-4 font-medium"
              >
                Cancel
              </Link>
              <SaveButton />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
