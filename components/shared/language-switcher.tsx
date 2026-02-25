"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (value: string) => {
    if (value) {
      router.replace(pathname, { locale: value as "en" | "ro" });
    }
  };

  return (
    <ToggleGroup
      type="single"
      value={locale}
      onValueChange={switchLocale}
      size="sm"
    >
      <ToggleGroupItem value="en" aria-label="English">
        EN
      </ToggleGroupItem>
      <ToggleGroupItem value="ro" aria-label="Romanian">
        RO
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
