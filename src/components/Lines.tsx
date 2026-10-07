/** Texto quebrado em linhas mascaradas — animadas via `.line > span`. */
export default function Lines({ lines, className }: { lines: React.ReactNode[]; className?: string }) {
  return (
    <>
      {lines.map((l, i) => (
        <span key={i} className={`line ${className ?? ""}`}>
          <span>{l}</span>
        </span>
      ))}
    </>
  );
}
