"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, isLowPower, MQ, useGSAP } from "@/lib/gsap";
import { INTRO } from "@/lib/intro";
import { useLenis, useScrollTo } from "./SmoothScroll";
import Lines from "./Lines";

/**
 * Cena 01 — Impacto.
 * A fotografia se abre do centro para as bordas, como um noren sendo afastado.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const introDone = useRef(false);
  const scrollTo = useScrollTo();

  // trava a rolagem enquanto a cortina abre
  useEffect(() => {
    if (!lenis || introDone.current) return;
    lenis.stop();
    const t = setTimeout(() => {
      introDone.current = true;
      lenis.start();
    }, (INTRO.content + 0.4) * 1000);
    return () => clearTimeout(t);
  }, [lenis]);

  useGSAP(
    () => {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
      window.scrollTo(0, 0);

      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline();
        tl.set("[data-curtain]", { autoAlpha: 1 })
          .from("[data-curtain-k]", { autoAlpha: 0, scale: 0.94, duration: 0.9, ease: "power2.out" })
          .to("[data-curtain-k]", { autoAlpha: 0, yPercent: -12, filter: "blur(6px)", duration: 0.8, ease: "power2.in" }, INTRO.curtain)
          .fromTo(
            "[data-hero-frame]",
            { clipPath: "inset(0% 50% 0% 50%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: INTRO.open, ease: "expo.inOut" },
            INTRO.curtain - 0.1,
          )
          .fromTo("[data-hero-img]", { scale: 1.18 }, { scale: 1, duration: 2.8, ease: "expo.out" }, INTRO.curtain)
          .set("[data-curtain]", { autoAlpha: 0 })
          .from("[data-hero-rule]", { scaleX: 0, transformOrigin: "left", duration: 1.2, ease: "expo.inOut" }, INTRO.content)
          .from("[data-hero-eyebrow]", { autoAlpha: 0, x: -10, duration: 1 }, INTRO.content + 0.1)
          .from("[data-hero-title] .line > span", { yPercent: 110, duration: 1.6, ease: "expo.out", stagger: 0.1 }, INTRO.content + 0.15)
          .from("[data-hero-fade]", { autoAlpha: 0, y: 20, duration: 1.2, stagger: 0.12 }, INTRO.content + 0.55);

        // saída: a imagem desce mais devagar que a página; o texto recua
        const strength = isLowPower() ? 6 : 14;
        gsap.to("[data-hero-img-wrap]", {
          yPercent: strength,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-copy]", {
          autoAlpha: 0,
          y: -60,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "60% top", scrub: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="inicio"
      data-tempo="0"
      className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-sumi"
    >
      {/* cortina de abertura */}
      <div data-curtain className="invisible absolute inset-0 z-20 grid place-items-center">
        <div data-curtain-k className="flex flex-col items-center gap-5">
          <span className="kanji text-[5.5rem] leading-none text-washi md:text-[7rem]">茜</span>
          <span className="eyebrow text-[0.6rem] text-washi/50">Akane · Omakase</span>
        </div>
      </div>

      <div data-hero-frame className="absolute inset-0">
        <div data-hero-img-wrap className="absolute inset-0 will-change-transform">
          <div data-hero-img className="frame grain absolute inset-0">
            <Image
              src="/images/hero.webp"
              alt="Omakase servido em travessa de pedra: atum, peixe branco, ikura e uni, com saquê ao fundo"
              fill
              priority
              sizes="100vw"
              className="object-[72%_50%] md:object-[60%_50%]"
            />
          </div>
        </div>
        {/* leitura: escurece a esquerda no desktop e a base no mobile */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,8,7,.55)_0%,transparent_22%,transparent_38%,rgba(11,8,7,.92)_78%)] md:bg-[linear-gradient(90deg,rgba(11,8,7,.88)_0%,rgba(11,8,7,.45)_38%,transparent_62%),linear-gradient(0deg,rgba(11,8,7,.7)_0%,transparent_30%)]" />
      </div>

      <div
        data-hero-copy
        className="relative z-10 mx-auto flex h-full max-w-[1680px] flex-col justify-end px-5 pb-12 md:justify-center md:px-10 md:pb-0"
      >
        <div className="max-w-[60rem]">
          <div className="mb-8 flex items-center gap-5 md:mb-10">
            <span data-hero-rule className="block h-px w-10 bg-kin" />
            <p data-hero-eyebrow className="eyebrow text-washi/80">
              Arte japonesa à mesa
            </p>
          </div>

          <h1 data-hero-title className="display text-[clamp(3.1rem,6.6vw,7.75rem)]">
            <Lines lines={["Uma experiência", <>além do <em>sabor</em></>]} />
          </h1>

          <p data-hero-fade className="mt-8 max-w-[25rem] text-[0.95rem] leading-relaxed text-washi/70 md:mt-10 md:text-base">
            Tradição, precisão e ingredientes excepcionais em uma experiência omakase única.
          </p>

          <a
            data-hero-fade
            href="#menu"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#menu");
            }}
            className="link-line eyebrow mt-10 text-washi md:mt-14"
          >
            Conheça o menu <span className="arrow" aria-hidden>→</span>
          </a>
        </div>
      </div>

      {/* coluna vertical em japonês — assinatura */}
      <p
        data-hero-fade
        aria-hidden
        className="kanji absolute right-5 top-28 z-10 text-sm tracking-[0.6em] text-washi/45 [writing-mode:vertical-rl] md:right-10 md:top-32 md:text-sm"
      >
        おまかせ　職人の手
      </p>

      <div
        data-hero-fade
        className="absolute bottom-10 right-10 z-10 hidden items-center gap-6 text-washi/60 md:flex"
      >
        <span className="eyebrow text-[0.6rem]">18 tempos</span>
        <span className="h-px w-6 bg-washi/25" />
        <span className="eyebrow text-[0.6rem]">10 lugares</span>
        <span className="h-px w-6 bg-washi/25" />
        <span className="eyebrow text-[0.6rem]">Goiânia</span>
      </div>
    </section>
  );
}
