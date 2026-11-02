"use client";
import personalImage from "@/assets/images/damian.png";
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
        "relative overflow-hidden bg-black shadow-s4 dark:shadow-none rounded-full",
        containerClassName,
      )}
    >
      <CustomImage
        src={personalImage}
        priority={true}
        alt="Personal image"
        className="object-cover w-fit h-120 md:h-150 xl:h-170 pl-[20%] "
      />
      {mounted && (
        <>
          <FadeShadow direction="left" sizeClasses="w-20" />
          <FadeShadow direction="right" sizeClasses="w-20" />
          <FadeShadow direction="bottom" sizeClasses="h-20" />
          <FadeShadow direction="top" sizeClasses="h-20" />
        </>
      )}
    </div>
  );
}
