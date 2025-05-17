"use client";

import { FC } from "react";
import { useCallback } from "react";
import { loadSlim } from "tsparticles-slim";
import Particles from "react-tsparticles";
import { Engine } from "tsparticles-engine";

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
    className="group flex flex-col items-center gap-2 transition-all duration-300 hover:scale-110"
    aria-label={label}
  >
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 p-3 text-zinc-400 transition-colors group-hover:bg-zinc-700 group-hover:text-white">
      {icon === "github" && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      )}
      {icon === "linkedin" && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )}
      {icon === "mail" && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      )}
    </div>
    <span className="text-xs font-medium text-zinc-400 transition-colors group-hover:text-zinc-300">
      {label}
    </span>
  </a>
);

export default function Home() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between text-white">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: {
            enable: true,
            zIndex: -1
          },
          background: {
            color: {
              value: "#0a0a0a",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "grab",
              },
              onClick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 140,
                links: {
                  opacity: 0.5,
                  color: "#8855dd",
                },
              },
              bubble: {
                distance: 200,
                size: 4,
                duration: 2,
                opacity: 0.8,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
              push: {
                quantity: 4,
              },
            },
            detectsOn: "window",
          },
          particles: {
            color: {
              value: "#8855dd", // Brighter purple color
            },
            links: {
              enable: true,
              distance: 120,
              color: "#8855dd",
              opacity: 0.3,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.5, // Slightly faster
              direction: "none",
              random: true,
              straight: false,
              outModes: "out",
              attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200,
              },
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80, // Reduced for better performance with links
            },
            opacity: {
              value: 0.4, // Higher base opacity
              random: true,
              animation: {
                enable: true,
                speed: 0.2,
                minimumValue: 0.1,
                sync: false
              }
            },
            size: {
              value: 2, // Larger size
              random: true,
            },
            shadow: {
              enable: true,
              color: "#8855dd",
              blur: 5
            }
          },
          detectRetina: true,
        }}
      />
      {/* Header */}
      <main className="flex w-full flex-1 flex-col items-center justify-center px-4 py-16 md:px-20">
        <div className="relative w-full max-w-7xl">
          <h1 className="text-center font-sans tracking-tighter text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] bg-gradient-to-b from-white to-zinc-600 bg-clip-text text-transparent transition-all duration-500">
            VADYM<br/>ORLOV
          </h1>

          <div className="mt-8 flex justify-center">
            <p className="max-w-md text-center text-lg text-zinc-400 mt-8">
              Developer. Creator. Dreamer.
            </p>
          </div>
        </div>
      </main>

      {/* Social Links */}
      <footer className="w-full border-t border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
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
