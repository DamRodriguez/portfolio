import clsx from "clsx";
import Image, { StaticImageData } from "next/image";

type ProjectImageProps = {
  src: StaticImageData;
  alt: string;
  className?: string
}

const ProjectImage = (props: ProjectImageProps) => {
  return (
    <div className={clsx("overflow-hidden rounded-3xl shadow-s6 border border-soft-gray/10", props.className)}>
      <Image
        src={props.src}
        alt={props.alt}
        className={clsx("object-cover object-top h-full w-full hover:scale-110 transition-all duration-400 ease-in-out")}
      />
    </div>
  );
};

export default ProjectImage;