"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, isLowPower, MQ, useGSAP } from "@/lib/gsap";
import { useReveal } from "@/lib/useReveal";
import Lines from "./Lines";
import SectionLabel from "./SectionLabel";

/** Cena 02 — Contexto. Composição assimétrica, duas profundidades de imagem. */
export default function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  useGSAP(
    () => {
      gsap.matchMedia().add(MQ.motion, () => {
        const k = isLowPower() ? 0.5 : 1;
        // imagem principal: revela de baixo para cima e flutua dentro da moldura
        gsap.fromTo(
          "[data-ph-main]",
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.8,
            ease: "expo.inOut",
            scrollTrigger: { trigger: "[data-ph-main]", start: "top 80%" },
          },
        );
        gsap.fromTo(
          "[data-ph-main] img",
          { yPercent: -8 * k, scale: 1.12 },
          {
            yPercent: 8 * k,
            scale: 1.04,
            ease: "none",
            scrollTrigger: { trigger: "[data-ph-main]", start: "top bottom", end: "bottom top", scrub: true },
          },
        );
        // imagem secundária: mais rápida → profundidade
        gsap.fromTo(
          "[data-ph-small]",
          { y: 120 * k },
          {
            y: -80 * k,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="filosofia" data-tempo="1" className="relative bg-sumi py-28 md:py-44">
      <div className="mx-auto grid max-w-[1680px] grid-cols-12 gap-x-5 px-5 md:px-10">
        <div className="col-span-12 md:col-span-7">
          <SectionLabel k="二" label="Filosofia" />

          <h2 data-lines className="display mt-10 text-[clamp(3.4rem,10vw,10rem)] md:mt-16">
            <Lines lines={["Cada detalhe", <em key="i">importa.</em>]} />
          </h2>

          <div className="mt-12 grid grid-cols-7 gap-x-5 md:mt-20">
            <p
              data-fade
              className="col-span-7 max-w-[30rem] text-[1.05rem] leading-[1.75] text-washi/70 md:col-span-5 md:col-start-2 md:text-lg"
            >
              Do corte preciso à composição de cada prato, nossa experiência nasce da combinação entre tradição
              japonesa e criação contemporânea.
            </p>
          </div>

          {/* imagem secundária — só a partir do tablet, para não poluir o mobile */}
          <figure data-ph-small className="relative mt-24 hidden w-[42%] md:col-start-3 md:ml-[22%] md:block">
            <div className="frame aspect-square">
              <Image src="/images/ceramica.webp" alt="Cerâmicas artesanais sobre madeira escura" fill sizes="25vw" />
            </div>
            <figcaption className="eyebrow mt-4 text-[0.6rem] text-washi/40">Cerâmica feita à mão · Mashiko</figcaption>
          </figure>
        </div>

        <figure className="col-span-12 mt-16 md:col-span-5 md:mt-56">
          <div data-ph-main className="frame grain aspect-[4/5] w-full">
            <Image
              src="/images/tai.webp"
              alt="Madai inteiro sobre pedra, ao lado de sashimi, wasabi fresco e faca japonesa"
              fill
              sizes="(min-width: 900px) 40vw, 100vw"
            />
          </div>
          <figcaption data-fade className="mt-5 flex items-baseline justify-between text-washi/45">
            <span className="eyebrow text-[0.6rem]">Madai · recebido às 6h</span>
            <span className="kanji text-xs">真鯛</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
