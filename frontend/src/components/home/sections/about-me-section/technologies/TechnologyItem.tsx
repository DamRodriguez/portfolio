import clsx from "clsx";

export type TechnologyItemData = {
  title: string;
  items: string;
};

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
      className={clsx(
        "group gap-[1rem] xl:gap-[1.5rem] flex flex-col border border-black/10 dark:border-soft-gray/60 rounded-[2.5rem] xl:rounded-[3rem] p-[1.5rem] xl:p-[2rem] overflow-hidden relative bg-soft-white/80 dark:bg-strong-black/80 shadow-s2 dark:shadow-none z-1 text-dark-gray dark:text-soft-gray hover:text-soft-white dark:hover:text-black theme-transition-all",
        props.className,
      )}
    >
      <p className="text-xl xl:text-2xl font-medium theme-transition">
        {data.title}
      </p>
      <span className="font-fira-code text-sm xl:text-base theme-transition">
        {data.items.split(", ").join(" / ")}
      </span>

      <div
        className={clsx(
          "absolute scale-x-0 group-hover:scale-x-100 theme-transition-all top-0 left-0 w-full h-full bg-black dark:bg-soft-white -z-1",
          {
            "origin-left": props.animation === "left",
            "origin-right": props.animation === "right",
          },
        )}
      />
    </div>
  );
};

export default TechnologyItem;
