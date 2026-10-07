/** Rótulo de capítulo: kanji do tempo + nome. */
export default function SectionLabel({ k, label, className = "" }: { k: string; label: string; className?: string }) {
  return (
    <div data-fade className={`flex items-center gap-4 ${className}`}>
      <span className="kanji text-sm text-kin">{k}</span>
      <span data-rule className="block h-px w-8 bg-washi/25" />
      <span className="eyebrow text-washi/60">{label}</span>
    </div>
  );
}
