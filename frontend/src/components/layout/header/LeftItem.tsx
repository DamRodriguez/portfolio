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
        className="text-soft-white text-xs xl:text-xl font-fira-code flex items-center gap-[0.2rem] xl:gap-[0.5rem] font-light group"
      >
        <div className="text-3xl xl:text-6xl text-soft-gray group-hover:text-soft-white transition-all duration-400">
          &lt;
        </div>
        <div>
          <p>
            Damián
          </p>
          <p>
            Rodríguez
          </p>
        </div>
        <div className="text-3xl xl:text-6xl flex text-soft-gray group-hover:text-soft-white transition-all duration-400">
          <span className="group-hover:rotate-10 transition-all duration-400">
            /
          </span>
          &gt;
        </div>
      </Link>
    </MotionFade>
  );
};

export default LeftItem;