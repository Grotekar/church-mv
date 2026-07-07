import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { churchContent } from "@/content/church";
import { vyezdnoeBogosluzhenieContent as eventContent } from "@/content/events/vyezdnoe-bogosluzhenie";
import { displayValue, isPlaceholder } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: eventContent.seo.title,
  description: eventContent.seo.description,
  openGraph: {
    title: eventContent.seo.title,
    description: eventContent.seo.description,
    type: "website",
    locale: "ru_RU",
    siteName: churchContent.name,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function VyezdnoeBogosluzheniePage() {
  return (
    <>
      <EventHeader />
      <main>
        <section className="bg-[linear-gradient(140deg,#F2EFE6_0%,#F2EFE6_46%,#D8EEF2_46%,#E8D8C4_100%)]">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
              <div className="max-w-4xl">
                <p className="text-base font-medium text-church-accent">
                  {eventContent.subtitle}
                </p>
                <h1 className="mt-4 text-4xl font-semibold text-church-text sm:text-5xl lg:text-6xl">
                  {eventContent.title}
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-church-muted sm:text-xl sm:leading-9">
                  {eventContent.description}
                </p>
              </div>

              <div className="border-l-2 border-church-accent pl-5">
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-church-muted">Дата и время</dt>
                    <dd className="mt-2 text-lg font-semibold leading-7 text-church-text">
                      <ValueText value={eventContent.practical.date} />
                      <br />
                      <ValueText value={eventContent.practical.time} />
                    </dd>
                  </div>
                  <div className="border-t border-church-border/60 pt-4">
                    <dt className="text-sm text-church-muted">Место</dt>
                    <dd className="mt-2 text-lg font-semibold leading-7 text-church-text">
                      <ValueText value={eventContent.practical.location} />
                    </dd>
                  </div>
                </dl>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <a
                    className="inline-flex min-h-11 items-center justify-center rounded-md bg-church-accent px-5 text-sm font-medium text-white transition-colors hover:bg-church-accentHover focus:outline-none focus:ring-2 focus:ring-church-accent focus:ring-offset-2 focus:ring-offset-church-surface"
                    href="#info"
                  >
                    Посмотреть информацию
                  </a>
                  <EventMapLink />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Section id="about-event" title="О встрече">
          <div className="max-w-3xl space-y-5 text-base leading-8 text-church-muted sm:text-lg">
            {eventContent.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Section>

        <Section id="info" title="Практическая информация" tone="warm">
          <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <EventDetail label="Дата" value={eventContent.practical.date} />
            <EventDetail label="Время" value={eventContent.practical.time} />
            <EventDetail
              label="Место"
              value={eventContent.practical.location}
            />
            <EventDetail
              label="Как добраться"
              value={eventContent.practical.transport}
            />
            {eventContent.practical.bring &&
            !isPlaceholder(eventContent.practical.bring) ? (
              <EventDetail
                label="Что взять с собой"
                value={eventContent.practical.bring}
              />
            ) : null}
            <EventDetail
              label="Контакт"
              value={eventContent.practical.contactNote}
            />
          </dl>
        </Section>

        {eventContent.photos.length > 0 ? (
          <Section id="photos" title="Фотографии">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {eventContent.photos.map((photo) => (
                <figure
                  className="overflow-hidden rounded-lg bg-church-surface shadow-sm shadow-black/5"
                  key={photo.src}
                >
                  <Image
                    alt={photo.alt}
                    className="h-auto w-full object-cover"
                    height={photo.height}
                    src={photo.src}
                    width={photo.width}
                  />
                </figure>
              ))}
            </div>
          </Section>
        ) : null}

        <Section id="contacts" title="Контакты" tone="accent">
          <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(260px,360px)]">
            <div>
              <p className="text-base leading-8 text-church-muted sm:text-lg">
                {churchContent.contacts.description}
              </p>
            </div>
            <dl className="space-y-5 border-l-2 border-church-border pl-5">
              <ContactRow
                href={churchContent.contacts.phone.href}
                label="Телефон"
                value={churchContent.contacts.phone.label}
              />
              <div>
                <dt className="text-sm uppercase tracking-[0.08em] text-church-muted">
                  Мессенджеры
                </dt>
                <dd className="mt-2 flex flex-col gap-2 text-xl font-semibold text-church-text">
                  {churchContent.contacts.messengers.map((messenger) => (
                    <ContactRowLink
                      href={messenger.href}
                      key={messenger.label}
                      value={messenger.label}
                    />
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </Section>
      </main>
      <EventFooter />
    </>
  );
}

function EventHeader() {
  const hasLogo = !isPlaceholder(churchContent.logoSrc);

  return (
    <header className="border-b border-church-border bg-church-background/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:gap-6 sm:px-8">
        <Link
          className="flex min-w-0 flex-1 items-center gap-3 text-xs font-semibold leading-5 text-church-text sm:text-sm md:max-w-none"
          href="/"
        >
          {hasLogo ? (
            <Image
              alt={churchContent.logoAlt}
              className="h-8 w-8 shrink-0 object-contain"
              height={32}
              src={churchContent.logoSrc}
              width={32}
            />
          ) : null}
          <span className="min-w-0">{churchContent.name}</span>
        </Link>
        <a
          className="inline-flex min-h-10 shrink-0 items-center rounded-md border border-church-accent px-3 text-sm font-medium text-church-accent transition-colors hover:bg-church-accent hover:text-white focus:outline-none focus:ring-2 focus:ring-church-accent focus:ring-offset-2 focus:ring-offset-church-background sm:px-4"
          href="#contacts"
        >
          Контакты
        </a>
      </div>
    </header>
  );
}

function EventMapLink() {
  if (isPlaceholder(eventContent.practical.mapLink)) {
    return (
      <span className="inline-flex min-h-11 items-center justify-center rounded-md bg-church-background/60 px-5 text-sm font-medium text-church-muted">
        Карта будет добавлена
      </span>
    );
  }

  return (
    <a
      className="inline-flex min-h-11 items-center justify-center rounded-md bg-church-accentSoft px-5 text-sm font-medium text-church-accent transition-colors hover:bg-church-accent hover:text-white focus:outline-none focus:ring-2 focus:ring-church-accent focus:ring-offset-2 focus:ring-offset-church-surface"
      href={eventContent.practical.mapLink}
      rel="noopener noreferrer"
      target="_blank"
    >
      Открыть карту
    </a>
  );
}

function EventDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm uppercase tracking-[0.08em] text-church-muted">
        {label}
      </dt>
      <dd className="mt-2 text-xl font-semibold leading-7 text-church-text">
        <ValueText value={value} />
      </dd>
    </div>
  );
}

function ValueText({ value }: { value: string }) {
  if (isPlaceholder(value)) {
    return <span className="text-church-muted">{displayValue(value)}</span>;
  }

  return value;
}

function ContactRow({
  href,
  label,
  value,
}: {
  href: string;
  label: string;
  value: string;
}) {
  const isLinkPlaceholder = isPlaceholder(href) || isPlaceholder(value);

  return (
    <div>
      <dt className="text-sm uppercase tracking-[0.08em] text-church-muted">
        {label}
      </dt>
      <dd className="mt-2 text-xl font-semibold text-church-text">
        {isLinkPlaceholder ? (
          <span className="text-church-muted">{displayValue(value)}</span>
        ) : (
          <a href={href}>
            {value}
          </a>
        )}
      </dd>
    </div>
  );
}

function ContactRowLink({ href, value }: { href: string; value: string }) {
  if (isPlaceholder(href) || isPlaceholder(value)) {
    return <span className="text-church-muted">{value}: ссылка будет добавлена</span>;
  }

  return (
    <a
      className="text-church-accent underline underline-offset-4 transition-colors hover:text-church-text focus:outline-none focus:ring-2 focus:ring-church-accent focus:ring-offset-4 focus:ring-offset-church-background"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {value}
    </a>
  );
}

function EventFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-church-text text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[minmax(0,1fr)_minmax(220px,320px)]">
        <div>
          <p className="text-lg font-semibold">{churchContent.name}</p>
          <p className="mt-2 text-sm text-white/75">{churchContent.identity}</p>
        </div>
        <div className="space-y-3 text-sm leading-6 text-white/75">
          <p>© {currentYear} {churchContent.name}</p>
          <p>{eventContent.title}</p>
          <Link
            className="inline-flex text-white underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-church-text"
            href="/"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>
    </footer>
  );
}
