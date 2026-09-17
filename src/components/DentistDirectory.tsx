"use client";

import React, { useState, useEffect } from "react";
import {
  Award,
  Calendar,
  ArrowUpRight,
  X,
  ShieldCheck,
  Clock,
  MapPin,
  Phone,
  Info,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export interface DentistItem {
  id: string;
  name: string;
  title: string;
  specialization: string;
  experienceYears: number;
  bio: string;
  availableDays: string;
  avatarUrl: string;
}

interface DentistDirectoryProps {
  onSelectDentist: (dentist: DentistItem) => void;
}

export default function DentistDirectory({ onSelectDentist }: DentistDirectoryProps) {
  const { t } = useLanguage();
  const [dentists, setDentists] = useState<DentistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDentistModal, setActiveDentistModal] = useState<DentistItem | null>(null);

  useEffect(() => {
    async function loadDentists() {
      try {
        const res = await fetch("/api/dentists");
        const data = await res.json();
        if (data.success) {
          setDentists(data.data);
        }
      } catch (err) {
        console.error("Failed to load dentists:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDentists();
  }, []);

  // Lock body scroll when dentist detail modal is open
  useEffect(() => {
    if (activeDentistModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeDentistModal]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDentistModal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="specialists" className="py-16 sm:py-20 bg-[#fdfcfb] border-t border-[#ede2d1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              {t.dentists.heading}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-[60ch]">
              {t.dentists.subheading}
            </p>
          </div>

          <a
            href="#easy-booking"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#996515] px-4 py-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-[#d4af37] transition-all"
          >
            <span>{t.dentists.scheduleCta}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Directory Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 rounded-3xl bg-slate-100 animate-pulse border border-slate-200" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dentists.map((doc) => (
              <div
                key={doc.id}
                role="button"
                tabIndex={0}
                onClick={() => setActiveDentistModal(doc)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveDentistModal(doc);
                  }
                }}
                className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-xl hover:shadow-amber-950/5 hover:border-[#d4af37] transition-all flex flex-col justify-between group space-y-4 relative overflow-hidden cursor-pointer"
                title={`Click to view full profile & credentials of ${doc.name}`}
              >
                {/* Gold Top Border on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#dfba6b] via-[#c5a059] to-[#a07823] opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-4">
                  {/* Doctor Portrait Photo */}
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
                    <img
                      src={doc.avatarUrl}
                      alt={doc.name}
                      width={320}
                      height={400}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Experience Badge */}
                    <div className="absolute bottom-2.5 left-2.5 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 tabular-nums border border-white/10">
                      <Award className="w-3 h-3 text-[#fce8a6]" />
                      {doc.experienceYears} {t.dentists.yearsExp}
                    </div>

                    {/* View Profile Hover Pill */}
                    <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-xs text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-xs border border-[#eadbc3]">
                      <Info className="w-3 h-3 text-[#b8860b]" />
                      <span>View Info</span>
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-base text-slate-900 group-hover:text-[#996515] transition-colors">
                        {doc.name}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#996515] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                    </div>
                    <p className="text-xs font-semibold text-[#a07823] mt-0.5">
                      {doc.specialization}
                    </p>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {doc.bio}
                    </p>
                  </div>
                </div>

                {/* Direct 1-Tap Booking Trigger */}
                <div className="pt-3 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>{t.dentists.availableDaysLabel}</span>
                    <span className="font-semibold text-slate-800">{doc.availableDays}</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDentist(doc);
                    }}
                    className="w-full min-h-[44px] py-2.5 bg-[#fcf9f2] hover:bg-gradient-to-r hover:from-[#dfba6b] hover:to-[#a07823] text-slate-800 hover:text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs border border-[#eadbc3] active:scale-[0.98]"
                  >
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span>{t.dentists.bookWith} {doc.name.split(" ")[1] || doc.name}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ======================================================== */}
      {/* DENTIST DETAIL / INFO MODAL */}
      {/* ======================================================== */}
      {activeDentistModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveDentistModal(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dentist-modal-title"
        >
          <div
            className="relative w-full max-w-xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-[#ede2d1] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top decorative gradient line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#dfba6b] via-[#c5a059] to-[#a07823] shrink-0" />

            {/* Close button */}
            <button
              type="button"
              onClick={() => setActiveDentistModal(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Close dentist details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Modal Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {/* Header: Photo + Core Information */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                <div className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-2xl overflow-hidden bg-slate-100 border-2 border-white shadow-md shrink-0">
                  <img
                    src={activeDentistModal.avatarUrl}
                    alt={activeDentistModal.name}
                    width={240}
                    height={300}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-1.5 left-1.5 bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 border border-white/10">
                    <Award className="w-3 h-3 text-[#fce8a6]" />
                    {activeDentistModal.experienceYears} Years Exp
                  </div>
                </div>

                <div className="space-y-2 min-w-0">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#fcf8f0] text-[#8c6210] border border-[#eadbc3] text-[11px] font-bold">
                    <ShieldCheck className="w-3 h-3 text-[#d4af37]" />
                    <span>PRC Board Certified Specialist</span>
                  </div>

                  <h3 id="dentist-modal-title" className="text-2xl font-extrabold text-slate-900 leading-tight">
                    {activeDentistModal.name}
                  </h3>

                  <p className="text-sm font-semibold text-[#a07823]">
                    {activeDentistModal.title}
                  </p>

                  <p className="text-xs font-medium text-slate-600">
                    {activeDentistModal.specialization}
                  </p>

                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-500 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#0284c7] shrink-0" />
                    <span>Serene Dental Clinic • Canelar, Zamboanga City</span>
                  </div>
                </div>
              </div>

              {/* Doctor Full Biography */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#b8860b]" />
                  <span>Clinical Background & Philosophy</span>
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeDentistModal.bio}
                </p>
              </div>

              {/* Schedule & Consultation Availability */}
              <div className="space-y-2.5 p-4 rounded-2xl bg-[#fcf9f2] border border-[#eadbbf]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#8c6210]">
                  <Clock className="w-4 h-4 text-[#d4af37]" />
                  <span>Clinic Consultation Schedule</span>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                  <span className="text-slate-600 font-medium">Available Days:</span>
                  <span className="font-extrabold text-slate-900 bg-white px-3 py-1 rounded-xl border border-[#eadbc3] shadow-2xs">
                    {activeDentistModal.availableDays}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Regular Hours: 9:00 AM – 5:00 PM • Accepting Walk-ins & Pre-scheduled Appointments
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const doc = activeDentistModal;
                    setActiveDentistModal(null);
                    onSelectDentist(doc);
                  }}
                  className="flex-1 min-h-[46px] py-3 bg-gradient-to-r from-[#dfba6b] via-[#c5a059] to-[#a07823] hover:from-[#e8c679] hover:via-[#d4af37] hover:to-[#b3882a] text-slate-950 font-bold text-sm rounded-xl shadow-md shadow-amber-900/15 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-200/50 active:scale-[0.98]"
                >
                  <Calendar className="w-4 h-4 text-slate-900 shrink-0" />
                  <span>Book Appointment with {activeDentistModal.name.split(" ")[1] || activeDentistModal.name}</span>
                </button>

                <a
                  href="tel:09992258329"
                  className="min-h-[46px] px-4 py-3 bg-sky-50/80 hover:bg-sky-100 text-sky-950 font-bold text-xs rounded-xl border border-sky-200 transition-all flex items-center justify-center gap-2 text-center"
                >
                  <Phone className="w-3.5 h-3.5 text-[#0284c7] shrink-0" />
                  <span>Call 0999 225 8329</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
