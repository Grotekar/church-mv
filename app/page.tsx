import Image from "next/image";
import { CreedAccordion } from "@/components/CreedAccordion";
import { Footer } from "@/components/Footer";
import { GallerySection } from "@/components/GallerySection";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { churchContent } from "@/content/church";
import { displayValue, isPlaceholder } from "@/lib/placeholders";
import { withBasePath } from "@/lib/paths";

export default function Home() {
  const hasDonationLink = !isPlaceholder(churchContent.donations.link);
  const hasDonationQr = !isPlaceholder(churchContent.donations.qrSrc);
  const hasGallery =
    churchContent.gallery.enabled && churchContent.gallery.photos.length > 0;
  const featuredEvent = churchContent.events.featured;
  const contactChannels = [
    churchContent.contacts.telegram,
    churchContent.contacts.whatsapp,
    churchContent.contacts.vk,
  ];
  const realContactChannels = contactChannels.filter(hasRealLink);
  const hasRealEmail = hasRealContactValue(churchContent.contacts.email);
  const hasContactLinks = hasRealEmail || realContactChannels.length > 0;
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
            photos={churchContent.gallery.photos}
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
          <div className="max-w-4xl space-y-8">
            {churchContent.weeklySchedule.map((scheduleDay, index) => (
              <ScheduleDayBlock
                isPrimary={index === 0}
                key={scheduleDay.day}
                scheduleDay={scheduleDay}
              />
            ))}
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
          <div className="grid gap-7 md:grid-cols-[minmax(0,0.95fr)_minmax(260px,360px)] md:items-start">
            <div className="max-w-2xl">
              <p className="max-w-2xl text-base leading-8 text-church-muted sm:text-lg">
                {churchContent.contacts.description}
              </p>
              {hasContactLinks ? (
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-base font-medium">
                  {hasRealEmail ? (
                    <ContactInlineLink
                      href={churchContent.contacts.email.href}
                      label={churchContent.contacts.email.value}
                    />
                  ) : null}
                  {realContactChannels.map((channel) => (
                    <ContactInlineLink
                      href={channel.href}
                      key={channel.label}
                      label={channel.label}
                    />
                  ))}
                </div>
              ) : null}
            </div>
            <dl className="border-l-2 border-church-accent/70 pl-5">
              <ContactPerson contactPhone={churchContent.contacts.phone} />
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
              <div className="hidden md:block text-center">
                <div className="flex aspect-square items-center justify-center bg-church-background/45 p-4 text-center text-sm leading-6 text-church-muted">
                  <Image
                    alt={churchContent.donations.qrAlt}
                    className="h-full w-full object-contain"
                    height={176}
                    src={withBasePath(churchContent.donations.qrSrc)}
                    width={176}
                  />
                </div>
                <a
                    className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-church-accent px-5 text-sm font-medium text-white transition-colors hover:bg-church-accentHover focus:outline-none focus:ring-2 focus:ring-church-accent focus:ring-offset-2 focus:ring-offset-church-background"
                    href={churchContent.donations.link}
                    rel="noreferrer"
                    target="_blank"
                >
                  Поддержать служение
                </a>
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

function ContactPerson({
  contactPhone,
}: {
  contactPhone: {
    href: string;
    label: string;
    value: string;
  };
}) {
  const person = churchContent.contacts.person;
  const hasName = !isPlaceholder(person.name);
  const hasRole = !isPlaceholder(person.role);
  const hasPhone = hasRealContactValue(contactPhone);
  const shouldRender = hasName || hasRole || hasPhone;

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
        {hasPhone ? (
          <div className="pt-2">
            <p className="text-sm uppercase tracking-[0.08em] text-church-muted">
              {contactPhone.label}
            </p>
            <a
              className="mt-1 block text-church-accent underline underline-offset-4 transition-colors hover:text-church-text focus:outline-none focus:ring-2 focus:ring-church-accent focus:ring-offset-4 focus:ring-offset-church-background"
              href={contactPhone.href}
            >
              {contactPhone.value}
            </a>
          </div>
        ) : null}
      </dd>
    </div>
  );
}

