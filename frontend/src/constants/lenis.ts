import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export const getLenis = () => lenisInstance;

export const setLenis = (instance: Lenis | null) => {
  lenisInstance = instance;
};
