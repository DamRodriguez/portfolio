import clsx from 'clsx';

export type TechnologyItemData = {
  title: string;
  items: string;
}

type TechnologyItemAnimation = "left" | "right";

type TechnologyItemProps = {
  data: TechnologyItemData;
  className?: string;
  animation?: TechnologyItemAnimation;
};

const TechnologyItem = (props: TechnologyItemProps) => {
  const data = props.data;

  return (
    <div
      className={clsx("group gap-[1rem] xl:gap-[1.5rem] flex flex-col border border-soft-gray/60 rounded-[2.5rem] xl:rounded-[3rem] p-[1.5rem] xl:p-[2rem] overflow-hidden relative bg-strong-black/40 shadow-s3 z-1", props.className)}
    >
      <p className="text-xl xl:text-2xl font-medium text-soft-white/80 group-hover:text-black transition-all duration-400 ease-in-out">
        {data.title}
      </p>
      <span className="font-fira-code text-sm xl:text-base text-soft-gray group-hover:text-black transition-all duration-400 ease-in-out">
        {data.items.split(", ").join(" / ")}
      </span>

      <div className={clsx("absolute scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out top-0 left-0 w-full h-full bg-soft-white -z-1", {
        "origin-left": props.animation === "left",
        "origin-right": props.animation === "right"
      })} />
    </div>
  );
};

export default TechnologyItem;