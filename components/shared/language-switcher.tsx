"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: "en" | "ro") => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center border-2 border-foreground/20 text-sm font-bold">
      <button
        onClick={() => switchLocale("en")}
        className={cn(
          "px-3 py-1.5 uppercase tracking-wider transition-colors",
          locale === "en"
            ? "bg-foreground text-background"
            : "hover:bg-foreground/10"
        )}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale("ro")}
        className={cn(
          "px-3 py-1.5 uppercase tracking-wider transition-colors",
          locale === "ro"
            ? "bg-foreground text-background"
            : "hover:bg-foreground/10"
        )}
      >
        RO
      </button>
    </div>
  );
}
