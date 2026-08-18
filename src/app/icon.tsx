import { ImageResponse } from "next/og";
import { gabarito700, gabaritoFonts } from "./og-font";

export const dynamic = "force-static";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Favicon: round indigo disc, single rose V in the site's Gabarito 700.
export default async function Icon() {
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
          borderRadius: "50%",
          color: "#F8B2B2",
          fontSize: 44,
          fontWeight: 700,
        }}
      >
        V
      </div>
    ),
    { ...size, fonts: gabaritoFonts(font) }
  );
}
