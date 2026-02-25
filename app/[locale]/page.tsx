import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { PROJECTS_QUERY, CATEGORIES_QUERY } from "@/sanity/lib/queries";
import type { PROJECTS_QUERY_RESULT, CATEGORIES_QUERY_RESULT } from "@/sanity.types";
import { HeroSection } from "@/components/portfolio/hero-section";
import { PortfolioSection } from "@/components/portfolio/portfolio-section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [projects, categories] = await Promise.all([
    sanityFetch<PROJECTS_QUERY_RESULT>(PROJECTS_QUERY),
    sanityFetch<CATEGORIES_QUERY_RESULT>(CATEGORIES_QUERY),
  ]);

  const featuredProject = projects.find((p) => p.featured);

  return (
    <>
      <HeroSection project={featuredProject} locale={locale} />
      <PortfolioSection projects={projects} categories={categories} locale={locale} />
    </>
  );
}
