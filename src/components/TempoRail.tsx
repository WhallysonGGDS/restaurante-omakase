"use client";

import { useState } from "react";
import { TEMPOS } from "@/lib/content";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * O fio narrativo: a página é servida como um omakase, em tempos.
 * Um trilho discreto na borda direita mostra em que tempo o visitante está.
 */
export default function TempoRail() {
  const [active, setActive] = useState(0);

  useGSAP(() => {
    TEMPOS.forEach((t, i) => {
      ScrollTrigger.create({
        trigger: `#${t.id}`,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (s) => s.isActive && setActive(i),
      });
    });
  });

  const cur = TEMPOS[active];

  return (
    <aside
      aria-hidden
      className="pointer-events-none fixed bottom-8 left-1/2 z-40 -translate-x-1/2 hidden items-center gap-4 mix-blend-difference lg:flex"
    >
      <span key={cur.k} className="kanji text-base text-washi animate-[jpIn_.8s_var(--ease-soft)_both]">
        {cur.k}
      </span>
      <div className="flex gap-1">
        {TEMPOS.map((t, i) => (
          <span
            key={t.id}
            className={`h-px transition-all duration-700 ${i === active ? "w-6 bg-washi" : "w-2 bg-washi/30"}`}
          />
        ))}
      </div>
    </aside>
  );
}
