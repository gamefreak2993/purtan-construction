"use client";

import { useTranslations } from "next-intl";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
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

  const handleValueChange = (value: string) => {
    onCategoryChange(value === "all" || value === "" ? null : value);
  };

  return (
    <ToggleGroup
      type="single"
      value={activeCategory ?? "all"}
      onValueChange={handleValueChange}
      variant="outline"
      className="flex-wrap"
    >
      <ToggleGroupItem value="all">
        {t("allCategories")}
      </ToggleGroupItem>
      {categories.map((cat) => {
        const title = locale === "ro" ? cat.title?.ro || cat.title?.en : cat.title?.en;
        return (
          <ToggleGroupItem key={cat._id} value={cat.slug?.current ?? ""}>
            {title}
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
}
