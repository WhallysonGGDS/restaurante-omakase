"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import Lines from "./Lines";
import SectionLabel from "./SectionLabel";

/** Cena 06 — O espaço. Uma janela que se abre até virar o próprio ambiente. */
export default function Space() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const inset = ctx.conditions.desktop ? "inset(24% 27% 24% 27%)" : "inset(30% 6% 30% 6%)";

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom bottom", scrub: 0.9 },
        });
        tl.fromTo("[data-sp-frame]", { clipPath: inset }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 })
          .fromTo("[data-sp-img]", { scale: 1.35 }, { scale: 1, duration: 1.25 }, 0)
          .to("[data-sp-notes]", { autoAlpha: 0, y: -20, duration: 0.3 }, 0)
          .fromTo("[data-sp-shade]", { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.6)
          .from("[data-sp-title] .line > span", { yPercent: 110, stagger: 0.08, duration: 0.4 }, 0.75)
          .from("[data-sp-sub]", { autoAlpha: 0, y: 16, duration: 0.3 }, 0.95)
          .to({}, { duration: 0.35 });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="espaco" data-tempo="5" className="relative h-[280svh] bg-sumi">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div data-sp-frame className="frame grain absolute inset-0">
          <div data-sp-img className="absolute inset-0 will-change-transform">
            <Image
              src="/images/balcao.webp"
              alt="Balcão de madeira escura com cadeiras de veludo, chef ao fundo e parede dourada iluminada"
              fill
              sizes="100vw"
              className="object-[60%_50%]"
            />
          </div>
          <div data-sp-shade className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,8,7,.55)_0%,rgba(11,8,7,.15)_70%)]" />
        </div>

        {/* notas nas bordas da janela — somem quando ela se abre */}
        <div data-sp-notes className="pointer-events-none absolute inset-0 mx-auto max-w-[1680px] px-5 md:px-10">
          <SectionLabel k="六" label="O Espaço" className="absolute left-5 top-28 md:left-10 md:top-32" />
          <p className="eyebrow absolute left-5 top-[24%] text-[0.6rem] text-washi/50 md:left-10 md:top-[24%]">10 lugares</p>
          <p className="eyebrow absolute bottom-[22%] right-5 text-right text-[0.6rem] text-washi/50 md:bottom-[24%] md:right-10">
            Balcão de hinoki
            <br />
            de nove metros
          </p>
          <p className="eyebrow absolute bottom-10 left-5 text-[0.6rem] text-washi/50 md:left-10">Luz baixa · som baixo</p>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
          <h2 data-sp-title className="display text-[clamp(2.6rem,7vw,7.5rem)]">
            <Lines lines={["O espaço também", <>faz parte da <em>experiência.</em></>]} />
          </h2>
          <p data-sp-sub className="mt-8 max-w-[26rem] text-[0.95rem] leading-relaxed text-washi/75">
            Madeira, pedra, papel e luz quente. Um ambiente pensado para que nada distraia do que acontece no balcão.
          </p>
        </div>
      </div>
    </section>
  );
}
