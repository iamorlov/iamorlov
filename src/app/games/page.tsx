import type { Metadata } from "next";
import Link from "next/link";
import Games from "@/components/Games";
import SocialLinks from "@/components/SocialLinks";

export const metadata: Metadata = {
  title: "Games — Vadym Orlov",
  description: "Mobile games developed and released by Vadym Orlov.",
};

export default function GamesPage() {
  return (
    <div className="act2-band flex min-h-screen flex-col">
      <header className="mx-auto w-full max-w-5xl px-6 pt-8">
        <Link
          href="/"
          className="links-text inline-flex items-center gap-2 text-sm text-[#f7e7dc]/60 transition-colors hover:text-[#f7e7dc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9a7fd0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#000814] rounded-sm"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Vadym Orlov
        </Link>
      </header>

      <div className="flex flex-1 flex-col justify-center">
        <Games />
      </div>

      <SocialLinks variant="dark" />
    </div>
  );
}
