"use client";

import React, { useState } from "react";
import { Phone, Calendar, Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { ToothMark } from "@/components/BrandLogo";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-900/10 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* 1. Official Brand Logo with Golden Tooth + S Monogram & Script Wordmark */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-b from-[#fffefc] to-[#fcf7ec] border border-[#eadbbf] flex items-center justify-center shadow-md shadow-amber-950/5 group-hover:scale-105 transition-transform shrink-0 p-1">
              <ToothMark size={30} />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-baseline gap-1.5 sm:gap-2 leading-none">
                <span className="font-script text-2xl sm:text-3xl lg:text-[32px] text-slate-900 tracking-wide font-normal">
                  Serene Smile
                </span>
                <span className="text-[11px] sm:text-xs lg:text-[13px] font-extrabold uppercase tracking-widest text-[#996515] shrink-0">
                  Dental Clinic
                </span>
              </div>
            </div>
          </a>

          {/* 2. Desktop Navigation Links with generous breathing room */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-9 text-sm font-semibold text-slate-700 px-6 xl:px-12">
            <a
              href="#services"
              className="whitespace-nowrap hover:text-[#b8860b] transition-colors py-1.5"
            >
              {t.nav.services}
            </a>
            <a
              href="#specialists"
              className="whitespace-nowrap hover:text-[#b8860b] transition-colors py-1.5"
            >
              {t.nav.dentists}
            </a>
            <a
              href="#why-us"
              className="whitespace-nowrap hover:text-[#b8860b] transition-colors py-1.5"
            >
              {t.nav.whyUs}
            </a>
            <a
              href="#info"
              className="whitespace-nowrap hover:text-[#b8860b] transition-colors py-1.5"
            >
              {t.nav.info}
            </a>
          </nav>

          {/* 3. Right Side: Streamlined Controls with Compact Segmented Pill */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-2.5 lg:gap-3 shrink-0">
            
            {/* Philippine Language Switcher - Compact Segmented Pill */}
            <div className="h-9 p-0.5 bg-[#fcf9f2] rounded-xl border border-[#eadbbf] flex items-center shrink-0">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`h-7 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                  language === "en"
                    ? "bg-white text-[#8c6210] shadow-xs border border-amber-200/80"
                    : "text-slate-500 hover:text-slate-900"
                }`}
                title="English (PH)"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage("fil")}
                className={`h-7 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                  language === "fil"
                    ? "bg-white text-[#8c6210] shadow-xs border border-amber-200/80"
                    : "text-slate-500 hover:text-slate-900"
                }`}
                title="Filipino / Tagalog"
              >
                FIL
              </button>
              <button
                type="button"
                onClick={() => setLanguage("ceb")}
                className={`h-7 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                  language === "ceb"
                    ? "bg-white text-[#8c6210] shadow-xs border border-amber-200/80"
                    : "text-slate-500 hover:text-slate-900"
                }`}
                title="Cebuano / Bisaya"
              >
                CEB
              </button>
            </div>

            {/* Main Booking Button with Lustrous Gold Gradient */}
            <button
              type="button"
              onClick={onOpenBooking}
              className="h-10 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#dfba6b] via-[#c5a059] to-[#a07823] hover:from-[#e8c679] hover:via-[#d4af37] hover:to-[#b3882a] text-slate-950 font-bold text-xs sm:text-sm px-4 sm:px-5 rounded-xl shadow-sm shadow-amber-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0 border border-amber-200/50"
            >
              <Calendar className="w-4 h-4 text-slate-900 shrink-0" />
              <span>{t.nav.bookNow}</span>
            </button>
          </div>

          {/* Mobile & Tablet menu controls */}
          <div className="flex lg:hidden items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setLanguage(language === "en" ? "fil" : language === "fil" ? "ceb" : "en")}
              className="sm:hidden min-h-[44px] min-w-[44px] px-2.5 bg-[#fbf7ee] text-[#8c6210] rounded-xl text-xs font-bold border border-[#eadbbf] flex items-center justify-center cursor-pointer active:scale-95"
              aria-label="Toggle language"
            >
              🇵🇭 {language.toUpperCase()}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-[44px] min-w-[44px] p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center cursor-pointer active:scale-95"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-amber-900/10 px-4 pt-2 pb-6 space-y-4 animate-in slide-in-from-top-2">
          {/* Mobile Language Switcher Row */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-500">Wika / Language:</span>
            <div className="flex items-center gap-1 bg-[#fcf9f2] p-1 rounded-xl border border-[#eadbbf]">
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 text-xs rounded-lg ${
                  language === "en" ? "bg-white font-bold text-[#8c6210] shadow-xs" : "text-slate-600"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage("fil")}
                className={`px-3 py-1 text-xs rounded-lg ${
                  language === "fil" ? "bg-white font-bold text-[#8c6210] shadow-xs" : "text-slate-600"
                }`}
              >
                Filipino
              </button>
              <button
                onClick={() => setLanguage("ceb")}
                className={`px-3 py-1 text-xs rounded-lg ${
                  language === "ceb" ? "bg-white font-bold text-[#8c6210] shadow-xs" : "text-slate-600"
                }`}
              >
                Bisaya
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 text-base font-semibold text-slate-700">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 hover:bg-[#fbf7ee] hover:text-[#b8860b] rounded-xl transition-colors"
            >
              {t.nav.services}
            </a>
            <a
              href="#specialists"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 hover:bg-[#fbf7ee] hover:text-[#b8860b] rounded-xl transition-colors"
            >
              {t.nav.dentists}
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 hover:bg-[#fbf7ee] hover:text-[#b8860b] rounded-xl transition-colors"
            >
              {t.nav.whyUs}
            </a>
            <a
              href="#info"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 hover:bg-[#fbf7ee] hover:text-[#b8860b] rounded-xl transition-colors"
            >
              {t.nav.info}
            </a>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#dfba6b] via-[#c5a059] to-[#a07823] text-slate-950 font-bold py-3.5 rounded-2xl shadow-sm border border-amber-200/50"
            >
              <Calendar className="w-4 h-4 text-slate-900" />
              <span>{t.nav.bookNow}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
