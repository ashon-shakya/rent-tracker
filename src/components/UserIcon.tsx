import { User, Smile, Ghost, Sparkles, Star, Zap, Crown, Flame, Gem, Heart, Moon } from "lucide-react";

export const USER_ICONS = [
  { name: "User", icon: <User size={24} /> },
  { name: "Smile", icon: <Smile size={24} /> },
  { name: "Ghost", icon: <Ghost size={24} /> },
  { name: "Sparkles", icon: <Sparkles size={24} /> },
  { name: "Star", icon: <Star size={24} /> },
  { name: "Zap", icon: <Zap size={24} /> },
  { name: "Crown", icon: <Crown size={24} /> },
  { name: "Flame", icon: <Flame size={24} /> },
  { name: "Gem", icon: <Gem size={24} /> },
  { name: "Heart", icon: <Heart size={24} /> },
  { name: "Moon", icon: <Moon size={24} /> },
];

export function getUserIcon(iconName?: string, size: number = 24) {
  const iconObj = USER_ICONS.find(i => i.name === iconName);
  
  if (iconObj) {
    // Clone element to apply size if needed, but for simplicity we can just return the match.
    // However, our array hardcodes size 24. A robust way is returning a new element.
    switch (iconName) {
      case "Smile": return <Smile size={size} />;
      case "Ghost": return <Ghost size={size} />;
      case "Sparkles": return <Sparkles size={size} />;
      case "Star": return <Star size={size} />;
      case "Zap": return <Zap size={size} />;
      case "Crown": return <Crown size={size} />;
      case "Flame": return <Flame size={size} />;
      case "Gem": return <Gem size={size} />;
      case "Heart": return <Heart size={size} />;
      case "Moon": return <Moon size={size} />;
      default: return <User size={size} />;
    }
  }
  
  return null;
}
