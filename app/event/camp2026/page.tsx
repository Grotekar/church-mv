import Link from "next/link";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { camp2026Content as eventContent } from "@/content/events/camp2026";
import { churchIdentity } from "@/content/shared/churchIdentity";
import { isPlaceholder } from "@/lib/placeholders";
import { withBasePath } from "@/lib/paths";
import { CampGalleryCarousel } from "./CampGalleryCarousel";
import styles from "./camp2026.module.css";

export const metadata: Metadata = {
  title: eventContent.seo.title,
  description: eventContent.seo.description,
  openGraph: {
    title: eventContent.seo.title,
    description: eventContent.seo.description,
    type: "website",
    locale: "ru_RU",
    siteName: churchIdentity.name,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Camp2026Page() {
  const hasDiskUrl = !isPlaceholder(eventContent.actions.diskUrl);
  const currentYear = new Date().getFullYear();
  const heroStyle = {
    "--camp-hero-image": `url("${withBasePath(eventContent.photos[0].src)}")`,
  } as CSSProperties;

  return (
    <div className={styles.page} style={heroStyle}>
      <header className={styles.hero}>
        <nav className={styles.topbar} aria-label="Навигация страницы">
          <a className={styles.brand} href="#top" aria-label="В начало страницы">
            <span className={styles.brandMark} />
            <span className={styles.brandText}>{eventContent.shortTitle}</span>
          </a>
          <div className={styles.topbarActions}>
            {hasDiskUrl ? (
              <a
                className={styles.topDiskLink}
                href={eventContent.actions.diskUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {eventContent.actions.diskPreview}
              </a>
            ) : (
              <span
                className={`${styles.topDiskLink} ${styles.topDiskLinkDisabled}`}
              >
                {eventContent.actions.diskPreview}
              </span>
            )}
          </div>
        </nav>

        <section className={styles.heroContent} id="top">
          <p className={styles.eyebrow}>{eventContent.subtitle}</p>
          <h1 className={styles.title}>{eventContent.title}</h1>
          <p className={styles.lead}>{eventContent.description}</p>
          <div className={styles.heroActions}>
            {hasDiskUrl ? (
              <a
                className={`${styles.button} ${styles.buttonPrimary}`}
                href={eventContent.actions.diskUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {eventContent.actions.disk}
              </a>
            ) : (
              <span
                className={`${styles.button} ${styles.buttonPrimary} ${styles.disabledButton}`}
              >
                Архив фотографий будет добавлен
              </span>
            )}
            <a className={`${styles.button} ${styles.buttonGhost}`} href="#gallery">
              {eventContent.actions.gallery}
            </a>
          </div>
        </section>
      </header>

      <main>
        <section
          aria-labelledby="camp-thanks-title"
          className={`${styles.section} ${styles.thanksSection}`}
        >
          <div>
            <p className={styles.eyebrow}>
              {eventContent.sections.thanks.eyebrow}
            </p>
            <h2 className={styles.sectionTitle} id="camp-thanks-title">
              {eventContent.sections.thanks.title}
            </h2>
          </div>
          <div className={styles.softPanel}>
            <p className={styles.cardText}>{eventContent.sections.thanks.text}</p>
          </div>
        </section>

        <section
          aria-labelledby="camp-gallery-title"
          className={styles.section}
          id="gallery"
        >
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>
              {eventContent.sections.gallery.eyebrow}
            </p>
            <h2 className={styles.sectionTitle} id="camp-gallery-title">
              {eventContent.sections.gallery.title}
            </h2>
            <p className={styles.sectionText}>
              {eventContent.sections.gallery.description}
            </p>
          </div>

          <CampGalleryCarousel photos={eventContent.photos} />
        </section>

        <section
          aria-labelledby="camp-final-title"
          className={styles.finalSection}
        >
          <div className={styles.finalPanel}>
            <p className={styles.eyebrow}>{eventContent.sections.final.eyebrow}</p>
            <h2 className={styles.sectionTitle} id="camp-final-title">
              {eventContent.sections.final.title}
            </h2>
            <p className={styles.sectionText}>{eventContent.sections.final.text}</p>
            {hasDiskUrl ? (
              <a
                className={`${styles.button} ${styles.buttonPrimary}`}
                href={eventContent.actions.diskUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Открыть Яндекс Диск
              </a>
            ) : (
              <span
                className={`${styles.button} ${styles.buttonPrimary} ${styles.disabledButton}`}
              >
                Ссылка на Яндекс Диск будет добавлена
              </span>
            )}
            <div className={styles.qrPlaceholder} aria-label="Место для QR-кода">
              <span>QR</span>
              <small>{eventContent.sections.final.qrNote}</small>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p>{churchIdentity.name}</p>
          <p className={styles.footerText}>{churchIdentity.identity}</p>
          <p className={styles.footerText}>
            © {currentYear} {churchIdentity.name}
          </p>
          <Link className={styles.churchBack} href="/">
            Вернуться на сайт церкви
          </Link>
        </div>
      </footer>
    </div>
  );
}
