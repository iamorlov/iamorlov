import { ImageResponse } from "next/og";
import { gabarito700, gabaritoFonts } from "./og-font";

export const dynamic = "force-static";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Favicon: the diagonal indigo/rose split with the V/O monogram.
export default async function Icon() {
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
          borderRadius: 12,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 2,
            left: 7,
            color: "#F8B2B2",
            fontSize: 36,
          }}
        >
          V
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 2,
            right: 7,
            color: "#403D88",
            fontSize: 36,
          }}
        >
          O
        </div>
      </div>
    ),
    { ...size, fonts: gabaritoFonts(font) }
  );
}
