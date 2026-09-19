"use client";

import React, { useEffect, useRef } from "react";
import {
  X,
  Clock,
  Banknote,
  ClipboardList,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { ServiceItem } from "./ServiceCatalog";

interface ServiceDetailModalProps {
  service: ServiceItem & { prepTips?: string; painInfo?: string };
  onClose: () => void;
  onBook: () => void;
}

export default function ServiceDetailModal({
  service,
  onClose,
  onBook,
}: ServiceDetailModalProps) {
  const { t } = useLanguage();
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      ref={backdropRef}
      onClick={(e) => e.target === backdropRef.current && onClose()}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={service.name}
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/60 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Gold top accent */}
        <div className="h-1.5 bg-gradient-to-r from-[#dfba6b] via-[#c5a059] to-[#a07823]" />

        {/* Header */}
        <div className="p-6 pb-4 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c6210] bg-[#fcf8f0] px-2 py-0.5 rounded-md border border-[#eadbc3]">
                {service.category}
              </span>
              <h2 className="text-lg font-bold text-slate-900 leading-tight">
                {service.name}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            {service.description}
          </p>

          {/* Quick stats */}
          <div className="flex items-center gap-4 pt-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <Clock className="w-3.5 h-3.5 text-[#b8860b]" />
              ~{service.durationMinutes} mins
            </div>
            <div className="flex items-center gap-1.5 text-sm font-extrabold text-slate-900 tabular-nums">
              <Banknote className="w-3.5 h-3.5 text-[#b8860b]" />
              {service.priceRange}
            </div>
          </div>
        </div>

        {/* Info cards */}
        <div className="px-6 pb-4 space-y-3">
          {service.prepTips && (
            <div className="p-4 rounded-2xl bg-[#fcf9f2] border border-[#ede2d1] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8c6210]">
                <ClipboardList className="w-4 h-4" />
                {t.serviceModal?.howToPrepare || "How to Prepare"}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {service.prepTips}
              </p>
            </div>
          )}

          {service.painInfo && (
            <div className="p-4 rounded-2xl bg-[#f0f9ff] border border-[#bfdbfe] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0369a1]">
                <ShieldCheck className="w-4 h-4" />
                {t.serviceModal?.painComfort || "Pain & Comfort"}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {service.painInfo}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-6 pt-3 border-t border-slate-100 flex items-center gap-3">
          <button
            type="button"
            onClick={onBook}
            className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-[#dfba6b] via-[#c5a059] to-[#a07823] hover:from-[#e8c679] hover:via-[#d4af37] hover:to-[#b3882a] text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-950/10 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            {t.serviceModal?.bookProcedure || "Book This Procedure"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-12 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
          >
            {t.serviceModal?.close || "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
