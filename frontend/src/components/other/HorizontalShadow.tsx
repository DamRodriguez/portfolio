type HorizontalShadowProps = {
  color?: string;
  width?: string;
};

export default function HorizontalShadow({
  color,
  width,
}: HorizontalShadowProps) {
  const baseClasses =
    "absolute z-15 inset-y-0 w-20 xl:w-30 2xl:w-50 pointer-events-none";

  const defaultBgClasses =
    "bg-gradient-to-r from-white-bone via-white-bone/70 dark:from-black dark:via-black/70 to-transparent";

  const dynamicStyle = color
    ? {
        background: `linear-gradient(to right, ${color}, color-mix(in srgb, ${color} 70%, transparent), transparent)`,
      }
    : {};

  const combinedStyle = {
    ...dynamicStyle,
    ...(width ? { width } : {}),
  };

  return (
    <>
      <div
        className={`${baseClasses} ${!color ? defaultBgClasses : ""} -left-[2px]`}
        style={combinedStyle}
      />
      <div
        className={`${baseClasses} ${!color ? defaultBgClasses : ""} -right-[2px] scale-x-[-1]`}
        style={combinedStyle}
      />
    </>
  );
}
