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
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Serene Dental Clinic Golden Tooth Logo"
    >
      <defs>
        {/* Rich metallic multi-stop gold gradient matching the business card */}
        <linearGradient id="goldGradientMain" x1="15%" y1="10%" x2="85%" y2="90%">
          <stop offset="0%" stopColor="#fdf0b5" />
          <stop offset="25%" stopColor="#e5be53" />
          <stop offset="50%" stopColor="#cf9e2f" />
          <stop offset="75%" stopColor="#af7c1b" />
          <stop offset="100%" stopColor="#e5be53" />
        </linearGradient>

        <linearGradient id="goldGradientHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff3c4" />
          <stop offset="50%" stopColor="#dfb242" />
          <stop offset="100%" stopColor="#9a6e14" />
        </linearGradient>

        <linearGradient id="goldGradientShine" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="35%" stopColor="#e8c15a" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#8d6210" stopOpacity="0.1" />
        </linearGradient>

        {/* Soft elegant warm ambient shadow */}
        <filter id="goldGlow" x="-15%" y="-15%" width="130%" height="130%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#996515" floodOpacity="0.25" />
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#d4af37" floodOpacity="0.15" />
        </filter>
      </defs>

      <g filter="url(#goldGlow)">
        {/* 1. Outer Right Cusp, Flank & Right Root */}
        <path
          d="M 104 53 
             C 114 47, 132 40, 150 48 
             C 165 54, 172 70, 169 90
             C 165 116, 161 144, 162 166
             C 162 176, 157 184, 150 183
             C 142 182, 137 172, 134 160
             C 131 147, 126 135, 122 135
             C 120 135, 122 143, 126 157
             C 130 171, 138 190, 150 190
             C 162 190, 171 178, 172 163
             C 173 138, 178 107, 179 86
             C 180 62, 169 44, 149 39
             C 127 34, 110 42, 98 50
             Z"
          fill="url(#goldGradientMain)"
        />

        {/* 2. Top-Left Crown Cusp and Outer Left Flank */}
        <path
          d="M 98 48
             C 86 42, 69 41, 54 50
             C 38 60, 31 77, 33 98
             C 35 120, 42 143, 44 165
             C 45 177, 49 184, 55 184
             C 61 184, 65 176, 64 165
             C 63 151, 57 135, 54 117
             C 52 102, 51 86, 59 73
             C 66 62, 79 56, 92 56
             C 97 56, 103 58, 107 60
             C 104 54, 101 50, 98 48
             Z"
          fill="url(#goldGradientMain)"
        />

        {/* 3. The Grand Signature "S" Ribbon traversing the Tooth */}
        <path
          d="M 50 63
             C 58 52, 72 44, 88 44
             C 106 44, 116 53, 112 66
             C 108 77, 95 86, 78 94
             C 54 105, 41 118, 43 135
             C 46 153, 62 165, 84 168
             C 109 171, 134 162, 153 148
             C 156 146, 159 148, 157 152
             C 136 169, 107 179, 81 176
             C 54 173, 34 157, 31 133
             C 29 111, 45 96, 71 85
             C 89 77, 101 68, 104 59
             C 106 51, 98 47, 85 48
             C 71 49, 58 56, 50 63
             Z"
          fill="url(#goldGradientHighlight)"
        />

        {/* 4. Left Root Extension & Inner Root Notch */}
        <path
          d="M 72 167
             C 70 178, 64 190, 56 190
             C 49 190, 44 183, 43 173
             C 41 155, 48 138, 51 122
             C 53 135, 58 149, 64 160
             C 67 165, 70 170, 72 174
             Z"
          fill="url(#goldGradientMain)"
        />

        {/* 5. Delicate Gold Ribbon Light Reflection Sheen */}
        <path
          d="M 57 56 
             C 69 48, 83 46, 95 48
             C 90 49, 78 53, 67 60
             C 58 67, 52 74, 49 82
             C 47 72, 51 62, 57 56
             Z"
          fill="url(#goldGradientShine)"
        />
        <path
          d="M 145 52
             C 158 57, 166 69, 164 85
             C 162 72, 154 62, 143 56
             Z"
          fill="url(#goldGradientShine)"
        />
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
          {/* Cursive Brand Title */}
          <div className="font-script text-2xl sm:text-3xl leading-none text-[#b8860b] tracking-wide filter drop-shadow-xs">
            Serene Smile
          </div>
          {/* Subtitle / Department */}
          <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#996515] leading-tight mt-0.5">
            Dental Clinic
          </div>
        </div>
      )}
    </div>
  );
}
