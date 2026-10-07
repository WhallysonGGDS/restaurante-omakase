"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { COURSES } from "@/lib/content";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReveal } from "@/lib/useReveal";
import SectionLabel from "./SectionLabel";

const N = COURSES.length;
const SEG_START = 0.35; // dentro de cada trecho, quando a troca começa
const SEG_DUR = 0.65; // duração da troca (o resto é respiro)

/** Cena 03 — O produto. Texto fixo à esquerda, fotografias trocam à direita. */
export default function Omakase() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  useReveal(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const frames = gsap.utils.toArray<HTMLElement>("[data-om-frame]");
        const imgs = gsap.utils.toArray<HTMLElement>("[data-om-img]");
        gsap.set(frames.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(imgs.slice(1), { scale: 1.25 });

        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        for (let i = 1; i < N; i++) {
          const at = i - 1 + SEG_START;
          tl.to(frames[i], { clipPath: "inset(0% 0% 0% 0%)", duration: SEG_DUR }, at)
            .to(imgs[i], { scale: 1, duration: SEG_DUR + 0.25, ease: "power2.out" }, at)
            .to(imgs[i - 1], { scale: 1.08, filter: "brightness(0.6)", duration: SEG_DUR }, at);
        }
        tl.to({}, { duration: 0.35 }); // respiro final

        ScrollTrigger.create({
          trigger: ref.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          animation: tl,
        });
        // o texto segue a timeline (já suavizada pelo scrub), não a barra de rolagem
        tl.eventCallback("onUpdate", () => {
          const idx = Math.floor(tl.time() + (1 - SEG_START - SEG_DUR / 2));
          setActive(Math.max(0, Math.min(N - 1, idx)));
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        setReduced(true);
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (s) => setActive(Math.min(N - 1, Math.floor(s.progress * N))),
        });
        return () => setReduced(false);
      });
    },
    { scope: ref },
  );

  const c = COURSES[active];

  return (
    <section
      ref={ref}
      id="omakase"
      data-tempo="2"
      className="relative bg-sumi"
      style={{ height: `${N * 100 + 40}svh` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden md:grid md:grid-cols-12">
        {/* Fotografias */}
        <div className="relative order-1 h-[56svh] md:order-2 md:col-span-7 md:h-full">
          {COURSES.map((item, i) => (
            <div
              key={item.n}
              data-om-frame
              className={`frame absolute inset-0 ${reduced ? (i === active ? "opacity-100" : "opacity-0") : ""}`}
              style={{ zIndex: i }}
            >
              <div data-om-img className="absolute inset-0 will-change-transform">
                <Image src={item.img} alt={item.alt} fill sizes="(min-width: 900px) 60vw, 100vw" priority={i === 0} loading={i === 0 ? undefined : "eager"} />
              </div>
            </div>
          ))}
          <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(0deg,#0b0807_0%,transparent_28%)] md:bg-[linear-gradient(90deg,#0b0807_0%,transparent_22%)]" />
          {/* nome em japonês sobre a imagem */}
          <div className="absolute bottom-6 right-5 z-20 overflow-hidden md:bottom-10 md:right-10">
            <p
              key={c.jp}
              className="kanji text-2xl text-washi/85 [writing-mode:vertical-rl] animate-[jpIn_1s_var(--ease-soft)_both] md:text-3xl"
            >
              {c.jp}
            </p>
          </div>
        </div>

        {/* Texto fixo */}
        <div className="relative order-2 flex flex-1 flex-col justify-between px-5 pb-8 pt-2 md:order-1 md:col-span-5 md:justify-center md:px-10 md:py-0 md:pl-10 lg:pl-16">
          <div className="hidden md:block">
            <SectionLabel k="三" label="Omakase" />
            <h2 className="display mt-8 text-[clamp(2.4rem,3.6vw,3.6rem)] text-washi">
              Dezoito tempos.
              <br />
              <em>Uma única noite.</em>
            </h2>
          </div>

          {/* contador */}
          <div className="flex items-end gap-4 md:mt-14">
            <div className="h-[clamp(3.5rem,6vw,6rem)] overflow-hidden font-serif text-[clamp(3.5rem,6vw,6rem)] font-light leading-none">
              <div
                className="transition-transform duration-[900ms] ease-(--ease-cine)"
                style={{ transform: `translateY(-${(active * 100) / N}%)` }}
              >
                {COURSES.map((x) => (
                  <div key={x.n} className="h-[clamp(3.5rem,6vw,6rem)]">
                    {x.n}
                  </div>
                ))}
              </div>
            </div>
            <span className="eyebrow mb-2 text-[0.6rem] text-washi/40">/ 0{N}</span>
          </div>

          {/* lista (desktop) */}
          <ol className="mt-8 hidden space-y-1 md:block">
            {COURSES.map((x, i) => (
              <li
                key={x.n}
                className={`flex items-baseline gap-5 transition-[opacity,transform] duration-700 ease-(--ease-soft) ${
                  i === active ? "translate-x-3 opacity-100" : "opacity-25"
                }`}
              >
                <span className={`block h-px bg-kin transition-[width] duration-700 ${i === active ? "w-8" : "w-0"}`} />
                <span className="font-serif text-[1.75rem] font-light">{x.name}</span>
              </li>
            ))}
          </ol>

          {/* descrição ativa */}
          <div className="relative mt-4 min-h-[8.5rem] md:mt-10 md:min-h-[7rem]">
            {COURSES.map((x, i) => (
              <div
                key={x.n}
                aria-hidden={i !== active}
                className={`absolute inset-x-0 top-0 transition-[opacity,transform] duration-700 ease-(--ease-soft) ${
                  i === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
                }`}
              >
                <p className="font-serif text-[2.4rem] font-light leading-none md:hidden">{x.name}</p>
                <p className="mt-4 max-w-[27rem] text-[0.95rem] leading-[1.7] text-washi/65 md:mt-0">{x.text}</p>
              </div>
            ))}
          </div>

          {/* progresso (mobile) */}
          <div className="flex gap-1.5 md:hidden" aria-hidden>
            {COURSES.map((x, i) => (
              <span key={x.n} className="h-px flex-1 bg-washi/15">
                <span
                  className="block h-full bg-washi transition-transform duration-700 ease-(--ease-cine) origin-left"
                  style={{ transform: `scaleX(${i <= active ? 1 : 0})` }}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
