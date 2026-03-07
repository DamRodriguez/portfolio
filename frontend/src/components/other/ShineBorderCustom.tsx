import clsx from "clsx";
import { ShineBorder } from "../magic-ui/shine-border";

type ShineBorderCustomProps = {
  isVisible: boolean;
}

const ShineBorderCustom = (props: ShineBorderCustomProps) => {
  if (!props.isVisible) return null;
  return (
    <ShineBorder className={clsx("", {
      "border border-soft-gray/15": props.isVisible,
    })} />
  );
};

export default ShineBorderCustom;