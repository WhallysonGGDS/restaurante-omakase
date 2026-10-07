"use client";

import Image from "next/image";
import { useRef } from "react";
import { SITE } from "@/lib/content";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { useReveal } from "@/lib/useReveal";
import Lines from "./Lines";
import SectionLabel from "./SectionLabel";

/** Cena 08 — Conversão. A mesa já está posta; falta você. */
export default function Reservation() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  useGSAP(
    () => {
      gsap.matchMedia().add(MQ.motion, () => {
        gsap.fromTo(
          "[data-rs-img]",
          { scale: 1.2, yPercent: -4 },
          { scale: 1, yPercent: 4, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
        // a luz se acende quando a seção assenta
        gsap.fromTo(
          "[data-rs-dark]",
          { opacity: 0.85 },
          { opacity: 0.35, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 70%", end: "top 10%", scrub: true } },
        );
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="reserva" data-tempo="7" className="relative grid min-h-[110svh] place-items-center overflow-hidden bg-sumi">
      <div data-rs-img className="absolute inset-0 will-change-transform">
        <Image
          src="/images/mesa.webp"
          alt="Balcão posto à luz de velas, com cerâmicas, saquê e um nigiri servido"
          fill
          sizes="100vw"
          className="object-[30%_50%]"
        />
      </div>
      <div data-rs-dark className="absolute inset-0 bg-sumi" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,8,7,.75)_0%,rgba(11,8,7,.2)_65%),linear-gradient(180deg,#0b0807_0%,transparent_20%,transparent_80%,#0b0807_100%)]" />

      <div className="relative z-10 flex flex-col items-center px-5 py-40 text-center">
        <SectionLabel k="八" label="Reserva" />
        <h2 data-lines className="display mt-10 text-[clamp(3.2rem,9vw,9.5rem)]">
          <Lines lines={["Reserve sua", <em key="i">experiência.</em>]} />
        </h2>
        <p data-fade className="mt-8 font-serif text-[1.4rem] font-light text-washi/80 md:text-[1.6rem]">
          Uma noite construída para ser lembrada.
        </p>

        <a
          data-fade="0.15"
          href={SITE.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="btn-fill eyebrow mt-14 h-16 w-full max-w-[22rem] text-[0.7rem] md:h-[4.5rem]"
        >
          Reservar mesa <span aria-hidden className="text-base">→</span>
        </a>

        <p data-fade="0.25" className="eyebrow mt-10 text-[0.6rem] leading-[2] text-washi/50">
          Terça a sábado · Sessões às 19h e 21h30
          <br />
          10 lugares por sessão
        </p>
      </div>
    </section>
  );
}
