"use client";

import React, { useState } from "react";
import { MessageCircle, Phone, Calendar, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface FloatingHelpProps {
  onOpenBooking: () => void;
}

export default function FloatingHelp({ onOpenBooking }: FloatingHelpProps) {
  const { t } = useLanguage();
  const [showViberCard, setShowViberCard] = useState(false);

  return (
    <>
      {/* 1. Mobile Bottom Sticky Booking & Call Bar with Safe Area Support */}
      <aside aria-label="Mobile quick actions" className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#ede2d1] px-4 pt-2.5 pb-safe shadow-2xl">
        <div className="flex items-center gap-2.5">
          <a
            href="tel:09992258329"
            className="flex-1 min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 px-3 bg-sky-50 hover:bg-sky-100 text-sky-950 text-xs font-bold rounded-xl border border-sky-200 transition-colors tabular-nums active:scale-[0.98]"
          >
            <div className="w-5 h-5 rounded-full bg-[#0284c7] flex items-center justify-center text-white shrink-0">
              <Phone className="w-2.5 h-2.5" />
            </div>
            <span className="truncate">0999 225 8329</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="flex-2 min-h-[44px] flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-[#dfba6b] via-[#c5a059] to-[#a07823] text-slate-950 text-xs font-bold rounded-xl shadow-md shadow-amber-950/15 transition-all active:scale-[0.98] cursor-pointer border border-amber-200/50"
          >
            <Calendar className="w-4 h-4 text-slate-950 shrink-0" />
            <span className="truncate">{t.help.bookMobileBar}</span>
          </button>
        </div>
      </aside>

      {/* 2. Desktop Floating Help / Viber Desk (Bottom Right) */}
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
                href="https://viber.click/639992258329"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                {t.help.chatViber} (0999 225 8329)
              </a>

              <a
                href="tel:09992258329"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#fcf9f2] hover:bg-[#f5ecdd] text-slate-800 text-xs font-bold rounded-xl transition-all border border-[#eadbc3]"
              >
                <div className="w-4 h-4 rounded-full bg-[#0284c7] flex items-center justify-center text-white shrink-0">
                  <Phone className="w-2.5 h-2.5" />
                </div>
                {t.help.callClinic}: 0999 225 8329
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
            <Phone className="w-3.5 h-3.5" />
          </div>
          <div className="text-left pr-1">
            <div className="text-xs font-bold leading-tight">{t.help.needHelp}</div>
            <div className="text-[10px] text-[#dfba6b] font-medium">0999 225 8329 (Hotline)</div>
          </div>
        </button>
      </div>
    </>
  );
}
