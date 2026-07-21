"use client";
import clsx from "clsx";
import Image, { type ImageProps } from "next/image";

type CustomImageProps = ImageProps & {
  imageClassName?: string;
};

export default function CustomImage({
  alt,
  className,
  imageClassName,
  quality,
  sizes,
  fill,
  priority = false,
  loading,
  placeholder = "blur",
  blurDataURL,
  ...props
}: CustomImageProps) {
  return (
    <Image
      {...props}
      alt={alt}
      fill={fill}
      quality={quality}
      priority={priority}
      blurDataURL="/images/image-placeholder.webp"
      loading={priority ? undefined : (loading ?? "lazy")}
      sizes={sizes}
      placeholder={placeholder}
      className={clsx(fill && "object-cover", imageClassName, className)}
    />
  );
}
