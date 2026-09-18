/**
 * Fallback dental services and dentists data for resilient UI operation.
 */

export const DEFAULT_SERVICES = [
  {
    id: "srv-airflow",
    name: "Swiss EMS Airflow® Prophylaxis (Deep Clean & Stain Removal)",
    category: "Preventive",
    description:
      "Modern, painless dental cleaning utilizing Swiss Airflow technology to eliminate plaque, calculus, and coffee/nicotine stains with zero scraper discomfort.",
    durationMinutes: 45,
    priceRange: "₱1,200 – ₱2,200",
    iconName: "ShieldCheck",
  },
  {
    id: "srv-braces",
    name: "Orthodontics: Conventional & Aesthetic Ceramic Braces",
    category: "Orthodontics",
    description:
      "Comprehensive teeth alignment for teens and adults. Flexible monthly installment payment options available with free diagnostic consultation.",
    durationMinutes: 45,
    priceRange: "₱35,000 – ₱65,000",
    iconName: "Smile",
  },
  {
    id: "srv-wisdom",
    name: "Impacted Wisdom Tooth Surgery (Painless Odontectomy)",
    category: "Emergency",
    description:
      "Gentle surgical removal of impacted third molars causing pain, overcrowding, or pericoronitis under profound local anesthesia.",
    durationMinutes: 60,
    priceRange: "₱4,500 – ₱10,000",
    iconName: "Zap",
  },
  {
    id: "srv-whitening",
    name: "In-Office Laser Teeth Whitening & Composite Veneers",
    category: "Cosmetic",
    description:
      "Instantly brighter smile with medical-grade whitening gel and light activation. Custom composite veneers for chipped or discolored teeth.",
    durationMinutes: 60,
    priceRange: "₱7,500 – ₱15,000",
    iconName: "Sparkles",
  },
  {
    id: "srv-restoration",
    name: "Light-Cured Tooth Restoration (Pasta / Fillings)",
    category: "Restorative",
    description:
      "Seamless tooth-shaded resin restorations that blend invisibly with your natural enamel, halting decay and restoring biting strength.",
    durationMinutes: 35,
    priceRange: "₱900 – ₱1,800",
    iconName: "Wrench",
  },
  {
    id: "srv-endodontics",
    name: "Endodontics & Custom Dentures (Pustiso / Root Canal)",
    category: "Restorative",
    description:
      "Tooth-saving root canal therapy and lightweight flexible/acrylic dentures designed for comfortable eating and natural smile confidence.",
    durationMinutes: 60,
    priceRange: "₱4,500 – ₱18,000",
    iconName: "Activity",
  },
];

export const DEFAULT_DENTISTS = [
  {
    id: "dentist-liam",
    name: "Dr. Liam Hayes, DMD",
    title: "Clinic Director & Lead Dental Practitioner",
    specialization: "Cosmetic Dentistry & Orthodontics (PRC Certified)",
    experienceYears: 12,
    bio: "Founder & Lead Surgeon at Serene Dental Clinic. Passionate about gentle, anxiety-free dental visits in a modern, welcoming safe-space environment on Mayor Jaldon St., Canelar.",
    availableDays: "Mon, Tue, Wed, Thu, Fri, Sat",
    avatarUrl: "/images/hero_dentist.webp",
  },
  {
    id: "dentist-camille",
    name: "Dr. Camille Santos, DMD",
    title: "Associate Dentist & Pediatric Care Specialist",
    specialization: "Preventive Care & Swiss Airflow Prophylaxis",
    experienceYears: 8,
    bio: "Specialist in gentle pediatric dentistry, Swiss Airflow prophylaxis, and painless composite tooth restorations. Known for her calm, reassuring approach with nervous patients.",
    availableDays: "Mon, Wed, Fri",
    avatarUrl: "/images/dentist_camille.webp",
  },
  {
    id: "dentist-mark",
    name: "Dr. Mark Anthony Ramos, DMD",
    title: "Oral Surgery Associate",
    specialization: "Wisdom Tooth Removal & Minor Oral Surgery",
    experienceYears: 11,
    bio: "Experienced in atraumatic impacted wisdom tooth extractions (odontectomy) and complicated surgical cases with rapid postoperative recovery.",
    availableDays: "Tue, Thu, Sat",
    avatarUrl: "/images/dentist_mark.webp",
  },
];
