import {
  ActiveSection,
  setActiveSection as setActiveSectionAction,
} from "@/redux/active-section/activeSectionSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const useActiveSection = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.activeSection);

  const setActiveSection = (section: ActiveSection) => (
    dispatch(setActiveSectionAction(section))
  )

  return {
    setActiveSection,
    activeSection: state.activeSection
  };
};

export default useActiveSection;