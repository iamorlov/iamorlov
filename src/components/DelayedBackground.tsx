"use client";

import { useState, useEffect } from "react";
import ClientBackground from "./ClientBackground";

export default function DelayedBackground() {
  const [showBackground, setShowBackground] = useState(false);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // First delay - wait 7 seconds before starting to show background
    const showTimer = setTimeout(() => {
      setShowBackground(true);
      
      // Add a small delay to ensure the element is in the DOM before animating
      setTimeout(() => {
        setOpacity(1);
      }, 50);
    }, 7000);

    return () => {
      clearTimeout(showTimer);
    };
  }, []);

  if (!showBackground) return null;

  return (
    <div 
      className="transition-all duration-1000 ease-in-out"
      style={{ opacity }}
    >
      <ClientBackground />
    </div>
  );
}