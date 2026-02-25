import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-4 border-foreground bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center bg-amber-500 text-white font-black text-sm">
              P
            </div>
            <span className="text-lg font-black uppercase tracking-wider">
              Purtan Construction
            </span>
          </div>
          <div className="text-sm text-background/60 text-center md:text-right">
            <p>{t("builtBy")}</p>
            <p>© {year} — {t("rights")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
