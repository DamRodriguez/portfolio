import React, { ReactNode } from "react";

interface ReflectedTitleProps {
  text: string;
  textClassName: string;
  as?: React.ElementType;
  renderMain?: (children: ReactNode) => ReactNode;
  renderReflection?: (children: ReactNode) => ReactNode;
}

export const ReflectedTitle: React.FC<ReflectedTitleProps> = ({
  text,
  textClassName,
  as: Component = "h1",
  renderMain = (children) => <>{children}</>,
  renderReflection = (children) => <>{children}</>,
}) => {
  const MainContent = (
    <Component className={`relative z-20 ${textClassName}`}>{text}</Component>
  );

  const ReflectionContent = (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 top-full mt-[0.7em] opacity-25 dark:opacity-20 scale-y-[-1] origin-top blur-[0.2rem] select-none ${textClassName}`}
      style={{
        WebkitMaskImage:
          "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)",
        maskImage:
          "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)",
      }}
    >
      {text}
    </span>
  );

  return (
    <div className="relative">
      {renderMain(MainContent)}
      {renderReflection(ReflectionContent)}
    </div>
  );
};
