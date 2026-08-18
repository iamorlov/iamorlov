import { ImageResponse } from "next/og";
import { gabarito700, gabaritoFonts } from "./og-font";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon: same split monogram, larger and without rounding
// (iOS applies its own mask).
export default async function AppleIcon() {
  const font = await gabarito700();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "linear-gradient(135deg, #403D88 0%, #403D88 49.5%, #F8B2B2 50.5%, #F8B2B2 100%)",
          fontWeight: 700,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 6,
            left: 22,
            color: "#F8B2B2",
            fontSize: 100,
          }}
        >
          V
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 6,
            right: 22,
            color: "#403D88",
            fontSize: 100,
          }}
        >
          O
        </div>
      </div>
    ),
    { ...size, fonts: gabaritoFonts(font) }
  );
}
