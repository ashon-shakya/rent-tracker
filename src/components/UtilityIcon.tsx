import React from "react";
import {
  Flame,
  Zap,
  Wifi,
  Droplet,
  Trash2,
  Sun,
  Tv,
  Gauge,
  Plug,
  Shield,
  Thermometer,
  Wrench,
} from "lucide-react";

export const UTILITY_CATEGORIES = [
  { id: "gas", name: "Gas Usage", defaultIcon: "Flame" },
  { id: "electricity", name: "Electricity", defaultIcon: "Zap" },
  { id: "internet", name: "Internet / Broadband", defaultIcon: "Wifi" },
  { id: "water", name: "Water", defaultIcon: "Droplet" },
  { id: "trash", name: "Trash & Recycling", defaultIcon: "Trash2" },
  { id: "solar", name: "Solar Energy", defaultIcon: "Sun" },
  { id: "tv", name: "Cable / TV", defaultIcon: "Tv" },
  { id: "heating", name: "Heating & HVAC", defaultIcon: "Thermometer" },
  { id: "ev", name: "Power & EV", defaultIcon: "Plug" },
  { id: "security", name: "Security System", defaultIcon: "Shield" },
  { id: "meter", name: "Sub-meter", defaultIcon: "Gauge" },
  { id: "other", name: "Other Service", defaultIcon: "Wrench" },
];

export const UTILITY_ICONS = [
  { name: "Flame", label: "Gas", icon: Flame },
  { name: "Zap", label: "Electricity", icon: Zap },
  { name: "Wifi", label: "Internet", icon: Wifi },
  { name: "Droplet", label: "Water", icon: Droplet },
  { name: "Trash2", label: "Trash", icon: Trash2 },
  { name: "Sun", label: "Solar", icon: Sun },
  { name: "Tv", label: "TV/Cable", icon: Tv },
  { name: "Gauge", label: "Meter", icon: Gauge },
  { name: "Plug", label: "Plug/Power", icon: Plug },
  { name: "Shield", label: "Security", icon: Shield },
  { name: "Thermometer", label: "HVAC", icon: Thermometer },
  { name: "Wrench", label: "Service", icon: Wrench },
];

export function getUtilityIcon(
  iconName?: string,
  size: number = 20,
  className: string = "",
  category?: string,
  title?: string
) {
  // 1. Direct match by iconName in UTILITY_ICONS
  if (iconName) {
    const cleanIcon = iconName.trim().toLowerCase();
    const foundIcon = UTILITY_ICONS.find(
      (item) => item.name.toLowerCase() === cleanIcon || item.label.toLowerCase() === cleanIcon
    );
    if (foundIcon) {
      const IconComponent = foundIcon.icon;
      return <IconComponent size={size} className={className} />;
    }
  }

  // 2. Direct match by category in UTILITY_CATEGORIES
  if (category) {
    const cleanCategory = category.trim().toLowerCase();
    const foundCat = UTILITY_CATEGORIES.find(
      (cat) => cat.id.toLowerCase() === cleanCategory || cat.name.toLowerCase() === cleanCategory
    );
    if (foundCat) {
      const foundIcon = UTILITY_ICONS.find(
        (item) => item.name.toLowerCase() === foundCat.defaultIcon.toLowerCase()
      );
      if (foundIcon) {
        const IconComponent = foundIcon.icon;
        return <IconComponent size={size} className={className} />;
      }
    }
  }

  // 3. Fallback candidate keyword search
  const candidates = [iconName, category, title].filter(Boolean) as string[];

  for (const cand of candidates) {
    const key = cand.toLowerCase().trim();

    if (key === "flame" || key.includes("gas") || key.includes("fire")) {
      return <Flame size={size} className={className} />;
    }
    if (key === "droplet" || key.includes("water") || key.includes("hydro")) {
      return <Droplet size={size} className={className} />;
    }
    if (key === "wifi" || key.includes("internet") || key.includes("broadband") || key.includes("nbn") || key.includes("fiber")) {
      return <Wifi size={size} className={className} />;
    }
    if (key === "trash2" || key === "trash" || key.includes("garbage") || key.includes("waste") || key.includes("recycle")) {
      return <Trash2 size={size} className={className} />;
    }
    if (key === "sun" || key.includes("solar")) {
      return <Sun size={size} className={className} />;
    }
    if (key === "tv" || key.includes("cable") || key.includes("television")) {
      return <Tv size={size} className={className} />;
    }
    if (key === "gauge" || key.includes("meter")) {
      return <Gauge size={size} className={className} />;
    }
    if (key === "plug" || key.includes("ev") || key.includes("charger")) {
      return <Plug size={size} className={className} />;
    }
    if (key === "shield" || key.includes("security") || key.includes("alarm")) {
      return <Shield size={size} className={className} />;
    }
    if (key === "thermometer" || key.includes("hvac") || key.includes("heating") || key.includes("air")) {
      return <Thermometer size={size} className={className} />;
    }
    if (key === "wrench" || key.includes("service") || key.includes("maintenance") || key.includes("repair") || key.includes("other")) {
      return <Wrench size={size} className={className} />;
    }
    if (key === "zap" || key.includes("electric") || key.includes("power") || key.includes("energy")) {
      return <Zap size={size} className={className} />;
    }
  }

  return <Zap size={size} className={className} />;
}
