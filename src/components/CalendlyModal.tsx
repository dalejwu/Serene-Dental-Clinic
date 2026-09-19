"use client";

import React, { useEffect, useState } from "react";
import {
  X,
  MessageCircle,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Send,
  Copy,
  Check,
  Clock,
  MapPin,
} from "lucide-react";
import { ToothMark } from "./BrandLogo";
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
  const [copiedMessage, setCopiedMessage] = useState(false);

  // Build tailored message for Messenger and SMS
  const prefillMessage = React.useMemo(() => {
    if (preselectedService && preselectedDentist) {
      return `Hello! I would like to book an appointment for ${preselectedService.name} with ${preselectedDentist.name} at Serene Dental Clinic (Canelar, Zamboanga City).`;
    }
    if (preselectedDentist) {
      return `Hello! I would like to book a dental consultation with ${preselectedDentist.name} at Serene Dental Clinic (Canelar, Zamboanga City).`;
    }
    if (preselectedService) {
      return `Hello! I would like to book an appointment for ${preselectedService.name} at Serene Dental Clinic (Canelar, Zamboanga City).`;
    }
    return `Hello! I want to book an appointment at Serene Dental Clinic (Canelar, Zamboanga City).`;
  }, [preselectedService, preselectedDentist]);

  const messengerUrl = "https://m.me/isa.adil.92";
  const smsUrl = `sms:+639926312712?body=${encodeURIComponent(prefillMessage)}`;

  // Handle Escape key and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

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

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(prefillMessage);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
    } catch {
      // ignore clipboard error
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#eadbc3] relative animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gold Accent Ribbon */}
        <div className="h-1.5 bg-gradient-to-r from-[#dfba6b] via-[#c5a059] to-[#a07823] shrink-0" />

        {/* Modal Header */}
        <div className="px-5 sm:px-7 py-4 bg-gradient-to-r from-[#fbf8f2] via-white to-[#fbf8f2] border-b border-[#ede1cd] flex items-center justify-between shrink-0 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#dfba6b] to-[#a07823] flex items-center justify-center shadow-xs shrink-0">
              <ToothMark className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h2
                id="booking-modal-title"
                className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight truncate"
              >
                Book an Appointment
              </h2>
              <p className="text-xs text-slate-600 truncate mt-0.5">
                {preselectedDentist && preselectedService
                  ? `${preselectedService.name} with ${preselectedDentist.name}`
                  : preselectedDentist
                  ? `Consultation with ${preselectedDentist.name}`
                  : preselectedService
                  ? `Service: ${preselectedService.name}`
                  : "Serene Dental Clinic • Canelar, Zamboanga City"}
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] min-w-[40px] p-2 rounded-2xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-7 space-y-5 overflow-y-auto">
          {/* Reassurance Banner */}
          <div className="p-3.5 rounded-2xl bg-[#fcf9f2] border border-[#eadbc3] flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-[#8c6210] flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Choose your preferred way to book. Our clinic staff will reply directly to confirm your schedule.
            </p>
          </div>

          {/* Two Primary Booking Channels: Facebook Messenger & SMS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Facebook Messenger (Refined Deep Sapphire with Clinic Gold Hairline & Amber Glow) */}
            <a
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#123e6b] via-[#0d2f52] to-[#081f37] hover:from-[#174d82] hover:to-[#0c2b4d] text-white shadow-xl shadow-slate-950/20 border border-[#dfba6b]/40 hover:border-[#dfba6b] flex flex-col justify-between transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer relative overflow-hidden"
            >
              {/* Subtle Warm Amber / Gold glow in corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#dfba6b]/20 via-sky-400/10 to-transparent rounded-bl-full pointer-events-none" />

              <div className="space-y-3.5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-sky-500/20 backdrop-blur-md flex items-center justify-center shadow-xs border border-sky-400/30 text-sky-200 group-hover:text-white transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-sky-500/20 text-sky-200 border border-sky-400/30 backdrop-blur-xs">
                    Messenger
                  </span>
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-white group-hover:text-sky-100 transition-colors">
                    Book via Messenger
                  </h3>
                  <p className="text-xs text-slate-200/90 mt-1 leading-relaxed">
                    Chat directly with our reception team on Facebook Messenger.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/15 flex items-center justify-between text-xs font-bold text-sky-200 group-hover:text-white relative z-10">
                <span>Open Messenger Chat</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform text-sky-300" />
              </div>
            </a>

            {/* 2. Direct SMS (Signature Deep Slate & Gold Theme) */}
            <a
              href={smsUrl}
              className="group p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#1e293b] via-[#141e2c] to-[#0d141e] hover:from-[#253347] hover:to-[#121b27] text-white shadow-xl shadow-slate-950/20 border border-[#dfba6b]/40 hover:border-[#dfba6b] flex flex-col justify-between transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer relative overflow-hidden"
            >
              {/* Subtle Gold Accent in corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#dfba6b]/25 to-transparent rounded-bl-full pointer-events-none" />

              <div className="space-y-3.5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-[#dfba6b]/20 backdrop-blur-md flex items-center justify-center shadow-xs border border-[#dfba6b]/35 text-[#dfba6b] group-hover:text-[#fce8a6] transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-[#dfba6b]/20 text-[#fce8a6] border border-[#dfba6b]/35 backdrop-blur-xs">
                    SMS / Text
                  </span>
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-white group-hover:text-[#fce8a6] transition-colors">
                    Book via SMS
                  </h3>
                  <p className="text-xs text-slate-200/90 mt-1 leading-relaxed">
                    Send a quick text message to 0992 631 2712.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/15 flex items-center justify-between text-xs font-bold text-[#fce8a6] group-hover:text-white relative z-10">
                <span>Send SMS Message</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#dfba6b]" />
              </div>
            </a>
          </div>

          {/* Pre-filled Message Preview Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#a07823]" />
                Ready-to-Send Message Preview
              </span>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-slate-200/70 transition-colors cursor-pointer"
              >
                {copiedMessage ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 font-mono leading-relaxed select-all">
              &ldquo;{prefillMessage}&rdquo;
            </div>
          </div>

          {/* Clinic Hours & Location */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#0284c7] shrink-0" />
              <span>In front of Canelar Moret, Zamboanga City</span>
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#a07823] shrink-0" />
              <span>Mon–Sat: 9:00 AM – 5:00 PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
