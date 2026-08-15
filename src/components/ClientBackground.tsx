"use client";

import dynamic from "next/dynamic";

// Dynamically import the background with ssr:false here in a client component
const AnimatedBackground = dynamic(() => import("@/components/AnimatedBackground"), {
  ssr: false,
});

export default function ClientBackground() {
  return <AnimatedBackground />;
}