import { ImageResponse } from "next/og";
import { gabarito700, gabaritoFonts } from "./og-font";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon: same single V, square canvas (iOS masks itself).
export default async function AppleIcon() {
  const font = await gabarito700();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#403D88",
          color: "#F8B2B2",
          fontSize: 124,
          fontWeight: 700,
        }}
      >
        V
      </div>
    ),
    { ...size, fonts: gabaritoFonts(font) }
  );
}
