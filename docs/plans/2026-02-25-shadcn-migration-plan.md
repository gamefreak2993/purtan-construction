# shadcn/ui Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace all custom HTML elements with shadcn/ui primitives, adopting shadcn defaults (new-york style).

**Architecture:** Component-by-component swap starting with the install phase, then shared components (Header, Footer, LanguageSwitcher), contact section, portfolio section, and finally page-level inline elements. Each task maps to a Linear sub-issue under DEV-16.

**Tech Stack:** Next.js 16, React 19, shadcn/ui (new-york), Tailwind CSS v4, Radix UI, Lucide React, next-intl, Sanity CMS

---

### Task 1: Install all shadcn/ui components (DEV-17)

**Files:**
- Create: `components/ui/button.tsx`, `components/ui/input.tsx`, `components/ui/textarea.tsx`, `components/ui/label.tsx`, `components/ui/card.tsx`, `components/ui/badge.tsx`, `components/ui/sheet.tsx`, `components/ui/dialog.tsx`, `components/ui/separator.tsx`, `components/ui/alert.tsx`, `components/ui/toggle-group.tsx`, `components/ui/aspect-ratio.tsx`

**Step 1: Install all 12 components in one batch**

Run:
```bash
npx shadcn@latest add button input textarea label card badge sheet dialog separator alert toggle-group aspect-ratio
```

Expected: 12 files created in `components/ui/`, dependencies updated in `package.json`

**Step 2: Verify the install**

Run:
```bash
ls components/ui/
```

Expected: 12 `.tsx` files listed

**Step 3: Verify the dev server starts**

Run:
```bash
npx next build 2>&1 | head -20
```

Expected: Build succeeds (or at least no import errors from `components/ui/`)

**Step 4: Commit**

```bash
git add components/ui/ package.json package-lock.json
git commit -m "feat: install 12 shadcn/ui components (DEV-17)"
```

---

### Task 2: Refactor Header — Sheet + Button (DEV-18)

**Files:**
- Modify: `components/shared/header.tsx`

**Step 1: Rewrite header.tsx**

Replace the entire file with:

```tsx
"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

export function Header() {
  const t = useTranslations("common");
  const pathname = usePathname();

  const links = [
    { href: "/" as const, label: t("home") },
    { href: "/contact" as const, label: t("contact") },
  ];

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground flex h-9 w-9 items-center justify-center rounded-md text-lg font-bold">
            P
          </div>
          <span className="hidden text-lg font-semibold sm:block">
            Purtan
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
        </nav>

        {/* Mobile nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <nav className="flex flex-col gap-4 pt-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <LanguageSwitcher />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
```

Key changes:
- `mobileOpen` useState removed — Sheet manages its own open/close state
- Custom hamburger button replaced with `Button variant="ghost" size="icon"`
- Custom mobile nav div replaced with `SheetContent side="right"`
- Bold 4px border replaced with shadcn default `border-b`
- Uppercase tracking-widest replaced with shadcn default `font-medium`
- amber-600 highlights replaced with `text-primary`

**Step 2: Verify dev server**

Run:
```bash
npx next build 2>&1 | tail -5
```

Expected: Build succeeds

**Step 3: Commit**

```bash
git add components/shared/header.tsx
git commit -m "refactor: Header to use shadcn Sheet + Button (DEV-18)"
```

---

### Task 3: Refactor LanguageSwitcher — ToggleGroup (DEV-19)

**Files:**
- Modify: `components/shared/language-switcher.tsx`

**Step 1: Rewrite language-switcher.tsx**

Replace the entire file with:

```tsx
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
```

Key changes:
- Custom dual-button with manual active styling replaced with `ToggleGroup type="single"`
- Active state handled automatically by Radix via `value`/`onValueChange`
- Guard against empty string (Radix sends "" when deselecting) to prevent losing locale

**Step 2: Verify dev server**

Run:
```bash
npx next build 2>&1 | tail -5
```

Expected: Build succeeds

**Step 3: Commit**

