"use client";

import { RefObject } from "react";
import { gsap, MQ, useGSAP } from "./gsap";

/**
 * Revela, dentro do escopo:
 *  [data-lines]  → linhas mascaradas sobem em sequência
 *  [data-fade]   → opacidade + leve translateY
 *  [data-rule]   → filete que se desenha da esquerda
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const q = gsap.utils.selector(scope);

        q("[data-lines]").forEach((el) => {
          gsap.from(el.querySelectorAll(".line > span"), {
            yPercent: 110,
            duration: 1.5,
            ease: "expo.out",
            stagger: 0.09,
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });

        q("[data-fade]").forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 28,
            duration: 1.4,
            delay: Number((el as HTMLElement).dataset.fade) || 0,
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });

        q("[data-rule]").forEach((el) => {
          gsap.from(el, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.6,
            ease: "expo.inOut",
            scrollTrigger: { trigger: el, start: "top 90%" },
          });
        });
      });
    },
    { scope },
  );
}
