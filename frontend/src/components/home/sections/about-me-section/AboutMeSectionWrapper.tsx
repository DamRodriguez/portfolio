import ViewportActiveSection from "@/components/gsap/in-view/ViewportActiveSection";
import { routes } from "@/constants/routes";
import { removeHash } from "@/utils/removeHash";

type AboutMeSectionWrapperProps = {
  children: React.ReactNode;
};

export default function AboutMeSectionWrapper({
  children,
}: AboutMeSectionWrapperProps) {
  return (
    <div
      id={removeHash(routes.aboutMe)}
      className="anchor-offset overflow-hidden"
    >
      <div className="pin-projects relative z-0 pb-[5rem] xl:pb-[7rem]">
        <ViewportActiveSection section="aboutme">
          <div className="pin-aboutme-content">{children}</div>
        </ViewportActiveSection>
      </div>
    </div>
  );
}
