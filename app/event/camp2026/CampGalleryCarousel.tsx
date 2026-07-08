"use client";

import Image from "next/image";
import { useRef } from "react";
import { withBasePath } from "@/lib/paths";
import styles from "./camp2026.module.css";

type CampPhoto = {
  alt: string;
  caption: string;
  height: number;
  src: string;
  width: number;
};

type CampGalleryCarouselProps = {
  photos: readonly CampPhoto[];
};

export function CampGalleryCarousel({ photos }: CampGalleryCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  function scrollGallery(direction: -1 | 1) {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    const slide = carousel.querySelector<HTMLElement>("[data-camp-slide]");
    const gap = 18;
    const distance = slide
      ? slide.offsetWidth + gap
      : Math.round(carousel.clientWidth * 0.85);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    carousel.scrollBy({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      left: distance * direction,
    });
  }

  return (
    <div className={styles.carouselShell}>
      <div
        aria-label="Избранные фотографии смены"
        className={styles.carouselViewport}
        id="camp-gallery-carousel"
        ref={carouselRef}
        tabIndex={0}
      >
        {photos.map((photo) => (
          <figure
            className={styles.carouselSlide}
            data-camp-slide
            key={photo.src}
          >
            <Image
              alt={photo.alt}
              height={photo.height}
              src={withBasePath(photo.src)}
              width={photo.width}
            />
            <figcaption className={styles.caption}>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
      <button
        aria-controls="camp-gallery-carousel"
        aria-label="Предыдущая фотография"
        className={`${styles.galleryControl} ${styles.galleryPrev}`}
        onClick={() => scrollGallery(-1)}
        type="button"
      />
      <button
        aria-controls="camp-gallery-carousel"
        aria-label="Следующая фотография"
        className={`${styles.galleryControl} ${styles.galleryNext}`}
        onClick={() => scrollGallery(1)}
        type="button"
      />
    </div>
  );
}
