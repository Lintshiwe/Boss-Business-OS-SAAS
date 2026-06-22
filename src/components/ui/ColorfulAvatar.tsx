"use client";

// Generates a consistent colorful gradient avatar from a name string
// Each name gets a unique gradient based on its hash

const gradients = [
  "linear-gradient(135deg, #f43f5e, #ec4899)",   // rose → pink
  "linear-gradient(135deg, #f97316, #f59e0b)",   // orange → amber
  "linear-gradient(135deg, #eab308, #84cc16)",   // yellow → lime
  "linear-gradient(135deg, #22c55e, #10b981)",   // green → emerald
  "linear-gradient(135deg, #06b6d4, #3b82f6)",   // cyan → blue
  "linear-gradient(135deg, #8b5cf6, #a855f7)",   // violet → purple
  "linear-gradient(135deg, #ec4899, #8b5cf6)",   // pink → violet
  "linear-gradient(135deg, #14b8a6, #06b6d4)",   // teal → cyan
  "linear-gradient(135deg, #f43f5e, #f97316)",   // rose → orange
  "linear-gradient(135deg, #3b82f6, #8b5cf6)",   // blue → violet
  "linear-gradient(135deg, #10b981, #06b6d4)",   // emerald → cyan
  "linear-gradient(135deg, #f59e0b, #ef4444)",   // amber → red
  "linear-gradient(135deg, #a855f7, #ec4899)",   // purple → pink
  "linear-gradient(135deg, #0ea5e9, #6366f1)",   // sky → indigo
  "linear-gradient(135deg, #84cc16, #22c55e)",   // lime → green
  "linear-gradient(135deg, #ef4444, #a855f7)",   // red → purple
];

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

interface ColorfulAvatarProps {
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  ring?: boolean;
  showOnline?: boolean;
}

const sizeClasses = {
  xs: "w-7 h-7 text-[10px]",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-lg",
};

export default function ColorfulAvatar({
  name,
  size = "md",
  className = "",
  ring = false,
  showOnline = false,
}: ColorfulAvatarProps) {
  const gradient = gradients[hashName(name) % gradients.length];
  const initials = getInitials(name);

  return (
    <div className={`relative inline-flex ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-bold text-white shadow-md ${
          ring ? "ring-2 ring-white shadow-lg" : ""
        }`}
        style={{ background: gradient }}
      >
        {initials}
      </div>
      {showOnline && (
        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full" />
      )}
    </div>
  );
}