```bash
git add components/shared/language-switcher.tsx
git commit -m "refactor: LanguageSwitcher to use shadcn ToggleGroup (DEV-19)"
```

---

### Task 4: Refactor Footer — Separator (DEV-20)

**Files:**
- Modify: `components/shared/footer.tsx`

**Step 1: Rewrite footer.tsx**

Replace the entire file with:

```tsx
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
```

Key changes:
- `bg-foreground text-background border-t-4` replaced with standard `<Separator />` and default text colors
- amber-500 logo block uses `bg-primary text-primary-foreground` with `rounded-md`
- Uppercase tracking-wider replaced with `font-semibold`

**Step 2: Verify dev server**

Run:
```bash
npx next build 2>&1 | tail -5
```

Expected: Build succeeds

**Step 3: Commit**

```bash
git add components/shared/footer.tsx
git commit -m "refactor: Footer to use shadcn Separator (DEV-20)"
```

---

### Task 5: Refactor ContactForm — Input, Textarea, Label, Button, Alert (DEV-21)

**Files:**
- Modify: `components/contact/contact-form.tsx`

**Step 1: Rewrite contact-form.tsx**

Replace the entire file with:

```tsx
"use client";

import { useActionState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { sendContactEmail, type ContactFormState } from "@/app/actions/send-contact-email";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const initialState: ContactFormState = { success: false };

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [state, formAction, isPending] = useActionState(sendContactEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <div>
      {state.success && (
        <Alert className="mb-6">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>{t("success")}</AlertDescription>
        </Alert>
      )}

      {state.error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      <form ref={formRef} action={formAction} className="space-y-6">
        <div className="grid gap-2">
          <Label htmlFor="name">{t("name")} *</Label>
          <Input
            type="text"
            id="name"
            name="name"
            required
            placeholder={t("name")}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">{t("email")} *</Label>
          <Input
            type="email"
            id="email"
            name="email"
            required
            placeholder={t("email")}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phone">{t("phone")}</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            placeholder={t("phone")}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="message">{t("message")} *</Label>
          <Textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder={t("message")}
          />
        </div>

        <Button type="submit" disabled={isPending}>
          <Send className="h-4 w-4" />
          {isPending ? t("sending") : t("submit")}
        </Button>
      </form>
    </div>
  );
}
```

Key changes:
- Custom `<input>` with manual border/focus classes replaced with `<Input>`
- Custom `<textarea>` replaced with `<Textarea>`
- Custom `<label>` replaced with `<Label>`
- Custom `<button>` replaced with `<Button>` (default variant)
- Custom green/red alert divs replaced with `<Alert>` and `<Alert variant="destructive">`
- `cn()` calls removed — shadcn components handle their own styling

**Step 2: Verify dev server**

Run:
```bash
npx next build 2>&1 | tail -5
```

Expected: Build succeeds

**Step 3: Commit**

```bash
git add components/contact/contact-form.tsx
git commit -m "refactor: ContactForm to use shadcn Input/Textarea/Label/Button/Alert (DEV-21)"
```

---

### Task 6: Refactor ContactInfo — Card + Button (DEV-22)

**Files:**
- Modify: `components/contact/contact-info.tsx`

**Step 1: Rewrite contact-info.tsx**

Replace the entire file with:

