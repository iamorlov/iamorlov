import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon: same chevron mark, no rounding (iOS masks itself).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#403D88",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 64 64">
          <path
            d="M 16 18 L 32 36 L 48 18"
            stroke="#F8B2B2"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M 16 34 L 32 52 L 48 34"
            stroke="#AF719D"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
    ),
    size
  );
}
