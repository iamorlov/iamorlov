"use client";

import { FC } from "react";
import { useCallback } from "react";
import { loadSlim } from "tsparticles-slim";
import Particles from "react-tsparticles";
import { Engine } from "tsparticles-engine";
import { loadAbsorbersPlugin } from "tsparticles-plugin-absorbers";

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
    await loadAbsorbersPlugin(engine);
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
              value: "#0a0a10", // Very dark blue-gray
            },
            image: "radial-gradient(ellipse at 25% 45%, rgba(16,13,25,0.8) 0%, rgba(10,10,16,1) 50%, rgba(8,8,12,1) 100%)",
            position: "center",
            repeat: "no-repeat",
            size: "cover"
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "none",
                parallax: {
                  enable: true,
                  force: 40,
                  smooth: 30
                }
              },
              onClick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
            },
          },
          particles: {
            // Create galactic structure
            groups: {
              // Core stars (center of galaxy)
              core: {
                number: { value: 70 },
                size: { value: { min: 0.8, max: 3 } },
                move: { speed: 0.1 },
                opacity: { value: { min: 0.5, max: 1 } },
                color: { value: ["#ffffff", "#f0f0ff", "#e0e0ff", "#a090ff", "#8080ff", "#fafafa"] },
                zIndex: { value: 1 },
                position: { x: 45, y: 45 }
              },
              // Spiral arm 1
              arm1: {
                number: { value: 150 },
                size: { value: { min: 0.1, max: 1.5 } },
                move: { speed: 0.1, spin: { enable: true, acceleration: -0.02 } },
                opacity: { value: { min: 0.05, max: 0.7 } },
                color: { value: ["#ffffff", "#dcddff", "#aaadd3", "#6a70bc", "#5060ff"] },
                zIndex: { value: 0 },
                position: { x: 40, y: 40 }
              },
              // Spiral arm 2
              arm2: {
                number: { value: 150 },
                size: { value: { min: 0.1, max: 1.5 } },
                move: { speed: 0.12, spin: { enable: true, acceleration: -0.02 } },
                opacity: { value: { min: 0.05, max: 0.7 } },
                color: { value: ["#ffffff", "#e0e0ff", "#c0c0ff", "#9580dd", "#6060a0"] },
                zIndex: { value: 0 },
                position: { x: 50, y: 50 }
              },
              // Background stars
              background: {
                number: { value: 200 },
                size: { value: { min: 0.1, max: 1 } },
                move: { speed: 0.05 },
                opacity: { value: { min: 0.02, max: 0.3 } },
                color: { value: ["#ffffff", "#dddddd", "#aaaaaa", "#a0a0c0", "#8080a0"] },
                zIndex: { value: -1 }
              },
              // Distant dust clouds
              dust: {
                number: { value: 30 },
                size: { value: { min: 15, max: 40 } },
                move: { speed: 0.03 },
                opacity: { value: { min: 0.01, max: 0.05 } },
                color: { value: ["#483d8b", "#3b2f8a", "#2a1f60", "#1f0f40", "#4b0082"] },
                zIndex: { value: -2 },
                shape: { type: "circle" }
              }
            },
            move: {
              enable: true,
              speed: 0.15,
              direction: "none",
              random: true,
              straight: false,
              outMode: "out",
              attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200,
              },
            },
            number: {
              density: {
                enable: true,
                area: 1000,
              },
              value: 600, // Total stars
            },
            opacity: {
              value: { min: 0.05, max: 1 },
              random: true,
              animation: {
                enable: true,
                speed: 0.1,
                minimumValue: 0.05,
                sync: false,
              },
            },
            size: {
              value: { min: 0.1, max: 3 },
              random: true,
              animation: {
                enable: true,
                speed: 0.5,
                minimumValue: 0.1,
                sync: false
              }
            },
            twinkle: {
              particles: {
                enable: true,
                frequency: 0.03,
                opacity: 0.8,
                color: {
                  value: ["#ffffff", "#f5f3ff", "#8080ff"],
                }
              },
            },
            shadow: {
              enable: true,
              color: {
                value: "#6050dd"
              },
              blur: 6,
              offset: {
                x: 0,
                y: 0
              }
            },
            // Create visual depth with z-index variations
            zIndex: {
              value: { min: -2, max: 2 },
              random: true,
              opacityRate: 0.5,
              sizeRate: 1.2,
              velocityRate: 1.3
            }
          },
          preset: "stars",
          detectRetina: true,
          // Add dust nebula effect with very subtle blue-purple
          backgroundMask: {
            enable: true,
            cover: {
              color: {
                value: {
                  r: 15,
                  g: 10,
                  b: 30
                }
              },
              opacity: 0.05
            }
          },
          // Add special shooting stars
          emitters: [
            {
              direction: "bottom-right",
              rate: {
                delay: 20, // One shooting star every 20 seconds
                quantity: 1
              },
              position: {
                x: 0,
                y: 0
              },
              size: {
                width: 100,
                height: 0
              },
              particles: {
                shape: {
                  type: "line"
                },
                size: {
                  value: { min: 1, max: 2 }
                },
                move: {
                  straight: true,
                  speed: 10
                },
                opacity: {
                  value: 0.7
                },
                color: {
                  value: "#ffffff"
                },
                life: {
                  duration: {
                    value: 1
                  }
                }
              }
            }
          ]
        }}
      />

      {/* Header */}
      <main className="flex w-full flex-1 flex-col items-center justify-center px-4 py-16 md:px-20">
        <div className="relative w-full max-w-7xl">
          <h1 className="text-center font-sans tracking-tighter text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] bg-gradient-to-b from-white to-zinc-600 bg-clip-text text-transparent transition-all duration-500">
            VADYM<br />ORLOV
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
