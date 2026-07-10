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
  quality = 85,
  sizes,
  fill,
  priority = false,
  loading,
  placeholder = "empty",
  ...props
}: CustomImageProps) {
  return (
    <Image
      {...props}
      alt={alt}
      fill={fill}
      quality={quality}
      priority={priority}
      loading={priority ? undefined : loading}
      sizes={sizes}
      placeholder={placeholder}
      className={clsx(
        fill && "object-cover bg-placeholder",
        imageClassName,
        className,
      )}
    />
  );
}
