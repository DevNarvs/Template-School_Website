export default function SectionHeading({ eyebrow, title, subtitle, align = "center", className = "" }) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignCls} ${className}`}>
      {eyebrow && (
        <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-lg leading-relaxed text-neutral-600">{subtitle}</p>
      )}
    </div>
  );
}
