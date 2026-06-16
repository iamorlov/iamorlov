"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 1.8,
      },
    },
  };

  const vadymVariants = {
    hidden: { opacity: 0, y: -40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 1.0,
        ease: "easeOut",
      },
    },
  };

  const orlovVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 1.0,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="flex w-full max-w-[1920px] flex-col justify-center px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ perspective: "1000px" }}
    >
      {/* Desktop names — side by side */}
      <div className="hidden md:flex md:flex-row">
        <div className="flex w-1/2 items-center justify-start pr-4">
          <motion.h1
            className="mb-[6rem] max-w-full overflow-hidden text-center font-black leading-[0.85] tracking-tighter text-[#e9edc9]"
            style={{
              fontSize: "clamp(6rem, 12.5vw, 14rem)",
              transformStyle: "preserve-3d",
              fontFamily: "var(--font-dm-sans)",
            }}
            variants={vadymVariants}
          >
            VADYM
          </motion.h1>
        </div>
        <div className="flex w-1/2 items-center justify-end pl-4">
          <motion.h1
            className="mt-[6rem] max-w-full overflow-hidden text-center font-black leading-[0.85] tracking-tighter text-[#384B70]"
            style={{
              fontSize: "clamp(6rem, 12.5vw, 14rem)",
              transformStyle: "preserve-3d",
              fontFamily: "var(--font-dm-sans)",
            }}
            variants={orlovVariants}
          >
            ORLOV
          </motion.h1>
        </div>
      </div>

      {/* Mobile names — stacked */}
      <div className="flex flex-col items-center gap-16 md:hidden">
        <motion.h1
          className="max-w-full overflow-hidden text-center font-black leading-[0.85] tracking-tighter text-[#e9edc9]"
          style={{
            fontSize: "clamp(5rem, 16vw, 10rem)",
            transformStyle: "preserve-3d",
            fontFamily: "var(--font-dm-sans)",
          }}
          variants={vadymVariants}
        >
          VADYM
        </motion.h1>
        <motion.h1
          className="max-w-full overflow-hidden text-center font-black leading-[0.85] tracking-tighter text-[#384B70]"
          style={{
            fontSize: "clamp(5rem, 16vw, 10rem)",
            transformStyle: "preserve-3d",
            fontFamily: "var(--font-dm-sans)",
          }}
          variants={orlovVariants}
        >
          ORLOV
        </motion.h1>
      </div>
    </motion.div>
  );
}
