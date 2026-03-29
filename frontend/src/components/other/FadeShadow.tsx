import clsx from "clsx";

type FadeShadowProps = {
  direction: "top" | "bottom" | "left" | "right";
  sizeClasses: string;
}

const FadeShadow = ({ direction, sizeClasses }: FadeShadowProps) => {
  const directionMap = {
    top: {
      container: "absolute inset-x-0 top-0",
      gradient: "bg-gradient-to-b",
    },
    bottom: {
      container: "absolute inset-x-0 bottom-0",
      gradient: "bg-gradient-to-t",
    },
    left: {
      container: "absolute inset-y-0 left-0",
      gradient: "bg-gradient-to-r",
    },
    right: {
      container: "absolute inset-y-0 right-0",
      gradient: "bg-gradient-to-l",
    },
  };

  const { container, gradient } = directionMap[direction];

  return (
    <div className={clsx(container, sizeClasses, "pointer-events-none")}>
      <div
        className={clsx(
          "absolute inset-0",
          gradient,
          "from-black to-transparent"
        )}
      />
    </div>
  );
};

export default FadeShadow;