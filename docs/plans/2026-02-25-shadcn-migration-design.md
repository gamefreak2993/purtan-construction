# shadcn/ui Migration Design

**Linear:** DEV-16
**Date:** 2026-02-25
**Status:** Approved

## Goal

Replace all custom HTML elements across the Purtan Construction website with shadcn/ui primitives. Adopt shadcn defaults (new-york style) as the new design language.

## Context

- shadcn CLI v3.8.5 installed, `components.json` configured
- `cn()` utility, radix-ui, lucide-react, tw-animate-css already in place
- `components/ui/` directory is empty — no shadcn components added yet
- 16 custom components to refactor across shared, portfolio, and contact sections

## Approach

Component-by-component swap. Install all needed shadcn components upfront, then refactor each file one at a time starting with the most-reused primitives.

## shadcn Components to Install

Button, Input, Textarea, Label, Card, Badge, Sheet, Dialog, Separator, Alert, ToggleGroup, AspectRatio

## Execution Order

### Phase 1: Install (DEV-17)
Install all 12 shadcn components in one batch via `npx shadcn add`.

### Phase 2: Shared Components (DEV-18, DEV-19, DEV-20)
- **Header** — Sheet for mobile drawer, Button for nav toggle
- **LanguageSwitcher** — ToggleGroup for EN/RO toggle
- **Footer** — Separator for top border

### Phase 3: Contact Section (DEV-21, DEV-22)
- **ContactForm** — Input, Textarea, Label, Button, Alert
- **ContactInfo** — Card for info items, Button for social links

### Phase 4: Portfolio Section (DEV-23 through DEV-28)
- **HeroSection** — Badge for "Featured" tag, Separator for accent line
- **CategoryFilter** — ToggleGroup for filter buttons
- **ProjectCard** — Card wrapper, Badge for category label
- **ImageGallery** — Dialog for lightbox, Button for controls
- **BeforeAfterSlider** — Badge for labels (keep custom slider logic)
- **VideoEmbed** — AspectRatio wrapper

### Phase 5: Page-Level Elements (DEV-29)
- Contact page: Separator for accent lines
- Project detail page: Button for back link, Badge for category, Separator for accents

## Component Mapping

| Current Element | shadcn Replacement |
|---|---|
| `<button>` (nav, submit, filters) | `<Button>` with variants |
| `<input>` (text, email, tel) | `<Input>` |
| `<textarea>` | `<Textarea>` |
| `<label>` | `<Label>` |
| Custom mobile menu (useState toggle) | `<Sheet>` / `<SheetContent>` / `<SheetTrigger>` |
| Custom lightbox overlay (fixed div) | `<Dialog>` / `<DialogContent>` |
| Success/error message divs | `<Alert>` with variants |
| Project card link wrapper | `<Card>` / `<CardContent>` |
| Contact info items | `<Card>` |
| Category labels / "Featured" tag | `<Badge>` |
| EN/RO toggle / category filter | `<ToggleGroup>` / `<ToggleGroupItem>` |
| Accent line divs | `<Separator>` |
| Video iframe wrapper | `<AspectRatio>` |

## What Stays Unchanged

- Sanity CMS integration (queries, types, image URL builder)
- i18n / next-intl translations
- Server actions (contact form email)
- SEO (JSON-LD, metadata, sitemap, robots)
- PortableText rendering (@tailwindcss/typography)
- BeforeAfterSlider drag logic (no shadcn equivalent)
- VideoEmbed URL parsing logic

## Key Decisions

1. **Sheet over custom hamburger** — proper slide-in drawer with overlay, focus trapping, escape-to-close
2. **Dialog over custom lightbox** — accessible modal with focus lock and keyboard navigation
3. **ToggleGroup for both language and category filters** — consistent toggle behavior
4. **Alert with variant="destructive" for errors** — replaces custom red/green divs
5. **Keep custom slider logic** — shadcn has no before/after comparison component
