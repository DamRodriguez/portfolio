import personalImage from "@/assets/images/damian.png";
import CustomImage from "@/components/image/CustomImage";
import clsx from "clsx";

type PersonalImageProps = {
  containerClassName?: string;
};

export default function PersonalImage({
  containerClassName,
}: PersonalImageProps) {
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
    </div>
  );
}
