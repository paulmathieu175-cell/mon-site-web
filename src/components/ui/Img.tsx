import { images, type ImageName } from "@/data/images";
import { asset } from "@/lib/asset";

type Props = {
  name: ImageName;
  className?: string;
  sizes?: string;
  priority?: boolean;
  alt?: string;
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "alt">;

/** Image responsive (WebP 900 / 1800 px), chargement différé par défaut. */
export default function Img({ name, className, sizes = "100vw", priority = false, alt, ...rest }: Props) {
  const meta = images[name];
  const base = asset(`/images/${name}`);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${base}-1800.webp`}
      srcSet={`${base}-900.webp 900w, ${base}-1800.webp 1800w`}
      sizes={sizes}
      width={meta.w}
      height={meta.h}
      alt={alt ?? meta.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={className}
      {...rest}
    />
  );
}
