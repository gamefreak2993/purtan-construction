"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/" as const, label: t("home") },
    { href: "/contact" as const, label: t("contact") },
  ];

  return (
    <header className="border-foreground bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 border-b-4 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center bg-amber-500 text-lg font-black text-white">
            P
          </div>
          <span className="hidden text-xl font-black tracking-wider uppercase sm:block">
            Purtan
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-bold tracking-widest uppercase transition-colors hover:text-amber-600",
                pathname === link.href ? "text-amber-600" : "text-muted-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
        </nav>

        {/* Mobile toggle */}
        <button
          className="p-2 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-foreground/10 bg-background flex flex-col gap-4 border-t-2 px-6 py-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "py-2 text-sm font-bold tracking-widest uppercase",
                pathname === link.href ? "text-amber-600" : "text-muted-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
        </nav>
      )}
    </header>
  );
}
