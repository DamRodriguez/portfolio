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
            const isOdd = index % 2 !== 0;

            return (
              <li key={index} className={clsx("flex items-center justify-center flex-col group relative hover:text-black transition-all duration-600", {
                "text-black": isActive,
                "text-medium-gray": !isActive
              })}>
                <Link
                  href={item.href}
                  onClick={() => { }}
                  className="cursor-pointer p-[0.5rem]"
                >
                  {t(item.label)}
                </Link>
                <div className={clsx("absolute -z-10 w-full h-full shadow-s1 bg-soft-white/90 transition-transform duration-600 scale-x-0 group-hover:scale-x-100 origin-center ease-in-out", {
                  "scale-x-100": isActive,
                  "rotate-5": !isOdd,
                  "-rotate-5": isOdd
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