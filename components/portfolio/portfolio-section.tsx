"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CategoryFilter } from "./category-filter";
import { ProjectGrid } from "./project-grid";
import type { PROJECTS_QUERY_RESULT, CATEGORIES_QUERY_RESULT } from "@/sanity.types";

interface PortfolioSectionProps {
  projects: PROJECTS_QUERY_RESULT;
  categories: CATEGORIES_QUERY_RESULT;
  locale: string;
}

export function PortfolioSection({ projects, categories, locale }: PortfolioSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const t = useTranslations("common");

  const filteredProjects = activeCategory
    ? projects.filter((p) => p.category?.slug?.current === activeCategory)
    : projects;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-3xl font-bold tracking-tight">{t("projects")}</h2>
        {categories.length > 0 && (
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            locale={locale}
          />
        )}
      </div>
      <ProjectGrid projects={filteredProjects} locale={locale} />
    </section>
  );
}
