"use client";

import { FC } from "react";
import { motion } from "framer-motion";

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
    <div className="flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-sm p-3 transition-all bg-[#727D73]/20 text-[#727D73]/80 group-hover:bg-[#727D73]/30 group-hover:text-[#727D73] md:bg-white/20 md:text-white/80 md:group-hover:bg-white/30 md:group-hover:text-white">
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
    <span className="text-xs font-medium transition-colors links-text text-[#727D73]/70 group-hover:text-[#727D73] md:text-white/70 md:group-hover:text-white">
      {label}
    </span>
  </a>
);

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 1.8,
      }
    }
  };

  const vadymVariants = {
    hidden: { 
      opacity: 0, 
      y: -40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 1.0,
        ease: "easeOut"
      }
    }
  };

  const orlovVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 1.0,
        ease: "easeOut",
      }
    }
  };

  const footerVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 2.4,
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      <main className="relative z-10 flex flex-1 flex-col justify-center items-center p-4">
        <motion.div
          className="flex flex-col justify-center h-[60vh] w-full max-w-[1920px] px-4 gap-8 md:gap-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ perspective: "1000px" }}
        >
          {/* Desktop Layout - Side by side */}
          <div className="hidden md:flex md:flex-row md:h-full">
            {/* Left half for VADYM */}
            <div className="w-1/2 flex items-center justify- pr-4">
              <motion.h1 
                className="font-black leading-[0.85] tracking-tighter text-center text-[#e9edc9] max-w-full overflow-hidden mb-[6rem]"
                style={{ 
                  fontSize: "clamp(6rem, 12.5vw, 14rem)",
                  transformStyle: "preserve-3d",
                  fontFamily: "var(--font-dm-sans)"
                }}
                variants={vadymVariants}
              >
                VADYM
              </motion.h1>
            </div>
            {/* Right half for ORLOV */}
            <div className="w-1/2 flex items-center justify-end pl-4">
              <motion.h1 
                className="font-black leading-[0.85] tracking-tighter text-center text-[#384B70] max-w-full overflow-hidden mt-[6rem]"
                style={{ 
                  fontSize: "clamp(6rem, 12.5vw, 14rem)",
                  transformStyle: "preserve-3d",
                  fontFamily: "var(--font-dm-sans)"
                }}
                variants={orlovVariants}
              >
                ORLOV
              </motion.h1>
            </div>
          </div>

          {/* Mobile Layout - Stacked */}
          <div className="flex flex-col md:hidden h-full justify-center items-center gap-16">
            <motion.h1 
              className="font-black leading-[0.85] tracking-tighter text-center text-[#e9edc9] max-w-full overflow-hidden"
              style={{ 
                fontSize: "clamp(5rem, 16vw, 10rem)",
                transformStyle: "preserve-3d",
                fontFamily: "var(--font-dm-sans)"
              }}
              variants={vadymVariants}
            >
              VADYM
            </motion.h1>
            <motion.h1 
              className="font-black leading-[0.85] tracking-tighter text-center text-[#384B70] max-w-full overflow-hidden"
              style={{ 
                fontSize: "clamp(5rem, 16vw, 10rem)",
                transformStyle: "preserve-3d",
                fontFamily: "var(--font-dm-sans)"
              }}
              variants={orlovVariants}
            >
              ORLOV
            </motion.h1>
          </div>
        </motion.div>
      </main>

      <motion.footer 
        className="w-full z-10 flex justify-center md:justify-start md:relative fixed bottom-0 left-0"
        variants={footerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-wrap items-center justify-center gap-8 px-6 py-10 w-full md:w-1/2">
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
      </motion.footer>
    </div>
  );
}