```tsx
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import type { SITE_SETTINGS_QUERY_RESULT } from "@/sanity.types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ContactInfoProps {
  settings: SITE_SETTINGS_QUERY_RESULT;
  locale: string;
}

const socialIcons: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
};

export function ContactInfo({ settings, locale }: ContactInfoProps) {
  if (!settings) return null;

  const address = settings.address
    ? locale === "ro"
      ? settings.address.ro || settings.address.en
      : settings.address.en
    : null;

  return (
    <div className="space-y-6">
      {settings.phone && (
        <Card>
          <CardContent className="flex items-start gap-4">
            <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-md">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="text-muted-foreground mb-1 text-sm font-medium">
                Phone
              </p>
              <a
                href={`tel:${settings.phone}`}
                className="font-medium transition-colors hover:text-primary"
              >
                {settings.phone}
              </a>
            </div>
          </CardContent>
        </Card>
      )}

      {settings.email && (
        <Card>
          <CardContent className="flex items-start gap-4">
            <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-md">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-muted-foreground mb-1 text-sm font-medium">
                Email
              </p>
              <a
                href={`mailto:${settings.email}`}
                className="font-medium transition-colors hover:text-primary"
              >
                {settings.email}
              </a>
            </div>
          </CardContent>
        </Card>
      )}

      {address && (
        <Card>
          <CardContent className="flex items-start gap-4">
            <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-md">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-muted-foreground mb-1 text-sm font-medium">
                Address
              </p>
              <p className="font-medium">{address}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {settings.socialLinks && settings.socialLinks.length > 0 && (
        <div>
          <Separator className="mb-4" />
          <p className="text-muted-foreground mb-4 text-sm font-medium">
            Follow Us
          </p>
          <div className="flex flex-wrap gap-3">
            {settings.socialLinks
              .filter((link) => link.url && link.platform)
              .map((link, i) => (
                <Button key={i} variant="outline" size="sm" asChild>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {socialIcons[link.platform!] || link.platform}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

Key changes:
- Each contact item wrapped in `<Card>` + `<CardContent>`
- Custom icon boxes use `bg-muted rounded-md` instead of manual border
- Social links use `<Button variant="outline" size="sm" asChild>` wrapping `<a>`
- Custom border-t-2 divider replaced with `<Separator>`
- Uppercase bold labels replaced with `text-sm font-medium`

**Step 2: Verify dev server**

Run:
```bash
npx next build 2>&1 | tail -5
```

Expected: Build succeeds

**Step 3: Commit**

```bash
git add components/contact/contact-info.tsx
git commit -m "refactor: ContactInfo to use shadcn Card + Button (DEV-22)"
```

---

### Task 7: Refactor HeroSection — Badge + Separator (DEV-23)

**Files:**
- Modify: `components/portfolio/hero-section.tsx`

**Step 1: Rewrite hero-section.tsx**

Replace the entire file with:

```tsx
import { useTranslations } from "next-intl";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { PROJECTS_QUERY_RESULT } from "@/sanity.types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface HeroProps {
  project?: PROJECTS_QUERY_RESULT[number];
  locale: string;
}

