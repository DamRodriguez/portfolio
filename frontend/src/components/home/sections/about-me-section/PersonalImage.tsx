"use client";
import personalImage from "@/assets/images/damian.jpg";
import CustomImage from "@/components/image/CustomImage";
import FadeShadow from "@/components/other/FadeShadow";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type PersonalImageProps = {
  containerClassName?: string;
};

export default function PersonalImage({
  containerClassName,
}: PersonalImageProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={clsx(
        "relative overflow-hidden shadow-s1 dark:shadow-none rounded-full dark:rounded-none border border-soft-white/50 dark:border-none",
        containerClassName,
      )}
    >
      <CustomImage
        src={personalImage}
        priority={true}
        alt="Personal image"
        className="object-cover w-fit h-120 md:h-150 xl:h-full hover:scale-110 theme-transition-all"
      />
      {mounted && theme === "dark" && (
        <>
          <FadeShadow direction="left" sizeClasses="w-20 xl:w-30" />
          <FadeShadow direction="right" sizeClasses="w-20 xl:w-20" />
          <FadeShadow direction="bottom" sizeClasses="h-30 xl:h-60" />
          <FadeShadow direction="top" sizeClasses="h-25 xl:h-45" />
        </>
      )}
    </div>
  );
}
