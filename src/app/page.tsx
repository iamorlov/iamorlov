"use client";

import { FC, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EXPO = [0.16, 1, 0.3, 1] as const;
const QUINT = [0.22, 1, 0.36, 1] as const;

const Word: FC<{ text: string; accent?: boolean; delay: number; reduced: boolean }> = ({
  text,
  accent,
  delay,
  reduced,
}) => (
  <span className={`name-row${accent ? " name-row--accent" : ""}`} aria-hidden="true">
    {text.split("").map((letter, i) => (
      <motion.span
        key={i}
        className="name-letter"
        initial={
          reduced
            ? { opacity: 0 }
            : { opacity: 0, y: "0.55em", filter: "blur(14px)" }
        }
        animate={
          reduced
            ? { opacity: 1 }
            : { opacity: 1, y: "0em", filter: "blur(0px)" }
        }
        transition={
          reduced
            ? { duration: 0.3, delay: 0.1 }
            : { duration: 0.9, ease: EXPO, delay: delay + i * 0.05 }
        }
      >
        {letter}
      </motion.span>
    ))}
  </span>
);

const Reveal: FC<{
  children: ReactNode;
  delay: number;
  reduced: boolean;
  className?: string;
}> = ({ children, delay, reduced, className }) => (
  <motion.div
    className={className}
    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
    animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
    transition={
      reduced ? { duration: 0.3, delay: 0.1 } : { duration: 0.8, ease: EXPO, delay }
    }
  >
    {children}
  </motion.div>
);

const icons = {
  github: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
} as const;

const links = [
  { href: "https://github.com/iamorlov", icon: "github", label: "GitHub" },
  { href: "https://www.linkedin.com/in/iamorlov/", icon: "linkedin", label: "LinkedIn" },
  { href: "mailto:contact@iamorlov.com", icon: "mail", label: "Email" },
] as const;

export default function Home() {
  const reduced = useReducedMotion() ?? false;

  return (
    <div className="stage">
      <main className="identity">
        <h1 className="name" aria-label="Vadym Orlov">
          <Word text="VADYM" delay={0.15} reduced={reduced} />
          <Word text="ORLOV" accent delay={0.4} reduced={reduced} />
        </h1>

        <motion.div
          className="hairline"
          initial={reduced ? { opacity: 0 } : { scaleX: 0 }}
          animate={reduced ? { opacity: 1 } : { scaleX: 1 }}
          transition={
            reduced ? { duration: 0.3, delay: 0.1 } : { duration: 0.7, ease: QUINT, delay: 1.05 }
          }
        />

        <Reveal delay={1.2} reduced={reduced}>
          <p className="role">
            Software Engineer and Game Developer<span className="role-period">.</span>
          </p>
        </Reveal>
      </main>

      <footer className="links">
        {links.map((link, i) => (
          <Reveal key={link.label} delay={1.55 + i * 0.1} reduced={reduced}>
            <a
              className="link"
              href={link.href}
              target={link.icon === "mail" ? undefined : "_blank"}
              rel="noopener noreferrer"
            >
              {icons[link.icon]}
              <span>{link.label}</span>
            </a>
          </Reveal>
        ))}
      </footer>
    </div>
  );
}
