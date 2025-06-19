"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AnimatedBackground = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const angleOffset = Math.tan(-5 * Math.PI / 180) * 100;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Left side - Deep Purple to Dark Blue gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #223843 0%,rgb(46, 76, 92) 50%,rgb(20, 39, 48) 100%)"
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      
      {/* Right side - Warm Orange to Pink gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #eff1f3 0%,rgb(224, 226, 228) 50%,rgb(237, 244, 250) 100%)",
          clipPath: `polygon(${50 - angleOffset/2}% 0%, 100% 0%, 100% 100%, ${50 + angleOffset/2}% 100%)`,
        }}
        initial={{ x: "100%" }}
        animate={{ x: isVisible ? "0%" : "100%" }}
        transition={{ 
          duration: 1.5, 
          ease: [0.25, 0.1, 0.25, 1],
          delay: 0.3
        }}
      />

      {/* Subtle overlay for depth */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-transparent via-black/5 to-black/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 1, delay: 1 }}
      />
    </div>
  );
};

export default AnimatedBackground;