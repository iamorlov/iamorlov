"use client";

import { motion } from "framer-motion";
import type { Game } from "@/data/games";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function GameCard({ game }: { game: Game }) {
  return (
    <motion.a
      href={game.url}
      target="_blank"
      rel="noopener noreferrer"
      className="game-card group"
      variants={cardVariants}
      transition={{ duration: 0.5, ease: "easeOut" }}
      aria-label={`${game.title} — ${game.platform} (opens in a new tab)`}
    >
      <span className="game-card__platform">{game.platform}</span>

      <h3
        className="text-xl font-bold tracking-tight text-[#f7e7dc] md:text-2xl"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        {game.title}
      </h3>

      {game.tagline && (
        <p className="text-sm leading-relaxed text-[#f7e7dc]/55">{game.tagline}</p>
      )}

      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-[#9a7fd0] transition-transform group-hover:translate-x-0.5">
        View
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </span>
    </motion.a>
  );
}
