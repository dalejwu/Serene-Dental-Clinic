"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Shield,
  Sparkles,
  Phone,
  Mail,
  FileText,
  Building2,
  MessageCircle,
  Zap,
} from "lucide-react";
import { DentistItem } from "./DentistDirectory";
import { ToothMark } from "./BrandLogo";
import { useLanguage } from "@/lib/i18n";

interface ServiceItem {
  id: string;
  name: string;
  category: string;
  description: string;
  durationMinutes: number;
  priceRange: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: ServiceItem | null;
  preselectedDentist?: DentistItem | null;
}

export default function BookingModal({
  isOpen,
  onClose,
  preselectedService,
  preselectedDentist,
}: BookingModalProps) {
  const { t } = useLanguage();
  
  // Booking Mode: "express" (for non-tech users) or "custom" (4-step calendar wizard)
  const [mode, setMode] = useState<"express" | "custom">("express");
  const [step, setStep] = useState<number>(1);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [dentists, setDentists] = useState<DentistItem[]>([]);

  // Selection State (Custom Mode)
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedDentist, setSelectedDentist] = useState<DentistItem | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");

  // Patient Info State
  const [patientName, setPatientName] = useState<string>("");
  const [patientEmail, setPatientEmail] = useState<string>("");
  const [patientPhone, setPatientPhone] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  // Express Form State
  const [expressConcern, setExpressConcern] = useState<string>(
    t.expressBooking?.concernOptions?.[1] || "Linis at Checkup (Oral Prophylaxis)"
  );
  const [expressWhen, setExpressWhen] = useState<string>(
    t.expressBooking?.whenOptions?.[0] || "Earliest Available"
  );

  // Submission Status
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  // Available slots
  const timeSlots = [
    "09:00 AM",
    "09:45 AM",
    "10:30 AM",
    "11:15 AM",
    "01:30 PM",
    "02:15 PM",
    "03:00 PM",
    "03:45 PM",
    "04:30 PM",
  ];

  // Auto-format Philippine mobile number (09XX-XXX-XXXX)
  const handlePhoneChange = (val: string) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 11);
    if (cleaned.length <= 4) {
      setPatientPhone(cleaned);
    } else if (cleaned.length <= 7) {
      setPatientPhone(`${cleaned.slice(0, 4)}-${cleaned.slice(4)}`);
    } else {
      setPatientPhone(`${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7)}`);
    }
  };

  // Generate next 8 business days (skipping Sundays)
  const getAvailableDates = () => {
    const dates = [];
    let current = new Date();
    current.setDate(current.getDate() + 1);
    while (dates.length < 8) {
      const day = current.getDay();
      if (day !== 0) {
        dates.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        resetAndClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    async function fetchData() {
      try {
        const [servRes, dentRes] = await Promise.all([
          fetch("/api/services"),
          fetch("/api/dentists"),
        ]);
        const servData = await servRes.json();
        const dentData = await dentRes.json();
        if (servData.success) setServices(servData.data);
        if (dentData.success) setDentists(dentData.data);
      } catch (e) {
        console.error("Error fetching modal options:", e);
      }
    }
    fetchData();

    if (preselectedService) {
      setSelectedService(preselectedService);
      setMode("custom");
      setStep(2);
    }
    if (preselectedDentist) {
      setSelectedDentist(preselectedDentist);
      setMode("custom");
      if (!preselectedService) setStep(1);
    }
    if (availableDates.length > 0 && !selectedDate) {
      setSelectedDate(availableDates[0].toISOString().split("T")[0]);
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, preselectedService, preselectedDentist]);

  if (!isOpen) return null;

  const handleNext = () => {
    setErrorMsg(null);
    if (step === 1 && !selectedService) {
      setErrorMsg(t.bookingModal.errService);
      return;
    }
    if (step === 2 && !selectedDentist) {
      setErrorMsg(t.bookingModal.errDentist);
      return;
    }
    if (step === 3 && (!selectedDate || !selectedTimeSlot)) {
      setErrorMsg(t.bookingModal.errDateTime);
      return;
    }
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setErrorMsg(null);
    setStep((s) => s - 1);
  };

  // 1-Step Express Submit
  const handleExpressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!patientName.trim()) {
      setErrorMsg(t.expressBooking.errName);
      return;
    }
    const cleanPhone = patientPhone.replace(/\D/g, "");
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
          patientName,
          patientPhone,
          notes: `[EXPRESS 1-STEP] Concern: ${expressConcern} | Preferred: ${expressWhen}`,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || t.bookingModal.errGeneric);
      }

      setConfirmedBooking(data.data);
      setStep(5);
    } catch (err: any) {
      setErrorMsg(err.message || t.bookingModal.errGeneric);
    } finally {
      setSubmitting(false);
    }
  };

  // Full Custom Wizard Submit
  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!patientName.trim()) {
      setErrorMsg(t.expressBooking.errName);
      return;
    }
    const cleanPhone = patientPhone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setErrorMsg(t.expressBooking.errPhone);
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        serviceId: selectedService?.id,
        dentistId: selectedDentist?.id,
        appointmentDate: selectedDate,
        timeSlot: selectedTimeSlot,
        patientName,
        patientEmail: patientEmail || undefined,
        patientPhone,
        notes: notes || undefined,
      };

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || t.bookingModal.errGeneric);
      }

      setConfirmedBooking(data.data);
      setStep(5);
    } catch (err: any) {
      setErrorMsg(err.message || t.bookingModal.errGeneric);
    } finally {
      setSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setMode("express");
    setSelectedService(null);
    setSelectedDentist(null);
    setSelectedTimeSlot("");
    setConfirmedBooking(null);
    setErrorMsg(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          resetAndClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <ToothMark size={24} className="mr-1" />
              <h2 id="booking-modal-title" className="text-base sm:text-lg font-bold tracking-tight">
                {t.bookingModal.title}
              </h2>
            </div>
            <p className="text-xs text-slate-300">
              Serene Smile Dental Clinic • Canelar, Zamboanga City
            </p>
          </div>

          <button
            onClick={resetAndClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs (Express vs Custom) */}
        {step < 5 && (
          <div className="grid grid-cols-2 bg-slate-100 p-1.5 border-b border-slate-200 text-xs font-bold text-slate-700">
            <button
              onClick={() => {
                setMode("express");
                setErrorMsg(null);
              }}
              className={`py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                mode === "express"
                  ? "bg-white text-[#8c6210] shadow-xs font-extrabold border border-amber-200/80"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.expressBooking.expressTab}</span>
            </button>

            <button
              onClick={() => {
                setMode("custom");
                setErrorMsg(null);
              }}
              className={`py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                mode === "custom"
                  ? "bg-white text-[#8c6210] shadow-xs font-extrabold border border-amber-200/80"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-[#b8860b]" />
              <span>{t.expressBooking.detailedTab}</span>
            </button>
          </div>
        )}

        {/* Custom Mode: 4-Step Stepper Header */}
        {mode === "custom" && step < 5 && (
          <div className="grid grid-cols-4 bg-slate-50 text-[11px] font-semibold border-b border-slate-200">
            {[
              { num: 1, label: t.bookingModal.step1 },
              { num: 2, label: t.bookingModal.step2 },
              { num: 3, label: t.bookingModal.step3 },
              { num: 4, label: t.bookingModal.step4 },
            ].map((s) => {
              const canClick = s.num < step || (s.num === 2 && selectedService) || (s.num === 3 && selectedDentist);
              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => canClick && setStep(s.num)}
                  disabled={!canClick}
                  className={`min-h-[44px] py-2 px-1 text-center border-r last:border-none border-slate-200 transition-colors flex items-center justify-center gap-1 ${
                    canClick ? "cursor-pointer hover:bg-slate-200/70" : "cursor-not-allowed opacity-60"
                  } ${
                    step === s.num
                      ? "bg-[#fcf8f0] text-[#8c6210] border-b-2 border-b-[#c5a059] font-bold"
                      : step > s.num
                      ? "bg-emerald-50/70 text-emerald-800"
                      : "text-slate-500"
                  }`}
                >
                  <span className="shrink-0">{step > s.num ? "✓" : `${s.num}.`}</span>
                  <span className="truncate">{s.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Error Alert Message */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* ======================================================== */}
          {/* MODE 1: SUPER SIMPLE 1-STEP EXPRESS BOOKING FOR NON-TECH */}
          {/* ======================================================== */}
          {mode === "express" && step < 5 && (
            <div className="space-y-6">
              
              {/* Quick direct phone call alert */}
              <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#0284c7] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {t.bookingModal.callAlternativeTitle}
                    </div>
                    <div className="text-[11px] text-[#0284c7] font-medium">
                      {t.bookingModal.callAlternativeSub}
                    </div>
                  </div>
                </div>

                <a
                  href="tel:09992258329"
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs shrink-0 flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#fce8a6]" />
                  <span>{t.expressBooking.callNowBtn}</span>
                </a>
              </div>

              {/* Express Form */}
              <form onSubmit={handleExpressSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    {t.expressBooking.nameLabel} *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder={t.expressBooking.namePlaceholder}
                      className="w-full min-h-[44px] pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-sm font-medium focus:bg-white focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    {t.expressBooking.phoneLabel} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      value={patientPhone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder={t.expressBooking.phonePlaceholder}
                      className="w-full min-h-[44px] pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-sm font-medium focus:bg-white focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    {t.expressBooking.concernLabel}
                  </label>
                  <select
                    value={expressConcern}
                    onChange={(e) => setExpressConcern(e.target.value)}
                    className="w-full min-h-[44px] px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-sm font-medium focus:bg-white focus:border-[#c5a059] outline-none cursor-pointer"
                  >
                    {t.expressBooking.concernOptions.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    {t.expressBooking.whenLabel}
                  </label>
                  <select
                    value={expressWhen}
                    onChange={(e) => setExpressWhen(e.target.value)}
                    className="w-full min-h-[44px] px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-sm font-medium focus:bg-white focus:border-[#c5a059] outline-none cursor-pointer"
                  >
                    {t.expressBooking.whenOptions.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-gradient-to-r from-[#dfba6b] via-[#c5a059] to-[#a07823] hover:from-[#e8c679] hover:via-[#d4af37] hover:to-[#b3882a] text-slate-950 font-extrabold text-base rounded-2xl shadow-md border border-amber-200/50 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>{t.expressBooking.submittingBtn}</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        <span>{t.expressBooking.submitBtn}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5 pt-1">
                  <Shield className="w-3.5 h-3.5 text-[#b8860b] shrink-0" />
                  <span>{t.bookingModal.noPrepaymentNote}</span>
                </div>
              </form>
            </div>
          )}

          {/* ======================================================== */}
          {/* MODE 2: FULL 4-STEP CALENDAR WIZARD */}
          {/* ======================================================== */}
          {mode === "custom" && step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">{t.bookingModal.s1Title}</h3>
                <p className="text-xs text-slate-500">{t.bookingModal.s1Sub}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((serv) => (
                  <button
                    key={serv.id}
                    onClick={() => {
                      setSelectedService(serv);
                      setStep(2);
                    }}
                    className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${
                      selectedService?.id === serv.id
                        ? "border-[#c5a059] bg-[#fcf8f0] shadow-sm ring-1 ring-[#c5a059]"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold text-slate-900 line-clamp-1">{serv.name}</span>
                      <span className="text-[11px] font-extrabold text-[#996515] bg-white px-2 py-0.5 rounded border border-[#eadbc3] shrink-0 ml-1">
                        {serv.priceRange}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{serv.description}</p>
                    <div className="text-[11px] text-slate-600 flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3 text-slate-500" />
                      ~{serv.durationMinutes} mins
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {mode === "custom" && step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">{t.bookingModal.s2Title}</h3>
                <p className="text-xs text-slate-500">{t.bookingModal.s2Sub}</p>
              </div>

              <div className="space-y-3">
                {dentists.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => {
                      setSelectedDentist(doc);
                      setStep(3);
                    }}
                    className={`w-full p-4 rounded-2xl text-left border transition-all cursor-pointer flex items-center gap-4 ${
                      selectedDentist?.id === doc.id
                        ? "border-[#c5a059] bg-[#fcf8f0] shadow-sm ring-1 ring-[#c5a059]"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <img
                      src={doc.avatarUrl}
                      alt={doc.name}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-slate-900">{doc.name}</span>
                        <span className="text-[11px] font-medium text-slate-500">
                          {doc.experienceYears}y practice
                        </span>
                      </div>
                      <p className="text-xs text-[#996515] font-semibold truncate">{doc.specialization}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {t.bookingModal.availableDaysLabel} <span className="text-slate-800 font-semibold">{doc.availableDays}</span>
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {mode === "custom" && step === 3 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">{t.bookingModal.s3Title}</h3>
                <p className="text-xs text-slate-500">
                  {t.bookingModal.s3Sub} {selectedDentist?.name}
                </p>
              </div>

              {/* Date Carousel */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#b8860b]" />
                  {t.bookingModal.availableDaysTitle}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {availableDates.map((dateObj) => {
                    const val = dateObj.toISOString().split("T")[0];
                    const weekday = dateObj.toLocaleDateString("en-US", { weekday: "short" });
                    const monthDay = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                    const isSelected = selectedDate === val;

                    return (
                      <button
                        key={val}
                        onClick={() => setSelectedDate(val)}
                        className={`min-h-[48px] p-1.5 sm:p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? "border-[#c5a059] bg-gradient-to-r from-[#dfba6b] to-[#a07823] text-slate-950 shadow-sm font-bold"
                            : "border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700"
                        }`}
                      >
                        <div className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider opacity-85">
                          {weekday}
                        </div>
                        <div className="text-xs sm:text-sm font-extrabold mt-0.5">{monthDay}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slot Grid (2 cols on small mobile, 3 cols on tablet/desktop) */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#b8860b]" />
                  {t.bookingModal.timeSlotLabel}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`min-h-[44px] py-2.5 px-2 sm:px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-center tabular-nums active:scale-[0.98] ${
                        selectedTimeSlot === slot
                          ? "bg-gradient-to-r from-[#dfba6b] to-[#a07823] text-slate-950 border-[#c5a059] shadow-sm font-bold"
                          : "bg-white border-slate-200 text-slate-700 hover:border-[#c5a059] hover:bg-[#fcf8f0]"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {mode === "custom" && step === 4 && (
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">{t.bookingModal.s4Title}</h3>
                <p className="text-xs text-slate-500">{t.bookingModal.s4Sub}</p>
              </div>

              {/* Booking Summary Box */}
              <div className="p-4 bg-[#fcf8f0] border border-[#eadbc3] rounded-2xl space-y-2 text-xs text-slate-800">
                <div className="flex justify-between font-bold text-sm">
                  <span>{selectedService?.name}</span>
                  <span className="text-[#8c6210] font-bold">{selectedService?.priceRange}</span>
                </div>
                <div className="text-slate-600 flex items-center justify-between">
                  <span>{t.bookingModal.specialistLabel} <strong className="text-slate-800">{selectedDentist?.name}</strong></span>
                  <span className="font-bold text-slate-900">
                    {selectedDate} • {selectedTimeSlot}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.bookingModal.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder={t.expressBooking.namePlaceholder}
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-200 text-base sm:text-sm focus:border-[#c5a059] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.bookingModal.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder={t.expressBooking.phonePlaceholder}
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-200 text-base sm:text-sm focus:border-[#c5a059] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.bookingModal.emailLabel}
                  </label>
                  <input
                    type="email"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    placeholder="juan.delacruz@gmail.com"
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-200 text-base sm:text-sm focus:border-[#c5a059] outline-none"
                  />
                </div>
              </div>
            </form>
          )}

          {/* ======================================================== */}
          {/* STEP 5: CONFIRMED RECEIPT TICKET */}
          {/* ======================================================== */}
          {step === 5 && confirmedBooking && (
            <div className="text-center space-y-6 py-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-extrabold text-slate-900">
                  {t.bookingModal.confirmedTitle}
                </h3>
                <p className="text-xs text-slate-500">
                  {t.bookingModal.confirmedSub} Mobile:{" "}
                  <span className="font-semibold text-slate-800">{confirmedBooking.patientPhone}</span>
                </p>
              </div>

              {/* Receipt Ticket Card */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left space-y-4 max-w-md mx-auto">
                <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                  <span className="text-xs text-slate-500">{t.bookingModal.bookingRef}</span>
                  <span className="font-mono text-xs font-bold text-[#8c6210] bg-[#fcf8f0] px-2 py-0.5 rounded border border-[#eadbc3]">
                    #SERENE-ZC-{confirmedBooking.id.slice(0, 6).toUpperCase()}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.bookingModal.patientLabel}</span>
                    <span className="font-semibold text-slate-900">{confirmedBooking.patientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.bookingModal.procedureLabel}</span>
                    <span className="font-semibold text-slate-900">{confirmedBooking.service?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.bookingModal.specialistLabel}</span>
                    <span className="font-semibold text-slate-900">{confirmedBooking.dentist?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.bookingModal.dateLabel}</span>
                    <span className="font-semibold text-slate-900">{confirmedBooking.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.bookingModal.timeLabel}</span>
                    <span className="font-semibold text-slate-900">{confirmedBooking.timeSlot}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-start gap-2 text-[11px] text-slate-500">
                  <Building2 className="w-3.5 h-3.5 text-[#b8860b] shrink-0 mt-0.5" />
                  <span>{t.bookingModal.arrivalNotice}</span>
                </div>
              </div>

              <button
                onClick={resetAndClose}
                className="inline-flex items-center justify-center px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all shadow-sm cursor-pointer"
              >
                {t.bookingModal.doneBtn}
              </button>
            </div>
          )}

        </div>

        {/* Modal Footer Controls for Custom Mode */}
        {mode === "custom" && step < 5 && (
          <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                disabled={submitting}
                className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-white transition-all cursor-pointer active:scale-[0.98]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {t.bookingModal.backBtn}
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-bold bg-gradient-to-r from-[#dfba6b] to-[#a07823] text-slate-950 px-6 py-2.5 rounded-xl shadow-sm border border-amber-200/50 transition-all cursor-pointer active:scale-[0.98]"
              >
                <span>{t.bookingModal.continueBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCustomSubmit}
                disabled={submitting}
                className="min-h-[44px] inline-flex items-center gap-2 text-xs font-bold bg-gradient-to-r from-[#dfba6b] via-[#c5a059] to-[#a07823] text-slate-950 px-7 py-2.5 rounded-xl shadow-sm border border-amber-200/50 transition-all cursor-pointer disabled:opacity-50 active:scale-[0.98]"
              >
                {submitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>{t.bookingModal.confirmingBtn}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t.bookingModal.confirmBtn}</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
