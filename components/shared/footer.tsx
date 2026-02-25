import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer>
      <Separator />
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold">
              P
            </div>
            <span className="text-lg font-semibold">Purtan Construction</span>
          </div>
          <div className="text-muted-foreground text-center text-sm md:text-right">
            <p>{t("builtBy")}</p>
            <p>
              &copy; {year} &mdash; {t("rights")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
