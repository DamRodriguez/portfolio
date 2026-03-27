import clsx from "clsx";

type CircleProps = {
  className?: string;
}

const Circle = (props: CircleProps) => {
  return (
    <div className={clsx("fixed aspect-square rounded-full shadow-s1 bg-soft-white/0.5 -z-50 pointer-events-none", props.className)} />
  );
};

export default Circle;