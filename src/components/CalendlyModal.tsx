"use client";

import React, { useState, useEffect } from "react";
import { X, ExternalLink, Phone, ShieldCheck, Sparkles, RefreshCw } from "lucide-react";
import { ToothMark } from "./BrandLogo";
import { buildCalendlyEmbedUrl } from "@/lib/calendly";
import { ServiceItem } from "./ServiceCatalog";
import { DentistItem } from "./DentistDirectory";

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: ServiceItem | null;
  preselectedDentist?: DentistItem | null;
}

export default function CalendlyModal({
  isOpen,
  onClose,
  preselectedService,
  preselectedDentist,
}: CalendlyModalProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Calculate full Calendly URL with any preselected service/dentist context
  const embedUrl = buildCalendlyEmbedUrl({
    serviceName: preselectedService?.name,
    dentistName: preselectedDentist?.name,
  });

  // Handle Escape key and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(true);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="calendly-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/65 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="w-full max-w-4xl h-[92vh] max-h-[820px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#eadbc3] relative animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-4 sm:px-6 py-3.5 bg-gradient-to-r from-[#fbf8f2] via-white to-[#fbf8f2] border-b border-[#ede1cd] flex items-center justify-between shrink-0 gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#dfba6b] to-[#a07823] flex items-center justify-center shadow-xs shrink-0">
              <ToothMark className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2
                  id="calendly-modal-title"
                  className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight truncate"
                >
                  Book Appointment
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-amber-50 text-[#8c6210] border border-amber-200/80">
                  <Sparkles className="w-2.5 h-2.5 text-[#c5a059]" />
                  Calendly
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 truncate">
                {preselectedDentist
                  ? `Consultation with ${preselectedDentist.name}`
                  : preselectedService
                  ? `Service: ${preselectedService.name}`
                  : "Choose your preferred date and time slot"}
              </p>
            </div>
          </div>

          {/* Action buttons on top-right */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Open directly in new tab button */}
            <a
              href={embedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[38px] px-3 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Open in new window"
              aria-label="Open scheduling in a new window"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Open New Tab</span>
            </a>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="min-h-[38px] min-w-[38px] p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close scheduling modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Calendly Embed */}
        <div className="flex-1 relative bg-white overflow-hidden flex flex-col">
          {/* Loading Placeholder */}
          {isLoading && (
            <div className="absolute inset-0 z-10 bg-white/95 flex flex-col items-center justify-center gap-3 p-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#fbf7ee] border border-[#eadbc3] flex items-center justify-center text-[#c5a059] animate-pulse">
                <ToothMark className="w-6 h-6 text-[#c5a059]" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2 font-bold text-slate-900 text-sm">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#c5a059]" />
                  <span>Loading Calendly schedule...</span>
                </div>
                <p className="text-xs text-slate-500">
                  Connecting to clinic appointment calendar
                </p>
              </div>
            </div>
          )}

          {/* Embedded Calendly Frame */}
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            title="Serene Dental Clinic Calendly Scheduling"
            onLoad={() => setIsLoading(false)}
            className={`w-full flex-1 transition-opacity duration-300 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            allow="camera; microphone; autoplay; clipboard-write; encrypted-media; fullscreen;"
          />
        </div>

        {/* Footer Support Bar */}
        <div className="px-4 py-2.5 bg-[#fbfaf8] border-t border-[#ede1cd] flex items-center justify-between gap-3 text-xs text-slate-600 shrink-0 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Instant confirmation via email & SMS</span>
          </div>

          <div className="flex items-center gap-3 ml-auto text-[11px] sm:text-xs">
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-slate-500">Need help?</span>
            <a
              href="tel:09992258329"
              className="font-bold text-sky-700 hover:text-sky-900 inline-flex items-center gap-1 tabular-nums"
            >
              <Phone className="w-3 h-3" />
              0999 225 8329
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
