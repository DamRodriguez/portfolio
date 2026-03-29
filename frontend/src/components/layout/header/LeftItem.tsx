import MotionFade from "@/components/motion/MotionFade";
import { routes } from "@/constants/routes";
import { Link } from "@/i18n/navigation";

type LeftItemProps = {
  onClick: () => void;
}

const LeftItem = (props: LeftItemProps) => {
  return (
    <MotionFade>
      <Link
        href={routes.home}
        onClick={props.onClick}
        className="text-black dark:text-soft-white text-xs xl:text-xl font-fira-code flex items-center gap-[0.2rem] xl:gap-[0.5rem] font-light group theme-transition-all"
      >
        <div className="text-3xl xl:text-6xl text-dark-gray group-hover:text-strong-black dark:text-soft-gray dark:group-hover:text-soft-white theme-transition-all">
          &lt;
        </div>
        <div>
          <p className="group-hover:font-medium theme-transition-all">
            Damián
          </p>
          <p className="group-hover:font-medium theme-transition-all">
            Rodríguez
          </p>
        </div>
        <div className="text-3xl xl:text-6xl flex text-dark-gray group-hover:text-strong-black dark:text-soft-gray dark:group-hover:text-soft-white theme-transition-all">
          <span className="group-hover:rotate-10 theme-transition-all">
            /
          </span>
          &gt;
        </div>
      </Link>
    </MotionFade>
  );
};

export default LeftItem;