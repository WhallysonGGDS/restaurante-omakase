"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, isLowPower, MQ, useGSAP } from "@/lib/gsap";
import { useReveal } from "@/lib/useReveal";
import Lines from "./Lines";
import SectionLabel from "./SectionLabel";

/** Cena 04 — O chef. O título atravessa a fronteira entre a foto e o escuro. */
export default function Chef() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  useGSAP(
    () => {
      gsap.matchMedia().add(MQ.motion, () => {
        const k = isLowPower() ? 0.5 : 1;
        gsap.fromTo(
          "[data-chef-frame]",
          { clipPath: "inset(14% 10% 14% 10%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top 85%", end: "top 15%", scrub: 0.8 },
          },
        );
        gsap.fromTo(
          "[data-chef-img]",
          { scale: 1.16, yPercent: -5 * k },
          {
            scale: 1.02,
            yPercent: 5 * k,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="chef" data-tempo="3" className="relative overflow-hidden bg-sumi md:min-h-[120vh]">
      <div className="relative md:absolute md:inset-y-0 md:left-0 md:w-[56%]">
        <div data-chef-frame className="frame grain relative h-[88svh] md:h-full">
          <div data-chef-img className="absolute inset-0 will-change-transform">
            <Image
              src="/images/chef-retrato.webp"
              alt="Chef Kenji Morita de dólmã escuro atrás do balcão"
              fill
              sizes="(min-width: 900px) 56vw, 100vw"
              className="object-[50%_30%]"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(0deg,#0b0807_0%,rgba(11,8,7,.2)_45%,transparent_70%)] md:bg-[linear-gradient(270deg,#0b0807_0%,rgba(11,8,7,.35)_30%,transparent_60%)]" />
        </div>
      </div>

      <div className="relative mx-auto -mt-[34svh] grid max-w-[1680px] grid-cols-12 gap-x-5 px-5 pb-28 md:mt-0 md:min-h-[120vh] md:items-center md:px-10 md:py-40">
        <div className="col-span-12 md:col-span-8 md:col-start-5">
          <SectionLabel k="四" label="O Chef" className="mb-8 md:mb-12" />
          <h2 data-lines className="display text-[clamp(3rem,8.4vw,9rem)]">
            <Lines lines={["O verdadeiro luxo", <>está na <em>precisão.</em></>]} />
          </h2>

          <div className="mt-12 grid grid-cols-8 gap-x-5 md:mt-20">
            <div className="col-span-8 md:col-span-4 md:col-start-4">
              <p data-fade className="text-[1.05rem] leading-[1.75] text-washi/70">
                Uma cozinha guiada pelo respeito aos ingredientes, pela técnica e pela tradição.
              </p>
              <p data-fade="0.1" className="mt-8 font-serif text-xl italic text-kinu">
                Kenji Morita
              </p>
              <p data-fade="0.15" className="eyebrow mt-2 text-[0.6rem] text-washi/40">
                28 anos de balcão · Tóquio → Goiânia
              </p>
              <a data-fade="0.2" href="#arte" className="link-line eyebrow mt-12 text-washi">
                Conheça nossa história <span className="arrow" aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
