import { ImageResponse } from "next/og";
import { gabarito700, gabaritoFonts } from "./og-font";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Vadym Orlov, Software Engineer and Game Developer";

// Static share card mirroring the site's diagonal indigo/rose split.
export default async function OpengraphImage() {
  const font = await gabarito700();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "linear-gradient(95deg, #403D88 0%, #403D88 49.9%, #F8B2B2 50.1%, #F8B2B2 100%)",
          fontWeight: 700,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#F8B2B2",
            fontSize: 140,
            letterSpacing: -2,
            marginBottom: 130,
          }}
        >
          VADYM
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 130,
          }}
        >
          <div style={{ color: "#403D88", fontSize: 140, letterSpacing: -2 }}>ORLOV</div>
          <div
            style={{
              color: "#291F66",
              fontSize: 22,
              fontWeight: 400,
              letterSpacing: 3,
              marginTop: 24,
              whiteSpace: "nowrap",
            }}
          >
            SOFTWARE ENGINEER AND GAME DEVELOPER
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: gabaritoFonts(font) }
  );
}
