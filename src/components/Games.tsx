"use client";

import { motion } from "framer-motion";
import { games } from "@/data/games";
import GameCard from "./GameCard";
import BrandMark from "./BrandMark";

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

export default function Games() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16 md:py-20">
      {/* Section header with the Orlov Games brand mark */}
      <motion.div
        className="flex flex-col items-center gap-4 text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <BrandMark
          width={150}
          height={150}
          className="h-auto w-[120px] md:w-[150px]"
        />
        <p className="text-xs uppercase tracking-[0.4em] text-[#f7e7dc]/40">
          Released games
        </p>
      </motion.div>

      {/* Minimal card grid */}
      <motion.div
        className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {games.map((game) => (
          <GameCard key={game.title} game={game} />
        ))}
      </motion.div>
    </section>
  );
}
