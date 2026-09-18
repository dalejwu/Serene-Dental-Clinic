/**
 * Calendly Configuration & Helpers for Serene Dental Clinic
 */

export const DEFAULT_CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  "https://calendly.com/acejohnz115/new-meeting";

export interface CalendlyUrlOptions {
  serviceName?: string;
  dentistName?: string;
  patientName?: string;
  patientEmail?: string;
}

/**
 * Builds an optimized Calendly embed URL with branding colors and optional prefill tags.
 */
export function buildCalendlyEmbedUrl(options?: CalendlyUrlOptions): string {
  const baseUrl = (
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/acejohnz115/new-meeting"
  ).trim();

  try {
    const url = new URL(baseUrl);

    // Clean branding params matching Serene Dental Clinic gold/slate design
    url.searchParams.set("hide_gdpr_banner", "1");
    url.searchParams.set("background_color", "ffffff");
    url.searchParams.set("text_color", "0f172a");
    url.searchParams.set("primary_color", "c5a059");

    // Pass service or dentist as tracking / context if present
    if (options?.serviceName) {
      url.searchParams.set("utm_term", options.serviceName);
    }
    if (options?.dentistName) {
      url.searchParams.set("utm_content", options.dentistName);
    }
    if (options?.patientName) {
      url.searchParams.set("name", options.patientName);
    }
    if (options?.patientEmail) {
      url.searchParams.set("email", options.patientEmail);
    }

    return url.toString();
  } catch {
    // Fallback if URL is relative or invalid
    const separator = baseUrl.includes("?") ? "&" : "?";
    return `${baseUrl}${separator}hide_gdpr_banner=1&primary_color=c5a059`;
  }
}

/**
 * Opens Calendly in a new browser tab/window with optional context.
 */
export function openCalendly(options?: CalendlyUrlOptions): void {
  const url = buildCalendlyEmbedUrl(options);
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
