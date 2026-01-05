"use client"

import React, { useEffect, useRef } from "react";

export function FlowVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Flow lines visualization
    const lines: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
    }[] = [];
    const maxLines = 50;

    const createLine = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      life: Math.random() * 0.5 + 0.5,
    });

    for (let i = 0; i < maxLines; i++) {
      lines.push(createLine());
    }

    const animate = () => {
      ctx.fillStyle = "rgba(247, 247, 245, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      lines.forEach((line, i) => {
        line.x += line.vx;
        line.y += line.vy;
        line.life -= 0.002;

        if (
          line.life <= 0 ||
          line.x < 0 ||
          line.x > canvas.width ||
          line.y < 0 ||
          line.y > canvas.height
        ) {
          lines[i] = createLine();
          return;
        }

        ctx.beginPath();
        ctx.arc(line.x, line.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(107, 127, 255, ${line.life * 0.15})`;
        ctx.fill();

        // Connect nearby lines
        lines.forEach((other, j) => {
          if (i === j) return;
          const dx = other.x - line.x;
          const dy = other.y - line.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(line.x, line.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(107, 127, 255, ${
              (1 - distance / 100) * line.life * other.life * 0.08
            })`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
}
