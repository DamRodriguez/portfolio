import ViewportActiveSection from "@/components/gsap/in-view/ViewportActiveSection";
import clsx from "clsx";

const SCROLLING_TEXT_ITEMS = [
  "DISEÑO UI/UX",
  "DESARROLLO WEB",
  "HOSTING",
  "OPTIMIZACIÓN SEO",
  "DISEÑO RESPONSIVE",
  "RENDIMIENTO WEB",
];

const baseScrollingText = SCROLLING_TEXT_ITEMS.join(" & ");
const formattedScrollingText = `${baseScrollingText} & `.repeat(3);

type ServicesSectionWrapperProps = {
  children: React.ReactNode;
};

export default function ServicesSectionWrapper({
  children,
}: ServicesSectionWrapperProps) {
  const commonTextClassName =
    "fill-soft-white dark:fill-black uppercase tracking-[0.1em] font-fira-code font-bold";

  const commonCurveBgClassName = "stroke-black dark:stroke-soft-white";

  return (
    <div className="overlay-services relative z-10 pt-[6rem] md:pt-[8rem] 2xl:pt-[7rem]">
      <div className="pointer-events-none absolute inset-0 -z-1 transform-gpu will-change-transform">
        {/* 1. SVG EXCLUSIVO PARA MOBILE (PANTALLAS ANGOSTAS < md) */}
        <svg
          viewBox="0 0 500 1000"
          preserveAspectRatio="none"
          className="w-full h-full md:hidden"
        >
          {/* Fondo de la curva */}
          <path
            d="M 0 60 A 1200 1000 0 0 1 500 60"
            fill="none"
            strokeWidth={40}
            strokeLinecap="round"
            transform="translate(0 -6)"
            className={commonCurveBgClassName}
          />
          <path
            id="services-curve-mobile"
            d="M 0 65 A 1200 1000 0 0 1 500 65"
            fill="none"
          />
          <text className={clsx("text-3xl", commonTextClassName)}>
            <textPath
              href="#services-curve-mobile"
              startOffset="0%"
              className="curved-scrolling-text"
            >
              {formattedScrollingText}
            </textPath>
          </text>
        </svg>

        {/* 2. SVG PARA ESTÁNDAR / TABLET (md a 2xl) */}
        <svg
          viewBox="0 -50 2000 1000"
          preserveAspectRatio="none"
          className="hidden md:block 2xl:hidden w-full h-full"
        >
          {/* Fondo de la curva */}
          <path
            d="M 0 80 A 2800 1000 0 0 1 2000 80"
            fill="none"
            strokeWidth={85}
            strokeLinecap="round"
            transform="translate(0 -10)"
            className={commonCurveBgClassName}
          />
          <path
            id="services-curve-std"
            d="M 0 80 A 2800 1000 0 0 1 2000 80"
            fill="none"
          />
          <text
            className={clsx(
              "text-5md !tracking-[0.25em] ",
              commonTextClassName,
            )}
          >
            <textPath
              href="#services-curve-std"
              startOffset="0%"
              className="curved-scrolling-text"
            >
              {formattedScrollingText}
            </textPath>
          </text>
        </svg>

        {/* 3. SVG EXCLUSIVO PARA 2XL */}
        <svg
          viewBox="0 0 2000 1000"
          preserveAspectRatio="none"
          className="hidden 2xl:block w-full h-full"
        >
          {/* Fondo de la curva */}
          <path
            d="M 0 300 A 1600 1000 0 0 1 2000 300"
            fill="none"
            strokeWidth={100}
            strokeLinecap="round"
            transform="translate(0 -30)"
            className={commonCurveBgClassName}
          />
          <path
            id="services-curve-2xl"
            d="M 0 300 A 1600 1000 0 0 1 2000 300"
            fill="none"
          />
          <text className={clsx("text-7xl", commonTextClassName)}>
            <textPath
              href="#services-curve-2xl"
              startOffset="0%"
              className="curved-scrolling-text"
            >
              {formattedScrollingText}
            </textPath>
          </text>
        </svg>
      </div>

      {/* Capas de Fondo con clip-path */}
      <div className="pointer-events-none absolute top-0 inset-x-0 bottom-0 z-0 bg-gradient-to-b from-soft-white via-soft-white to-transparent dark:from-strong-black dark:via-strong-black mt-[0.1rem] [clip-path:ellipse(240%_100%_at_50%_105%)] md:[clip-path:ellipse(140%_100%_at_50%_107.4%)] 2xl:[clip-path:ellipse(80%_100%_at_50%_110%)]" />

      <div className="relative z-10">
        <ViewportActiveSection section="services">
          {children}
        </ViewportActiveSection>
      </div>
    </div>
  );
}
