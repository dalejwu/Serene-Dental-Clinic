"use client";

import React from "react";
import {
  Calendar,
  Phone,
  Sparkles,
  ArrowRight,
  Star,
  Award,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { ToothMark } from "@/components/BrandLogo";

interface HeroProps {
  onOpenBooking: () => void;
  onOpenExpressBooking?: () => void;
}

export default function Hero({ onOpenBooking, onOpenExpressBooking }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-[#fbf8f2] via-white to-[#f8fbfd]">
      {/* Decorative Fluid Marble Watercolor Elements matching business card aesthetic */}
      <div className="absolute top-0 left-0 w-[450px] h-[550px] bg-gradient-to-br from-sky-200/30 via-cyan-100/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-amber-100/40 via-yellow-50/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Clean Floating Card matching business card design cues */}
          <div className="lg:col-span-6 relative z-10">
            <div className="relative serene-card-frame bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-9 shadow-2xl shadow-amber-950/5 border border-[#ede2d1] space-y-5">

              {/* Bold Title with Script Accent */}
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-extrabold tracking-tight text-slate-900 leading-[1.12] text-balance">
                  {t.hero.titleStart}{" "}
                  <span className="font-script text-4xl sm:text-6xl lg:text-[62px] font-normal text-gold-gradient inline-block transform translate-y-1 whitespace-nowrap">
                    {t.hero.titleHighlight}
                  </span>
                </h1>
                <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#996515] pt-0.5">
                  General Dentistry • Orthodontics • Oral Surgery • Cosmetic
                </p>
              </div>

              {/* Short friendly description */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-[55ch]">
                {t.hero.description}
              </p>

              {/* Reassuring Clinical Trust Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-0.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-[#fdfaf3] px-2.5 py-1.5 rounded-xl border border-[#ede2d1]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#b8860b] shrink-0" />
                  <span>Swiss Airflow®</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-[#fdfaf3] px-2.5 py-1.5 rounded-xl border border-[#ede2d1]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#b8860b] shrink-0" />
                  <span>₱0 Booking Fee</span>
                </div>
                <div className="col-span-2 sm:col-span-1 flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-[#fdfaf3] px-2.5 py-1.5 rounded-xl border border-[#ede2d1]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#b8860b] shrink-0" />
                  <span>Walk-ins Welcome</span>
                </div>
              </div>

              {/* Action Buttons: Book Online & Call */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#dfba6b] via-[#c5a059] to-[#a07823] hover:from-[#e8c679] hover:via-[#d4af37] hover:to-[#b3882a] text-slate-950 font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl shadow-lg shadow-amber-900/15 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border border-amber-200/50 whitespace-nowrap shrink-0"
                >
                  <Calendar className="w-5 h-5 text-slate-900 shrink-0" />
                  <span className="whitespace-nowrap">{t.hero.ctaBook}</span>
                  <ArrowRight className="w-4 h-4 text-slate-800 ml-1 shrink-0" />
                </button>

                <a
                  href="tel:09992258329"
                  className="inline-flex items-center justify-center gap-2 bg-sky-50/80 hover:bg-sky-100/90 text-sky-950 font-bold text-sm sm:text-base px-4 sm:px-5 py-3.5 rounded-2xl border border-sky-200/80 shadow-2xs hover:shadow-xs transition-all tabular-nums whitespace-nowrap shrink-0"
                >
                  <div className="w-5 h-5 rounded-full bg-[#0284c7] flex items-center justify-center text-white shrink-0">
                    <Phone className="w-3 h-3" />
                  </div>
                  <span className="whitespace-nowrap">0999 225 8329</span>
                </a>
              </div>

              {/* Social Proof Avatars Row */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex -space-x-2.5 overflow-hidden shrink-0">
                    <img
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
                      alt="Patient 1"
                      width={40}
                      height={40}
                      loading="lazy"
                      decoding="async"
                    />
                    <img
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
                      alt="Patient 2"
                      width={40}
                      height={40}
                      loading="lazy"
                      decoding="async"
                    />
                    <img
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
                      alt="Patient 3"
                      width={40}
                      height={40}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#a07823] text-white font-bold text-xs ring-2 ring-white">
                      +
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="font-extrabold text-xs sm:text-sm text-slate-900 leading-tight truncate">
                      2,500+ {t.services.statPatientsText}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1 tabular-nums">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-400 shrink-0" />
                      <span>{t.hero.ratingText}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right hidden sm:block shrink-0">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#fcf8f0] text-[#8c6210] border border-[#eadbc3] whitespace-nowrap">
                    {t.services.hmoCoveredBadge}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Clean Photographic Focus with Floating Brand Emblem Badge */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none">
              
              {/* Photo Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-amber-950/10 border border-[#ede2d1] aspect-[4/3] lg:aspect-[5/4] bg-slate-100">
                <img
                  src="/images/hero_dentist.jpg"
                  alt="Friendly Resident Dentist at Serene Dental Clinic"
                  width={600}
                  height={480}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover object-top sm:object-center"
                />

                {/* Floating Signature Doctor Pill - Solid high-contrast background neatly pinned to bottom-left inside frame */}
                <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl shadow-xl shadow-slate-900/15 border border-[#ede2d1] flex items-center gap-3 max-w-[calc(100%-1.5rem)] sm:max-w-xs z-10">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-b from-[#fffefc] to-[#fbf5e8] border border-[#eadbc3] flex items-center justify-center shrink-0 shadow-2xs p-1">
                    <ToothMark size={28} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">Dr. Liam Hayes, DMD</div>
                    <div className="text-[11px] text-[#b8860b] font-semibold truncate">{t.hero.onDutyTitle}</div>
                    <div className="text-[10px] text-slate-500 truncate">Specialist in Aesthetic Dentistry</div>
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
