import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { PROJECTS_QUERY, CATEGORIES_QUERY } from "@/sanity/lib/queries";
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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [projects, categories] = await Promise.all([
    sanityFetch<any[]>(PROJECTS_QUERY),
    sanityFetch<any[]>(CATEGORIES_QUERY),
  ]);

  const featuredProject = projects.find(
    (p: { featured?: boolean }) => p.featured
  );

  return (
    <>
      <HeroSection project={featuredProject} locale={locale} />
      <PortfolioSection
        projects={projects}
        categories={categories}
        locale={locale}
      />
    </>
  );
}
