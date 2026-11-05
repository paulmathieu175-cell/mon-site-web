/** Texte dont les lettres « roulent » au survol du parent `.group`. */
export default function Roll({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`roll ${className}`} aria-label={text}>
      {Array.from(text).map((c, i) => (
        <span key={i} aria-hidden="true" style={{ transitionDelay: `${i * 18}ms` }}>
          {c}
        </span>
      ))}
    </span>
  );
}
