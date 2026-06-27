"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originalX: number;
  originalY: number;
  size: number;
  opacity: number;
  hue: number;
}

const ParticleLayer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const fadeInProgressRef = useRef(0); // Track fade-in progress

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // Start particles after background animation

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Start fade-in animation
    const fadeInDuration = 1000; // 1 second fade-in
    const startTime = Date.now();

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const particles: Particle[] = [];
      const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 8000));

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          originalX: x,
          originalY: y,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.6 + 0.2,
          hue: Math.random() * 60 + 200, // Blue-ish hues
        });
      }
      
      particlesRef.current = particles;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Calculate fade-in progress
      const elapsed = Date.now() - startTime;
      fadeInProgressRef.current = Math.min(elapsed / fadeInDuration, 1);
      const fadeInAlpha = fadeInProgressRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const mouse = mouseRef.current;
      const particles = particlesRef.current;

      particles.forEach((particle) => {
        // Calculate distance to mouse
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        // Mouse influence
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          particle.vx -= Math.cos(angle) * force * 0.02;
          particle.vy -= Math.sin(angle) * force * 0.02;
        }

        // Gentle drift back to original position
        const returnForce = 0.005;
        particle.vx += (particle.originalX - particle.x) * returnForce;
        particle.vy += (particle.originalY - particle.y) * returnForce;

        // Apply friction
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Dynamic opacity based on movement and fade-in
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        const baseOpacity = Math.min(particle.opacity + speed * 2, 0.8);
        const dynamicOpacity = baseOpacity * fadeInAlpha; // Apply fade-in

        // Determine color based on position (left side vs right side on desktop)
        const isDesktop = window.innerWidth >= 768;
        let color;
        
        if (isDesktop) {
          // Desktop: left side dark blue area, right side light cream area
          const isLeftSide = particle.x < canvas.width * 0.5;
          if (isLeftSide) {
            // Dark blue side - use light particles
            color = `hsla(${particle.hue + 60}, 70%, 85%, ${dynamicOpacity * 0.6})`;
          } else {
            // Light cream side - use darker particles
            color = `hsla(${particle.hue - 40}, 60%, 35%, ${dynamicOpacity * 0.7})`;
          }
        } else {
          // Mobile: top dark, bottom light
          const isTopSide = particle.y < canvas.height * 0.5;
          if (isTopSide) {
            // Dark blue top - use light particles
            color = `hsla(${particle.hue + 60}, 70%, 85%, ${dynamicOpacity * 0.6})`;
          } else {
            // Light cream bottom - use darker particles
            color = `hsla(${particle.hue - 40}, 60%, 35%, ${dynamicOpacity * 0.7})`;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Add subtle glow for moving particles
        if (speed > 0.1) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = color.replace(/[\d.]+\)$/g, `${dynamicOpacity * 0.1})`);
          ctx.fill();
        }
      });

      // Draw connection lines between nearby particles
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 80) {
            const opacity = (80 - distance) / 80 * fadeInAlpha; // Apply fade-in to lines
            const isDesktop = window.innerWidth >= 768;
            let lineColor;
            
            if (isDesktop) {
              const avgX = (particle.x + otherParticle.x) / 2;
              const isLeftSide = avgX < canvas.width * 0.5;
              lineColor = isLeftSide 
                ? `rgba(233, 237, 201, ${opacity * 0.15})` 
                : `rgba(56, 75, 112, ${opacity * 0.2})`;
            } else {
              const avgY = (particle.y + otherParticle.y) / 2;
              const isTopSide = avgY < canvas.height * 0.5;
              lineColor = isTopSide 
                ? `rgba(233, 237, 201, ${opacity * 0.15})` 
                : `rgba(56, 75, 112, ${opacity * 0.2})`;
            }
            
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    
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
        zIndex: 1
      }}
    />
  );
};

export default ParticleLayer;