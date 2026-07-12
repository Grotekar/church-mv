"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Section } from "@/components/Section";
import { withBasePath } from "@/lib/paths";

type GalleryPhoto = {
  alt: string;
  category?: string;
  featured?: boolean;
  image: {
    height: number;
    src: string;
    width: number;
  };
  originalImage?: {
    height: number;
    src: string;
    width: number;
  };
  title: string;
};

type GallerySectionProps = {
  description?: string;
  id?: string;
  photos: readonly GalleryPhoto[];
  title: string;
};

export function GallerySection({
  description,
  id = "gallery",
  photos,
  title,
}: GallerySectionProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const activePhoto =
    activePhotoIndex === null ? null : photos[activePhotoIndex] ?? null;

  const showPhoto = useCallback(
    (direction: -1 | 1) => {
      setActivePhotoIndex((currentIndex) => {
        if (currentIndex === null || photos.length === 0) {
          return currentIndex;
        }

        return (currentIndex + direction + photos.length) % photos.length;
      });
    },
    [photos.length],
  );

  useEffect(() => {
    if (activePhotoIndex === null) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActivePhotoIndex(null);
      }

      if (event.key === "ArrowRight") {
        showPhoto(1);
      }

      if (event.key === "ArrowLeft") {
        showPhoto(-1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePhotoIndex, showPhoto]);

  if (photos.length === 0) {
    return null;
  }

  const [featuredPhoto, ...secondaryPhotos] = photos;

  return (
    <Section id={id} title={title}>
      {description ? (
        <p className="mb-7 max-w-2xl text-base leading-8 text-church-muted sm:text-lg">
          {description}
        </p>
      ) : null}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
        <GalleryFigure
          onOpen={() => setActivePhotoIndex(0)}
          photo={featuredPhoto}
          priority
        />
        {secondaryPhotos.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {secondaryPhotos.slice(0, 3).map((photo, index) => (
              <GalleryFigure
                key={photo.image.src}
                onOpen={() => setActivePhotoIndex(index + 1)}
                photo={photo}
              />
            ))}
          </div>
        ) : null}
      </div>
      {activePhoto ? (
        <GalleryLightbox
          onClose={() => setActivePhotoIndex(null)}
          onNext={() => showPhoto(1)}
          onPrevious={() => showPhoto(-1)}
          photo={activePhoto}
        />
      ) : null}
    </Section>
  );
}

function GalleryFigure({
  onOpen,
  photo,
  priority = false,
}: {
  onOpen: () => void;
  photo: GalleryPhoto;
  priority?: boolean;
}) {
  return (
    <figure>
      <div className="overflow-hidden rounded-md bg-church-surfaceWarm/50">
        <button
          aria-label={`Открыть фотографию: ${photo.title}`}
          className="block w-full cursor-zoom-in border-0 bg-transparent p-0 text-left focus:outline-none focus:ring-2 focus:ring-church-accent focus:ring-offset-4 focus:ring-offset-church-background"
          onClick={onOpen}
          type="button"
        >
          <Image
            alt={photo.alt}
            className="h-full w-full object-cover"
            height={photo.image.height}
            priority={priority}
            src={withBasePath(photo.image.src)}
            width={photo.image.width}
          />
        </button>
      </div>
      {photo.title ? (
        <figcaption className="mt-3 text-sm leading-6 text-church-muted">
          {photo.title}
        </figcaption>
      ) : null}
    </figure>
  );
}

function GalleryLightbox({
  onClose,
  onNext,
  onPrevious,
  photo,
}: {
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  photo: GalleryPhoto;
}) {
  const detailImage = photo.originalImage ?? photo.image;

  return (
    <div
      aria-label="Просмотр фотографии"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center bg-church-text/85 px-4 py-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
    >
      <div className="relative w-full max-w-5xl">
        <button
          aria-label="Закрыть просмотр"
          autoFocus
          className="absolute right-0 top-0 z-10 grid h-11 w-11 -translate-y-3 translate-x-1 place-items-center rounded-full bg-church-background text-church-text shadow-sm focus:outline-none focus:ring-2 focus:ring-church-accent focus:ring-offset-4 focus:ring-offset-church-text"
          onClick={onClose}
          type="button"
        >
          <span aria-hidden="true" className="text-2xl leading-none">
            ×
          </span>
        </button>
        <button
          aria-label="Предыдущая фотография"
          className="absolute left-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-church-background/95 text-xl font-semibold text-church-text shadow-sm focus:outline-none focus:ring-2 focus:ring-church-accent focus:ring-offset-4 focus:ring-offset-church-text"
          onClick={onPrevious}
          type="button"
        >
          <span aria-hidden="true">‹</span>
        </button>
        <figure>
          <Image
            alt={photo.alt}
            className="mx-auto max-h-[78vh] w-auto rounded-md object-contain"
            height={detailImage.height}
            src={withBasePath(detailImage.src)}
            width={detailImage.width}
          />
          <figcaption className="mt-3 text-center text-sm font-medium leading-6 text-church-background">
            {photo.title}
          </figcaption>
        </figure>
        <button
          aria-label="Следующая фотография"
          className="absolute right-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-church-background/95 text-xl font-semibold text-church-text shadow-sm focus:outline-none focus:ring-2 focus:ring-church-accent focus:ring-offset-4 focus:ring-offset-church-text"
          onClick={onNext}
          type="button"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </div>
  );
}
