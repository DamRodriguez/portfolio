type CardIconProps = {
  icon: React.ReactNode;
};

export default function CardIcon({ icon }: CardIconProps) {
  return (
    <div className="border border-black/15 dark:border-soft-gray/15 rounded-full p-[0.8rem] xl:p-[1rem] dark:shadow-s1 bg-white-bone dark:bg-strong-black [&_svg]:stroke-black dark:[&_svg]:stroke-soft-white [&_svg]:w-[1.2rem] [&_svg]:h-[1.2rem] xl:[&_svg]:w-[1.5rem] xl:[&_svg]:h-[1.5rem] ">
      {icon}
    </div>
  );
}
