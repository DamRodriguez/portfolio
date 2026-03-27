import MotionStagger from "@/components/motion/MotionStagger";
import { routeItems } from "@/constants/routeItems";
import { Link } from "@/i18n/navigation";
import useActiveSection from "@/redux/active-section/useActiveSection";
import clsx from "clsx";
import { useTranslations } from "next-intl";

const NavDesk = () => {
  const t = useTranslations("header.navItems");
  const { activeSection } = useActiveSection();

  return (
    <nav className="hidden xl:flex">
      <ul className="text-lg leading-[1.5rem]">
        <MotionStagger className="flex gap-[3rem]" direction="up" duration={0.3}>
          {routeItems.map((item, index) => {
            const isActive = activeSection === item.label;

            return (
              <li key={index} className={clsx("flex items-center justify-center flex-col group relative hover:text-strong-black transition-all duration-600", {
                "text-strong-black": isActive,
                "text-medium-gray": !isActive
              })}>
                <Link
                  href={item.href}
                  onClick={() => { }}
                  className="cursor-pointer py-[0.4rem] px-[0.8rem]"
                >
                  {t(item.label)}
                </Link>
                <div className={clsx("absolute -z-10 w-full h-full shadow-s2 bg-soft-white/95 transition-transform duration-600 scale-x-0 group-hover:scale-x-100 origin-center ease-in-out rotate-5", {
                  "scale-x-100": isActive,
                })}
                />
              </li>
            );
          })}
        </MotionStagger>
      </ul>
    </nav>
  );
};

export default NavDesk;

{/*
<span className={clsx("block top-[0.2rem] relative h-[0.05rem] bg-soft-gray w-full scale-x-0 origin-center transition-transform duration-600 group-hover:scale-x-100 ease-in-out rounded-full ", {
                  "scale-x-100": isActive,
                })} />  
*/}