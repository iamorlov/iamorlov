"use client";

import { useEffect, useRef } from "react";

const TILE = 160;
const GRAIN_FPS = 12;

// Matte atmosphere: slow light drift (CSS), live film grain (canvas),
// cursor-tracked sheen on fine pointers only.
export default function Atmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tile = document.createElement("canvas");
    tile.width = TILE;
    tile.height = TILE;
    const tctx = tile.getContext("2d")!;
    const noise = tctx.createImageData(TILE, TILE);

    const paint = () => {
      const d = noise.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        d[i] = d[i + 1] = d[i + 2] = v;
        d[i + 3] = 26;
      }
      tctx.putImageData(noise, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = ctx.createPattern(tile, "repeat")!;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.ceil(window.innerWidth * dpr);
      canvas.height = Math.ceil(window.innerHeight * dpr);
      paint();
    };
    resize();
    window.addEventListener("resize", resize);

    let interval: ReturnType<typeof setInterval> | undefined;
    if (!reduced) {
      interval = setInterval(() => {
        if (!document.hidden) paint();
      }, 1000 / GRAIN_FPS);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (interval) clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const sheen = sheenRef.current;
    if (!sheen) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 3;
    let x = tx;
    let y = ty;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const loop = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      sheen.style.setProperty("--mx", `${x.toFixed(1)}px`);
      sheen.style.setProperty("--my", `${y.toFixed(1)}px`);
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="atmosphere-light" />
      <div className="atmosphere-ember" />
      <div ref={sheenRef} className="atmosphere-sheen" />
      <canvas ref={canvasRef} className="atmosphere-grain" />
    </div>
  );
}
