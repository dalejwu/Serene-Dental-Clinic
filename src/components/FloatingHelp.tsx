"use client";

import React, { useState } from "react";
import { MessageCircle, Phone, X, Calendar } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface FloatingHelpProps {
  onOpenBooking?: () => void;
}

export default function FloatingHelp({ onOpenBooking }: FloatingHelpProps = {}) {
  const { t } = useLanguage();
  const [showViberCard, setShowViberCard] = useState(false);

  return (
    <>
      {/* Mobile Sticky Action Bar (Fixed at bottom on screens < 640px) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#ede2d1] p-2 pb-safe flex items-center gap-1.5 shadow-2xl shadow-slate-950/20">
        <a
          href="https://wa.me/639926312712?text=Hello%2C%20I%20want%20to%20book%20an%20appointment"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[42px] inline-flex items-center justify-center gap-1 px-2 py-1.5 bg-emerald-600 active:bg-emerald-700 text-white text-[11px] font-bold rounded-xl shadow-xs"
        >
          <MessageCircle className="w-3.5 h-3.5 shrink-0" />
          <span>WhatsApp</span>
        </a>
        <a
          href="viber://chat?number=%2B639926312712"
          className="flex-1 min-h-[42px] inline-flex items-center justify-center gap-1 px-2 py-1.5 bg-purple-600 active:bg-purple-700 text-white text-[11px] font-bold rounded-xl shadow-xs"
        >
          <MessageCircle className="w-3.5 h-3.5 shrink-0" />
          <span>Viber</span>
        </a>
        <a
          href="tel:+639926312712"
          className="flex-1 min-h-[42px] inline-flex items-center justify-center gap-1 px-2 py-1.5 bg-slate-900 active:bg-slate-800 text-white text-[11px] font-bold rounded-xl shadow-xs tabular-nums"
        >
          <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span>Call</span>
        </a>
        <button
          type="button"
          onClick={() => onOpenBooking?.()}
          className="flex-1 min-h-[42px] inline-flex items-center justify-center gap-1 px-2 py-1.5 bg-gradient-to-r from-[#dfba6b] via-[#c5a059] to-[#a07823] text-slate-950 text-[11px] font-extrabold rounded-xl shadow-xs active:scale-[0.98] cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5 text-slate-950 shrink-0" />
          <span>Book</span>
        </button>
      </div>

      {/* Desktop Floating Help / Viber Desk (Bottom Right) */}
      <div className="hidden sm:block fixed bottom-6 right-6 z-40">
        {showViberCard && (
          <div className="mb-3 w-80 bg-white rounded-2xl p-5 shadow-2xl border border-[#ede2d1] animate-in slide-in-from-bottom-3 duration-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xs">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{t.help.receptionTitle}</div>
                  <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    {t.help.onlineStatus}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowViberCard(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {t.help.helpDesc}
            </p>

            <div className="space-y-2">
              <a
                href="https://wa.me/639926312712?text=Hello%2C%20I%20want%20to%20book%20an%20appointment"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Book via WhatsApp (0992 631 2712)
              </a>

              <a
                href="viber://chat?number=%2B639926312712"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                {t.help.chatViber} (0992 631 2712)
              </a>
            </div>
          </div>
        )}

        <button
          onClick={() => setShowViberCard(!showViberCard)}
          className="flex items-center gap-2.5 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-xl border border-[#d4af37]/40 hover:scale-105 transition-all cursor-pointer group"
          aria-label="Contact clinic reception via Viber or Phone"
        >
          <div className="w-7 h-7 rounded-full bg-[#0284c7] flex items-center justify-center text-white shrink-0 group-hover:bg-[#0369a1] transition-colors">
            <MessageCircle className="w-3.5 h-3.5" />
          </div>
          <div className="text-left pr-1">
            <div className="text-xs font-bold leading-tight">{t.help.needHelp}</div>
            <div className="text-[10px] text-[#dfba6b] font-medium">WhatsApp & Viber Desk</div>
          </div>
        </button>
      </div>
    </>
  );
}
