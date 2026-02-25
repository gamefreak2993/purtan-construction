"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CategoryFilter } from "./category-filter";
import { ProjectGrid } from "./project-grid";

interface PortfolioSectionProps {
  projects: Array<{
    _id: string;
    slug: { current: string };
    title: { en: string; ro: string };
    coverImage: any;
    category?: { title: { en: string; ro: string }; slug: { current: string } };
    location?: string;
    featured?: boolean;
  }>;
  categories: Array<{
    _id: string;
    title: { en: string; ro: string };
    slug: { current: string };
  }>;
  locale: string;
}

export function PortfolioSection({
  projects,
  categories,
  locale,
}: PortfolioSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const t = useTranslations("common");

  const filteredProjects = activeCategory
    ? projects.filter((p) => p.category?.slug?.current === activeCategory)
    : projects;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <h2 className="text-3xl font-black uppercase tracking-wide">
          {t("projects")}
        </h2>
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
