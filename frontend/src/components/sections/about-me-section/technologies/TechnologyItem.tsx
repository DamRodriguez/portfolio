import clsx from 'clsx';

export type TechnologyItemData = {
  title: string;
  items: string;
}

type TechnologyItemProps = {
  data: TechnologyItemData;
  className?: string;
};

const TechnologyItem = (props: TechnologyItemProps) => {
  const data = props.data;

  return (
    <div
      className={clsx("text-soft-gray gap-[1rem] xl:gap-[1.5rem] flex flex-col border border-soft-gray/60 rounded-[2.5rem] xl:rounded-[3rem] p-[1.5rem] xl:p-[2rem] hover:bg-soft-white hover:text-black transition-all duration-400 ease-in-out", props.className)}
    >
      <p className="text-xl xl:text-2xl font-medium">
        {data.title}
      </p>
      <span className="font-fira-code text-sm xl:text-base">
        {data.items.split(", ").join(" / ")}
      </span>
    </div>
  );
};

export default TechnologyItem;