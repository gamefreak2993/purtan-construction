import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
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
  setRequestLocale(locale);
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
