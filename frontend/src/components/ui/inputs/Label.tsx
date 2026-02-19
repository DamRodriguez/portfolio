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
      className={clsx("text-base leading-[1.3125rem] group-focus-within:text-soft-white transition-all w-fit", {
        "text-soft-white": hasValue,
        "text-soft-gray": !hasValue,
      })}
    >
      {children}
    </label>
  );
};

export default Label;
