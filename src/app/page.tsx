"use client";

import React, { useState } from "react";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ExpressBooking from "@/components/ExpressBooking";
import ServiceCatalog, { ServiceItem } from "@/components/ServiceCatalog";
import DentistDirectory, { DentistItem } from "@/components/DentistDirectory";
import Testimonials from "@/components/Testimonials";
import ClinicInfo from "@/components/ClinicInfo";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import FloatingHelp from "@/components/FloatingHelp";

const BookingModal = dynamic(() => import("@/components/BookingModal"), {
  ssr: false,
});
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
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedDentist, setSelectedDentist] = useState<DentistItem | null>(null);

  const handleOpenBooking = () => {
    setSelectedService(null);
    setSelectedDentist(null);
    setBookingOpen(true);
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
    setSelectedDentist(null);
    setBookingOpen(true);
  };

  const handleSelectDentist = (dentist: DentistItem) => {
    setSelectedDentist(dentist);
    setSelectedService(null);
    setBookingOpen(true);
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
      {/* Top Banner: Immediate Call & Emergency line */}
      <div className="bg-slate-950 text-amber-100 text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap border-b border-[#3d2f16]/60">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
        <span>{t.topBanner.text}</span>
        <a href="tel:09992258329" className="underline font-bold text-[#fce8a6] hover:text-white tabular-nums whitespace-nowrap">
          {t.topBanner.callText}
        </a>
      </div>

      {/* Primary Navigation with Official Golden Tooth Logo & Brand Wordmark */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Content Area */}
      <main className="flex-1 pb-24 sm:pb-0 overflow-x-hidden">
        {/* 1. Hero Section matching business card aesthetic */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* 2. 1-Step Express Booking (For Non-Tech Users) */}
        <ExpressBooking />

        {/* 3. Trusted Dental Services for the Whole Family */}
        <ServiceCatalog onSelectService={handleSelectService} />

        {/* 4. Qualified Doctors Section */}
        <DentistDirectory onSelectDentist={handleSelectDentist} />

        {/* 5. What People Say About Us */}
        <Testimonials />

        {/* 6. Comfort Architecture / Why Serene Dental */}
        <section id="why-us" className="content-auto py-16 sm:py-20 bg-[#fdfcfb] border-t border-[#ede2d1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#fcf8f0] border border-[#eadbc3] text-[#8c6210] text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                {t.perks.badge}
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                {t.perks.heading}
              </h2>
              <p className="text-slate-600 text-base leading-relaxed max-w-[65ch] mx-auto">
                {t.perks.subheading}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.perks.list.map((perk, i) => (
                <div
                  key={i}
                  className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-xl hover:shadow-amber-950/5 hover:border-[#d4af37] transition-all space-y-3 relative overflow-hidden group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#fcf8f0] border border-[#eadbc3] flex items-center justify-center group-hover:scale-105 transition-transform">
                    {perkIcons[i % perkIcons.length]}
                  </div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-[#996515] transition-colors">
                    {perk.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{perk.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Clinic Info, Hours, Insurance & FAQ */}
        <ClinicInfo />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectedService={selectedService}
        preselectedDentist={selectedDentist}
      />

      {/* User-Friendly Floating Help & Mobile Quick Booking Bar */}
      <FloatingHelp onOpenBooking={handleOpenBooking} />
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
