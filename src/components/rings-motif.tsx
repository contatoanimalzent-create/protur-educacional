"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface RingsMotifProps {
  className?: string;
  size?: number;
}

/**
 * Assinatura visual da Protur Educacional: o círculo coral com anéis
 * concêntricos que aparece nos carrosséis da marca. Gira devagar
 * conforme a rolagem da página, sempre na mesma posição relativa.
 */
export function RingsMotif({ className = "", size = 640 }: RingsMotifProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [-18, 26]);
  const rings = Array.from({ length: 9 });

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <motion.svg
        style={{ rotate }}
        width={size}
        height={size}
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="200" cy="200" r="148" fill="var(--protur-coral)" />
        {rings.map((_, i) => (
          <circle
            key={i}
            cx="200"
            cy="200"
            r={148 + (i + 1) * 9}
            stroke="var(--protur-green)"
            strokeWidth="2.5"
            strokeDasharray="470 620"
            strokeLinecap="round"
          />
        ))}
      </motion.svg>
    </div>
  );
}
