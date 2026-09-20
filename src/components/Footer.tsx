"use client";

import React from "react";
import { Phone, Mail, MapPin, Heart } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { ToothMark } from "@/components/BrandLogo";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-400 py-14 border-t border-[#3d2f16]/60 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#2a241b] to-[#1a1610] border border-[#d4af37]/40 flex items-center justify-center p-1 shadow-md">
                <ToothMark size={28} />
              </div>
              <div className="flex flex-col">
                <span className="font-serif italic text-2xl text-amber-200 leading-none">
                  Serene Smile
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d4af37] mt-1">
                  Dental Clinic
                </span>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              {t.footer.desc}
            </p>
            <div className="flex flex-col gap-1.5 pt-1 text-slate-300 font-medium">
              <span>🇵🇭 Zamboanga City Branch</span>
              <a
                href="https://www.facebook.com/isa.adil.92"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 text-[11px] underline underline-offset-2 flex items-center gap-1"
              >
                Official Facebook Page & Updates &rarr;
              </a>
            </div>
          </div>

          {/* Treatments Col */}
          <div className="space-y-3">
            <h5 className="font-extrabold text-amber-300 text-xs uppercase tracking-widest">
              {t.footer.treatmentsTitle}
            </h5>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-amber-300 transition-colors">Swiss EMS Airflow® Prophylaxis</a></li>
              <li><a href="#services" className="hover:text-amber-300 transition-colors">Orthodontics & Braces</a></li>
              <li><a href="#services" className="hover:text-amber-300 transition-colors">Wisdom Tooth Removal & Bunot</a></li>
              <li><a href="#services" className="hover:text-amber-300 transition-colors">Composite Tooth Filling (Pasta)</a></li>
              <li><a href="#services" className="hover:text-amber-300 transition-colors">Cosmetic Veneers & Whitening</a></li>
            </ul>
          </div>

          {/* Office Contact */}
          <div className="space-y-3">
            <h5 className="font-extrabold text-amber-300 text-xs uppercase tracking-widest">
              {t.footer.contactTitle}
            </h5>
            <ul className="space-y-2.5 text-slate-300">
              <li>
                <a
                  href="tel:+639926312712"
                  aria-label="Call Serene Dental Clinic at 0992 631 2712"
                  className="flex items-center gap-2.5 group text-slate-300 hover:text-amber-300 transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-[#0284c7] flex items-center justify-center text-white shrink-0 group-hover:bg-[#0369a1] transition-colors">
                    <Phone className="w-3 h-3" />
                  </div>
                  <span className="text-white font-semibold tabular-nums group-hover:text-amber-300">
                    0992 631 2712
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#0284c7] flex items-center justify-center text-white shrink-0">
                  <Mail className="w-3 h-3" />
                </div>
                <a href="mailto:contact@serenedentalclinic.com" className="hover:text-amber-300 break-all">contact@serenedentalclinic.com</a>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#0284c7] flex items-center justify-center text-white shrink-0 mt-0.5">
                  <MapPin className="w-3 h-3" />
                </div>
                <span>Mayor Jaldon St., Canelar, Zamboanga City (Across Honda Motors, fronting Elevation Gents)</span>
              </li>
            </ul>
          </div>

          {/* Accreditation & Payment Badges */}
          <div className="space-y-3">
            <h5 className="font-extrabold text-amber-300 text-xs uppercase tracking-widest">
              {t.footer.accreditationTitle}
            </h5>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {t.footer.accreditationText}
            </p>
            <div className="pt-2 flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 bg-slate-900 rounded-lg text-[10px] text-amber-300 font-semibold border border-[#d4af37]/30">
                PRC Licensed
              </span>
              <span className="px-2.5 py-1 bg-slate-900 rounded-lg text-[10px] text-amber-300 font-semibold border border-[#d4af37]/30">
                PDA Member
              </span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 text-center text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>{t.footer.rightsReserved}</div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Made with care for Filipino smiles • Canelar, Zamboanga City</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
