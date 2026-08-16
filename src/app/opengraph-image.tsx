import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Vadym Orlov, Software Engineer and Game Developer";

// Fetched once at build time (static export). Falls back to the default
// font if the network is unavailable so the build never breaks.
async function gabarito700(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Gabarito:wght@700",
      { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1)" } }
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

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
    {
      ...size,
      fonts: font
        ? [{ name: "Gabarito", data: font, weight: 700, style: "normal" }]
        : undefined,
    }
  );
}
