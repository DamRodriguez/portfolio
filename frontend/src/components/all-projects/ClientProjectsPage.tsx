"use client";
import AllProjectsGrid from "@/components/all-projects/AllProjectsGrid";
import FilterButtons from "@/components/all-projects/FilterButtons";
import Main from "@/components/layout/Main";
import SpaceX from "@/components/layout/SpaceX";
import { AllProjectFilters } from "@/hooks/filter/useFilteredProjects";
import { useState } from "react";

export default function ClientProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<AllProjectFilters>("all");

  return (
    <Main className="pb-[5rem] xl:pb-[8rem] pt-[calc(var(--height-header-mobile)+1.5rem)] xl:pt-[calc(var(--height-header-desktop)+3rem)]">
      <SpaceX className="space-y-[2.5rem] xl:space-y-[4rem]">
        <FilterButtons
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <AllProjectsGrid activeFilter={activeFilter} />
      </SpaceX>
    </Main>
  );
}
