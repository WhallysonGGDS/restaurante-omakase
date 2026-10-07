"use client";

import Image from "next/image";
import { useRef } from "react";
import { CRAFT } from "@/lib/content";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { useReveal } from "@/lib/useReveal";
import Lines from "./Lines";
import SectionLabel from "./SectionLabel";

/**
 * Cena 05 — A arte. Três gestos, três composições, três formas de revelar:
 * um corte horizontal, uma subida, uma abertura a partir do centro.
 */
export default function Craft() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  useGSAP(
    () => {
      gsap.matchMedia().add(MQ.motion, () => {
        // 一 — o corte: a imagem é revelada como o traço de uma lâmina
        const cut = gsap.timeline({
          scrollTrigger: { trigger: "[data-cr='0']", start: "top 85%", end: "center 55%", scrub: 0.8 },
        });
        cut.fromTo("[data-cr='0'] [data-mask]", { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut" })
          .fromTo("[data-cr='0'] [data-blade]", { left: "0%", autoAlpha: 1 }, { left: "100%", ease: "power2.inOut" }, 0)
          .to("[data-cr='0'] [data-blade]", { autoAlpha: 0, duration: 0.1 })
          .fromTo("[data-cr='0'] img", { scale: 1.12 }, { scale: 1, ease: "none" }, 0);

        // 二 — a preparação: sobe da mesa
        gsap.fromTo(
          "[data-cr='1'] [data-mask]",
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.8,
            ease: "expo.inOut",
            scrollTrigger: { trigger: "[data-cr='1']", start: "top 75%" },
          },
        );
        gsap.fromTo(
          "[data-cr='1'] img",
          { yPercent: -6, scale: 1.1 },
          { yPercent: 6, scale: 1.1, ease: "none", scrollTrigger: { trigger: "[data-cr='1']", start: "top bottom", end: "bottom top", scrub: true } },
        );

        // 三 — a finalização: abre do centro, como um prato sendo apresentado
        gsap.fromTo(
          "[data-cr='2'] [data-mask]",
          { clipPath: "inset(22% 22% 22% 22%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: "[data-cr='2']", start: "top 90%", end: "center 60%", scrub: 0.8 },
          },
        );
        gsap.fromTo(
          "[data-cr='2'] img",
          { scale: 1.3 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: "[data-cr='2']", start: "top 90%", end: "bottom 40%", scrub: 0.8 } },
        );
      });
    },
    { scope: ref },
  );

  const [cut, prep, finish] = CRAFT;

  return (
    <section ref={ref} id="arte" data-tempo="4" className="relative bg-sumi py-28 md:py-44">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <div className="grid grid-cols-12 gap-x-5">
          <div className="col-span-12 md:col-span-7">
            <SectionLabel k="五" label="A Arte" />
            <h2 data-lines className="display mt-10 text-[clamp(3rem,7.6vw,8rem)]">
              <Lines lines={["Três gestos.", <em key="i">Nenhum improviso.</em>]} />
            </h2>
          </div>
        </div>

        {/* 一 — panorâmica */}
        <figure data-cr="0" className="relative mt-20 md:mt-32">
          <div data-mask className="frame grain relative aspect-[4/5] w-full sm:aspect-[16/9] md:aspect-[21/9]">
            <Image src={cut.img} alt={cut.alt} fill sizes="100vw" className="object-[30%_50%]" />
            <span data-blade aria-hidden className="absolute inset-y-0 w-px bg-washi/80 shadow-[0_0_24px_2px_rgba(239,231,218,.5)]" />
          </div>
          <Caption n={cut.n} title={cut.title} text={cut.text} className="mt-8 grid gap-5 md:mt-10 md:grid-cols-12 md:[&>*:first-child]:col-span-3 md:[&>p]:col-span-4 md:[&>p]:col-start-5 md:[&>p]:mt-0" />
        </figure>

        {/* 二 — texto à esquerda, imagem à direita */}
        <div data-cr="1" className="mt-28 grid grid-cols-12 gap-x-5 md:mt-48">
          <Caption n={prep.n} title={prep.title} text={prep.text} className="order-2 col-span-12 mt-8 md:order-1 md:col-span-3 md:mt-0 md:self-start" />
          <div data-mask className="frame relative order-1 col-span-12 aspect-[16/11] md:order-2 md:col-span-8 md:col-start-5">
            <Image src={prep.img} alt={prep.alt} fill sizes="(min-width: 900px) 65vw, 100vw" className="object-[65%_50%]" />
          </div>
        </div>

        {/* 三 — vertical, com número monumental */}
        <div data-cr="2" className="relative mt-28 grid grid-cols-12 gap-x-5 md:mt-48">
          <div data-mask className="frame relative col-span-10 aspect-[4/5] md:col-span-5 md:col-start-2">
            <Image src={finish.img} alt={finish.alt} fill sizes="(min-width: 900px) 40vw, 85vw" />
          </div>
          <Caption n={finish.n} title={finish.title} text={finish.text} className="col-span-12 mt-8 md:col-span-4 md:col-start-8 md:mt-0 md:self-end" />
        </div>
      </div>
    </section>
  );
}

function Caption({ n, title, text, className = "" }: { n: string; title: string; text: string; className?: string }) {
  return (
    <div className={className}>
      <div data-fade className="flex items-baseline gap-4">
        <span className="kanji text-kin">{n}</span>
        <span className="font-serif text-[2rem] font-light leading-none">{title}</span>
      </div>
      <p data-fade="0.1" className="mt-5 text-[0.95rem] leading-[1.75] text-washi/65">
        {text}
      </p>
    </div>
  );
}
