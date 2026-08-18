// Gabarito 700 for build-time ImageResponse assets (favicon, apple
// icon, OG card). Fetched once per build; null fallback keeps the
// build alive offline (satori then uses its default font).
export async function gabarito700(): Promise<ArrayBuffer | null> {
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

export function gabaritoFonts(data: ArrayBuffer | null) {
  return data
    ? [{ name: "Gabarito", data, weight: 700 as const, style: "normal" as const }]
    : undefined;
}
