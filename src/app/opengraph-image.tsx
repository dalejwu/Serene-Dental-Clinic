import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt =
  "Serene Dental Clinic – Gentle Aesthetic Dentistry in Zamboanga City";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(145deg, #fdfcfb 0%, #f8f0e0 50%, #fcf7ec 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gold decorative border */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: "linear-gradient(90deg, #dfba6b, #c5a059, #a07823)",
          }}
        />

        {/* Tooth + S Monogram (simplified) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 24,
            background: "linear-gradient(180deg, #fffefc, #fcf7ec)",
            border: "2px solid #eadbbf",
            marginBottom: 28,
            fontSize: 40,
          }}
        >
          🦷
        </div>

        {/* Brand Name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 400,
              color: "#0f172a",
              letterSpacing: "0.02em",
              fontStyle: "italic",
            }}
          >
            Serene Smile
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: "0.25em",
              textTransform: "uppercase" as const,
              color: "#996515",
            }}
          >
            DENTAL CLINIC
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 28,
            fontSize: 20,
            fontWeight: 500,
            color: "#64748b",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.6,
          }}
        >
          Gentle, aesthetic, and safe-space dental care in Zamboanga City
        </div>

        {/* Feature pills */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 32,
          }}
        >
          {["Swiss Airflow®", "Braces & Ortho", "Cosmetic Dentistry"].map(
            (label) => (
              <div
                key={label}
                style={{
                  padding: "8px 20px",
                  borderRadius: 12,
                  background: "#fcf8f0",
                  border: "1px solid #eadbc3",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#8c6210",
                }}
              >
                {label}
              </div>
            )
          )}
        </div>

        {/* Bottom location bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 52,
            background: "#0f172a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            color: "#94a3b8",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          <span>📍 Mayor Jaldon St., Canelar, Zamboanga City</span>
          <span style={{ color: "#d4af37" }}>•</span>
          <span>📞 0992 631 2712</span>
          <span style={{ color: "#d4af37" }}>•</span>
          <span>Mon–Sat 9AM–5PM</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
