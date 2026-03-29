import clsx from "clsx";

type LabelProps = {
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
  error?: boolean;
  hasValue?: boolean;
};

const Label = ({ htmlFor, children, hasValue }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx("text-base leading-[1.3125rem] group-focus-within:text-black dark:group-focus-within:text-soft-white theme-transition-all w-fit", {
        "text-black dark:text-soft-white": hasValue,
        "text-dark-gray/80 dark:text-soft-gray": !hasValue,
      })}
    >
      {children}
    </label>
  );
};

export default Label;
