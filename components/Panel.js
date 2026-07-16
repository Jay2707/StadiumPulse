export default function Panel({ eyebrow, title, children, className = "" }) {
  return (
    <section className={`bg-steel/60 border border-steelLine rounded-xl p-5 md:p-6 ${className}`}>
      {(eyebrow || title) && (
        <div className="mb-4">
          {eyebrow && (
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber">
              {eyebrow}
            </span>
          )}
          {title && (
            <h2 className="font-display text-lg md:text-xl text-floodlight mt-1">{title}</h2>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
