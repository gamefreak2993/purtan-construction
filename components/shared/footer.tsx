import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-foreground bg-foreground text-background border-t-4">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center bg-amber-500 text-sm font-black text-white">
              P
            </div>
            <span className="text-lg font-black tracking-wider uppercase">Purtan Construction</span>
          </div>
          <div className="text-background/60 text-center text-sm md:text-right">
            <p>{t("builtBy")}</p>
            <p>
              © {year} — {t("rights")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
