"use client";

import { useEffect, useRef, useState } from "react";
import { NAV, SITE } from "@/lib/content";
import { INTRO } from "@/lib/intro";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { useLenis, useScrollTo } from "./SmoothScroll";
import Seal from "./Seal";

export default function Header() {
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const scrollTo = useScrollTo();
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  useGSAP(
    () => {
      gsap.matchMedia().add(MQ.motion, () => {
        gsap.from("[data-h]", {
          autoAlpha: 0,
          y: -14,
          duration: 1.2,
          stagger: 0.06,
          delay: INTRO.content,
        });
      });
    },
    { scope: ref },
  );

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // espera o menu fechar antes de rolar
    setTimeout(() => scrollTo(href), open ? 450 : 0);
  };

  return (
    <>
      <header
        ref={ref}
        className={`fixed inset-x-0 top-0 z-50 transition-[height,background-color,backdrop-filter,border-color] duration-700 ease-(--ease-cine) border-b ${
          scrolled
            ? "h-16 md:h-[68px] bg-sumi/60 backdrop-blur-md border-washi/8"
            : "h-20 md:h-24 bg-transparent border-transparent"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1680px] items-center justify-between px-5 md:px-10">
          <a href="#inicio" onClick={go("#inicio")} data-h className="flex items-center gap-3" aria-label="Akane — início">
            <Seal size={scrolled ? 24 : 28} />
            <span className="font-serif text-[1.35rem] tracking-[0.34em] leading-none">{SITE.name}</span>
          </a>

          <nav className="hidden lg:block" aria-label="Principal">
            <ul className="flex items-center gap-10">
              {NAV.map((n) => (
                <li key={n.href} data-h>
                  <a
                    href={n.href}
                    onClick={go(n.href)}
                    className="eyebrow text-[0.625rem] text-washi/70 transition-colors duration-500 hover:text-washi"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-5" data-h>
            <a
              href="#reserva"
              onClick={go("#reserva")}
              className="btn-fill eyebrow hidden h-11 px-6 text-[0.625rem] sm:inline-flex"
            >
              Reservar mesa
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              className="relative z-[60] flex h-11 items-center gap-3 lg:hidden"
            >
              <span className="eyebrow text-[0.625rem]">{open ? "Fechar" : "Menu"}</span>
              <span className="relative block h-3 w-6" aria-hidden>
                <span
                  className={`absolute left-0 top-0 h-px w-full bg-washi transition-transform duration-500 ${open ? "translate-y-1.5 rotate-45" : ""}`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px w-full bg-washi transition-transform duration-500 ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile em tela cheia */}
      <div
        id="menu-mobile"
        className={`fixed inset-0 z-40 flex flex-col bg-sumi transition-[clip-path] duration-[900ms] ease-(--ease-cine) lg:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
        aria-hidden={!open}
      >
        <span className="kanji pointer-events-none absolute -right-6 bottom-10 text-[16rem] leading-none text-washi/[0.03]">
          茜
        </span>
        <nav className="mt-28 flex-1 px-6" aria-label="Menu mobile">
          <ul>
            {NAV.map((n, i) => (
              <li key={n.href} className="overflow-hidden border-b border-washi/10">
                <a
                  href={n.href}
                  onClick={go(n.href)}
                  tabIndex={open ? 0 : -1}
                  className="flex items-baseline gap-5 py-5 transition-transform duration-[900ms] ease-(--ease-soft)"
                  style={{
                    transform: open ? "translateY(0)" : "translateY(110%)",
                    transitionDelay: open ? `${220 + i * 70}ms` : "0ms",
                  }}
                >
                  <span className="kanji text-sm text-kin">{["一", "二", "三", "四", "五"][i]}</span>
                  <span className="font-serif text-[2.75rem] font-light leading-none">{n.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-6 pb-10">
          <a href="#reserva" onClick={go("#reserva")} tabIndex={open ? 0 : -1} className="btn-fill eyebrow h-14 w-full">
            Reservar mesa <span aria-hidden>→</span>
          </a>
          <p className="eyebrow mt-6 text-[0.6rem] text-washi/40">Terça a sábado · 19h e 21h30</p>
        </div>
      </div>
    </>
  );
}
