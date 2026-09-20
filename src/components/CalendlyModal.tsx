"use client";

import React, { useEffect } from "react";
import {
  X,
  MessageCircle,
  MessageSquare,
  ShieldCheck,
  Send,
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
            {/* 1. Facebook Messenger */}
            <a
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 sm:p-6 rounded-3xl bg-[#fdfcf9] hover:bg-white border border-[#eadbc3] hover:border-[#0084ff]/60 shadow-2xs hover:shadow-lg hover:shadow-sky-950/5 transition-all flex flex-col justify-between space-y-4 cursor-pointer relative overflow-hidden"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0084ff] to-[#0284c7] opacity-70 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0084ff] group-hover:scale-105 transition-transform shadow-2xs">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-[#0084ff] transition-colors">
                    Book via Messenger
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Chat directly with our reception team on Facebook Messenger.
                  </p>
                </div>
              </div>

              <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0084ff]">
                <span>Open Messenger</span>
                <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* 2. Direct SMS */}
            <a
              href={smsUrl}
              className="group p-5 sm:p-6 rounded-3xl bg-[#fdfcf9] hover:bg-white border border-[#eadbc3] hover:border-[#dfba6b] shadow-2xs hover:shadow-lg hover:shadow-amber-950/5 transition-all flex flex-col justify-between space-y-4 cursor-pointer relative overflow-hidden"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#dfba6b] via-[#c5a059] to-[#a07823] opacity-70 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-[#fcf8f0] border border-[#eadbc3] flex items-center justify-center text-[#8c6210] group-hover:scale-105 transition-transform shadow-2xs">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-[#8c6210] transition-colors">
                    Book via SMS
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Send a quick text message to 0992 631 2712.
                  </p>
                </div>
              </div>

              <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#8c6210]">
                <span>Send SMS Message</span>
                <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
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
