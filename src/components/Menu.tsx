"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { MENU, SITE } from "@/lib/content";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReveal } from "@/lib/useReveal";
import Lines from "./Lines";
import SectionLabel from "./SectionLabel";

/** Cena 07 — O menu. Não há cardápio para escolher; há experiências. */
export default function Menu() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useReveal(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // desktop: a imagem fixa acompanha o item no centro da tela
      mm.add(MQ.desktop, () => {
        gsap.utils.toArray<HTMLElement>("[data-mn-item]").forEach((el, i) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (s) => s.isActive && setActive(i),
          });
        });
      });

      // mobile: cada item revela sua própria fotografia
      mm.add({ motion: MQ.motion, mobile: MQ.mobile }, (ctx) => {
        if (!ctx.conditions?.motion || !ctx.conditions.mobile) return;
        gsap.utils.toArray<HTMLElement>("[data-mn-mask]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 85%" } },
          );
          gsap.fromTo(el.querySelector("img"), { scale: 1.2 }, { scale: 1, duration: 2.2, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%" } });
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="menu" data-tempo="6" className="relative overflow-clip bg-akane py-28 md:py-44">
      {/* textura de papel tingido */}
      <Image src="/images/textura.webp" alt="" fill sizes="100vw" className="pointer-events-none object-cover opacity-40 mix-blend-luminosity" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#0b0807_0%,rgba(44,6,9,0)_14%,rgba(44,6,9,0)_86%,#0b0807_100%)]" />

      <div className="relative mx-auto grid max-w-[1680px] grid-cols-12 gap-x-5 px-5 md:px-10">
        {/* imagem fixa — desktop */}
        <div className="col-span-5 hidden md:block">
          <div className="sticky top-[14vh] h-[72vh]">
            <div className="frame grain relative h-full w-full bg-akane-deep">
              {MENU.map((m, i) => (
                <div
                  key={m.n}
                  className={`absolute inset-0 transition-[opacity,transform] duration-[1200ms] ease-(--ease-soft) ${
                    i === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
                  }`}
                >
                  <Image src={m.img} alt={m.alt} fill sizes="40vw" />
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-baseline justify-between text-washi/55">
              <span className="eyebrow text-[0.6rem]">{MENU[active].name}</span>
              <span className="eyebrow text-[0.6rem]">0{active + 1} / 0{MENU.length}</span>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <SectionLabel k="七" label="O Menu" />
          <div className="mt-10 flex items-start justify-between gap-6">
            <h2 data-lines className="display text-[clamp(4rem,11vw,11rem)]">
              <Lines lines={["O Menu"]} />
            </h2>
            <span aria-hidden className="kanji mt-3 text-lg tracking-[0.4em] text-washi/50 [writing-mode:vertical-rl]">
              お品書き
            </span>
          </div>
          <p data-fade className="mt-10 max-w-[26rem] font-serif text-[1.6rem] font-light italic leading-snug text-kinu md:text-[1.85rem]">
            Não há cardápio para escolher. Há uma noite para confiar.
          </p>

          <ol className="mt-20 md:mt-32">
            {MENU.map((m, i) => (
              <li
                key={m.n}
                data-mn-item
                className={`border-t border-washi/15 py-12 transition-opacity duration-700 md:min-h-[46vh] md:py-14 ${
                  i === active ? "md:opacity-100" : "md:opacity-40"
                }`}
              >
                <div data-mn-mask className="frame relative mb-8 aspect-[4/5] md:hidden">
                  <Image src={m.img} alt={m.alt} fill sizes="100vw" />
                </div>
                <div data-fade className="flex items-baseline justify-between gap-6">
                  <span className="eyebrow text-[0.6rem] text-washi/45">{m.n}</span>
                  <span className="eyebrow text-[0.6rem] text-washi/45">{m.meta}</span>
                </div>
                <div data-fade="0.05" className="mt-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
                  <h3 className="font-serif text-[clamp(2.3rem,4vw,3.6rem)] font-light leading-none">{m.name}</h3>
                  <p className="font-serif text-2xl font-light text-kinu">{m.price}</p>
                </div>
                <p data-fade="0.1" className="mt-6 max-w-[28rem] text-[0.95rem] leading-[1.75] text-washi/65">
                  {m.text}
                </p>
              </li>
            ))}
          </ol>

          <div data-fade className="flex flex-col gap-8 border-t border-washi/15 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="eyebrow text-[0.6rem] leading-relaxed text-washi/45">
              Valores por pessoa · Menu sujeito à estação
              <br />
              Restrições alimentares: avise na reserva
            </p>
            <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="link-line eyebrow text-washi">
              Escolher minha noite <span className="arrow" aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
