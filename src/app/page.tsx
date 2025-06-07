"use client";

import { FC, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Social icon component
const IconLink: FC<{ href: string; icon: string; label: string }> = ({
  href,
  icon,
  label,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex flex-col items-center gap-2 transition-all duration-300 hover:scale-105"
    aria-label={label}
  >
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 p-3 text-zinc-400 transition-colors group-hover:bg-zinc-800 group-hover:text-white">
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
    <span className="text-xs font-medium text-zinc-400 transition-colors group-hover:text-zinc-300 links-text">
      {label}
    </span>
  </a>
);

const WordCarousel: FC = () => {
  const words = [
    "DEVELOPER",
    "CREATOR",
    "DREAMER",
    "CURIOUS",
    "DETERMINED",
    "INNOVATIVE",
    "UKRAINIAN",
    "ORLOV",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < words.length - 1) {
      const intervalId = setInterval(() => {
        setIndex(prevIndex => {
          return prevIndex < words.length - 1 ? prevIndex + 1 : prevIndex;
        });
      }, 700);

      return () => clearInterval(intervalId);
    }
  }, [index, words.length]);

  return (
    <div className="flex items-center overflow-hidden">
      <div className="relative w-full">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 700,
              damping: 35,
              mass: 0.6,
              duration: 0.4
            }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold text-white tracking-tighter block title-font main-text iamtitle"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function Home() {
  const [headingText, setHeadingText] = useState("I AM");
  const [equalLayout, setEqualLayout] = useState(false);

  useEffect(() => {
    const textTimer = setTimeout(() => {
      setHeadingText("VADYM");
    }, 6000);

    const layoutTimer = setTimeout(() => {
      setEqualLayout(true);
    }, 6000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(layoutTimer);
    };
  }, []);

  const headingVariants = {
    initial: {
      opacity: 0,
      y: 30,
      rotateX: 40,
    },
    animate: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        duration: 0.7,
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      rotateX: -40,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col text-white relative overflow-hidden">
      <main className="relative z-10 flex flex-1 flex-col">
        <div className="flex flex-col md:flex-row flex-1 items-center justify-center p-4 md:p-10 lg:p-16">
          <div
            className={`w-full ${equalLayout ? 'md:w-1/2' : 'md:w-1/3'} flex justify-center md:justify-end pr-0 md:pr-8 md:mb-0 transition-all duration-1000 ease-in-out`}
          >
            <div className="iamtitle-container">
              <h1 className="font-bold text-white tracking-tighter text-right main-text iamtitle" 
                  style={{ perspective: "1000px" }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={headingText}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={headingVariants}
                    style={{ display: "inline-block", transformOrigin: "center" }}
                  >
                    {headingText}
                  </motion.span>
                </AnimatePresence>
              </h1>
            </div>
          </div>

          <div
            className={`w-full ${equalLayout ? 'md:w-1/2' : 'md:w-2/3'} flex flex-col justify-center pl-0 md:pl-8 transition-all duration-1000 ease-in-out`}
          >
            <WordCarousel />
          </div>
        </div>
      </main>

      <footer className="w-full bg-black/50 relative z-10">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8 px-6 py-10">
          <IconLink
            href="https://github.com/iamorlov"
            icon="github"
            label="GitHub"
          />
          <IconLink
            href="https://www.linkedin.com/in/iamorlov/"
            icon="linkedin"
            label="LinkedIn"
          />
          <IconLink
            href="mailto:contact@iamorlov.com"
            icon="mail"
            label="Email"
          />
        </div>
      </footer>
    </div>
  );
}
