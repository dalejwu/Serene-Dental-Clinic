import React from "react";

interface BrandLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textClassName?: string;
  variant?: "full" | "mark";
}

/**
 * Serene Dental Clinic - Official Emblem Logo
 * Precision SVG rendition of the gold ribbon tooth contour intertwined with the 'S' monogram
 */
export function ToothMark({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Serene Dental Clinic Golden Tooth Logo"
    >
      <defs>
        {/* Rich metallic multi-stop gold gradient matching the clinic branding */}
        <linearGradient id="sereneGoldMain" x1="10%" y1="10%" x2="90%" y2="90%">
          <stop offset="0%" stopColor="#fff5cc" />
          <stop offset="25%" stopColor="#f3cb65" />
          <stop offset="50%" stopColor="#d4a034" />
          <stop offset="75%" stopColor="#a67319" />
          <stop offset="100%" stopColor="#e0b246" />
        </linearGradient>

        <linearGradient id="sereneGoldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#fae49d" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#c59226" stopOpacity="0.8" />
        </linearGradient>

        {/* Soft elegant warm ambient glow */}
        <filter id="sereneGlow" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#7c530b" floodOpacity="0.28" />
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#d4a034" floodOpacity="0.2" />
        </filter>
      </defs>

      <g filter="url(#sereneGlow)">
        {/* 1. Main Harmonious Tooth Contour with Bilateral Cusps & Dual Roots */}
        <path
          d="M 50 23
             C 41 15, 26 16, 21 28
             C 16 38, 18 56, 26 73
             C 30 81, 36 87, 42 87
             C 46 87, 48 81, 46 72
             C 45 61, 47 52, 50 52
             C 53 52, 55 61, 54 72
             C 52 81, 54 87, 58 87
             C 64 87, 70 81, 74 73
             C 82 56, 84 38, 79 28
             C 74 16, 59 15, 50 23
             Z"
          fill="url(#sereneGoldMain)"
        />

        {/* 2. Elegant 'S' Curve & Radiant Smile Ribbon traversing the tooth */}
        <path
          d="M 32 35
             C 40 27, 58 29, 64 39
             C 68 45, 66 52, 58 57
             C 48 63, 38 68, 41 76
             C 43 82, 50 84, 57 82
             C 61 80, 64 77, 66 74
             C 65 77, 60 84, 52 85
             C 43 86, 36 81, 35 73
             C 33 63, 44 57, 54 52
             C 62 48, 64 43, 60 38
             C 56 32, 42 30, 34 37
             Z"
          fill="url(#sereneGoldRibbon)"
        />

        {/* 3. Diamond Sparkle Accent on Upper Right Cusp */}
        <path
          d="M 77 15
             C 77 20, 79 22, 84 22
             C 79 22, 77 24, 77 29
             C 77 24, 75 22, 70 22
             C 75 22, 77 20, 77 15
             Z"
          fill="#ffffff"
        />
        <circle cx="77" cy="22" r="1.5" fill="#fff8db" />
      </g>
    </svg>
  );
}

/**
 * Complete Serene Dental Clinic Brand Logo (Tooth Mark + Calligraphy Wordmark)
 */
export default function BrandLogo({
  className = "",
  size = 44,
  showText = true,
  textClassName = "",
  variant = "full",
}: BrandLogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Golden Tooth + S Emblem with Luxury Soft Shadow */}
      <div className="relative shrink-0 flex items-center justify-center">
        <ToothMark size={size} />
      </div>

      {showText && (
        <div className={`whitespace-nowrap flex flex-col justify-center ${textClassName}`}>
          {/* Editorial Brand Title */}
          <div className="font-serif italic font-medium text-xl sm:text-2xl leading-none text-slate-900 tracking-tight">
            Serene Smile
          </div>
          {/* Subtitle / Department */}
          <div className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] text-[#996515] leading-tight mt-1">
            Dental Clinic
          </div>
        </div>
      )}
    </div>
  );
}
