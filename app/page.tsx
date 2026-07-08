import Image from "next/image";
import { CreedAccordion } from "@/components/CreedAccordion";
import { Footer } from "@/components/Footer";
import { GallerySection } from "@/components/GallerySection";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { churchContent } from "@/content/church";
import { displayValue, isPlaceholder } from "@/lib/placeholders";

export default function Home() {
  const hasDonationLink = !isPlaceholder(churchContent.donations.link);
  const hasDonationQr = !isPlaceholder(churchContent.donations.qrSrc);
  const hasGallery =
    churchContent.gallery.enabled && churchContent.gallery.images.length > 0;
  const featuredEvent = churchContent.events.featured;
  const contactChannels = [
    churchContent.contacts.telegram,
    churchContent.contacts.whatsapp,
    churchContent.contacts.vk,
  ];
  const structuredData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: churchContent.name,
    description: churchContent.seo.description,
  };

  if (!isPlaceholder(churchContent.siteUrl)) {
    structuredData.url = churchContent.siteUrl;
  }

  if (!isPlaceholder(churchContent.address.text)) {
    structuredData.address = {
      "@type": "PostalAddress",
      addressLocality: "Минеральные Воды",
      addressCountry: "RU",
      streetAddress: churchContent.address.text,
    };
  }

  if (
    !isPlaceholder(churchContent.contacts.phone.value) &&
    !isPlaceholder(churchContent.contacts.phone.href)
  ) {
    structuredData.telephone = churchContent.contacts.phone.value;
  }

  return (
    <>
      <Header />
      <main>
        <Hero />

        {featuredEvent ? (
          <Section id="featured-event" title="Ближайшее мероприятие" tone="accent">
            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
              <div className="max-w-2xl">
                <p className="text-sm uppercase tracking-[0.08em] text-church-muted">
                  {featuredEvent.date}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-church-text">
                  {featuredEvent.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-church-muted sm:text-lg">
                  {featuredEvent.description}
                </p>
              </div>
              <a
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-church-accent px-5 text-sm font-medium text-white transition-colors hover:bg-church-accentHover focus:outline-none focus:ring-2 focus:ring-church-accent focus:ring-offset-2 focus:ring-offset-church-background"
                href={featuredEvent.href}
              >
                Подробнее
              </a>
            </div>
          </Section>
        ) : null}

        <Section id="about" title="О церкви">
          <div className="max-w-3xl space-y-5 text-base leading-8 text-church-muted sm:text-lg">
            {churchContent.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Section>

        {hasGallery ? (
          <GallerySection
            description={churchContent.gallery.description}
            images={churchContent.gallery.images}
            title={churchContent.gallery.title}
          />
        ) : null}

        <Section id="faith" title="Во что мы верим" tone="warm">
          <div className="max-w-3xl space-y-5 text-base leading-8 text-church-muted sm:text-lg">
            <p>{churchContent.faith.intro}</p>
            <p>{churchContent.faith.summary}</p>
            <CreedAccordion
              buttonLabelOpen="Скрыть Никейский символ веры"
              buttonLabelClosed="Читать Никейский символ веры"
              creed={churchContent.faith.niceneCreed}
            />
          </div>
        </Section>

        <Section id="services" title="Богослужения">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(240px,340px)]">
            <div className="max-w-2xl">
              <h3 className="text-xl font-semibold text-church-text">
                {churchContent.service.title}
              </h3>
              <p className="mt-4 text-base leading-8 text-church-muted sm:text-lg">
                {churchContent.service.description}
              </p>
            </div>
            <dl className="space-y-5 border-l-2 border-church-accent/70 pl-5">
              <div>
                <dt className="text-sm uppercase tracking-[0.08em] text-church-muted">
                  Время
                </dt>
                <dd className="mt-2 text-xl font-semibold text-church-text">
                  <ValueText value={churchContent.service.time} />
                </dd>
              </div>
              <div>
                <dt className="text-sm uppercase tracking-[0.08em] text-church-muted">
                  Адрес
                </dt>
                <dd className="mt-2 text-xl font-semibold text-church-text">
                  <ValueText value={churchContent.address.text} />
                </dd>
              </div>
            </dl>
          </div>
        </Section>

        {churchContent.ministries.length > 0 ? (
          <Section id="ministries" title="Служения" tone="warm">
            <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {churchContent.ministries.map((ministry) => (
                <article
                  key={ministry.title}
                >
                  <h3 className="text-lg font-semibold text-church-text">
                    {ministry.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-church-muted sm:text-base">
                    {ministry.description}
                  </p>
                </article>
              ))}
            </div>
          </Section>
        ) : null}

        <Section id="address" title="Адрес" tone="accent">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(240px,340px)]">
            <div>
              <p className="max-w-2xl text-2xl font-semibold leading-9 text-church-text">
                <ValueText value={churchContent.address.text} />
              </p>
              {churchContent.address.note &&
              !isPlaceholder(churchContent.address.note) ? (
                <p className="mt-4 max-w-2xl text-base leading-8 text-church-muted sm:text-lg">
                  {churchContent.address.note}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col items-start gap-3 md:pt-1">
              {churchContent.address.mapLinks.map((link) => (
                <MapAction href={link.href} key={link.label} label={link.label} />
              ))}
            </div>
          </div>
        </Section>

        <Section id="contacts" title="Контакты">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(240px,340px)]">
            <div>
              <p className="max-w-2xl text-base leading-8 text-church-muted sm:text-lg">
                {churchContent.contacts.description}
              </p>
            </div>
            <dl className="space-y-5 border-l-2 border-church-border pl-5">
              <ContactPerson />
              <div>
                <dt className="text-sm uppercase tracking-[0.08em] text-church-muted">
                  {churchContent.contacts.phone.label}
                </dt>
                <dd className="mt-2 text-xl font-semibold text-church-text">
                  <ContactValue contact={churchContent.contacts.phone} />
                </dd>
              </div>
              <div>
                <dt className="text-sm uppercase tracking-[0.08em] text-church-muted">
                  {churchContent.contacts.email.label}
                </dt>
                <dd className="mt-2 text-xl font-semibold text-church-text">
                  <ContactValue contact={churchContent.contacts.email} />
                </dd>
              </div>
              <div>
                <dt className="text-sm uppercase tracking-[0.08em] text-church-muted">
                  Мессенджеры
                </dt>
                <dd className="mt-2 flex flex-col gap-2 text-xl font-semibold text-church-text">
                  {contactChannels.map((messenger) => (
                    <ContactLink
                      href={messenger.href}
                      key={messenger.label}
                      label={messenger.label}
                    />
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </Section>

        <Section id="donations" title="Пожертвования" tone="warm">
          <div
            className={
              hasDonationQr
                ? "grid gap-8 md:grid-cols-[minmax(0,1fr)_220px]"
                : "max-w-2xl"
            }
          >
            <div>
              <p className="max-w-2xl text-base leading-8 text-church-muted sm:text-lg">
                {churchContent.donations.description}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-church-muted">
                {churchContent.donations.methodNote}
              </p>
              {hasDonationLink ? (
                <a
                  className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-church-accent px-5 text-sm font-medium text-white transition-colors hover:bg-church-accentHover focus:outline-none focus:ring-2 focus:ring-church-accent focus:ring-offset-2 focus:ring-offset-church-background md:hidden"
                  href={churchContent.donations.link}
                  rel="noreferrer"
                  target="_blank"
                >
                  Поддержать служение
                </a>
              ) : (
                <p className="mt-5 text-sm text-church-muted md:hidden">
                  Ссылка для пожертвований будет добавлена.
                </p>
              )}
              <p className="mt-4 max-w-2xl text-sm leading-6 text-church-muted">
                {churchContent.donations.purposeNote}
              </p>
            </div>
            {hasDonationQr ? (
              <div className="hidden md:block">
                <div className="flex aspect-square items-center justify-center bg-church-background/45 p-4 text-center text-sm leading-6 text-church-muted">
                  <Image
                    alt={churchContent.donations.qrAlt}
                    className="h-full w-full object-contain"
                    height={176}
                    src={churchContent.donations.qrSrc}
                    width={176}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </Section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}

function ContactPerson() {
  const person = churchContent.contacts.person;
  const hasName = !isPlaceholder(person.name);
  const hasRole = !isPlaceholder(person.role);
  const shouldRender = hasName || hasRole;

  if (!shouldRender) {
    return null;
  }

  return (
    <div>
      <dt className="text-sm uppercase tracking-[0.08em] text-church-muted">
        Контактное лицо
      </dt>
      <dd className="mt-2 space-y-2 text-xl font-semibold text-church-text">
        {hasName ? <p>{person.name}</p> : null}
        {hasRole ? (
          <p className="text-base font-normal leading-7 text-church-muted">
            {person.role}
          </p>
        ) : null}
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

type MapActionProps = {
  href: string;
  label: string;
};

type ContactValueProps = {
  contact: {
    href: string;
    value: string;
  };
};

function ContactValue({ contact }: ContactValueProps) {
  if (isPlaceholder(contact.value) || isPlaceholder(contact.href)) {
    return (
      <span className="text-church-muted">{displayValue(contact.value)}</span>
    );
  }

  return <a href={contact.href}>{contact.value}</a>;
}

function MapAction({ href, label }: MapActionProps) {
  if (isPlaceholder(href)) {
    return (
      <span className="text-sm leading-6 text-church-muted">
        {label}: ссылка будет добавлена
      </span>
    );
  }

  return (
    <a
      className="text-sm font-medium text-church-accent underline underline-offset-4 transition-colors hover:text-church-text focus:outline-none focus:ring-2 focus:ring-church-accent focus:ring-offset-4 focus:ring-offset-church-background"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {label}
    </a>
  );
}

function ContactLink({ href, label }: MapActionProps) {
  if (isPlaceholder(href)) {
    return <span className="text-church-muted">{label}: ссылка будет добавлена</span>;
  }

  return (
    <a
      className="text-church-accent underline underline-offset-4 transition-colors hover:text-church-text focus:outline-none focus:ring-2 focus:ring-church-accent focus:ring-offset-4 focus:ring-offset-church-background"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {label}
    </a>
  );
}
