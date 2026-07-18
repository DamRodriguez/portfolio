import { useEffect, useRef } from "react";

interface Config {
  name: string;
  tag: string;
  rotate: boolean;
  particleCount: number;
  trailSpan: number;
  durationMs: number;
  rotationDurationMs: number;
  pulseDurationMs: number;
  strokeWidth: number;
  lemniscateA: number;
  lemniscateBoost: number;
  formula: (config: Config) => string;
  point: (
    progress: number,
    detailScale: number,
    config: Config,
  ) => { x: number; y: number };
}

const config: Config = {
  name: "Infinite Spinner",
  tag: "Bernoulli Lemniscate",
  rotate: false,
  particleCount: 69,
  trailSpan: 0.39,
  durationMs: 2400,
  rotationDurationMs: 29500,
  pulseDurationMs: 3900,
  strokeWidth: 5.3,
  lemniscateA: 30,
  lemniscateBoost: 1.4,
  formula(c) {
    return [
      `a = ${c.lemniscateA.toFixed(1)} + ${c.lemniscateBoost.toFixed(1)}s`,
      "x(t) = 50 + a cos t / (1 + sin² t)",
      "y(t) = 50 + a sin t cos t / (1 + sin² t)",
    ].join("\n");
  },
  point(progress, detailScale, c) {
    const t = progress * Math.PI * 2;
    const scale = c.lemniscateA + detailScale * c.lemniscateBoost;
    const denom = 1 + Math.pow(Math.sin(t), 2);
    return {
      x: 50 + (scale * Math.cos(t)) / denom,
      y: 50 + (scale * Math.sin(t) * Math.cos(t)) / denom,
    };
  },
};

function normalizeProgress(progress: number) {
  return ((progress % 1) + 1) % 1;
}

function getDetailScale(time: number) {
  const pulseProgress =
    (time % config.pulseDurationMs) / config.pulseDurationMs;
  const pulseAngle = pulseProgress * Math.PI * 2;
  return 0.52 + ((Math.sin(pulseAngle + 0.55) + 1) / 2) * 0.48;
}

function getRotation(time: number) {
  if (!config.rotate) return 0;
  return (
    -((time % config.rotationDurationMs) / config.rotationDurationMs) * 360
  );
}

function buildPath(detailScale: number, steps = 480) {
  return Array.from({ length: steps + 1 }, (_, index) => {
    const point = config.point(index / steps, detailScale, config);
    return `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
  }).join(" ");
}

function getParticle(index: number, progress: number, detailScale: number) {
  const tailOffset = index / (config.particleCount - 1);
  const point = config.point(
    normalizeProgress(progress - tailOffset * config.trailSpan),
    detailScale,
    config,
  );
  const fade = Math.pow(1 - tailOffset, 0.56);
  return {
    x: point.x,
    y: point.y,
    radius: 0.9 + fade * 2.7,
    opacity: 0.04 + fade * 0.96,
  };
}

export default function InfiniteSpinner() {
  const groupRef = useRef<SVGGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const particlesRef = useRef<(SVGCircleElement | null)[]>([]);
  const requestRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const startedAt = performance.now();

    const render = (now: number) => {
      const time = now - startedAt;
      const progress = (time % config.durationMs) / config.durationMs;
      const detailScale = getDetailScale(time);

      if (groupRef.current) {
        groupRef.current.setAttribute(
          "transform",
          `rotate(${getRotation(time)} 50 50)`,
        );
      }

      if (pathRef.current) {
        pathRef.current.setAttribute("d", buildPath(detailScale));
      }

      particlesRef.current.forEach((node, index) => {
        if (!node) return;
        const particle = getParticle(index, progress, detailScale);
        node.setAttribute("cx", particle.x.toFixed(2));
        node.setAttribute("cy", particle.y.toFixed(2));
        node.setAttribute("r", particle.radius.toFixed(2));
        node.setAttribute("opacity", particle.opacity.toFixed(3));
      });

      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div className="text-black/90 dark:text-soft-white/90">
      <div className="w-[50px] grid">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
          className="w-full h-full overflow-visible"
        >
          <g ref={groupRef}>
            <path
              ref={pathRef}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.2"
              strokeWidth={config.strokeWidth}
            />
            {Array.from({ length: config.particleCount }).map((_, index) => (
              <circle
                key={index}
                fill="currentColor"
                ref={(el) => {
                  particlesRef.current[index] = el;
                }}
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