export function HeroSection({ project, locale }: HeroProps) {
  const t = useTranslations("hero");

  if (!project) {
    return (
      <section className="bg-muted relative flex min-h-[70vh] items-center justify-center px-6">
        <div className="relative z-10 max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            {t("title")}
          </h1>
          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg sm:text-xl">
            {t("subtitle")}
          </p>
          <Separator className="mx-auto mt-8 w-24" />
        </div>
      </section>
    );
  }

  const title = locale === "ro" ? project.title?.ro || project.title?.en : project.title?.en;
  const imageUrl = project.coverImage
    ? urlFor(project.coverImage).width(1920).height(1080).url()
    : null;

  return (
    <section className="relative min-h-[70vh] overflow-hidden">
      {imageUrl && (
        <Image src={imageUrl} alt={title || ""} fill priority className="object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="relative z-10 flex min-h-[70vh] items-end px-6 pb-16">
        <div className="mx-auto w-full max-w-7xl">
          <Badge className="mb-4">Featured</Badge>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {project.location && (
            <p className="mt-3 text-lg text-white/60">{project.location}</p>
          )}
        </div>
      </div>
    </section>
  );
}
```

Key changes:
- Custom amber "Featured" inline-block replaced with `<Badge>`
- Custom `h-1 w-24 bg-amber-500` accent line replaced with `<Separator>`
- Fallback uses `bg-muted` instead of `bg-foreground text-background`
- `font-black uppercase` replaced with `font-bold tracking-tight`

**Step 2: Verify dev server**

Run:
```bash
npx next build 2>&1 | tail -5
```

Expected: Build succeeds

**Step 3: Commit**

```bash
git add components/portfolio/hero-section.tsx
git commit -m "refactor: HeroSection to use shadcn Badge + Separator (DEV-23)"
```

---

### Task 8: Refactor CategoryFilter — ToggleGroup (DEV-24)

**Files:**
- Modify: `components/portfolio/category-filter.tsx`

**Step 1: Rewrite category-filter.tsx**

Replace the entire file with:

```tsx
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
```

Key changes:
- Custom button list with manual active/inactive classes replaced with `<ToggleGroup type="single" variant="outline">`
- "All" uses special value `"all"` mapped to `null` in the handler
- Active state handled automatically by Radix

**Step 2: Verify dev server**

Run:
```bash
npx next build 2>&1 | tail -5
```

Expected: Build succeeds

**Step 3: Commit**

```bash
git add components/portfolio/category-filter.tsx
git commit -m "refactor: CategoryFilter to use shadcn ToggleGroup (DEV-24)"
```

---

### Task 9: Refactor ProjectCard — Card + Badge (DEV-25)

**Files:**
- Modify: `components/portfolio/project-card.tsx`

**Step 1: Rewrite project-card.tsx**

Replace the entire file with:

```tsx
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { urlFor } from "@/sanity/lib/image";
import type { PROJECTS_QUERY_RESULT } from "@/sanity.types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  project: PROJECTS_QUERY_RESULT[number];
  locale: string;
}

export function ProjectCard({ project, locale }: ProjectCardProps) {
  const title = locale === "ro" ? project.title?.ro || project.title?.en : project.title?.en;
  const categoryTitle = project.category
    ? locale === "ro"
      ? project.category.title?.ro || project.category.title?.en
      : project.category.title?.en
    : null;

  const imageUrl = project.coverImage
    ? urlFor(project.coverImage).width(800).height(600).url()
    : null;

  return (
    <Link href={`/projects/${project.slug?.current}`} className="group block">
      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        <div className="bg-muted relative aspect-[4/3] overflow-hidden">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={title || "Project"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
        <CardContent>
          {categoryTitle && (
            <Badge variant="secondary" className="mb-2">
              {categoryTitle}
            </Badge>
          )}
          <h3 className="text-lg font-semibold leading-tight">{title}</h3>
          {project.location && (
            <p className="text-muted-foreground mt-1 text-sm">{project.location}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
```

Key changes:
- Custom border/hover-shadow link wrapper replaced with `<Card>` + `hover:shadow-lg`
- Category text span replaced with `<Badge variant="secondary">`
- `font-black tracking-wide uppercase` replaced with `font-semibold`
- Custom `shadow-[8px_8px_0_0_...]` replaced with standard `shadow-lg`

**Step 2: Verify dev server**

Run:
```bash
npx next build 2>&1 | tail -5
```

Expected: Build succeeds

**Step 3: Commit**

```bash
git add components/portfolio/project-card.tsx
git commit -m "refactor: ProjectCard to use shadcn Card + Badge (DEV-25)"
```

---

### Task 10: Refactor ImageGallery — Dialog + Button (DEV-26)

**Files:**
- Modify: `components/portfolio/image-gallery.tsx`

**Step 1: Rewrite image-gallery.tsx**

Replace the entire file with:

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SanityImageSource } from "@sanity/image-url";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface ImageGalleryProps {
  images: SanityImageSource[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  const next = () => setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null));

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="bg-muted relative aspect-square cursor-pointer overflow-hidden rounded-md border transition-colors hover:border-primary"
          >
            <Image
              src={urlFor(image).width(600).height(600).url()}
              alt={`Gallery image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <Dialog open={lightboxIndex !== null} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogContent className="max-w-[90vw] border-none bg-black/95 p-0 sm:max-w-[90vw]">
          <DialogTitle className="sr-only">
            Image {lightboxIndex !== null ? lightboxIndex + 1 : 0} of {images.length}
          </DialogTitle>
          {lightboxIndex !== null && (
            <div className="relative flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 z-10 text-white hover:bg-white/20"
                onClick={prev}
                aria-label="Previous"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <div className="flex items-center justify-center p-4">
                <Image
                  src={urlFor(images[lightboxIndex]).width(1600).height(1200).url()}
                  alt={`Gallery image ${lightboxIndex + 1}`}
                  width={1600}
                  height={1200}
                  className="max-h-[80vh] w-auto object-contain"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 z-10 text-white hover:bg-white/20"
                onClick={next}
                aria-label="Next"
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
              <div className="text-muted-foreground absolute bottom-2 text-sm">
                {lightboxIndex + 1} / {images.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
```

Key changes:
- Custom fixed overlay div replaced with `<Dialog>` controlled via `open`/`onOpenChange`
- Custom close button (X) removed — Dialog provides its own close button
- Custom prev/next buttons replaced with `<Button variant="ghost" size="icon">`
- Focus trapping, escape-to-close, and click-outside-to-close handled by Radix
- `DialogTitle` with `sr-only` for accessibility (required by Radix)
- Gallery thumbnails get `rounded-md border` styling

**Step 2: Verify dev server**

Run:
```bash
npx next build 2>&1 | tail -5
```

Expected: Build succeeds

**Step 3: Commit**

```bash
git add components/portfolio/image-gallery.tsx
git commit -m "refactor: ImageGallery to use shadcn Dialog + Button (DEV-26)"
```

---

### Task 11: Refactor BeforeAfterSlider — Badge (DEV-27)

**Files:**
- Modify: `components/portfolio/before-after-slider.tsx`

**Step 1: Rewrite before-after-slider.tsx**

Replace the entire file with:

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";
import { Badge } from "@/components/ui/badge";

interface BeforeAfterSliderProps {
  before: SanityImageSource;
  after: SanityImageSource;
  caption?: string;
}

export function BeforeAfterSlider({ before, after, caption }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [containerWidth, setContainerWidth] = useState<number | string>("100%");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const beforeUrl = urlFor(before).width(1200).height(800).url();
  const afterUrl = urlFor(after).width(1200).height(800).url();

  return (
    <div className="space-y-2">
      <div
        ref={containerRef}
        className="relative aspect-[3/2] cursor-col-resize overflow-hidden rounded-md border select-none"
        onMouseMove={handleMouseMove}
        onMouseDown={(e) => handleMove(e.clientX)}
        onTouchMove={handleTouchMove}
        onTouchStart={(e) => handleMove(e.touches[0].clientX)}
      >
        {/* After (full background) */}
        <Image src={afterUrl} alt="After" fill className="object-cover" />

        {/* Before (clipped) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
          <Image
            src={beforeUrl}
            alt="Before"
            fill
            className="object-cover"
            style={{ maxWidth: "none", width: containerWidth }}
          />
        </div>

        {/* Divider */}
        <div
          className="bg-primary absolute top-0 bottom-0 z-10 w-0.5 -translate-x-1/2"
          style={{ left: `${position}%` }}
        >
          <div className="bg-primary text-primary-foreground absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-lg">
            <ChevronLeftRight className="h-5 w-5" />
          </div>
        </div>

        {/* Labels */}
        <Badge className="absolute top-3 left-3 z-10" variant="secondary">
          Before
        </Badge>
        <Badge className="absolute top-3 right-3 z-10" variant="secondary">
          After
        </Badge>
      </div>
      {caption && <p className="text-muted-foreground text-sm">{caption}</p>}
    </div>
  );
}

function ChevronLeftRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="7,9 4,12 7,15" />
      <polyline points="17,9 20,12 17,15" />
    </svg>
  );
}
```

Key changes:
- Custom `bg-black/70 px-2 py-1 text-xs font-bold tracking-widest text-white uppercase` labels replaced with `<Badge variant="secondary">`
- Container border uses `rounded-md border` instead of `border-2 border-foreground/10`
- Divider uses `bg-primary` instead of `bg-amber-500`
- All custom slider logic (mouse/touch/resize) preserved unchanged

**Step 2: Verify dev server**

Run:
```bash
npx next build 2>&1 | tail -5
```

Expected: Build succeeds

**Step 3: Commit**

```bash
git add components/portfolio/before-after-slider.tsx
git commit -m "refactor: BeforeAfterSlider to use shadcn Badge (DEV-27)"
```

---

### Task 12: Refactor VideoEmbed — AspectRatio (DEV-28)

**Files:**
- Modify: `components/portfolio/video-embed.tsx`

**Step 1: Rewrite video-embed.tsx**

Replace the entire file with:

```tsx
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface VideoEmbedProps {
  url: string;
}

function getEmbedUrl(url: string): string | null {
  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  if (ytMatch) return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`;

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

  return null;
}

export function VideoEmbed({ url }: VideoEmbedProps) {
  const embedUrl = getEmbedUrl(url);
  if (!embedUrl) return null;

  return (
    <div className="overflow-hidden rounded-md border">
      <AspectRatio ratio={16 / 9}>
        <iframe
          src={embedUrl}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Project video"
        />
      </AspectRatio>
    </div>
  );
}
```

Key changes:
- Custom `aspect-video border-2 border-foreground/10` wrapper replaced with `<AspectRatio ratio={16/9}>` inside a `rounded-md border` container
- `absolute inset-0 h-full w-full` on iframe simplified to `h-full w-full` (AspectRatio handles positioning)
- URL parsing logic unchanged

**Step 2: Verify dev server**

Run:
```bash
npx next build 2>&1 | tail -5
```

Expected: Build succeeds

**Step 3: Commit**

```bash
git add components/portfolio/video-embed.tsx
git commit -m "refactor: VideoEmbed to use shadcn AspectRatio (DEV-28)"
```

---

### Task 13: Refactor page-level elements (DEV-29)

**Files:**
- Modify: `app/[locale]/contact/page.tsx`
- Modify: `app/[locale]/projects/[slug]/page.tsx`

**Step 1: Rewrite contact page**

Replace the entire file `app/[locale]/contact/page.tsx` with:

```tsx
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SITE_SETTINGS_QUERY_RESULT } from "@/sanity.types";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { Separator } from "@/components/ui/separator";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("title"),
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const settings = await sanityFetch<SITE_SETTINGS_QUERY_RESULT>(SITE_SETTINGS_QUERY);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("title")}</h1>
        <p className="text-muted-foreground mt-3 text-lg">{t("subtitle")}</p>
        <Separator className="mt-6 w-16" />
      </div>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <ContactForm />
        <ContactInfo settings={settings} locale={locale} />
      </div>
    </div>
  );
}
```

**Step 2: Rewrite project detail page**

Replace the entire file `app/[locale]/projects/[slug]/page.tsx` with:

```tsx
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { PROJECT_BY_SLUG_QUERY, PROJECTS_QUERY } from "@/sanity/lib/queries";
import type { PROJECT_BY_SLUG_QUERY_RESULT, PROJECTS_QUERY_RESULT } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { ImageGallery } from "@/components/portfolio/image-gallery";
import { BeforeAfterSlider } from "@/components/portfolio/before-after-slider";
import { VideoEmbed } from "@/components/portfolio/video-embed";
import { PortableText } from "@/components/portfolio/portable-text";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await sanityFetch<PROJECT_BY_SLUG_QUERY_RESULT>(PROJECT_BY_SLUG_QUERY, { slug });

  if (!project) return {};

  const title = locale === "ro" ? project.title?.ro || project.title?.en : project.title?.en;

  const description =
    locale === "ro"
      ? project.category?.title?.ro || project.category?.title?.en
      : project.category?.title?.en;

  return {
    title,
    description: description ? `${title} — ${description}` : title,
    openGraph: project.coverImage
      ? {
          images: [
            {
              url: urlFor(project.coverImage).width(1200).height(630).url(),
              width: 1200,
              height: 630,
            },
          ],
        }
      : undefined,
  };
}

export async function generateStaticParams() {
  const projects = await sanityFetch<PROJECTS_QUERY_RESULT>(PROJECTS_QUERY);
  return projects.map((p) => ({
    slug: p.slug?.current,
  }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "common" });
  const project = await sanityFetch<PROJECT_BY_SLUG_QUERY_RESULT>(PROJECT_BY_SLUG_QUERY, { slug });

  if (!project) notFound();

  const title = locale === "ro" ? project.title?.ro || project.title?.en : project.title?.en;

  const categoryTitle = project.category
    ? locale === "ro"
      ? project.category.title?.ro || project.category.title?.en
      : project.category.title?.en
    : null;

  const description = project.description?.[locale === "ro" ? "ro" : "en"] || null;

  return (
    <article>
      {/* Header with back link */}
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            {t("backToProjects")}
          </Link>
        </Button>
      </div>

      {/* Project header */}
      <header className="mx-auto max-w-7xl px-6 py-10">
        {categoryTitle && (
          <Badge variant="secondary" className="mb-3">
            {categoryTitle}
          </Badge>
        )}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <div className="text-muted-foreground mt-4 flex flex-wrap gap-6 text-sm">
          {project.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {project.location}
            </span>
          )}
          {project.completedAt && (
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(project.completedAt).toLocaleDateString(
                locale === "ro" ? "ro-RO" : "en-US",
                { year: "numeric", month: "long" },
              )}
            </span>
          )}
        </div>
        <Separator className="mt-6 w-16" />
      </header>

      {/* Content sections */}
      <div className="mx-auto max-w-7xl space-y-16 px-6 pb-20">
        {/* Description */}
        {description && (
          <section>
            <PortableText value={description} />
          </section>
        )}

        {/* Gallery */}
        {project.images && project.images.length > 0 && (
          <section>
            <ImageGallery images={project.images} />
          </section>
        )}

        {/* Before/After pairs */}
        {project.beforeAfterPairs && project.beforeAfterPairs.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-2xl font-bold">Before &amp; After</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {project.beforeAfterPairs
                .filter((pair) => pair.before && pair.after)
                .map((pair, i) => (
                  <BeforeAfterSlider
                    key={i}
                    before={pair.before!}
                    after={pair.after!}
                    caption={
                      pair.caption
                        ? locale === "ro"
                          ? pair.caption.ro
                          : pair.caption.en
                        : undefined
                    }
                  />
                ))}
            </div>
          </section>
        )}

        {/* Video */}
        {project.videoUrl && (
          <section>
            <VideoEmbed url={project.videoUrl} />
          </section>
        )}
      </div>
    </article>
  );
}
```

Key changes across both pages:
- `h-1 w-16 bg-amber-500` accent divs replaced with `<Separator className="mt-6 w-16" />`
- Back link uses `<Button variant="ghost" size="sm" asChild>` wrapping `<Link>`
- Category label uses `<Badge variant="secondary">`
- `font-black tracking-tight uppercase` replaced with `font-bold tracking-tight`
- `font-black tracking-wide uppercase` section heading replaced with `font-bold`

**Step 3: Verify dev server**

Run:
```bash
npx next build 2>&1 | tail -5
```

Expected: Build succeeds

**Step 4: Commit**

```bash
git add app/[locale]/contact/page.tsx app/[locale]/projects/[slug]/page.tsx
git commit -m "refactor: page-level elements to use shadcn Button/Badge/Separator (DEV-29)"
```

---

### Task 14: Final verification and cleanup

**Step 1: Full build**

Run:
```bash
npx next build
```

Expected: Build succeeds with no errors

**Step 2: Check for any remaining custom UI patterns**

Search for patterns that should have been replaced:

```bash
# Look for remaining raw <button> elements (excluding components/ui/)
grep -r "<button" components/ app/ --include="*.tsx" -l | grep -v "components/ui/"
```

Expected: No results (all buttons should be shadcn `<Button>`)

```bash
# Look for remaining raw <input> and <textarea> elements
grep -r "<input\|<textarea" components/ app/ --include="*.tsx" -l | grep -v "components/ui/"
```

Expected: No results

```bash
# Look for remaining amber-500/amber-600 references
grep -r "amber-" components/ app/ --include="*.tsx" -l
```

Expected: No results (all amber replaced with `primary` or shadcn variants)

**Step 3: Update DEV-16 status in Linear**

Mark all sub-issues as done and close the parent issue.
