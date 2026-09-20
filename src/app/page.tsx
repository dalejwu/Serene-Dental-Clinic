"use client";

import React, { useState } from "react";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceCatalog from "@/components/ServiceCatalog";
import DentistDirectory from "@/components/DentistDirectory";
import Testimonials from "@/components/Testimonials";
import ClinicInfo from "@/components/ClinicInfo";
import Footer from "@/components/Footer";
import CalendlyModal from "@/components/CalendlyModal";
import FloatingHelp from "@/components/FloatingHelp";
import {
  Sparkles,
  ShieldCheck,
  Tv,
  Coffee,
  Scan,
  HeartHandshake,
} from "lucide-react";

function MainContent() {
  const { t } = useLanguage();

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleOpenBooking = () => {
    setIsBookingModalOpen(true);
  };

  const perkIcons = [
    <Scan key="scan" className="w-6 h-6 text-[#b8860b]" />,
    <Sparkles key="sparkles" className="w-6 h-6 text-[#d4af37]" />,
    <Tv key="tv" className="w-6 h-6 text-[#0284c7]" />,
    <Coffee key="coffee" className="w-6 h-6 text-[#b8860b]" />,
    <ShieldCheck key="shield" className="w-6 h-6 text-[#0284c7]" />,
    <HeartHandshake key="heart" className="w-6 h-6 text-[#b8860b]" />,
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Primary Navigation with Official Golden Tooth Logo & Brand Wordmark */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Content Area */}
      <main className="flex-1 pb-0 overflow-x-hidden">
        {/* 1. Hero Section matching business card aesthetic */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* 2. Trusted Dental Services for the Whole Family */}
        <ServiceCatalog />

        {/* 3. Qualified Doctors Section */}
        <DentistDirectory />

        {/* 5. What People Say About Us */}
        <Testimonials />

        {/* 6. Comfort Architecture / Why Serene Dental */}
        <section id="why-us" className="content-auto py-20 bg-[#fbf9f4] border-t border-[#ede2d1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              
              {/* Editorial Clinic Narrative (Left Column) */}
              <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-28">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#eadbc3] text-[#8c6210] text-xs font-semibold shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{t.perks.badge}</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  {t.perks.heading}
                </h2>
                
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {t.perks.subheading}
                </p>

                <div className="p-5 rounded-2xl bg-white border border-[#eadbc3] shadow-2xs space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#996515]">
                    Canelar Clinic Atmosphere
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Thoughtfully designed along Mayor Jaldon Street with calming ambient lighting, sterile hospital-grade autoclaves, and gentle dentists who explain every step before touching your teeth.
                  </p>
                </div>
              </div>

              {/* Bespoke Numbered Cards (Right Column) */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {t.perks.list.map((perk, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-white border border-[#ede2d1] hover:border-[#dfba6b] transition-all space-y-3 relative group shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#fbf7ee] border border-[#eadbc3] flex items-center justify-center shrink-0">
                        {perkIcons[i % perkIcons.length]}
                      </div>
                      <span className="font-serif italic text-lg text-amber-900/30 font-semibold group-hover:text-[#b8860b] transition-colors">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-[#996515] transition-colors">
                      {perk.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{perk.desc}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* 7. Clinic Info, Hours, Insurance & FAQ */}
        <ClinicInfo />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Persistent Floating Reception & Mobile Sticky Conversion Bar */}
      <FloatingHelp onOpenBooking={handleOpenBooking} />

      {/* Brand-Protected Native Appointment Booking Modal (Chat-First) */}
      <CalendlyModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}
