"use client";

/**
 * PARTICLE BACKGROUND - 2000 Turkish Stars + Crescents
 * Elite particle system with GPU acceleration
 */

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// TYPES

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  type: "star" | "crescent" | "dot";
}

export interface ParticleBackgroundProps {
  particleCount?: number;
  speed?: number;
  colors?: string[];
  interactive?: boolean;
}

// COMPONENT

export const ParticleBackground = ({
  particleCount = 2000,
  speed = 0.5,
  colors = ["#dc2626", "#ef4444", "#f87171", "#fca5a5"],
  interactive = true,
}: ParticleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = Array.from({ length: particleCount }, () => {
        const types: Particle["type"][] = ["star", "crescent", "dot"];
        const type = types[Math.floor(Math.random() * types.length)];

        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
          type,
        };
      });
    };
    initParticles();

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    // Draw star shape
    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const x1 = x + Math.cos(angle) * size;
        const y1 = y + Math.sin(angle) * size;
        if (i === 0) ctx.moveTo(x1, y1);
        else ctx.lineTo(x1, y1);
      }
      ctx.closePath();
      ctx.fill();
    };

    // Draw crescent shape
    const drawCrescent = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.arc(x + size / 2, y - size / 4, size * 0.8, 0, Math.PI * 2);
      ctx.fill("evenodd");
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Mouse interaction
        if (interactive) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            particle.vx -= (dx / distance) * force * 0.1;
            particle.vy -= (dy / distance) * force * 0.1;
          }
        }

        // Add slight drift back to original velocity
        particle.vx += ((Math.random() - 0.5) * speed - particle.vx) * 0.01;
        particle.vy += ((Math.random() - 0.5) * speed - particle.vy) * 0.01;

        // Twinkle effect
        particle.opacity += (Math.random() - 0.5) * 0.02;
        particle.opacity = Math.max(0.1, Math.min(0.8, particle.opacity));

        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;

        if (particle.type === "star") {
          drawStar(ctx, particle.x, particle.y, particle.size);
        } else if (particle.type === "crescent") {
          drawCrescent(ctx, particle.x, particle.y, particle.size);
        } else {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;

      // Connect nearby particles
      ctx.strokeStyle = colors[0];
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.15;

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, speed, colors, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      }}
    />
  );
};

// PRESET VARIANTS

export const TurkishStarField = () => (
  <ParticleBackground
    particleCount={2000}
    speed={0.3}
    colors={["#dc2626", "#ef4444", "#f87171", "#ffffff"]}
    interactive
  />
);

export const CrescentField = () => (
  <ParticleBackground
    particleCount={1000}
    speed={0.2}
    colors={["#fbbf24", "#f59e0b", "#d97706"]}
    interactive
  />
);

export const MinimalStars = () => (
  <ParticleBackground
    particleCount={500}
    speed={0.1}
    colors={["#ffffff", "#f8fafc"]}
    interactive={false}
  />
);
