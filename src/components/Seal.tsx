/** Selo hanko com o kanji da casa. */
export default function Seal({ size = 28 }: { size?: number }) {
  return (
    <span
      aria-hidden
      className="kanji inline-grid place-items-center bg-shu text-washi leading-none"
      style={{ width: size, height: size, fontSize: size * 0.62, borderRadius: 2 }}
    >
      茜
    </span>
  );
}
