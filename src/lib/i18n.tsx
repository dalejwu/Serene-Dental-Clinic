"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "fil" | "ceb";

export interface Translations {
  nav: {
    services: string;
    dentists: string;
    whyUs: string;
    info: string;
    bookNow: string;
    openToday: string;
    callEmergency: string;
    locationShort: string;
  };
  topBanner: {
    badge: string;
    text: string;
    callText: string;
  };
  hero: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    description: string;
    ctaBook: string;
    ctaServices: string;
    ratingText: string;
    pricingGuarantee: string;
    pricingSub: string;
    sameDay: string;
    sameDaySub: string;
    suiteTitle: string;
    suiteLocation: string;
    acceptingBadge: string;
    popularBadge: string;
    popularTime: string;
    sampleProcedure: string;
    samplePrice: string;
    earliestSlot: string;
    onDutyTitle: string;
    selectSlotCta: string;
    hmoBadgeTitle: string;
    hmoBadgeSub: string;
  };
  services: {
    badge: string;
    heading: string;
    subheading: string;
    all: string;
    preventive: string;
    cosmetic: string;
    ortho: string;
    restorative: string;
    emergency: string;
    approxDuration: string;
    bookBtn: string;
    searchPlaceholder: string;
    popularSearches: string;
    noResults: string;
    hmoCoveredBadge: string;
    resetBtn: string;
    statSatisfiedRate: string;
    statSatisfiedText: string;
    statPatientsCount: string;
    statPatientsText: string;
    statGuaranteeRate: string;
    statGuaranteeText: string;
  };
  help: {
    needHelp: string;
    chatViber: string;
    viberSub: string;
    callClinic: string;
    bookMobileBar: string;
    orChatViber: string;
    receptionTitle: string;
    onlineStatus: string;
    helpDesc: string;
  };
  expressBooking: {
    badge: string;
    heading: string;
    subheading: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    concernLabel: string;
    concernOptions: string[];
    whenLabel: string;
    whenOptions: string[];
    submitBtn: string;
    submittingBtn: string;
    successTitle: string;
    successMessage: string;
    orCallText: string;
    callNowBtn: string;
    viberNowBtn: string;
    expressTab: string;
    detailedTab: string;
    receptionSub: string;
    errName: string;
    errPhone: string;
    bookAnotherBtn: string;
    noPrepaymentNote: string;
  };
  dentists: {
    badge: string;
    heading: string;
    subheading: string;
    prcVerified: string;
    availableDaysLabel: string;
    bookWith: string;
    yearsExp: string;
    scheduleCta: string;
  };
  testimonials: {
    heading: string;
    headingHighlight: string;
    subheading: string;
    verifiedPatient: string;
  };
  perks: {
    badge: string;
    heading: string;
    subheading: string;
    ctaHeading: string;
    ctaSub: string;
    ctaBtn: string;
    list: { title: string; desc: string }[];
  };
  clinicInfo: {
    badge: string;
    heading: string;
    subheading: string;
    addressTitle: string;
    addressText: string;
    parkingTitle: string;
    parkingText: string;
    hoursTitle: string;
    monThu: string;
    fri: string;
    sat: string;
    sun: string;
    closedEmergency: string;
    faqBadge: string;
    faqHeading: string;
    hmoTitle: string;
    hmoText: string;
    contactBarDirect: string;
    contactBarEmail: string;
    contactBarBranch: string;
    faqs: { q: string; a: string }[];
  };
  bookingModal: {
    title: string;
    stepPrefix: string;
    stepConfirmed: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    s1Title: string;
    s1Sub: string;
    s2Title: string;
    s2Sub: string;
    s3Title: string;
    s3Sub: string;
    availableDaysLabel: string;
    s4Title: string;
    s4Sub: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    notesLabel: string;
    hipaaNotice: string;
    backBtn: string;
    continueBtn: string;
    confirmBtn: string;
    confirmingBtn: string;
    confirmedTitle: string;
    confirmedSub: string;
    bookingRef: string;
    procedureLabel: string;
    specialistLabel: string;
    dateLabel: string;
    timeLabel: string;
    patientLabel: string;
    arrivalNotice: string;
    doneBtn: string;
    availableDaysTitle: string;
    timeSlotLabel: string;
    noPrepaymentNote: string;
    callAlternativeTitle: string;
    callAlternativeSub: string;
    errService: string;
    errDentist: string;
    errDateTime: string;
    errGeneric: string;
  };
  footer: {
    desc: string;
    treatmentsTitle: string;
    contactTitle: string;
    accreditationTitle: string;
    accreditationText: string;
    rightsReserved: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      services: "Services & Pricing",
      dentists: "Our Dentists",
      whyUs: "Why Choose Us",
      info: "Location & Hours",
      bookNow: "Book Appointment",
      openToday: "Open Mon-Sat",
      callEmergency: "Hotline: 0999 225 8329",
      locationShort: "Canelar, Zamboanga City",
    },
    topBanner: {
      badge: "CANELAR, ZAMBOANGA CITY",
      text: "Accepting Walk-ins & Appointments in Zamboanga City • Dr. Liam Hayes, DMD. Hotline: ",
      callText: "0999 225 8329",
    },
    hero: {
      badge: "Dr. Liam Hayes, DMD • Canelar, Zamboanga City",
      titleStart: "Your Smile's ",
      titleHighlight: "Safe Space",
      description:
        "Gentle, aesthetic, and welcoming dental care in Canelar, Zamboanga City. Modern Swiss EMS Airflow cleaning, braces, wisdom tooth extraction, and cosmetic transformations without the fear.",
      ctaBook: "Book Appointment (₱0 Fee)",
      ctaServices: "Explore Services & Pricing",
      ratingText: "5.0/5 Rating • Trusted in Zamboanga City",
      pricingGuarantee: "100% Transparent ₱ Pricing",
      pricingSub: "No surprise bills or hidden clinic charges",
      sameDay: "Swiss EMS Airflow® Ready",
      sameDaySub: "Painless cleaning with zero scraper discomfort",
      suiteTitle: "Serene Dental Clinic",
      suiteLocation: "Mayor Jaldon St., Canelar, Zamboanga City",
      acceptingBadge: "Accepting Walk-ins & Bookings",
      popularBadge: "Most Requested",
      popularTime: "45 min session",
      sampleProcedure: "Swiss EMS Airflow® Prophylaxis & Complete Checkup",
      samplePrice: "₱1,200 – ₱2,200",
      earliestSlot: "Slots available this week",
      onDutyTitle: "Lead Dental Practitioner",
      selectSlotCta: "Select Schedule & Procedure",
      hmoBadgeTitle: "Flexible Payment Options",
      hmoBadgeSub: "Cash, GCash, Maya, and installment options available",
    },
    services: {
      badge: "Transparent Philippine Pricing",
      heading: "Comprehensive Dental Procedures for Every Zamboangueño Smile",
      subheading:
        "All procedures are clearly itemized in Philippine Peso (₱). Modern equipment, sterile safety protocols, and personalized treatment plans by Dr. Liam Hayes.",
      all: "All Treatments",
      preventive: "Airflow Cleaning & Exam",
      cosmetic: "Whitening & Veneers",
      ortho: "Braces & Aligners",
      restorative: "Pasta & Restoration",
      emergency: "Wisdom Tooth & Surgery",
      approxDuration: "approx.",
      bookBtn: "Book Now",
      searchPlaceholder: "Search procedure (e.g. Airflow, Braces, Pasta, Bunot, Wisdom Tooth)...",
      popularSearches: "Popular searches:",
      noResults: "No procedures found matching your search. Please message us directly.",
      hmoCoveredBadge: "Safe-Space Care Guarantee",
      resetBtn: "Reset Search",
      statSatisfiedRate: "99%",
      statSatisfiedText: "Patient Satisfaction Rate in Gentle & Pain-Free Dental Care",
      statPatientsCount: "25K+",
      statPatientsText: "Smiling Patients Served Across Zamboanga Peninsula & Region IX",
      statGuaranteeRate: "100%",
      statGuaranteeText: "Safe-Space Guarantee with Certified Resident Specialists",
    },
    help: {
      needHelp: "Need Assistance?",
      chatViber: "Chat Front Desk via Viber / SMS",
      viberSub: "Fast response: 0999 225 8329",
      callClinic: "Call Clinic Hotline",
      bookMobileBar: "Book Appointment (₱0 Fee)",
      orChatViber: "Prefer to chat? Message 0999 225 8329",
      receptionTitle: "Canelar Clinic Reception Desk",
      onlineStatus: "Online & Active Now",
      helpDesc: "Have questions about Swiss EMS Airflow®, braces consultations, installment plans, or toothache emergencies? Chat directly with Dr. Liam’s reception team!",
    },
    expressBooking: {
      badge: "QUICK & HASSLE-FREE BOOKING",
      heading: "Book Your Appointment in 1 Easy Step",
      subheading: "Simply leave your name and mobile number. Our friendly clinic team will call or message you immediately to confirm your preferred schedule at our Canelar branch.",
      nameLabel: "Your Name (Pangalan)",
      namePlaceholder: "e.g. Maria Teresa Rodriguez",
      phoneLabel: "Your Mobile Number (09XX-XXX-XXXX)",
      phonePlaceholder: "0999-225-8329",
      concernLabel: "What procedure do you need?",
      concernOptions: [
        "Swiss Airflow Cleaning (Linis / Prophylaxis)",
        "Braces Consultation (Orthodontics)",
        "Wisdom Tooth Removal (Impacted / Bunot)",
        "Tooth Filling (Pasta / Restoration)",
        "Teeth Whitening or Veneers (Cosmetic)",
        "General Dental Checkup / Consultation",
      ],
      whenLabel: "Preferred Day / Time",
      whenOptions: [
        "Earliest Available (Pinakamabilis)",
        "Morning (9:00 AM – 12:00 PM)",
        "Afternoon (1:00 PM – 5:00 PM)",
        "Saturday Schedule",
      ],
      submitBtn: "Send Booking Request",
      submittingBtn: "Sending to Reception...",
      successTitle: "Booking Request Received!",
      successMessage: "Muchas gracias! Our clinic receptionist will contact your mobile number shortly to finalize your schedule at our Canelar branch.",
      orCallText: "Or message us directly on mobile/Viber:",
      callNowBtn: "Call: 0999 225 8329",
      viberNowBtn: "Message: 0999 225 8329",
      expressTab: "1-Step Quick Request (Easiest)",
      detailedTab: "Pick Exact Procedure & Time",
      receptionSub: "Direct response from our resident clinic receptionist",
      errName: "Please enter your full legal name.",
      errPhone: "Please enter a valid 11-digit mobile number (e.g. 0999-225-8329).",
      bookAnotherBtn: "Book Another Appointment",
      noPrepaymentNote: "No prepayment required. We will call you first to confirm.",
    },
    dentists: {
      badge: "PRC Licensed Dental Practitioners",
      heading: "Meet Dr. Liam Hayes & Clinical Team",
      subheading:
        "Dedicated to providing gentle, anxiety-free dental care in a cozy, aesthetic safe-space clinic in Zamboanga City.",
      prcVerified: "PRC Board Certified",
      availableDaysLabel: "Clinic Schedule:",
      bookWith: "Book with",
      yearsExp: "y exp",
      scheduleCta: "Schedule Consultation",
    },
    testimonials: {
      heading: "What People Say About",
      headingHighlight: "Us",
      subheading: "Real experiences from Filipino families who found stress-free dental care with us.",
      verifiedPatient: "Verified Patient",
    },
    perks: {
      badge: "The Serene Dental Safe-Space Experience",
      heading: "Designed to make every dental visit calming and fear-free.",
      subheading:
        "We believe quality dental care should never feel intimidating. From friendly consultations to pain-free treatments, your comfort comes first.",
      ctaHeading: "Ready to love your smile again in Zamboanga City?",
      ctaSub:
        "Book your appointment in under 60 seconds. Flexible payment options, GCash, and installment plans available.",
      ctaBtn: "Book Consultation",
      list: [
        {
          title: "Swiss EMS Airflow® Technology",
          desc: "Pain-free stain and plaque removal using gentle air-water-powder spray. Zero sharp scraping, zero discomfort.",
        },
        {
          title: "Aesthetic Safe-Space Clinic",
          desc: "Warm interior design, calming music, and reassuring staff designed to dissolve dental anxiety from the moment you step in.",
        },
        {
          title: "Orthodontic Installment Plans",
          desc: "Achieve the smile you've always wanted with affordable downpayment and flexible monthly installment options for braces.",
        },
        {
          title: "Gentle Wisdom Tooth Surgery",
          desc: "Atraumatic, minimally invasive odontectomy under profound local anesthesia with thorough postoperative care.",
        },
        {
          title: "Hospital-Grade Sterilization",
          desc: "Rigorous autoclave sterilization and individually sealed instruments ensuring 100% patient hygiene and safety.",
        },
        {
          title: "Friendly Zamboangueño Hospitality",
          desc: "Caring, non-judgmental guidance for first-time visitors, kids, teens, and adults alike.",
        },
      ],
    },
    clinicInfo: {
      badge: "Visit Our Zamboanga City Clinic",
      heading: "Conveniently located on Mayor Jaldon St., Canelar.",
      subheading:
        "Situated across from Honda Motors Canelar, near Metrobank Canelar, and fronting Elevation Gents.",
      addressTitle: "Clinic Address",
      addressText:
        "Mayor Jaldon Street, Canelar, Zamboanga City, 7000 (Across Honda Motors Canelar, beside Sakamoto Convenience Store, fronting Elevation Gents)",
      parkingTitle: "Landmarks & Parking",
      parkingText:
        "Easily accessible from Nuñez, Tetuan, and Downtown. Search 'Serene Dental Clinic – Zamboanga Branch' on Google Maps or Waze. Dedicated street parking available.",
      hoursTitle: "Clinic Operating Hours",
      monThu: "Monday – Saturday",
      fri: "Sunday",
      sat: "Public Holidays",
      sun: "Emergency Consultation",
      closedEmergency: "By Appointment / Emergency",
      faqBadge: "Frequently Asked Questions",
      faqHeading: "Everything you need to know before visiting",
      hmoTitle: "Payment Options Accepted:",
      hmoText:
        "Cash, GCash, Maya, and flexible monthly installment plans for braces and major dental procedures.",
      contactBarDirect: "Direct Line & Viber",
      contactBarEmail: "Official Email",
      contactBarBranch: "Canelar Clinic",
      faqs: [
        {
          q: "Where is the clinic located in Zamboanga City?",
          a: "We are located along Mayor Jaldon Street, Canelar, Zamboanga City (directly across Honda Motors Canelar, near Metrobank Canelar, and fronting Elevation Gents). Search 'Serene Smile Dental Clinic – Zamboanga Branch' on Google Maps or Waze.",
        },
        {
          q: "What is the difference between Swiss Airflow cleaning and regular scaling?",
          a: "Swiss EMS Airflow® uses a gentle, pressurized stream of warmed water, air, and fine erythritol powder. It eliminates stubborn coffee, tea, and nicotine stains and calculus with zero scraper discomfort, zero pain, and zero tooth sensitivity.",
        },
        {
          q: "Do you accept walk-in patients?",
          a: "Yes! We welcome walk-in patients from Monday to Saturday (9:00 AM – 5:00 PM). Booking online or messaging 0999 225 8329 is recommended to secure your preferred slot with minimal wait times.",
        },
        {
          q: "Do you offer installment payment plans for braces?",
          a: "Yes! We provide flexible downpayment terms and affordable monthly installments for conventional metal braces, ceramic aesthetic braces, and self-ligating brackets.",
        },
      ],
    },
    bookingModal: {
      title: "Schedule Your Appointment",
      stepPrefix: "Step",
      stepConfirmed: "Confirmed Appointment",
      step1: "Procedure",
      step2: "Dentist",
      step3: "Date & Time",
      step4: "Patient Info",
      s1Title: "Select a Dental Procedure",
      s1Sub: "Choose a service to view estimated duration and transparent Philippine Peso (₱) pricing.",
      s2Title: "Choose Your Dentist",
      s2Sub: "Select Dr. Liam Hayes or our associate dental specialists.",
      s3Title: "Choose Your Date & Time",
      s3Sub: "Available appointment slots at our Canelar, Zamboanga City clinic:",
      availableDaysLabel: "Clinic Schedule:",
      s4Title: "Patient Information",
      s4Sub: "We will send your schedule confirmation and reminders to your mobile number.",
      nameLabel: "Full Legal Name *",
      emailLabel: "Email Address",
      phoneLabel: "Mobile Number (09XX-XXX-XXXX for SMS/Viber) *",
      notesLabel: "Additional Symptoms or Notes (e.g., sensitive to cold drinks)",
      hipaaNotice: "Your personal data is protected under the Philippine Data Privacy Act of 2012.",
      backBtn: "Back",
      continueBtn: "Continue",
      confirmBtn: "Confirm Appointment",
      confirmingBtn: "Confirming Slot...",
      confirmedTitle: "Appointment Successfully Booked!",
      confirmedSub: "Confirmation sent to",
      bookingRef: "Booking Reference ID",
      procedureLabel: "Procedure:",
      specialistLabel: "Dentist:",
      dateLabel: "Date:",
      timeLabel: "Time:",
      patientLabel: "Patient:",
      arrivalNotice:
        "Serene Smile Dental Clinic, Mayor Jaldon St., Canelar, Zamboanga City (Across Honda Motors). Please arrive 10 minutes before your scheduled appointment.",
      doneBtn: "Done",
      availableDaysTitle: "Available Clinic Days (Canelar Clinic)",
      timeSlotLabel: "Select Preferred Time (Philippine Standard Time)",
      noPrepaymentNote: "100% free booking reservation. We will call you first to confirm.",
      callAlternativeTitle: "Prefer not to fill out a form?",
      callAlternativeSub: "Call or message our receptionist directly on Viber",
      errService: "Please select a service before proceeding.",
      errDentist: "Please select a dentist before proceeding.",
      errDateTime: "Please select an appointment date and time slot.",
      errGeneric: "Something went wrong. Please try again.",
    },
    footer: {
      desc: "Serene Smile Dental Clinic – Zamboanga City Branch. Led by Dr. Liam Hayes, DMD. Gentle, caring, and accessible dental healthcare on Mayor Jaldon St., Canelar, Zamboanga City.",
      treatmentsTitle: "Dental Procedures",
      contactTitle: "Clinic Inquiries",
      accreditationTitle: "Location & Hours",
      accreditationText:
        "Mayor Jaldon St., Canelar, Zamboanga City (Across Honda Motors Canelar). Open Monday through Saturday: 9:00 AM – 5:00 PM.",
      rightsReserved: "Serene Smile Dental Clinic (Zamboanga City Branch) © 2026. All rights reserved.",
    },
  },
  fil: {
    nav: {
      services: "Mga Serbisyo at Presyo",
      dentists: "Aming mga Dentista",
      whyUs: "Bakit Kami",
      info: "Lokasyon at Oras",
      bookNow: "Mag-book ng Slot",
      openToday: "Bukas Mon-Sat",
      callEmergency: "Hotline: 0999 225 8329",
      locationShort: "Canelar, Zamboanga City",
    },
    topBanner: {
      badge: "CANELAR, ZAMBOANGA CITY",
      text: "Tumatanggap ng Walk-ins & Appointments sa Zamboanga City • Dr. Liam Hayes, DMD. Hotline: ",
      callText: "0999 225 8329",
    },
    hero: {
      badge: "Dr. Liam Hayes, DMD • Canelar, Zamboanga City",
      titleStart: "Iyong Ligtas na Lugar para sa ",
      titleHighlight: "Magandang Ngiti",
      description:
        "Magaan, maingat, at magiliw na dental care sa Canelar, Zamboanga City. Swiss EMS Airflow cleaning, braces, bunot ng wisdom tooth, at pampaputi na walang kaba.",
      ctaBook: "Mag-book ng Appointment",
      ctaServices: "Tingnan ang mga Serbisyo",
      ratingText: "5.0/5 Rating • Pinagkakatiwalaan sa Zamboanga",
      pricingGuarantee: "100% Malinaw na Presyo",
      pricingSub: "Walang hidden charges o sorpresang bayarin",
      sameDay: "Swiss EMS Airflow® Ready",
      sameDaySub: "Walang ngilo at walang masakit na pagkaskas",
      suiteTitle: "Serene Dental Clinic",
      suiteLocation: "Mayor Jaldon St., Canelar, Zamboanga City",
      acceptingBadge: "Tumatanggap ng Walk-ins",
      popularBadge: "Pinakasikat",
      popularTime: "45 minutong sesyon",
      sampleProcedure: "Swiss EMS Airflow® Linis at Checkup",
      samplePrice: "₱1,200 – ₱2,200",
      earliestSlot: "May bakanteng slot ngayong linggo",
      onDutyTitle: "Punong Dentista",
      selectSlotCta: "Pumili ng Araw at Oras",
      hmoBadgeTitle: "Madaling Paraan ng Bayad",
      hmoBadgeSub: "Cash, GCash, Maya, at installment para sa braces",
    },
    services: {
      badge: "Malinaw na Presyo sa Zamboanga",
      heading: "Kumpletong Pangangalaga sa Ngipin ng Bawat Pamilyang Zamboangueño",
      subheading:
        "Lahat ng procedure ay nakatala sa Philippine Peso (₱). Modernong kagamitan at magiliw na alaga mula kay Dr. Liam Hayes.",
      all: "Lahat ng Paggamot",
      preventive: "Airflow Linis at Checkup",
      cosmetic: "Pampaputi at Veneers",
      ortho: "Braces at Aligners",
      restorative: "Pasta at Restoration",
      emergency: "Bunot at Wisdom Tooth",
      approxDuration: "tinatayang",
      bookBtn: "Mag-book Na",
      searchPlaceholder: "Maghanap (Airflow, Braces, Pasta, Bunot, Wisdom Tooth)...",
      popularSearches: "Madalas hanapin:",
      noResults: "Walang nahanap na serbisyo. Mag-message sa amin direkta.",
      hmoCoveredBadge: "Safe-Space Care",
      resetBtn: "I-reset ang Paghahanap",
      statSatisfiedRate: "99%",
      statSatisfiedText: "Antas ng Kasiyahan ng Pasyente sa Maingat at Walang Sakit na Paggamot",
      statPatientsCount: "25K+",
      statPatientsText: "Mga Pasyenteng Napangiti sa Buong Zamboanga Peninsula at Rehiyon IX",
      statGuaranteeRate: "100%",
      statGuaranteeText: "Garantiyang Ligtas na Lugar kasama ang mga Residenteng Espesyalista",
    },
    help: {
      needHelp: "Kailangan ng Tulong?",
      chatViber: "Mag-message sa Viber / SMS",
      viberSub: "Mabilis sumagot: 0999 225 8329",
      callClinic: "Tawagan ang Klinika",
      bookMobileBar: "Mag-book ng Appointment",
      orChatViber: "Gusto mag-message? 0999 225 8329",
      receptionTitle: "Reception Desk ng Canelar Clinic",
      onlineStatus: "Online at Bukas Ngayon",
      helpDesc: "May katanungan tungkol sa Swiss EMS Airflow®, konsultasyon sa braces, installment plans, o masakit na ngipin? Makipag-chat nang direkta sa reception team ni Dr. Liam!",
    },
    expressBooking: {
      badge: "MABILIS NA 1-STEP BOOKING",
      heading: "Gusto Mo Bang Magpa-appointment? Napakadali Lang.",
      subheading: "Iwanan lamang ang iyong pangalan at mobile number. Agad kang tatawagan o ite-text ng aming clinic staff para kumpirmahin ang iyong oras sa Canelar branch.",
      nameLabel: "Iyong Pangalan",
      namePlaceholder: "Hal: Maria Teresa Rodriguez",
      phoneLabel: "Mobile Number (09XX-XXX-XXXX)",
      phonePlaceholder: "0999-225-8329",
      concernLabel: "Anong tulong ang kailangan mo?",
      concernOptions: [
        "Swiss Airflow Linis (Dental Cleaning)",
        "Konsultasyon sa Braces (Orthodontics)",
        "Bunot ng Wisdom Tooth (Surgery)",
        "Pasta ng Ngipin (Fillings / Restoration)",
        "Pampaputi o Veneers (Cosmetic)",
        "General Dental Consultation / Checkup",
      ],
      whenLabel: "Gustong Araw / Oras",
      whenOptions: [
        "Pinakamabilis na Bakante",
        "Umaga (9:00 AM – 12:00 PM)",
        "Hapon (1:00 PM – 5:00 PM)",
        "Sabado na Iskedyul",
      ],
      submitBtn: "Ipadala ang Kahilingan",
      submittingBtn: "Ipinapadala sa Klinika...",
      successTitle: "Natanggap ang Kahilingan!",
      successMessage: "Muchas gracias! Tatawagan o ite-text ka kaagad ng aming receptionist para sa pinal na iskedyul sa Canelar branch.",
      orCallText: "O tumawag / mag-message sa hotline:",
      callNowBtn: "Tawag: 0999 225 8329",
      viberNowBtn: "Message: 0999 225 8329",
      expressTab: "1-Step Quick Request",
      detailedTab: "Pumili ng Eksaktong Oras",
      receptionSub: "Direktang sagot mula sa aming resident dental receptionist",
      errName: "Paki-lagay ang iyong buong pangalan.",
      errPhone: "Paki-lagay ang wastong 11-digit mobile number (Hal: 0999-225-8329).",
      bookAnotherBtn: "Mag-book ng Panibagong Appointment",
      noPrepaymentNote: "Walang paunang bayad. Tatawagan ka muna bago i-kumpirma.",
    },
    dentists: {
      badge: "PRC Licensed na mga Dentista",
      heading: "Kilalanin si Dr. Liam Hayes at ang Koponan",
      subheading:
        "Nakatuon sa maingat at magaan na gamutan sa isang maaliwalas at magandang klinika sa Zamboanga City.",
      prcVerified: "PRC Board Certified",
      availableDaysLabel: "Araw sa Klinika:",
      bookWith: "Magpa-book kay",
      yearsExp: "Taon sa Praktis",
      scheduleCta: "Mag-iskedyul ng Konsultasyon",
    },
    testimonials: {
      heading: "Ang Sinasabi ng mga Pasyente Tungkol sa",
      headingHighlight: "Amin",
      subheading: "Tunay na karanasan mula sa mga pamilyang nakaranas ng magaan at walang takot na dental care.",
      verifiedPatient: "Kumpirmadong Pasyente",
    },
    perks: {
      badge: "Alagang Safe-Space ng Serene Dental",
      heading: "Dinisenyo para alisin ang takot at kaba sa dentista.",
      subheading:
        "Naniniwala kami na ang pagpunta sa dentista ay hindi dapat nakakatakot. Maalaga at magaan ang bawat hakbang.",
      ctaHeading: "Handa ka na bang ngumiti nang may kumpiyansa sa Zamboanga City?",
      ctaSub:
        "Mag-book sa loob ng 60 segundo. Tumatanggap ng Cash, GCash, at installment para sa braces.",
      ctaBtn: "Magpa-konsulta Na",
      list: [
        {
          title: "Swiss EMS Airflow® Technology",
          desc: "Magaan at walang ngilong paglinis gamit ang hangin at maligamgam na tubig. Walang masakit na metal scraper.",
        },
        {
          title: "Magandang Safe-Space Clinic",
          desc: "Maaliwalas na paligid at magiliw na staff para komportable ka habang ginagamot ang ngipin.",
        },
        {
          title: "Abot-kayang Hulugan sa Braces",
          desc: "Mababang downpayment at buwanang hulugan para makuha ang pantay at magandang ngiti.",
        },
        {
          title: "Maingat na Bunot ng Wisdom Tooth",
          desc: "Ligtas at mabilisang odontectomy na may kumpletong gamot at gabay pagkatapos ng operasyon.",
        },
        {
          title: "Malinis at Sterile na Kagamitan",
          desc: "Mahigpit na autoclave sterilization para sa 100% kaligtasan ng bawat pasyente.",
        },
        {
          title: "Tunay na Asikasong Zamboangueño",
          desc: "Walang panunumbat o paghuhusga. Maalagang gabay para sa bata, kabataan, at matatanda.",
        },
      ],
    },
    clinicInfo: {
      badge: "Bisitahin ang Aming Klinika sa Canelar",
      heading: "Matatagpuan sa Mayor Jaldon St., Canelar, Zamboanga City.",
      subheading:
        "Katapat ng Honda Motors Canelar, malapit sa Metrobank Canelar, at tapat ng Elevation Gents.",
      addressTitle: "Eksaktong Lokasyon",
      addressText:
        "Mayor Jaldon Street, Canelar, Zamboanga City, 7000 (Tapat ng Honda Motors Canelar, tabi ng Sakamoto Convenience Store)",
      parkingTitle: "Palatandaan at Paradahan",
      parkingText:
        "Madaling puntahan mula Nuñez o Downtown. Hanapin ang 'Serene Dental Clinic – Zamboanga Branch' sa Waze o Google Maps.",
      hoursTitle: "Oras ng Klinika",
      monThu: "Lunes – Sabado",
      fri: "Linggo",
      sat: "Pista Opisyal",
      sun: "Emergency",
      closedEmergency: "By Appointment / Emergency",
      faqBadge: "Mga Karaniwang Tanong",
      faqHeading: "Lahat ng kailangan mong malaman bago bumisita",
      hmoTitle: "Paraan ng Pagbabayad:",
      hmoText:
        "Tumatanggap ng Cash, GCash, Maya, at monthly installment options para sa braces.",
      contactBarDirect: "Direktang Linya at Viber",
      contactBarEmail: "Opisyal na Email",
      contactBarBranch: "Klinika sa Canelar",
      faqs: [
        {
          q: "Saan po banda ang clinic sa Zamboanga City?",
          a: "Matatagpuan po kami sa Mayor Jaldon Street, Canelar, Zamboanga City. Katapat po kami ng Honda Motors Canelar, malapit sa Metrobank Canelar, at katapat ng Elevation Gents. Hanapin lang po ang 'Serene Dental Clinic – Zamboanga Branch' sa Google Maps o Waze.",
        },
        {
          q: "Ano po ang kaibahan ng Swiss Airflow cleaning sa regular na linis?",
          a: "Ang Swiss EMS Airflow® ay gumagamit ng banayad na pinaghalong hangin, maligamgam na tubig, at erythritol powder. Natatanggal nito ang mga mantsa (kape, tsaa, paninigarilyo) at tartar nang walang ngilo at walang masakit na pagkaskas gamit ang metal scraper.",
        },
        {
          q: "Tumatanggap po ba kayo ng walk-in patients?",
          a: "Opo! Tumatanggap kami ng walk-in mula Lunes hanggang Sabado (9:00 AM – 5:00 PM). Gayunpaman, inirerekomenda namin ang pag-book online o pag-message sa 0999 225 8329 para maiwasan ang paghihintay.",
        },
        {
          q: "May installment plan po ba para sa braces?",
          a: "Opo! May flexible downpayment at abot-kayang buwanang hulugan para sa conventional metal braces, ceramic aesthetic braces, at self-ligating braces.",
        },
      ],
    },
    bookingModal: {
      title: "Magpa-schedule ng Appointment",
      stepPrefix: "Step",
      stepConfirmed: "Kumpirmadong Appointment",
      step1: "Serbisyo",
      step2: "Dentista",
      step3: "Araw at Oras",
      step4: "Impormasyon",
      s1Title: "Pumili ng Dental Procedure",
      s1Sub: "Pumili ng serbisyo upang makita ang tinatayang tagal at malinaw na presyo (₱).",
      s2Title: "Pumili ng Iyong Dentista",
      s2Sub: "Pumili kay Dr. Liam Hayes o associate specialist.",
      s3Title: "Pumili ng Araw at Oras",
      s3Sub: "Available slots sa Canelar, Zamboanga City branch:",
      availableDaysLabel: "Mga Araw sa Klinika:",
      s4Title: "Impormasyon ng Pasyente",
      s4Sub: "Ipapadala namin ang kumpirmasyon sa iyong mobile number.",
      nameLabel: "Kumpletong Pangalan *",
      emailLabel: "Email Address",
      phoneLabel: "Mobile Number (09XX-XXX-XXXX para sa SMS/Viber) *",
      notesLabel: "Karagdagang Sintomas (Hal. masakit kapag umiinom ng malamig)",
      hipaaNotice: "Protektado ang iyong data alinsunod sa Philippine Data Privacy Act ng 2012.",
      backBtn: "Bumalik",
      continueBtn: "Magpatuloy",
      confirmBtn: "Kumpirmahin ang Appointment",
      confirmingBtn: "Kinukumpirma ang Slot...",
      confirmedTitle: "Matagumpay na Naka-book ang Appointment!",
      confirmedSub: "Ipinadala ang detalye sa",
      bookingRef: "Booking Reference ID",
      procedureLabel: "Serbisyo:",
      specialistLabel: "Dentista:",
      dateLabel: "Petsa:",
      timeLabel: "Oras:",
      patientLabel: "Pasyente:",
      arrivalNotice:
        "Serene Smile Dental Clinic, Mayor Jaldon St., Canelar, Zamboanga City (Tapat ng Honda Motors). Mangyaring dumating 10 minuto bago ang iskedyul.",
      doneBtn: "Tapos na",
      availableDaysTitle: "Mga Araw na Bukas ang Klinika (Canelar Branch)",
      timeSlotLabel: "Pumili ng Oras (Philippine Standard Time)",
      noPrepaymentNote: "100% libre ang booking reservation. Tatawagan ka muna para kumpirmahin.",
      callAlternativeTitle: "Ayaw mag-fill up ng form?",
      callAlternativeSub: "Tumawag o mag-Viber kaagad sa receptionist",
      errService: "Pumili muna ng serbisyo bago magpatuloy.",
      errDentist: "Pumili ng dentista bago magpatuloy.",
      errDateTime: "Pumili ng araw at oras ng pagbisita.",
      errGeneric: "Nagkaroon ng problema. Paki-ulit muli.",
    },
    footer: {
      desc: "Serene Smile Dental Clinic – Zamboanga City Branch. Pinangungunahan ni Dr. Liam Hayes, DMD. Maalaga, magaan, at abot-kayang dental care sa Mayor Jaldon St., Canelar, Zamboanga City.",
      treatmentsTitle: "Mga Serbisyo",
      contactTitle: "Pakikipag-ugnayan",
      accreditationTitle: "Lokasyon at Oras",
      accreditationText:
        "Mayor Jaldon St., Canelar, Zamboanga City (Katapat ng Honda Motors Canelar). Bukas Lunes hanggang Sabado: 9:00 AM – 5:00 PM.",
      rightsReserved: "Serene Smile Dental Clinic (Zamboanga City Branch) © 2026. Lahat ng karapatan ay nakareserba.",
    },
  },
  ceb: {
    nav: {
      services: "Mga Serbisyo ug Presyo",
      dentists: "Amoang mga Dentista",
      whyUs: "Nganong Kami",
      info: "Lokasyon ug Oras",
      bookNow: "Mag-book og Slot",
      openToday: "Bukas Mon-Sat",
      callEmergency: "Hotline: 0999 225 8329",
      locationShort: "Canelar, Zamboanga City",
    },
    topBanner: {
      badge: "CANELAR, ZAMBOANGA CITY",
      text: "Bienvenido na Serene Dental Clinic Zamboanga City • Dr. Liam Hayes, DMD. Hotline: ",
      callText: "0999 225 8329",
    },
    hero: {
      badge: "Dr. Liam Hayes, DMD • Canelar, Zamboanga City",
      titleStart: "El de tuyo lugar para el ",
      titleHighlight: "Alegre Risa",
      description:
        "Gentil y moderno dental clinic na Canelar, Zamboanga City. Swiss EMS Airflow cleaning, braces, bunot de muela (wisdom tooth), y pasta sin miedo y dolor.",
      ctaBook: "Mag-book og Appointment",
      ctaServices: "Tan-awa ang mga Serbisyo",
      ratingText: "5.0/5 Rating • Kasaligan sa Zamboanga City",
      pricingGuarantee: "100% Klaro nga Presyo",
      pricingSub: "Walay tinago nga bayranan",
      sameDay: "Swiss EMS Airflow® Ready",
      sameDaySub: "Walay sakit nga limpyo sa ngipon",
      suiteTitle: "Serene Dental Clinic",
      suiteLocation: "Mayor Jaldon St., Canelar, Zamboanga City",
      acceptingBadge: "Naga-dawat og Walk-ins",
      popularBadge: "Pinakapopular",
      popularTime: "45 minutos",
      sampleProcedure: "Swiss EMS Airflow® Limpyo ug Checkup",
      samplePrice: "₱1,200 – ₱2,200",
      earliestSlot: "Naay bakante karong semanaha",
      onDutyTitle: "Punong Dentista",
      selectSlotCta: "Pilia ang Iskedyul",
      hmoBadgeTitle: "Sayon nga Pagbayad",
      hmoBadgeSub: "Cash, GCash, Maya, ug hulugan sa braces",
    },
    services: {
      badge: "Klaro nga Presyo sa Zamboanga",
      heading: "Kumpletong Pag-atiman sa Ngipon sa mga Pamilyang Zamboangueño",
      subheading:
        "Tanan serbisyo nakalista sa Philippine Peso (₱). Modernong gamit ug mahigalaong pag-atiman gikan kang Dr. Liam Hayes.",
      all: "Tanan nga Pagtambal",
      preventive: "Airflow Limpyo ug Checkup",
      cosmetic: "Pampaputi ug Veneers",
      ortho: "Braces ug Aligners",
      restorative: "Pasta ug Restoration",
      emergency: "Bunot ug Wisdom Tooth",
      approxDuration: "gibana-bana",
      bookBtn: "Mag-book Karon",
      searchPlaceholder: "Pangita og serbisyo (Airflow, Braces, Pasta, Bunot, Wisdom Tooth)...",
      popularSearches: "Permi gipangita:",
      noResults: "Walay serbisyo nga nakit-an. Palihug tawag o mensahe direkta.",
      hmoCoveredBadge: "Safe-Space Care",
      resetBtn: "I-reset ang Pagpangita",
      statSatisfiedRate: "99%",
      statSatisfiedText: "Kinaadman sa Kasiyahan sa Pasyente sa Malumo ug Walay Sakit nga Pagtambal",
      statPatientsCount: "25K+",
      statPatientsText: "Mga Pasyenteng Napahiyom sa Tibuok Zamboanga Peninsula ug Rehiyon IX",
      statGuaranteeRate: "100%",
      statGuaranteeText: "Kasegurohan sa Safe-Space uban sa mga Sertipikadong Espesyalista",
    },
    help: {
      needHelp: "Kinahanglan og Tabang?",
      chatViber: "Mensahe sa Viber / SMS",
      viberSub: "Paspas motubag: 0999 225 8329",
      callClinic: "Tawag sa Hotline",
      bookMobileBar: "Mag-book og Appointment",
      orChatViber: "Gusto mag-chat? 0999 225 8329",
      receptionTitle: "Reception Desk sa Canelar Clinic",
      onlineStatus: "Online ug Abli Karon",
      helpDesc: "Adunay mga pangutana bahin sa Swiss EMS Airflow®, konsultasyon sa braces, installment plans, o sakit sa ngipon? Direktang makig-chat sa reception team ni Dr. Liam!",
    },
    expressBooking: {
      badge: "DALI NGA 1-STEP BOOKING",
      heading: "Gusto Ka Magpa-appointment? Sayon Ra Kaayo.",
      subheading: "Ibilin lang imong ngalan ug mobile number. Motawag o mag-text dayon among receptionist para ma-kumpirma imong oras sa Canelar branch.",
      nameLabel: "Imong Ngalan",
      namePlaceholder: "e.g. Maria Teresa Rodriguez",
      phoneLabel: "Mobile Number (09XX-XXX-XXXX)",
      phonePlaceholder: "0999-225-8329",
      concernLabel: "Unsa imong gikinahanglan?",
      concernOptions: [
        "Swiss Airflow Limpyo (Dental Cleaning)",
        "Konsultasyon sa Braces (Orthodontics)",
        "Bunot sa Wisdom Tooth (Surgery)",
        "Pasta sa Ngipon (Fillings / Restoration)",
        "Pampaputi o Veneers (Cosmetic)",
        "General Dental Checkup / Consultation",
      ],
      whenLabel: "Gitinguhang Adlaw / Oras",
      whenOptions: [
        "Pinakadali nga Bakante",
        "Buntag (9:00 AM – 12:00 PM)",
        "Hapon (1:00 PM – 5:00 PM)",
        "Sabado nga Iskedyul",
      ],
      submitBtn: "Ipadala ang Hangyo",
      submittingBtn: "Gipadala sa Klinika...",
      successTitle: "Nadawat ang Hangyo!",
      successMessage: "Muchas gracias! Motawag o mo-text dayon among receptionist sa imong mobile number para sa Canelar branch schedule.",
      orCallText: "O motawag / mag-mensahe sa hotline:",
      callNowBtn: "Tawag: 0999 225 8329",
      viberNowBtn: "Mensahe: 0999 225 8329",
      expressTab: "1-Step Quick Request",
      detailedTab: "Pilia ang Oras",
      receptionSub: "Direktang tubag gikan sa among receptionist sa klinika",
      errName: "Palihug ibutang imong kompletong ngalan.",
      errPhone: "Palihug ibutang ang saktong 11-digit mobile number (Pananglitan: 0999-225-8329).",
      bookAnotherBtn: "Mag-book og Lain nga Appointment",
      noPrepaymentNote: "Walay bayad daan. Tawagan ka una namo usa i-kumpirma.",
    },
    dentists: {
      badge: "PRC Licensed nga mga Dentista",
      heading: "Himamata si Dr. Liam Hayes ug ang Team",
      subheading:
        "Gipahinungod sa malumo ug walay kahadlok nga pag-atiman sa ngipon sa Canelar, Zamboanga City.",
      prcVerified: "PRC Board Certified",
      availableDaysLabel: "Adlaw sa Klinika:",
      bookWith: "Mag-book kang",
      yearsExp: "tuig kasinatian",
      scheduleCta: "Mag-iskedyul og Konsultasyon",
    },
    testimonials: {
      heading: "Ang Gisulti sa mga Tawo Bahin Kan",
      headingHighlight: "Amo",
      subheading: "Tinuod nga kasinatian gikan sa mga pamilyang nakasinati og malumo ug walay kahadlok nga pag-atiman.",
      verifiedPatient: "Kumpirmadong Pasyente",
    },
    perks: {
      badge: "Ang Serene Dental Safe-Space Experience",
      heading: "Gidisenyo aron wagtangon ang kahadlok sa dentista.",
      subheading:
        "Dili kinahanglan mahadlok sa dental clinic. Mahigalaon ug malumo ang among mga kamot para kanimo.",
      ctaHeading: "Andam na ba ka mopahiyom pag-usab sa Zamboanga City?",
      ctaSub:
        "Mag-book sulod sa 60 segundos. Modawat og Cash, GCash, ug installment sa braces.",
      ctaBtn: "Mag-book og Konsultasyon",
      list: [
        {
          title: "Swiss EMS Airflow® Technology",
          desc: "Malumo nga pagtangtang sa mantsa ug tartar gamit ang hangin ug maligamgam nga tubig nga walay ngilo.",
        },
        {
          title: "Nindot nga Safe-Space Clinic",
          desc: "Komportable ug limpyo nga paligid aron hayahay imong pamati samtang gitambalan ang ngipon.",
        },
        {
          title: "Barato nga Hulugan sa Braces",
          desc: "Ubos nga downpayment ug binulan nga hulugan para sa tul-id ug nindot nga ngipon.",
        },
        {
          title: "Malumo nga Bunot sa Wisdom Tooth",
          desc: "Luwas ug paspas nga operasyon ubos sa maayong anesthesia ug saktong giya pagkahuman.",
        },
        {
          title: "Hospital-Grade nga Pag-sterilize",
          desc: "Hugot nga autoclave sterilization para sa 100% kaluwasan sa tanang pasyente.",
        },
        {
          title: "Tinuod nga Pag-atiman nga Zamboangueño",
          desc: "Walay pagpanghusga. Mahigalaong pag-atiman sa bata, batan-on, ug hamtong.",
        },
      ],
    },
    clinicInfo: {
      badge: "Bisitaha ang Among Klinika sa Canelar",
      heading: "Nahimutang sa Mayor Jaldon St., Canelar, Zamboanga City.",
      subheading:
        "Atbang sa Honda Motors Canelar, duol sa Metrobank Canelar, ug atbang sa Elevation Gents.",
      addressTitle: "Eksaktong Lokasyon",
      addressText:
        "Mayor Jaldon Street, Canelar, Zamboanga City, 7000 (Atbang sa Honda Motors Canelar, tupad sa Sakamoto Convenience Store)",
      parkingTitle: "Palatandaan ug Parking",
      parkingText:
        "Dali ra tultulon gikan Nuñez o Downtown. Pangitaa ang 'Serene Dental Clinic – Zamboanga Branch' sa Google Maps o Waze.",
      hoursTitle: "Oras sa Klinika",
      monThu: "Lunes – Sabado",
      fri: "Domingo",
      sat: "Public Holidays",
      sun: "Emergency",
      closedEmergency: "By Appointment / Emergency",
      faqBadge: "Kasagarang Pangutana",
      faqHeading: "Tanan nga angay nimong mahibaloan sa dili pa moduaw",
      hmoTitle: "Mga Paagi sa Pagbayad:",
      hmoText:
        "Modawat og Cash, GCash, Maya, ug monthly installment plans alang sa braces.",
      contactBarDirect: "Direktang Linya ug Viber",
      contactBarEmail: "Opisyal nga Email",
      contactBarBranch: "Klinika sa Canelar",
      faqs: [
        {
          q: "Asa dapit ang clinic sa Zamboanga City?",
          a: "Nahimutang mi sa Mayor Jaldon Street, Canelar, Zamboanga City. Atbang gyud sa Honda Motors Canelar, duol sa Metrobank Canelar, ug atbang sa Elevation Gents.",
        },
        {
          q: "Unsay kalahian sa Swiss Airflow cleaning sa regular nga linis?",
          a: "Ang Swiss EMS Airflow® naggamit og malumo nga kombinasyon sa hangin, tubig, ug erythritol powder. Matangtang ang mantsa ug tartar nga walay ngilo ug walay masakit nga pagkagis gamit ang metal.",
        },
        {
          q: "Modawat ba mo og walk-in patients?",
          a: "Oo! Modawat mi og walk-in gikan Lunes hangtod Sabado (9:00 AM – 5:00 PM). Apan mas maayo mag-book daan o mag-message sa 0999 225 8329 para dili maghulat.",
        },
        {
          q: "Naa bay installment plan para sa braces?",
          a: "Oo! Naay flexible downpayment ug barato nga binulan nga hulugan para sa braces.",
        },
      ],
    },
    bookingModal: {
      title: "Magpa-schedule og Appointment",
      stepPrefix: "Step",
      stepConfirmed: "Kumpirmadong Appointment",
      step1: "Serbisyo",
      step2: "Dentista",
      step3: "Adlaw ug Oras",
      step4: "Impormasyon",
      s1Title: "Pilia ang Dental Procedure",
      s1Sub: "Pilia ang serbisyo aron makita ang tinatayang gidugayon ug klaro nga presyo (₱).",
      s2Title: "Pilia ang Dentista",
      s2Sub: "Pilia si Dr. Liam Hayes o associate specialist.",
      s3Title: "Pilia ang Adlaw ug Oras",
      s3Sub: "Available slots sa Canelar, Zamboanga City branch:",
      availableDaysLabel: "Adlaw sa Klinika:",
      s4Title: "Impormasyon sa Pasyente",
      s4Sub: "Ipadala namo ang kumpirmasyon sa imong mobile number.",
      nameLabel: "Kumpletong Ngalan *",
      emailLabel: "Email Address",
      phoneLabel: "Mobile Number (09XX-XXX-XXXX para sa SMS/Viber) *",
      notesLabel: "Dugang Sintomas (Pananglitan: sakit kon moinom og bugnaw)",
      hipaaNotice: "Protektado ang imong impormasyon subay sa Philippine Data Privacy Act sa 2012.",
      backBtn: "Balik",
      continueBtn: "Padayon",
      confirmBtn: "Kumpirmaha ang Appointment",
      confirmingBtn: "Gikumpirma ang Slot...",
      confirmedTitle: "Malamposong Naka-book ang Appointment!",
      confirmedSub: "Gipadala ang detalye sa",
      bookingRef: "Booking Reference ID",
      procedureLabel: "Serbisyo:",
      specialistLabel: "Dentista:",
      dateLabel: "Petsa:",
      timeLabel: "Oras:",
      patientLabel: "Pasyente:",
      arrivalNotice:
        "Serene Smile Dental Clinic, Mayor Jaldon St., Canelar, Zamboanga City (Atbang sa Honda Motors). Palihug abot 10 minutos sa dili pa ang gitakdang oras.",
      doneBtn: "Nahuman Na",
      availableDaysTitle: "Mga Adlaw nga Abli ang Klinika (Canelar Branch)",
      timeSlotLabel: "Pagpili og Oras (Philippine Standard Time)",
      noPrepaymentNote: "100% libre ang booking reservation. Tawagan ka una namo usa kumpirmahon.",
      callAlternativeTitle: "Dili ganahan mag-fill up og form?",
      callAlternativeSub: "Tawag o mag-Viber dayon sa receptionist",
      errService: "Palihug pagpili una og serbisyo sa dili pa mopadayon.",
      errDentist: "Palihug pagpili og dentista sa dili pa mopadayon.",
      errDateTime: "Palihug pagpili og adlaw ug oras sa pagbisita.",
      errGeneric: "Adunay problema nga nahitabo. Palihug sulayi pag-usab.",
    },
    footer: {
      desc: "Serene Smile Dental Clinic – Zamboanga City Branch. Gipangunahan ni Dr. Liam Hayes, DMD. Malumo, maayo, ug barato nga pag-atiman sa ngipon sa Mayor Jaldon St., Canelar, Zamboanga City.",
      treatmentsTitle: "Mga Serbisyo",
      contactTitle: "Impormasyon sa Klinika",
      accreditationTitle: "Lokasyon ug Oras",
      accreditationText:
        "Mayor Jaldon St., Canelar, Zamboanga City (Atbang sa Honda Motors Canelar). Bukas Lunes hangtod Sabado: 9:00 AM – 5:00 PM.",
      rightsReserved: "Serene Smile Dental Clinic (Zamboanga City Branch) © 2026. Tanan nga katungod gigahin.",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: translations.en,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("smiletoday_lang") as Language;
    if (saved && (saved === "en" || saved === "fil" || saved === "ceb")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("smiletoday_lang", lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
