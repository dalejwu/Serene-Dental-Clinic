"use client";

import React from "react";
import { Calendar } from "lucide-react";

interface FloatingBookingProps {
  onOpenBooking?: () => void;
}

export default function FloatingHelp({ onOpenBooking }: FloatingBookingProps = {}) {
  const handleBookClick = () => {
    // 1. Smoothly scroll viewport up to the top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // 2. Open the native booking modal
    onOpenBooking?.();
  };

  return (
    <aside aria-label="Quick appointment booking" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center justify-end select-none">
      <button
        type="button"
        onClick={handleBookClick}
        className="relative w-14 h-14 rounded-full bg-white/95 backdrop-blur-md border border-[#eadbc3] hover:border-[#dfba6b] shadow-lg shadow-amber-950/10 hover:shadow-xl hover:shadow-amber-900/15 flex flex-col items-center justify-center text-slate-800 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
        title="Book Appointment"
        aria-label="Book Appointment (Scrolls to top and opens booking)"
      >
        {/* Subtle Minimalist Notification Dot */}
        <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-2 ring-white" />
        </span>

        {/* Minimal Calendar Icon */}
        <Calendar className="w-4 h-4 text-[#996515] group-hover:scale-110 transition-transform shrink-0" />

        {/* Crisp Micro-Label */}
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 mt-0.5 leading-none">
          Book
        </span>
      </button>
    </aside>
  );
}
