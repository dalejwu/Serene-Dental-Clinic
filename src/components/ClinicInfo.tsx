"use client";

import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Car,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  Sparkles,
  Navigation,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function ClinicInfo() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="info" className="content-auto py-20 lg:py-24 bg-white border-t border-[#ede2d1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Official Contact Bar matching the business card icons */}
        <div className="p-6 rounded-3xl bg-[#fdfcf9] border border-[#ede2d1] grid grid-cols-1 md:grid-cols-3 gap-6 shadow-xs">
          {/* Phone */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#0284c7] flex items-center justify-center text-white shrink-0 shadow-xs">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#996515]">{t.clinicInfo.contactBarDirect}</div>
              <a href="tel:09992258329" className="text-base font-extrabold text-slate-900 hover:text-[#0284c7] transition-colors tabular-nums">
                0999 225 8329
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4 md:border-l border-slate-200/80 md:pl-6">
            <div className="w-12 h-12 rounded-full bg-[#0284c7] flex items-center justify-center text-white shrink-0 shadow-xs">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#996515]">{t.clinicInfo.contactBarEmail}</div>
              <a href="mailto:contact@serenedentalclinic.com" className="text-xs sm:text-sm font-bold text-slate-900 hover:text-[#0284c7] transition-colors truncate block">
                contact@serenedentalclinic.com
              </a>
            </div>
          </div>

          {/* Address */}
          <a
            href="https://maps.google.com/?q=Mayor+Jaldon+St+Canelar+Zamboanga+City"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 md:border-l border-slate-200/80 md:pl-6 group"
          >
            <div className="w-12 h-12 rounded-full bg-[#0284c7] flex items-center justify-center text-white shrink-0 shadow-xs group-hover:bg-[#0369a1] transition-colors">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#996515]">{t.clinicInfo.contactBarBranch}</div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors">
                Mayor Jaldon, Canelar, Zamboanga City
              </div>
              <div className="text-[10px] text-[#0284c7] font-semibold mt-0.5 flex items-center gap-1">
                <Navigation className="w-3 h-3" />
                <span>{t.clinicInfo.getDirections}</span>
              </div>
            </div>
          </a>
        </div>

        {/* Grid: Hours & Canelar Location */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Hours & Directions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fcf8f0] border border-[#eadbc3] text-[#8c6210] text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                {t.clinicInfo.badge}
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                {t.clinicInfo.heading}
              </h2>
              <p className="text-sm text-slate-600 max-w-[55ch]">
                {t.clinicInfo.subheading}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Address Card */}
              <div className="p-5 rounded-2xl bg-[#fdfcf9] border border-[#ede2d1] space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#fcf8f0] border border-[#eadbc3] flex items-center justify-center text-[#b8860b]">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">{t.clinicInfo.addressTitle}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.clinicInfo.addressText}
                </p>
                <a
                  href="https://maps.google.com/?q=Mayor+Jaldon+St+Canelar+Zamboanga+City"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0284c7] hover:text-[#0369a1] transition-colors pt-1"
                >
                  <Navigation className="w-3 h-3" />
                  <span>{t.clinicInfo.openInMaps}</span>
                </a>
              </div>

              {/* Parking Card */}
              <div className="p-5 rounded-2xl bg-[#fdfcf9] border border-[#ede2d1] space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#fcf8f0] border border-[#eadbc3] flex items-center justify-center text-[#b8860b]">
                  <Car className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">{t.clinicInfo.parkingTitle}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.clinicInfo.parkingText}
                </p>
              </div>
            </div>

            {/* Operating Hours Table - Single column on mobile prevents text squishing */}
            <div className="p-5 rounded-2xl bg-[#fdfcf9] border border-[#ede2d1] space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Clock className="w-4 h-4 text-[#b8860b]" />
                <span>{t.clinicInfo.hoursTitle}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs tabular-nums">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-200/60 text-slate-600">
                  <span>{t.clinicInfo.monThu}:</span>
                  <span className="font-semibold text-slate-900">9:00 AM – 5:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-200/60 text-slate-600">
                  <span>{t.clinicInfo.fri}:</span>
                  <span className="font-semibold text-slate-400">{t.clinicInfo.closedStatus}</span>
                </div>
                <div className="col-span-1 sm:col-span-2 flex items-center gap-1.5 pt-1 text-[11px] text-[#8c6210] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#b8860b] shrink-0" />
                  <span>{t.clinicInfo.appointmentOnlyNote}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Localized FAQ Accordion & Philippine HMOs */}
          <div className="lg:col-span-6 space-y-4">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                {t.clinicInfo.faqHeading}
              </h3>
            </div>

            <div className="space-y-3">
              {t.clinicInfo.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#ede2d1] overflow-hidden transition-all bg-white"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full min-h-[48px] px-5 py-3.5 text-left flex items-center justify-between gap-3 text-sm font-bold text-slate-900 hover:text-[#996515] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? (
                      <ChevronUp className="w-4 h-4 text-[#b8860b] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Philippine HMO & Easy Payment Banner */}
            <div className="p-4 rounded-2xl bg-[#fcf8f0] border border-[#eadbc3] flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-[#b8860b] shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-[#8c6210]">{t.clinicInfo.hmoTitle}</span>
                <p className="text-slate-700 mt-1 leading-relaxed">
                  {t.clinicInfo.hmoText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
