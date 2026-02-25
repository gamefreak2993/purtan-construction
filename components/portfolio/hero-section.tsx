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
