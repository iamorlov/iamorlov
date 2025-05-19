"use client";

import dynamic from "next/dynamic";

// Dynamically import the background with ssr:false here in a client component
const DotBackground = dynamic(() => import("@/components/DotBackground"), {
  ssr: false,
});

export default function ClientBackground() {
  return <DotBackground />;
}