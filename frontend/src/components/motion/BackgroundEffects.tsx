"use client";
import MotionFade from "@/components/motion/MotionFade";
import { useEffect, useRef } from "react";

type ChatBackgroundEffectsProps = {
  tailwindColors?: string[];
};

const parseRGB = (colorStr: string) => {
  const match = colorStr.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/,
  );
  return match
    ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])]
    : [0, 0, 0];
};

export default function ChatBackgroundEffects({
  tailwindColors = [],
}: ChatBackgroundEffectsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorsRef = useRef<HTMLDivElement>(null);
  const colorStateRef = useRef<{ current: number[]; target: number[] }[]>([]);

  const updateTargets = () => {
    if (!colorsRef.current) return;
    const colorNodes = Array.from(colorsRef.current.children) as HTMLElement[];
    const newTargets = colorNodes.map((node) =>
      parseRGB(getComputedStyle(node).color),
    );

    if (colorStateRef.current.length !== newTargets.length) {
      colorStateRef.current = newTargets.map((t) => ({
        current: [...t],
        target: [...t],
      }));
    } else {
      newTargets.forEach((t, i) => {
        colorStateRef.current[i].target = [...t];
      });
    }
  };

  useEffect(() => {
    updateTargets();

    const observer = new MutationObserver(updateTargets);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [tailwindColors.join(",")]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const render = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const lerpSpeed = 0.05;
      const currentGradientColors = colorStateRef.current.map((state) => {
        state.current[0] += (state.target[0] - state.current[0]) * lerpSpeed;
        state.current[1] += (state.target[1] - state.current[1]) * lerpSpeed;
        state.current[2] += (state.target[2] - state.current[2]) * lerpSpeed;
        return `rgb(${Math.round(state.current[0])}, ${Math.round(state.current[1])}, ${Math.round(state.current[2])})`;
      });

      if (currentGradientColors.length > 0) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        currentGradientColors.forEach((color, index) => {
          gradient.addColorStop(
            index / (currentGradientColors.length - 1 || 1),
            color,
          );
        });
        ctx.fillStyle = gradient;
      }

      const baseAmplitude = canvas.height * 0.15;
      const numOfRibbons = 4;

      for (let r = 0; r < numOfRibbons; r++) {
        const phase = r * (Math.PI * 0.9);
        const freq1 = 1.1 + r * 0.2;
        const freq2 = 1.5 + r * 0.3;
        const thickness = 25 + r * 20;

        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 5) {
          const xNorm = x / canvas.width;
          const wave1 =
            Math.sin(xNorm * Math.PI * freq1 + time + phase) * baseAmplitude;
          const wave2 =
            Math.cos(xNorm * Math.PI * freq2 - time * 0.9) *
            (baseAmplitude * 0.5);
          ctx.lineTo(x, canvas.height / 2 + wave1 + wave2 - thickness);
        }
        for (let x = canvas.width; x >= 0; x -= 5) {
          const xNorm = x / canvas.width;
          const wave1 =
            Math.sin(xNorm * Math.PI * freq1 + time + phase) * baseAmplitude;
          const wave2 =
            Math.cos(xNorm * Math.PI * freq2 - time * 0.9) *
            (baseAmplitude * 0.5);
          ctx.lineTo(x, canvas.height / 2 + wave1 + wave2 + thickness);
        }
        ctx.closePath();
        ctx.globalAlpha = 0.2;
        ctx.fill();
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div
        ref={colorsRef}
        className="fixed top-[-9999px] left-[-9999px] pointer-events-none"
      >
        {tailwindColors.map((colorClass, i) => (
          <span key={i} className={`block ${colorClass}`}></span>
        ))}
      </div>

      <MotionFade className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-100">
        <canvas ref={canvasRef} className="w-full h-full" />
      </MotionFade>
    </>
  );
}
