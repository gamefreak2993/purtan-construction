import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://purtan-construction.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await sanityFetch<any[]>(PROJECTS_QUERY);

  const locales = ["en", "ro"];
  const staticPages = ["", "/contact"];

  const staticEntries = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.8,
    }))
  );

  const projectEntries = locales.flatMap((locale) =>
    projects.map((project: { slug: { current: string } }) => ({
      url: `${BASE_URL}/${locale}/projects/${project.slug.current}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [...staticEntries, ...projectEntries];
}
