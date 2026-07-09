import Image from "next/image";
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
        <GalleryFigure photo={featuredPhoto} priority />
        {secondaryPhotos.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {secondaryPhotos.slice(0, 3).map((photo) => (
              <GalleryFigure photo={photo} key={photo.image.src} />
            ))}
          </div>
        ) : null}
      </div>
    </Section>
  );
}

function GalleryFigure({
  photo,
  priority = false,
}: {
  photo: GalleryPhoto;
  priority?: boolean;
}) {
  return (
    <figure>
      <div className="overflow-hidden rounded-md bg-church-surfaceWarm/50">
        <Image
          alt={photo.alt}
          className="h-full w-full object-cover"
          height={photo.image.height}
          priority={priority}
          src={withBasePath(photo.image.src)}
          width={photo.image.width}
        />
      </div>
      {photo.title ? (
        <figcaption className="mt-3 text-sm leading-6 text-church-muted">
          {photo.title}
        </figcaption>
      ) : null}
    </figure>
  );
}
