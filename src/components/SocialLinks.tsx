"use client";

import { FC } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type Variant = "split" | "dark";

const LINKS = [
  { href: "https://github.com/iamorlov", icon: "github", label: "GitHub" },
  { href: "https://www.linkedin.com/in/iamorlov/", icon: "linkedin", label: "LinkedIn" },
  { href: "mailto:contact@iamorlov.com", icon: "mail", label: "Email" },
] as const;

// Social icon component
const IconLink: FC<{
  href: string;
  icon: string;
  label: string;
  variant: Variant;
}> = ({ href, icon, label, variant }) => {
  const circle =
    variant === "split"
      ? "bg-[#727D73]/20 text-[#727D73]/80 group-hover:bg-[#727D73]/30 group-hover:text-[#727D73] md:bg-white/20 md:text-white/80 md:group-hover:bg-white/30 md:group-hover:text-white"
      : "bg-[#f7e7dc]/10 text-[#f7e7dc]/80 group-hover:bg-[#7251b5]/30 group-hover:text-[#f7e7dc]";
  const labelCls =
    variant === "split"
      ? "text-[#727D73]/70 group-hover:text-[#727D73] md:text-white/70 md:group-hover:text-white"
      : "text-[#f7e7dc]/70 group-hover:text-[#f7e7dc]";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center gap-2 transition-all duration-300 hover:scale-105"
      aria-label={label}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full p-3 backdrop-blur-sm transition-all ${circle}`}
      >
        {icon === "github" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
        )}
        {icon === "linkedin" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        )}
        {icon === "mail" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        )}
      </div>
      <span
        className={`links-text text-xs font-medium transition-colors ${labelCls}`}
      >
        {label}
      </span>
    </a>
  );
};

export default function SocialLinks({
  variant = "split",
}: {
  variant?: Variant;
}) {
  if (variant === "split") {
    // Original placement: fixed to the bottom. Icons bottom-left, tagline bottom-right.
    const footerVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut", delay: 2.4 },
      },
    };

    const developerLink =
      "rounded-sm underline decoration-2 underline-offset-[5px] decoration-[#7251b5]/30 transition-colors hover:text-[#5c3f9c] hover:decoration-[#7251b5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7251b5]";

    return (
      <motion.footer
        className="fixed bottom-0 left-0 z-10 w-full"
        variants={footerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col-reverse items-center gap-6 px-6 py-8 md:flex-row md:items-end md:justify-between md:gap-6">
          {/* Bottom-left: social icons */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:justify-start">
            {LINKS.map((l) => (
              <IconLink key={l.label} {...l} variant="split" />
            ))}
          </div>

          {/* Bottom-right: skills tagline (mirror of the icons) */}
          <p
            className="text-center text-base font-bold tracking-tight md:text-right md:text-lg lg:text-xl"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            <span className="text-[#384B70]">Software Engineer &amp; </span>
            <Link href="/games" className={`text-[#7251b5] ${developerLink}`}>
              Game Developer
            </Link>
          </p>
        </div>
      </motion.footer>
    );
  }

  // Dark in-flow footer for the /games page.
  return (
    <motion.footer
      className="w-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-center gap-10 px-6 pb-14 pt-6">
        {LINKS.map((l) => (
          <IconLink key={l.label} {...l} variant="dark" />
        ))}
      </div>
    </motion.footer>
  );
}
