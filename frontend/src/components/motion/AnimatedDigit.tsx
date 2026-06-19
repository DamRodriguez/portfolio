import { AnimatePresence, motion } from "framer-motion";

export const AnimatedDigit = ({ digit }: { digit: string }) => (
  <AnimatePresence mode="wait" initial={false}>
    <motion.span
      key={digit}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.2 }}
      className="inline-block"
    >
      {digit}
    </motion.span>
  </AnimatePresence>
);
