export function PageHeader({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede: string;
}) {
  return (
    <section className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <p className="text-[11px] uppercase tracking-[0.22em] text-copper">{kicker}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-stone">{lede}</p>
      </div>
    </section>
  );
}
