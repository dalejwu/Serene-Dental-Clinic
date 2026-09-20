"use client";

import React, { useState, useEffect } from "react";
import { Award, Calendar, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { DEFAULT_DENTISTS } from "@/lib/defaultData";

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
  onSelectDentist?: (dentist: DentistItem) => void;
}

export default function DentistDirectory({ onSelectDentist }: DentistDirectoryProps = {}) {
  const { t } = useLanguage();
  const [dentists, setDentists] = useState<DentistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDentists() {
      try {
        const res = await fetch("/api/dentists");
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setDentists(data.data);
        } else {
          setDentists(DEFAULT_DENTISTS);
        }
      } catch (err) {
        console.warn("Could not fetch dentists from API, using default dentists:", err);
        setDentists(DEFAULT_DENTISTS);
      } finally {
        setLoading(false);
      }
    }
    loadDentists();
  }, []);

  return (
    <section id="specialists" className="py-16 sm:py-20 bg-[#fdfcfb] border-t border-[#ede2d1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center sm:text-left space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            {t.dentists.heading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-[60ch]">
            {t.dentists.subheading}
          </p>
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
                className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-lg hover:shadow-amber-950/5 hover:border-[#dfba6b] transition-all flex flex-col justify-between group space-y-5 relative overflow-hidden"
              >
                {/* Gold Top Border line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#dfba6b] via-[#c5a059] to-[#a07823] opacity-60 group-hover:opacity-100 transition-opacity" />

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
                      className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-300"
                    />

                    {/* Experience Badge */}
                    <div className="absolute bottom-2.5 left-2.5 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 tabular-nums border border-white/10">
                      <Award className="w-3 h-3 text-[#fce8a6]" />
                      {doc.experienceYears} {t.dentists.yearsExp}
                    </div>

                    {/* PRC Verified Badge */}
                    <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-xs text-[#8c6210] text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xs border border-[#eadbc3]">
                      <ShieldCheck className="w-3 h-3 text-[#d4af37]" />
                      <span>{t.dentists.prcVerified}</span>
                    </div>
                  </div>

                  {/* Doctor Info & Full Readable Bio */}
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-[#996515] transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#a07823]">
                      {doc.specialization}
                    </p>
                    <p className="text-xs text-slate-600 pt-1 leading-relaxed">
                      {doc.bio}
                    </p>
                  </div>
                </div>

                {/* Schedule & Available Days Row */}
                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#a07823] shrink-0" />
                    <span>{doc.availableDays}</span>
                  </div>
                  <span className="text-[#8c6210] font-semibold text-right">{doc.title}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
