"use client";

import React from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function Testimonials() {
  const { t } = useLanguage();

  const reviews = [
    {
      name: "Maria Fatima Alih",
      role: "Canelar Resident & Mom of 2",
      rating: 5,
      avatar: "/images/patient_1.webp",
      quote:
        "Super gentle! I used to dread dental visits, but Dr. Liam's Swiss EMS Airflow cleaning was completely painless—no scraping metal sounds. The clinic along Mayor Jaldon is a true safe space!",
      procedure: "Swiss EMS Airflow® Prophylaxis",
    },
    {
      name: "Engr. Mark Anthony Tan",
      role: "Tetuan, Zamboanga City",
      rating: 5,
      avatar: "/images/patient_2.webp",
      quote:
        "Very easy booking. The receptionist called me right away to confirm my slot across Honda Motors Canelar. Fast, honest pricing, and my dental pasta was done seamlessly.",
      procedure: "Aesthetic Composite Filling",
    },
    {
      name: "Al-Zuhayr Hadjirul",
      role: "WMSU University Student",
      rating: 5,
      avatar: "/images/patient_3.webp",
      quote:
        "Had my impacted wisdom tooth removed and braces consultation here. Zero swelling the next day! Doc Liam explains every step gently before touching your teeth.",
      procedure: "Wisdom Tooth Removal & Braces",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-[#ede2d1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          {/* Live Google Reviews verification badge */}
          <a
            href="https://maps.google.com/?q=Mayor+Jaldon+St+Canelar+Zamboanga+City"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fdfaf3] border border-[#eadbc3] hover:border-[#d4af37] text-xs font-bold text-slate-800 shadow-2xs hover:shadow-xs transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-0.5 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-extrabold text-[#996515]">5.0 / 5.0 Rating</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600 group-hover:text-slate-900 transition-colors">
              Verified Google Reviews &rarr;
            </span>
          </a>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            {t.testimonials.heading}{" "}
            <span className="font-script text-4xl sm:text-5xl font-normal text-gold-gradient block sm:inline">
              {t.testimonials.headingHighlight}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-[60ch] mx-auto">
            {t.testimonials.subheading}
          </p>
        </div>

        {/* Reviews 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="bg-[#fdfcf9] rounded-3xl p-7 border border-[#ede2d1] shadow-2xs hover:shadow-xl hover:shadow-amber-950/5 hover:border-[#d4af37] transition-all flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              {/* Subtle top gold highlight */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#dfba6b] via-[#c5a059] to-[#a07823] opacity-60" />

              <div className="space-y-4">
                {/* 5 Stars + Verified Tag */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-md">
                    Google Review
                  </span>
                </div>

                {/* Quote */}
                <p className="font-serif italic text-sm sm:text-base text-slate-800 leading-relaxed">
                  “{rev.quote}”
                </p>
              </div>

              {/* Patient Info */}
              <div className="pt-4 border-t border-[#ede2d1] flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  width={44}
                  height={44}
                  loading="lazy"
                  decoding="async"
                  className="w-11 h-11 rounded-full object-cover border border-[#eadbc3]"
                />
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                    {rev.name}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">{rev.role}</div>
                  <div className="text-[10px] text-[#996515] font-semibold flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-[#b8860b] shrink-0" />
                    <span className="truncate">{t.testimonials.verifiedPatient} • {rev.procedure}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
