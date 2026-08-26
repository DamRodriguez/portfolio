"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CinematicIntro() {
  const [isVisible, setIsVisible] = useState(true);

  // Bloqueamos el scroll del sitio mientras la cinemática ocurre
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[999999] pointer-events-none"
      initial={{ opacity: 1 }}
      // Desvanecemos todo el componente justo al final del zoom para una salida limpia
      animate={{ opacity: 0 }}
      transition={{ delay: 3.8, duration: 0.5 }}
      onAnimationComplete={() => setIsVisible(false)}
    >
      {/* 
        CAPA 1: El "Telón Blanco" temporal.
        Se sitúa justo detrás de las letras. Como usamos mix-blend-mode: multiply en la capa frontal,
        lo blanco de esta capa hace que las letras se vean sólidas inicialmente.
        Al desvanecerse esta capa a opacidad 0, el "agujero" de las letras pasa a mostrar
        tu sitio web real que está en el fondo.
      */}
      <motion.div
        className="absolute inset-0 bg-soft-white"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        // Se desvanece suavemente antes de empezar el zoom masivo
        transition={{ delay: 2.0, duration: 0.6, ease: "easeInOut" }}
      />

      {/* 
        CAPA 2: La Máscara de Recorte.
        Al usar bg-black y text-white con multiply:
        - El fondo negro ignora lo que hay detrás y sigue siendo negro sólido.
        - El texto blanco actúa como un cristal 100% transparente.
      */}
      <motion.div
        className="absolute inset-0 bg-black flex items-center justify-center will-change-transform mix-blend-multiply"
        initial={{ scale: 1 }}
        // Escala extrema de 250x para asegurar que el hueco de una de las letras cubra toda la pantalla
        animate={{ scale: 250 }}
        transition={{ delay: 2.5, duration: 1.5, ease: [0.8, 0, 0.1, 1] }}
      >
        <h1 className="font-fira-code text-soft-white text-8xl md:text-[15rem] font-bold tracking-tight flex">
          {["D", "e", "v"].map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: i * 0.15 + 0.3,
                duration: 0.8,
                ease: "easeOut",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>
      </motion.div>
    </motion.div>
  );
}
