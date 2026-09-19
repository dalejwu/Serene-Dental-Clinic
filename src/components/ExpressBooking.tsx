"use client";

import React, { useState } from "react";
import {
  Phone,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  User,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface ExpressBookingProps {
  onOpenBooking?: () => void;
}

export default function ExpressBooking({ onOpenBooking }: ExpressBookingProps = {}) {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [concern, setConcern] = useState(t.expressBooking.concernOptions[1] || "Cleaning & Checkup");
  const [preferredWhen, setPreferredWhen] = useState(t.expressBooking.whenOptions[0] || "Earliest Available");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handlePhoneChange = (val: string) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 11);
    if (cleaned.length <= 4) {
      setPhone(cleaned);
    } else if (cleaned.length <= 7) {
      setPhone(`${cleaned.slice(0, 4)}-${cleaned.slice(4)}`);
    } else {
      setPhone(`${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7)}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg(t.expressBooking.errName);
      return;
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setErrorMsg(t.expressBooking.errPhone);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName: name,
          patientPhone: phone,
          concern,
          preferredWhen,
          notes: `[EXPRESS BOOKING] Concern: ${concern} | Preferred: ${preferredWhen}`,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        // Fallback for static Netlify hosting
        if (typeof window !== "undefined") {
          try {
            const saved = JSON.parse(localStorage.getItem("serene_appointments") || "[]");
            saved.push({ name, phone, concern, preferredWhen, date: new Date().toISOString() });
            localStorage.setItem("serene_appointments", JSON.stringify(saved));
          } catch {}
        }
        setSubmitted(true);
      }
    } catch {
      // Local fallback in case of network issue or static host
      if (typeof window !== "undefined") {
        try {
          const saved = JSON.parse(localStorage.getItem("serene_appointments") || "[]");
          saved.push({ name, phone, concern, preferredWhen, date: new Date().toISOString() });
          localStorage.setItem("serene_appointments", JSON.stringify(saved));
        } catch {}
      }
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="easy-booking" className="py-14 sm:py-16 bg-gradient-to-b from-white via-[#fcfaf6] to-white border-y border-[#ede2d1]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white serene-card-frame rounded-3xl p-6 sm:p-10 shadow-xl shadow-amber-950/5 border-2 border-[#eadcc6] relative overflow-hidden">
          
          {/* Subtle decorative gold & azure accents */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-amber-100/40 via-yellow-50/20 to-transparent rounded-full blur-2xl -z-10" />
          <div className="absolute bottom-0 left-0 w-44 h-44 bg-gradient-to-tr from-sky-100/30 to-transparent rounded-full blur-2xl -z-10" />

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.expressBooking.heading}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t.expressBooking.subheading}
            </p>
          </div>

          {/* Direct Instant Call Alternative for non-tech users */}
          <div className="mb-8 p-4 rounded-2xl bg-sky-50/80 border border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-[#0284c7] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="font-extrabold text-sm text-sky-950">
                  {t.expressBooking.orCallText}
                </div>
                <div className="text-xs text-sky-900/80 font-medium">
                  {t.expressBooking.receptionSub}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <a
                href="tel:+639926312712"
                className="flex-1 sm:flex-none min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all tabular-nums active:scale-[0.98]"
              >
                <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span className="truncate">0992 631 2712</span>
              </a>
              <a
                href="viber://chat?number=%2B639926312712"
                className="flex-1 sm:flex-none min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-[0.98]"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Viber</span>
              </a>
              {onOpenBooking && (
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="flex-1 sm:flex-none min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 bg-gradient-to-r from-[#dfba6b] to-[#a07823] hover:from-[#e8c679] hover:to-[#b3882a] text-slate-950 text-xs font-bold rounded-xl shadow-xs transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
                >
                  <Calendar className="w-3.5 h-3.5 text-slate-950 shrink-0" />
                  <span>Calendly Slot</span>
                </button>
              )}
            </div>
          </div>

          {/* Form State or Confirmed State */}
          {submitted ? (
            <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                {t.expressBooking.successTitle}
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                {t.expressBooking.successMessage}
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName("");
                    setPhone("");
                  }}
                  className="min-h-[44px] px-6 py-2.5 bg-gradient-to-r from-[#dfba6b] to-[#a07823] text-slate-950 text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  {t.expressBooking.bookAnotherBtn}
                </button>
              </div>
            </div>
          ) : (
            <form
              name="appointment-booking"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="appointment-booking" />
              <p className="hidden">
                <label>
                  Don’t fill this out if you’re human: <input name="bot-field" />
                </label>
              </p>

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    {t.expressBooking.nameLabel} *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      name="patientName"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.expressBooking.namePlaceholder}
                      className="w-full min-h-[44px] pl-10 pr-4 py-3 bg-[#fdfcf9] border border-slate-200 rounded-xl text-base sm:text-sm font-medium focus:bg-white focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    {t.expressBooking.phoneLabel} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      name="patientPhone"
                      required
                      value={phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder={t.expressBooking.phonePlaceholder}
                      className="w-full min-h-[44px] pl-10 pr-4 py-3 bg-[#fdfcf9] border border-slate-200 rounded-xl text-base sm:text-sm font-medium focus:bg-white focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 outline-none transition-all font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Concern Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  {t.expressBooking.concernLabel}
                </label>
                <select
                  name="concern"
                  value={concern}
                  onChange={(e) => setConcern(e.target.value)}
                  className="w-full min-h-[44px] px-4 py-3 bg-[#fdfcf9] border border-slate-200 rounded-xl text-base sm:text-sm font-medium focus:bg-white focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 outline-none transition-all cursor-pointer"
                >
                  {t.expressBooking.concernOptions.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Time */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  {t.expressBooking.whenLabel}
                </label>
                <select
                  name="preferredWhen"
                  value={preferredWhen}
                  onChange={(e) => setPreferredWhen(e.target.value)}
                  className="w-full min-h-[44px] px-4 py-3 bg-[#fdfcf9] border border-slate-200 rounded-xl text-base sm:text-sm font-medium focus:bg-white focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 outline-none transition-all cursor-pointer"
                >
                  {t.expressBooking.whenOptions.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Big Friendly Submit Button with Gold Gradient */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-gradient-to-r from-[#dfba6b] via-[#c5a059] to-[#a07823] hover:from-[#e8c679] hover:via-[#d4af37] hover:to-[#b3882a] text-slate-950 font-extrabold text-base rounded-2xl shadow-lg shadow-amber-900/15 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border border-amber-200/50"
                >
                  {submitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                      <span>{t.expressBooking.submittingBtn}</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-slate-950" />
                      <span>{t.expressBooking.submitBtn}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-center text-xs text-slate-500 font-medium pt-1">
                <ShieldCheck className="w-4 h-4 text-[#b8860b]" />
                <span>{t.expressBooking.noPrepaymentNote}</span>
              </div>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}
