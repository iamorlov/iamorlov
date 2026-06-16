export type GamePlatform = "iOS" | "Android" | "Google Play" | "App Store";

export interface Game {
  /** Display title of the game */
  title: string;
  /** Short one-line descriptor (optional) */
  tagline?: string;
  /** Store / platform label shown on the chip */
  platform: GamePlatform;
  /** Link to the store listing or landing page */
  url: string;
}

/**
 * TODO(vadym): replace these placeholder entries with your released games.
 * Each card needs: title, platform, and a single url. `tagline` is optional.
 * The Games section renders straight from this array — add or remove freely.
 */
export const games: Game[] = [
  {
    title: "Game One",
    tagline: "Placeholder — replace with a real title",
    platform: "Google Play",
    url: "https://play.google.com/store/apps/dev?id=0000000000000000000",
  },
  {
    title: "Game Two",
    tagline: "Placeholder — replace with a real title",
    platform: "App Store",
    url: "https://apps.apple.com/developer/id000000000",
  },
  {
    title: "Game Three",
    tagline: "Placeholder — replace with a real title",
    platform: "Android",
    url: "https://play.google.com/store/apps/dev?id=0000000000000000000",
  },
];
