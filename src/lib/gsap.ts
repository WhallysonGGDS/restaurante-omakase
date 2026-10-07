"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 1.2 });
}

/** Condições usadas em gsap.matchMedia em todas as cenas. */
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 900px)",
  mobile: "(max-width: 899px)",
};

/** Aparelhos modestos recebem menos parallax. */
export const isLowPower = () =>
  typeof navigator !== "undefined" &&
  ((navigator.hardwareConcurrency ?? 8) <= 4 ||
    // @ts-expect-error deviceMemory não existe em todos os navegadores
    (navigator.deviceMemory ?? 8) <= 4);

export { gsap, ScrollTrigger, useGSAP };
