import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter, Newsreader, Alex_Brush } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#c5a059",
};

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const alexBrush = Alex_Brush({
  variable: "--font-script",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://serenedental.ph"),
  title: "Serene Dental Clinic | Zamboanga City Branch • Dr. Liam Hayes, DMD",
  description:
    "Gentle, aesthetic, and safe-space dental clinic located on Mayor Jaldon St., Canelar, Zamboanga City. Swiss Airflow cleaning, braces, wisdom tooth extraction, and cosmetic dentistry. Call 0999 225 8329.",
  icons: {
    icon: "/images/logo.svg",
  },
  openGraph: {
    title: "Serene Dental Clinic | Zamboanga City",
    description:
      "Gentle, aesthetic, and safe-space dental care — Swiss Airflow®, braces, cosmetic dentistry. Mayor Jaldon St., Canelar.",
    siteName: "Serene Dental Clinic",
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Serene Dental Clinic | Zamboanga City",
    description:
      "Gentle, aesthetic dental care in Canelar, Zamboanga City. Call 0999 225 8329.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} ${newsreader.variable} ${alexBrush.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#fdfcfb] text-slate-900 font-sans">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
