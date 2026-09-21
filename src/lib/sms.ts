/**
 * Utility to generate an SMS URI with the proper body delimiter based on client OS.
 * - iOS strictly requires `sms:number&body=message`
 * - Android and standard RFC 5724 require `sms:number?body=message`
 */
export function buildSmsUri(phoneNumber: string, message: string): string {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
  }

  const ua = navigator.userAgent || "";
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && (navigator.maxTouchPoints || 0) > 1);

  const delimiter = isIOS ? "&" : "?";
  return `sms:${phoneNumber}${delimiter}body=${encodeURIComponent(message)}`;
}
