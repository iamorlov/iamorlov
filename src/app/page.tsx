"use client";

import { FC, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EMAIL = "contact@iamorlov.com";

const EXPO = [0.16, 1, 0.3, 1] as const;

// from: -1 letters drop in from above (VADYM), 1 rises from below (ORLOV)
const Word: FC<{ text: string; from: -1 | 1; delay: number; reduced: boolean }> = ({
  text,
  from,
  delay,
  reduced,
}) => (
  <span aria-hidden="true">
    {text.split("").map((letter, i) => (
      <motion.span
        key={i}
        className="name-letter"
        initial={
          reduced
            ? { opacity: 0 }
            : { opacity: 0, y: `${from * -0.55}em`, filter: "blur(12px)" }
        }
        animate={
          reduced
            ? { opacity: 1 }
            : { opacity: 1, y: "0em", filter: "blur(0px)" }
        }
        transition={
          reduced
            ? { duration: 0.3, delay: 0.1 }
            : { duration: 0.7, ease: EXPO, delay: delay + i * 0.04 }
        }
      >
        {letter}
      </motion.span>
    ))}
  </span>
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
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const copyEmail = () => {
    navigator.clipboard?.writeText(EMAIL).catch(() => {});
    setCopied(true);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="stage">
      <main>
        <h1 className="names" aria-label="Vadym Orlov">
          <span className="name-half">
            <span className="name-word name-word--vadym">
              <Word text="VADYM" from={-1} delay={0.35} reduced={reduced} />
            </span>
          </span>
          <span className="name-half">
            <span className="name-word name-word--orlov">
              <Word text="ORLOV" from={1} delay={0.55} reduced={reduced} />
            </span>
          </span>
        </h1>

        <motion.p
          className="role"
          initial={reduced ? { opacity: 0 } : { opacity: 0, letterSpacing: "0.3em" }}
          animate={
            reduced
              ? { opacity: 1 }
              : { opacity: 1, letterSpacing: "0.15em" }
          }
          transition={
            reduced
              ? { duration: 0.3, delay: 0.2 }
              : { duration: 0.8, ease: EXPO, delay: 1.0 }
          }
        >
          <span className="role-line role-line--top">Software Engineer</span>{" "}
          <span className="role-line role-line--bottom">and Game Developer</span>
        </motion.p>
      </main>

      <footer className="links">
        {links.map((link, i) => {
          const isMail = link.icon === "mail";
          return (
            <motion.div
              key={link.label}
              initial={
                reduced
                  ? { opacity: 0, visibility: "hidden" }
                  : { opacity: 0, y: 18, visibility: "hidden" }
              }
              animate={
                reduced
                  ? { opacity: 1, visibility: "visible" }
                  : { opacity: 1, y: 0, visibility: "visible" }
              }
              transition={
                reduced
                  ? { duration: 0.3, delay: 0.2 }
                  : { duration: 0.6, ease: EXPO, delay: 1.25 + i * 0.08 }
              }
            >
              <a
                className="chip"
                href={link.href}
                target={isMail ? undefined : "_blank"}
                rel={isMail ? undefined : "noopener noreferrer"}
                aria-label={isMail ? `Email ${EMAIL} (copies address)` : link.label}
                onClick={isMail ? copyEmail : undefined}
              >
                <span className="chip-circle">{icons[link.icon]}</span>
                <span className="chip-label" aria-live={isMail ? "polite" : undefined}>
                  {isMail && copied ? "Copied" : link.label}
                </span>
              </a>
            </motion.div>
          );
        })}
      </footer>
    </div>
  );
}
