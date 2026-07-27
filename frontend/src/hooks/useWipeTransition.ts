"use client";
import { HrefType } from "@/components/ui/buttons/LinkButton";
import { usePathname, useRouter } from "@/i18n/navigation";
import { animate } from "motion";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";

export const useWipeTransition = () => {
  const { theme, resolvedTheme } = useTheme();
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const currentTheme = resolvedTheme ?? theme;
  const bgColor =
    currentTheme === "dark"
      ? "var(--color-strong-black)"
      : "var(--color-soft-white)";

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      setIsPending(false);
    };
  }, []);

  const navigateWithTransition = async (
    href: HrefType,
    customContent?: ReactNode,
  ) => {
    const targetPath = typeof href === "string" ? href : href.pathname;
    if (targetPath === pathname || targetPath === window.location.pathname) {
      return;
    }

    if (isPending) return;
    setIsPending(true);

    // 1. Contenedor principal
    const container = document.createElement("div");
    Object.assign(container.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      zIndex: "99999",
      pointerEvents: "all",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    });
    document.body.appendChild(container);

    // 2. Telón Izquierdo
    const leftCurtain = document.createElement("div");
    Object.assign(leftCurtain.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "61vw",
      height: "100vh",
      backgroundColor: bgColor,
      transform: "translateX(-100%)",
      clipPath: "polygon(0% 0%, 100% 0%, 66.666% 100%, 0% 100%)",
      WebkitClipPath: "polygon(0% 0%, 100% 0%, 66.666% 100%, 0% 100%)",
      willChange: "transform",
      backfaceVisibility: "hidden",
    });
    container.appendChild(leftCurtain);

    // 3. Telón Derecho
    const rightCurtain = document.createElement("div");
    Object.assign(rightCurtain.style, {
      position: "absolute",
      top: "0",
      right: "0",
      width: "61vw",
      height: "100vh",
      backgroundColor: bgColor,
      transform: "translateX(100%)",
      clipPath: "polygon(33.333% 0%, 100% 0%, 100% 100%, 0% 100%)",
      WebkitClipPath: "polygon(33.333% 0%, 100% 0%, 100% 100%, 0% 100%)",
      willChange: "transform",
      backfaceVisibility: "hidden",
    });
    container.appendChild(rightCurtain);

    // 4. Contenedor de contenido custom
    let reactRoot: Root | null = null;
    const contentWrapper = document.createElement("div");
    Object.assign(contentWrapper.style, {
      position: "relative",
      zIndex: "10",
      opacity: "0",
      willChange: "opacity",
    });

    if (customContent) {
      container.appendChild(contentWrapper);
      reactRoot = createRoot(contentWrapper);
      reactRoot.render(customContent);
    }

    // 5. Animar Entrada
    await Promise.all([
      animate(
        leftCurtain,
        { transform: ["translateX(-100%)", "translateX(0%)"] },
        { duration: 0.8, ease: "circInOut" },
      ),
      animate(
        rightCurtain,
        { transform: ["translateX(100%)", "translateX(0%)"] },
        { duration: 0.8, ease: "circInOut" },
      ),
    ]);

    // 6. Mostrar el contenido custom
    if (customContent) {
      await animate(contentWrapper, { opacity: [0, 1] }, { duration: 0.3 });
    }

    const currentUrl = window.location.href;
    router.push(href);

    let isCleaningUp = false;

    const cleanup = async () => {
      if (isCleaningUp) return;
      isCleaningUp = true;

      // 7. Desaparecer el contenido custom
      if (customContent) {
        await animate(contentWrapper, { opacity: [1, 0] }, { duration: 0.2 });
      }

      // 8. Abrir telones
      await Promise.all([
        animate(
          leftCurtain,
          { transform: ["translateX(0%)", "translateX(-100%)"] },
          { duration: 0.8, ease: "circInOut" },
        ),
        animate(
          rightCurtain,
          { transform: ["translateX(0%)", "translateX(100%)"] },
          { duration: 0.8, ease: "circInOut" },
        ),
      ]);

      // 9. Desmontaje limpio (liberación de memoria)
      if (reactRoot) {
        setTimeout(() => reactRoot.unmount(), 0);
      }
      container.remove();

      if (isMounted.current) {
        setIsPending(false);
      }
    };

    // 10. Polling
    const checkUrl = setInterval(() => {
      if (window.location.href !== currentUrl) {
        clearInterval(checkUrl);
        cleanup();
      }
    }, 50);

    // 11. Fallback
    setTimeout(() => {
      if (!isCleaningUp && document.body.contains(container)) {
        clearInterval(checkUrl);
        cleanup();
      }
    }, 3500);
  };

  return { navigateWithTransition, isPending };
};
