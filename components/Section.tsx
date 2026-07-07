type SectionProps = {
  children: React.ReactNode;
  id: string;
  tone?: "default" | "warm" | "accent";
  title: string;
};

export function Section({ children, id, title, tone = "default" }: SectionProps) {
  const toneClass = {
    default: "bg-church-background",
    warm: "bg-church-surfaceWarm/55",
    accent: "bg-church-accentSoft/70",
  }[tone];

  return (
    <section className={toneClass} id={id}>
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <h2 className="mb-6 text-2xl font-semibold text-church-text sm:text-3xl">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
