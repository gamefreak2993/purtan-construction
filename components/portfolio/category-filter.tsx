"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: Array<{
    _id: string;
    title: { en: string; ro: string };
    slug: { current: string };
  }>;
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
          "px-4 py-2 text-xs font-bold uppercase tracking-widest border-2 transition-all",
          activeCategory === null
            ? "border-foreground bg-foreground text-background"
            : "border-foreground/20 hover:border-foreground/40"
        )}
      >
        {t("allCategories")}
      </button>
      {categories.map((cat) => {
        const title = locale === "ro" ? (cat.title.ro || cat.title.en) : cat.title.en;
        return (
          <button
            key={cat._id}
            onClick={() => onCategoryChange(cat.slug.current)}
            className={cn(
              "px-4 py-2 text-xs font-bold uppercase tracking-widest border-2 transition-all",
              activeCategory === cat.slug.current
                ? "border-foreground bg-foreground text-background"
                : "border-foreground/20 hover:border-foreground/40"
            )}
          >
            {title}
          </button>
        );
      })}
    </div>
  );
}
