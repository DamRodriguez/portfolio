"use client";
import MotionStagger from "@/components/motion/MotionStagger";
import Button from "@/components/ui/buttons/Button";
import { AllProjectFilters } from "@/hooks/useFilteredProjects";
import { useTranslations } from "next-intl";

interface FilterButtonsProps {
  activeFilter: AllProjectFilters;
  onFilterChange: (filter: AllProjectFilters) => void;
}

const FilterButtons = ({
  activeFilter,
  onFilterChange,
}: FilterButtonsProps) => {
  const t = useTranslations("projectsSection");

  const filters = [
    { id: "all", label: t("filter.all") },
    {
      id: "ecommerce",
      label: t("categories.ecommerce"),
    },
    {
      id: "webPlatform",
      label: t("categories.webPlatform"),
    },
    {
      id: "mobileApp",
      label: t("categories.mobileApp"),
    },
  ];

  const handleFilterChange = (filter: AllProjectFilters) => {
    onFilterChange(filter);
  };

  return (
    <MotionStagger
      direction="down"
      order={0.5}
      className="flex flex-wrap justify-center gap-[1rem]"
    >
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? "secondary" : "primary"}
          onClick={() => handleFilterChange(filter.id as AllProjectFilters)}
        >
          {filter.label}
        </Button>
      ))}
    </MotionStagger>
  );
};

export default FilterButtons;
