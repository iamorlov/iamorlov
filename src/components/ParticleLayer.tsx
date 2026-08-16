"use client";

import { useEffect, useRef, useState } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originalX: number;
  originalY: number;
  size: number;
  opacity: number;
}

interface Ember {
  x: number;
  y: number;
  rise: number;
  wobble: number;
  phase: number;
  size: number;
  opacity: number;
}

// Two effects, one canvas: a mouse-reactive constellation on the ink
// side of the seam, soft embers rising on the flame side.
const ParticleLayer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const nodesRef = useRef<Node[]>([]);
  const embersRef = useRef<Ember[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const fadeInDuration = 1000;
    const startTime = Date.now() - (reduced ? fadeInDuration : 0);

    // Ink region = left half on desktop, top half on mobile.
    const isDesktop = () => window.innerWidth >= 768;
    const inInk = (x: number, y: number) =>
      isDesktop() ? x < canvas.width * 0.5 : y < canvas.height * 0.5;

    const initParticles = () => {
      const nodes: Node[] = [];
      const embers: Ember[] = [];
      const area = canvas.width * canvas.height;
      const nodeCount = Math.min(60, Math.floor(area / 22000));
      const emberCount = Math.min(45, Math.floor(area / 30000));

      let guard = 0;
      while (nodes.length < nodeCount && guard++ < 5000) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        if (!inInk(x, y)) continue;
        nodes.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          originalX: x,
          originalY: y,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }

      guard = 0;
      while (embers.length < emberCount && guard++ < 5000) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        if (inInk(x, y)) continue;
        embers.push({
          x,
          y,
          rise: Math.random() * 0.3 + 0.12,
          wobble: Math.random() * 0.5 + 0.2,
          phase: Math.random() * Math.PI * 2,
          size: Math.random() * 3 + 1.5,
          opacity: Math.random() * 0.22 + 0.1,
        });
      }

      nodesRef.current = nodes;
      embersRef.current = embers;
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const fadeInAlpha = Math.min(elapsed / fadeInDuration, 1);
      const t = elapsed / 1000;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const nodes = nodesRef.current;

      // --- Ink side: constellation ---
      nodes.forEach((node) => {
        if (!reduced) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;
          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(dy, dx);
            node.vx -= Math.cos(angle) * force * 0.02;
            node.vy -= Math.sin(angle) * force * 0.02;
          }
          node.vx += (node.originalX - node.x) * 0.005;
          node.vy += (node.originalY - node.y) * 0.005;
          node.vx *= 0.98;
          node.vy *= 0.98;
          node.x += node.vx;
          node.y += node.vy;
        }

        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        const alpha = Math.min(node.opacity + speed * 2, 0.7) * fadeInAlpha;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(90% 0.05 19 / ${alpha * 0.55})`;
        ctx.fill();
      });

      nodes.forEach((node, i) => {
        nodes.slice(i + 1).forEach((other) => {
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 90) {
            const alpha = ((90 - distance) / 90) * fadeInAlpha;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `oklch(90% 0.05 19 / ${alpha * 0.12})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      // --- Flame side: rising embers ---
      embersRef.current.forEach((ember) => {
        if (!reduced) {
          ember.y -= ember.rise;
          ember.x += Math.sin(t * ember.wobble + ember.phase) * 0.25;

          // Respawn at the bottom of the flame region when drifting out of it.
          const outTop = isDesktop() ? ember.y < -6 : ember.y < canvas.height * 0.5 - 6;
          if (outTop) {
            ember.y = canvas.height + 6;
            ember.x = isDesktop()
              ? canvas.width * (0.5 + Math.random() * 0.5)
              : Math.random() * canvas.width;
          }
        }

        const alpha = ember.opacity * fadeInAlpha;
        const grad = ctx.createRadialGradient(
          ember.x, ember.y, 0,
          ember.x, ember.y, ember.size * 2.2
        );
        grad.addColorStop(0, `oklch(75% 0.09 338 / ${alpha})`);
        grad.addColorStop(1, "oklch(75% 0.09 338 / 0)");
        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.size * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      if (!reduced) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    if (!reduced) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 1s ease-in-out",
        zIndex: 1,
      }}
    />
  );
};

export default ParticleLayer;
