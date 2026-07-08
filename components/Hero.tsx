import { churchContent } from "@/content/church";
import { displayValue, isPlaceholder } from "@/lib/placeholders";

export function Hero() {
  const mapHref = churchContent.address.mapLinks.find(
    (link) => !isPlaceholder(link.href),
  )?.href;
  const scheduleSummary = getScheduleSummary(churchContent.weeklySchedule);

  return (
    <section className="bg-[linear-gradient(135deg,#F2EFE6_0%,#F2EFE6_52%,#D8EEF2_52%,#D8EEF2_100%)]">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="max-w-4xl">
          <p className="text-base font-medium text-church-accent">
            {churchContent.identity}
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-church-text sm:text-5xl lg:text-6xl">
            {churchContent.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-church-muted sm:text-xl sm:leading-9">
            {churchContent.heroText}
          </p>
        </div>

        <div className="mt-9 max-w-4xl border-l-2 border-church-accent pl-5 sm:pl-6">
          <div className="grid gap-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <dl className="grid gap-5 sm:grid-cols-2">
              <div className="max-w-sm">
                <dt className="text-sm uppercase tracking-[0.08em] text-church-muted">
                  Богослужение
                </dt>
                <dd className="mt-2 text-xl font-semibold text-church-text">
                  <ValueText value={scheduleSummary} />
                </dd>
              </div>
              <div className="max-w-sm">
                <dt className="text-sm uppercase tracking-[0.08em] text-church-muted">
                  Адрес
                </dt>
                <dd className="mt-2 text-xl font-semibold text-church-text">
                  <ValueText value={churchContent.address.text} />
                </dd>
              </div>
            </dl>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <a
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-church-accent px-5 text-sm font-medium text-white transition-colors hover:bg-church-accentHover focus:outline-none focus:ring-2 focus:ring-church-accent focus:ring-offset-2 focus:ring-offset-church-surface"
                href="#contacts"
              >
                Контакты
              </a>
              {mapHref ? (
                <a
                  className="inline-flex min-h-11 items-center justify-center rounded-md bg-church-accentSoft px-5 text-sm font-medium text-church-accent transition-colors hover:bg-church-accent hover:text-white focus:outline-none focus:ring-2 focus:ring-church-accent focus:ring-offset-2 focus:ring-offset-church-background"
                  href={mapHref}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Открыть карту
                </a>
              ) : (
                <span className="inline-flex min-h-11 items-center justify-center rounded-md bg-church-background/60 px-5 text-sm font-medium text-church-muted">
                  Карта будет добавлена
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValueText({ value }: { value: string }) {
  if (isPlaceholder(value)) {
    return <span className="text-church-muted">{displayValue(value)}</span>;
  }

  return value;
}

function getScheduleSummary(
  schedule: typeof churchContent.weeklySchedule,
): string {
  const firstDayWithTimes = schedule
    .map((day) => ({
      day: day.day,
      times: day.items
        .map((item) => item.time)
        .filter((time): time is string => Boolean(time)),
    }))
    .find((day) => day.times.length > 0);

  if (!firstDayWithTimes) {
    return "";
  }

  return `${firstDayWithTimes.day} · ${formatTimes(firstDayWithTimes.times)}`;
}

function formatTimes(times: string[]): string {
  if (times.length <= 1) {
    return times[0] ?? "";
  }

  return `${times.slice(0, -1).join(", ")} и ${times[times.length - 1]}`;
}
