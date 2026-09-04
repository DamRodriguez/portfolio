"use client";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ConditionalPortalProps {
  children: ReactNode;
  active: boolean;
}

export const ConditionalPortal = ({
  children,
  active,
}: ConditionalPortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>;

  if (active) {
    return createPortal(children, document.body);
  }

  return <>{children}</>;
};
