"use client";

import React from "react";
import {
  Calendar,
  Sparkles,
  Star,
  Award,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { ToothMark } from "@/components/BrandLogo";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-14 sm:pt-20 lg:pt-24 xl:pt-28 pb-16 sm:pb-20 lg:pb-24 bg-gradient-to-b from-[#fbf8f2] via-white to-[#f8fbfd]">
      {/* Decorative Fluid Marble Watercolor Elements matching business card aesthetic */}
      <div className="absolute top-0 left-0 w-[450px] h-[550px] bg-gradient-to-br from-sky-200/30 via-cyan-100/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-amber-100/40 via-yellow-50/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Direct Canvas Layout with Editorial Typography (No Boxed Card) */}
          <div className="lg:col-span-7 relative z-10 space-y-6">
            
            {/* Real Clinic Location & Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50/80 border border-amber-200/60 text-xs font-semibold text-[#8c6210]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Mayor Jaldon St., Canelar • Zamboanga City</span>
            </div>

            {/* Editorial Title with Refined Serif Accent - 1 Row Layout across all languages */}
            <div className="space-y-2 min-h-[76px] sm:min-h-[84px] lg:min-h-[92px] flex flex-col justify-start">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[44px] font-extrabold tracking-tight text-slate-900 leading-tight sm:whitespace-nowrap">
                {t.hero.titleStart}{" "}
                <span className="font-serif italic font-normal text-[#996515] inline whitespace-nowrap">
                  {t.hero.titleHighlight}
                </span>
              </h1>
              <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#996515]">
                General Dentistry • Orthodontics • Oral Surgery • Aesthetic Care
              </p>
            </div>

            {/* Short friendly clinic introduction - Stable height container */}
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-[54ch] min-h-[88px] sm:min-h-[84px] lg:min-h-[80px]">
              {t.hero.description}
            </p>

            {/* Action Buttons & Verified Accreditation */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full sm:w-[220px] inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#dfba6b] via-[#c5a059] to-[#a07823] hover:from-[#e8c679] hover:via-[#d4af37] hover:to-[#b3882a] text-slate-950 font-bold text-sm sm:text-base h-12 rounded-2xl shadow-lg shadow-amber-900/15 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-transform cursor-pointer border border-amber-200/50 whitespace-nowrap shrink-0"
              >
                <Calendar className="w-5 h-5 text-slate-900 shrink-0" />
                <span className="whitespace-nowrap">{t.hero.ctaBook}</span>
              </button>

              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-white/90 px-3.5 py-3 rounded-2xl border border-[#ede2d1] shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[#996515] shrink-0" />
                <span>Swiss EMS Airflow® & HMO Accredited</span>
              </div>
            </div>

            {/* Grounded Clinic Hours Bar */}
            <div className="pt-4 border-t border-slate-200/70 flex items-center gap-3.5 text-xs text-slate-500 flex-wrap">
              <span className="font-semibold text-slate-700">Mon – Sat: 9:00 AM – 5:00 PM</span>
              <span className="text-slate-300">•</span>
              <span>Across Honda Motors, Canelar</span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="hidden sm:inline font-medium text-[#8c6210]">By Appointment Only</span>
            </div>

          </div>

          {/* Right Column: Clean Photographic Focus with Refined Doctor Badge */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none">
              
              {/* Photo Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-amber-950/10 border border-[#ede2d1] aspect-[4/3] lg:aspect-[5/4] bg-slate-100">
                <img
                  src="/images/hero_dentist.webp"
                  alt="Friendly Resident Dentist at Serene Dental Clinic"
                  width={600}
                  height={480}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover object-top sm:object-center"
                />

                {/* Refined Doctor Badge - Clean Minimalist Floating Card */}
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 right-3 sm:right-auto bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl shadow-slate-900/15 border border-[#ede2d1] flex items-center gap-3 max-w-sm z-10">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#fffefc] to-[#fbf5e8] border border-[#eadbc3] flex items-center justify-center shrink-0 shadow-2xs p-1">
                    <ToothMark size={26} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">Dr. Liam Hayes, DMD</div>
                    <div className="text-[11px] text-[#996515] font-semibold truncate">{t.hero.onDutyTitle}</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
