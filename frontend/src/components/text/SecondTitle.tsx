import clsx from "clsx";

type SecondTitleProps = {
  text: string;
  className?: React.HTMLAttributes<HTMLElement>["className"];
};

export default function SecondTitle({ text, className }: SecondTitleProps) {
  return (
    <h2
      className={clsx(
        "text-black dark:text-soft-white text-4xl xl:text-5xl font-fira-code text-nowrap",
        className,
      )}
    >
      {text}
    </h2>
  );
}
