import Image from "next/image";
import { Section } from "@/components/Section";

type GalleryImage = {
  alt: string;
  caption?: string;
  height: number;
  src: string;
  width: number;
};

type GallerySectionProps = {
  description?: string;
  id?: string;
  images: readonly GalleryImage[];
  title: string;
};

export function GallerySection({
  description,
  id = "gallery",
  images,
  title,
}: GallerySectionProps) {
  if (images.length === 0) {
    return null;
  }

  const [featuredImage, ...secondaryImages] = images;

  return (
    <Section id={id} title={title}>
      {description ? (
        <p className="mb-7 max-w-2xl text-base leading-8 text-church-muted sm:text-lg">
          {description}
        </p>
      ) : null}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
        <GalleryFigure image={featuredImage} priority />
        {secondaryImages.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {secondaryImages.slice(0, 3).map((image) => (
              <GalleryFigure image={image} key={image.src} />
            ))}
          </div>
        ) : null}
      </div>
    </Section>
  );
}

function GalleryFigure({
  image,
  priority = false,
}: {
  image: GalleryImage;
  priority?: boolean;
}) {
  return (
    <figure>
      <div className="overflow-hidden rounded-md bg-church-surfaceWarm/50">
        <Image
          alt={image.alt}
          className="h-full w-full object-cover"
          height={image.height}
          priority={priority}
          src={image.src}
          width={image.width}
        />
      </div>
      {image.caption ? (
        <figcaption className="mt-3 text-sm leading-6 text-church-muted">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
