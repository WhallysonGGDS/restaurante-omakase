import { SITE } from "@/lib/content";
import Seal from "./Seal";

export default function Footer() {
  return (
    <footer id="contato" className="relative overflow-hidden bg-sumi pt-24 md:pt-32">
      <div className="mx-auto grid max-w-[1680px] grid-cols-12 gap-x-5 gap-y-12 px-5 md:px-10">
        <div className="col-span-12 md:col-span-4">
          <div className="flex items-center gap-3">
            <Seal />
            <span className="font-serif text-[1.35rem] leading-none tracking-[0.34em]">{SITE.name}</span>
          </div>
          <p className="mt-6 max-w-[18rem] text-sm leading-relaxed text-washi/50">
            Omakase de balcão. Dez lugares, duas sessões por noite.
          </p>
        </div>

        <Col title="Endereço">
          Rua 15, 120 — Setor Marista
          <br />
          {SITE.city} · GO
        </Col>
        <Col title="Horários">
          Terça a sábado
          <br />
          19h e 21h30
        </Col>
        <Col title="Contato">
          <a className="transition-colors hover:text-washi" href="mailto:reservas@akane.com.br">
            reservas@akane.com.br
          </a>
          <br />
          <a className="transition-colors hover:text-washi" href={SITE.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          {" · "}
          <a className="transition-colors hover:text-washi" href="https://instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </Col>
      </div>

      <div className="mx-auto mt-24 flex max-w-[1680px] items-end justify-between border-t border-washi/10 px-5 py-8 md:px-10">
        <p className="eyebrow text-[0.55rem] text-washi/35">© 2026 Akane Omakase</p>
        <p className="kanji text-xs tracking-[0.5em] text-washi/35">ご馳走様でした</p>
      </div>

      <p
        aria-hidden
        className="pointer-events-none -mb-[0.22em] select-none text-center font-serif text-[25vw] font-light leading-[0.8] tracking-[0.06em] text-washi/[0.035]"
      >
        AKANE
      </p>
    </footer>
  );
}

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="col-span-12 sm:col-span-4 md:col-span-2 md:col-start-auto [&:nth-of-type(2)]:md:col-start-7">
      <p className="eyebrow text-[0.6rem] text-kin">{title}</p>
      <p className="mt-5 text-sm leading-[1.9] text-washi/60">{children}</p>
    </div>
  );
}
