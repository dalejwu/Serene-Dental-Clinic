"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  Sparkles,
  Smile,
  ShieldCheck,
  ArrowUpRight,
  Search,
  X,
  Clock,
  HeartPulse,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  description: string;
  durationMinutes: number;
  priceRange: string;
  iconName: string;
}

interface ServiceCatalogProps {
  onSelectService: (service: ServiceItem) => void;
}

export default function ServiceCatalog({ onSelectService }: ServiceCatalogProps) {
  const { t } = useLanguage();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const tolerance = 4;
    setCanScrollLeft(el.scrollLeft > tolerance);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - tolerance);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  // Convert vertical mouse wheel into horizontal scroll on the pills rail
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll > 0) {
          if (
            (e.deltaY > 0 && el.scrollLeft < maxScroll - 1) ||
            (e.deltaY < 0 && el.scrollLeft > 1)
          ) {
            e.preventDefault();
            el.scrollLeft += e.deltaY;
          }
        }
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const scrollByAmount = (offset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.2;
    if (Math.abs(walk) > 4) {
      hasDraggedRef.current = true;
    }
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        if (data.success) {
          setServices(data.data);
        }
      } catch (err) {
        console.error("Failed to load services:", err);
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  const categories = [
    { id: "All", label: t.services.all },
    { id: "Preventive", label: t.services.preventive },
    { id: "Cosmetic", label: t.services.cosmetic },
    { id: "Orthodontics", label: t.services.ortho },
    { id: "Restorative", label: t.services.restorative },
    { id: "Emergency", label: t.services.emergency },
  ];

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesCategory =
        selectedCategory === "All" ||
        service.category.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        service.name.toLowerCase().includes(q) ||
        service.description.toLowerCase().includes(q) ||
        service.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [services, selectedCategory, searchQuery]);

  const getServiceIcon = (index: number) => {
    switch (index % 4) {
      case 0:
        return <Smile className="w-5 h-5 text-[#b8860b]" />;
      case 1:
        return <Sparkles className="w-5 h-5 text-[#d4af37]" />;
      case 2:
        return <ShieldCheck className="w-5 h-5 text-[#0284c7]" />;
      default:
        return <HeartPulse className="w-5 h-5 text-[#b8860b]" />;
    }
  };

  return (
    <section id="services" className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {t.services.heading}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-[60ch] mx-auto">
            {t.services.subheading}
          </p>
        </div>

        {/* Filter Pills and Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
          {/* Categories with smooth horizontal scroll rail and navigation controls */}
          <div className="relative flex-1 min-w-0 flex items-center">
            {/* Left Chevron Button */}
            {canScrollLeft && (
              <button
                type="button"
                onClick={() => scrollByAmount(-200)}
                aria-label="Scroll categories left"
                className="absolute left-0 z-10 w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs border border-[#eadbc3] shadow-md flex items-center justify-center text-slate-700 hover:text-amber-800 hover:border-[#dfba6b] transition-all cursor-pointer -translate-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {/* Scrollable Track */}
            <div
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth w-full cursor-grab active:cursor-grabbing select-none"
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    if (hasDraggedRef.current) return;
                    setSelectedCategory(cat.id);
                    setSearchQuery("");
                  }}
                  className={`h-10 px-4 inline-flex items-center justify-center rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 select-none ${
                    selectedCategory === cat.id
                      ? "bg-gradient-to-r from-[#dfba6b] via-[#c5a059] to-[#a07823] text-slate-950 shadow-xs font-bold scale-[1.02] border border-amber-200/60"
                      : "bg-[#fcf9f2] text-slate-600 hover:bg-[#f5ecdd] hover:text-slate-900 border border-slate-200/60"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Right Chevron Button */}
            {canScrollRight && (
              <button
                type="button"
                onClick={() => scrollByAmount(200)}
                aria-label="Scroll categories right"
                className="absolute right-0 z-10 w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs border border-[#eadbc3] shadow-md flex items-center justify-center text-slate-700 hover:text-amber-800 hover:border-[#dfba6b] transition-all cursor-pointer translate-x-2"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-64 lg:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.services.searchPlaceholder}
              className="w-full h-10 pl-9 pr-8 bg-[#fdfcf9] border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] outline-none transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 flex items-center justify-center"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Responsive Services Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-64 rounded-3xl bg-slate-100 animate-pulse border border-slate-200" />
            ))}
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-2xl bg-[#fcf9f2] border border-[#ede2d1] space-y-3">
            <p className="text-slate-600 text-sm">{t.services.noResults}</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="min-h-[40px] px-4 py-2 bg-gradient-to-r from-[#dfba6b] to-[#a07823] text-slate-950 text-xs font-semibold rounded-xl cursor-pointer"
            >
              {t.services.resetBtn}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service, idx) => (
              <div
                key={service.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelectService(service)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectService(service);
                  }
                }}
                className="rounded-3xl p-6 bg-white border border-slate-200/80 hover:border-[#d4af37] focus-visible:ring-2 focus-visible:ring-[#c5a059] focus-visible:outline-none hover:shadow-xl hover:shadow-amber-950/5 transition-all duration-300 flex flex-col justify-between group cursor-pointer space-y-6 relative overflow-hidden"
              >
                {/* Subtle top gold accent on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#dfba6b] via-[#c5a059] to-[#a07823] opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-4">
                  {/* Clean Icon */}
                  <div className="w-11 h-11 rounded-2xl bg-[#fcf8f0] border border-[#eadbc3] flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getServiceIcon(idx)}
                  </div>

                  {/* Procedure Title & Description */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#996515] transition-colors leading-snug">
                      {service.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Price, Duration & Arrow Action ↗ */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-medium text-slate-500 flex items-center gap-1 tabular-nums">
                      <Clock className="w-3 h-3 text-[#b8860b]" />
                      ~{service.durationMinutes} mins
                    </div>
                    <div className="text-sm font-extrabold text-slate-900 mt-0.5 tabular-nums">
                      {service.priceRange}
                    </div>
                  </div>

                  {/* Arrow Action Button */}
                  <div
                    className="w-9 h-9 rounded-full bg-[#fcf9f2] border border-[#eadbc3] text-slate-700 group-hover:bg-[#a07823] group-hover:text-white group-hover:border-[#a07823] flex items-center justify-center transition-all"
                    aria-label={`Book ${service.name}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Statistics Bar */}
        <div className="mt-14 pt-10 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="space-y-1 md:border-r border-slate-200/80 pr-0 md:pr-6">
            <div className="text-4xl font-extrabold text-slate-900 tracking-tight tabular-nums text-gold-gradient">{t.services.statSatisfiedRate}</div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              {t.services.statSatisfiedText}
            </p>
          </div>

          <div className="space-y-1 md:border-r border-slate-200/80 px-0 md:px-6">
            <div className="text-4xl font-extrabold text-slate-900 tracking-tight tabular-nums text-gold-gradient">{t.services.statPatientsCount}</div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              {t.services.statPatientsText}
            </p>
          </div>

          <div className="space-y-1 pl-0 md:pl-6">
            <div className="text-4xl font-extrabold text-slate-900 tracking-tight text-gold-gradient">{t.services.statGuaranteeRate}</div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              {t.services.statGuaranteeText}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
