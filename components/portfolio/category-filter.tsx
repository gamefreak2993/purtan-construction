"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { CATEGORIES_QUERY_RESULT } from "@/sanity.types";

interface CategoryFilterProps {
  categories: CATEGORIES_QUERY_RESULT;
  activeCategory: string | null;
  onCategoryChange: (slug: string | null) => void;
  locale: string;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
  locale,
}: CategoryFilterProps) {
  const t = useTranslations("common");

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onCategoryChange(null)}
        className={cn(
          "border-2 px-4 py-2 text-xs font-bold tracking-widest uppercase transition-all",
          activeCategory === null
            ? "border-foreground bg-foreground text-background"
            : "border-foreground/20 hover:border-foreground/40",
        )}
      >
        {t("allCategories")}
      </button>
      {categories.map((cat) => {
        const title = locale === "ro" ? cat.title?.ro || cat.title?.en : cat.title?.en;
        return (
          <button
            key={cat._id}
            onClick={() => onCategoryChange(cat.slug?.current ?? null)}
            className={cn(
              "border-2 px-4 py-2 text-xs font-bold tracking-widest uppercase transition-all",
              activeCategory === cat.slug?.current
                ? "border-foreground bg-foreground text-background"
                : "border-foreground/20 hover:border-foreground/40",
            )}
          >
            {title}
          </button>
        );
      })}
    </div>
  );
}
