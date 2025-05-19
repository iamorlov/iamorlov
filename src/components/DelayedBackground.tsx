"use client";

import { useState, useEffect } from "react";
import ClientBackground from "./ClientBackground";

export default function DelayedBackground() {
  const [showBackground, setShowBackground] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    // First delay - wait 6 seconds before starting to show background
    const showTimer = setTimeout(() => {
      setShowBackground(true);
      
      // Start animation immediately after setting showBackground
      setStartAnimation(true);
    }, 7000);

    return () => {
      clearTimeout(showTimer);
    };
  }, []);

  if (!showBackground) return null;

  return (
    <div 
      className="transition-opacity duration-1000 ease-in-out"
      style={{ 
        opacity: startAnimation ? 1 : 0 
      }}
    >
      <ClientBackground />
    </div>
  );
}