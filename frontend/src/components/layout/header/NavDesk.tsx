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
              <li key={index} className={clsx("flex flex-col group relative hover:text-soft-white transition-all duration-600", {
                "text-soft-white": isActive,
                "text-medium-gray": !isActive
              })}>
                <Link
                  href={item.href}
                  onClick={() => { }}
                  className="cursor-pointer"
                >
                  {t(item.label)}
                </Link>
                <span className={clsx("block top-[0.2rem] relative h-[0.05rem] bg-soft-gray w-full scale-x-0 origin-center transition-transform duration-600 group-hover:scale-x-100 ease-in-out rounded-full ", {
                  "scale-x-100": isActive,
                })}></span>
              </li>
            );
          })}
        </MotionStagger>
      </ul>
    </nav>
  );
};

export default NavDesk;