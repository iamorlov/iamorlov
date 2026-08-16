"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ParticleLayer from "./ParticleLayer";

const EXPO = [0.16, 1, 0.3, 1] as const;

// Diagonal split: navy base, warm panel slides in over the right
// (desktop) or bottom (mobile) half.
const AnimatedBackground = () => {
  const [isVisible, setIsVisible] = useState(false);
  const reduced = useReducedMotion() ?? false;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const angle = Math.tan((5 * Math.PI) / 180) * 100;

  return (
    <div className="split" aria-hidden="true">
      <div className="split-base" />

      {/* Desktop: right panel, diagonal seam */}
      <motion.div
        className="split-panel hidden md:block"
        style={{
          clipPath: `polygon(${50 + angle / 2}% 0%, 100% 0%, 100% 100%, ${50 - angle / 2}% 100%)`,
        }}
        initial={reduced ? { opacity: 0 } : { x: "100%" }}
        animate={
          isVisible ? (reduced ? { opacity: 1 } : { x: "0%" }) : undefined
        }
        transition={
          reduced
            ? { duration: 0.4 }
            : { duration: 0.9, ease: EXPO, delay: 0.1 }
        }
      />

      {/* Mobile: bottom panel, diagonal seam */}
      <motion.div
        className="split-panel md:hidden"
        style={{
          clipPath: `polygon(0% ${50 + angle / 2}%, 100% ${50 - angle / 2}%, 100% 100%, 0% 100%)`,
        }}
        initial={reduced ? { opacity: 0 } : { y: "100%" }}
        animate={
          isVisible ? (reduced ? { opacity: 1 } : { y: "0%" }) : undefined
        }
        transition={
          reduced
            ? { duration: 0.4 }
            : { duration: 0.9, ease: EXPO, delay: 0.1 }
        }
      />

      <ParticleLayer />
    </div>
  );
};

export default AnimatedBackground;