type ScheduleDay = (typeof churchContent.weeklySchedule)[number];
type ScheduleItem = ScheduleDay["items"][number];

function ScheduleDayBlock({
  isPrimary = false,
  scheduleDay,
}: {
  isPrimary?: boolean;
  scheduleDay: ScheduleDay;
}) {
  return (
    <article
      className={`border-l-2 border-church-accent/40 pl-5 sm:pl-6 ${
        isPrimary ? "pb-2 sm:pb-3" : ""
      }`}
    >
      <h3 className="text-xl font-semibold text-church-text">
        {scheduleDay.day}
      </h3>
      <ul className={isPrimary ? "mt-5 space-y-6" : "mt-4 space-y-5"}>
        {scheduleDay.items.map((item) => (
          <ScheduleListItem item={item} key={`${item.time ?? ""}-${item.title}`} />
        ))}
      </ul>
      {scheduleDay.note ? (
        <ScheduleNote note={scheduleDay.note} />
      ) : null}
    </article>
  );
}

function ScheduleListItem({ item }: { item: ScheduleItem }) {
  return (
    <li className="grid gap-2 sm:grid-cols-[7.25rem_minmax(0,1fr)] sm:gap-5">
      <p className="whitespace-nowrap text-sm font-medium text-church-accent sm:text-base">
        {item.time ?? ""}
      </p>
      <div>
        <p className="text-lg font-semibold text-church-text">{item.title}</p>
        {item.description ? (
          <p className="mt-2 text-base leading-7 text-church-muted">
            {item.description}
          </p>
        ) : null}
        {item.link ? <ScheduleInlineLink link={item.link} /> : null}
      </div>
    </li>
  );
}

function ScheduleNote({ note }: { note: NonNullable<ScheduleDay["note"]> }) {
  return (
    <div className="mt-5 max-w-2xl border-l border-church-accent/40 pl-4">
      <p className="text-sm font-semibold leading-6 text-church-text">
        {note.title}
      </p>
      <p className="mt-1 text-sm leading-6 text-church-muted">{note.text}</p>
    </div>
  );
}

function ScheduleInlineLink({ link }: { link: NonNullable<ScheduleItem["link"]> }) {
  if (isPlaceholder(link.href)) {
    return (
      <p className="mt-2 text-base leading-7 text-church-muted">
        {[link.prefix, link.label, link.suffix].filter(Boolean).join(" ")}
      </p>
    );
  }

  return (
    <p className="mt-2 text-base leading-7 text-church-muted">
      {link.prefix ? `${link.prefix} ` : null}
      <a
        className="font-medium text-church-accent underline underline-offset-4 transition-colors hover:text-church-text focus:outline-none focus:ring-2 focus:ring-church-accent focus:ring-offset-4 focus:ring-offset-church-background"
        href={link.href}
      >
        {link.label}
      </a>
      {link.suffix ?? null}
    </p>
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

function ContactInlineLink({ href, label }: MapActionProps) {
  if (isPlaceholder(href)) {
    return null;
  }

  const isMailLink = href.startsWith("mailto:");

  return (
    <a
      className="text-church-accent underline underline-offset-4 transition-colors hover:text-church-text focus:outline-none focus:ring-2 focus:ring-church-accent focus:ring-offset-4 focus:ring-offset-church-background"
      href={href}
      rel={isMailLink ? undefined : "noopener noreferrer"}
      target={isMailLink ? undefined : "_blank"}
    >
      {label}
    </a>
  );
}

function hasRealContactValue(contact: ContactValueProps["contact"]) {
  return !isPlaceholder(contact.value) && !isPlaceholder(contact.href);
}

function hasRealLink(contact: MapActionProps) {
  return !isPlaceholder(contact.href);
}
