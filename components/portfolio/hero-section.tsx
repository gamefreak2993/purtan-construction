import { useTranslations } from "next-intl";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { PROJECTS_QUERY_RESULT } from "@/sanity.types";

interface HeroProps {
  project?: PROJECTS_QUERY_RESULT[number];
  locale: string;
}

export function HeroSection({ project, locale }: HeroProps) {
  const t = useTranslations("hero");

  if (!project) {
    return (
      <section className="bg-foreground text-background relative flex min-h-[70vh] items-center justify-center px-6">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.05) 35px, rgba(255,255,255,0.05) 70px)`,
          }}
        />
        <div className="relative z-10 max-w-4xl text-center">
          <h1 className="text-5xl leading-[0.9] font-black tracking-tight uppercase sm:text-7xl lg:text-8xl">
            {t("title")}
          </h1>
          <p className="text-background/60 mx-auto mt-6 max-w-2xl text-lg font-light sm:text-xl">
            {t("subtitle")}
          </p>
          <div className="mx-auto mt-8 h-1 w-24 bg-amber-500" />
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
          <div className="mb-4 inline-block bg-amber-500 px-3 py-1 text-xs font-bold tracking-widest text-white uppercase">
            Featured
          </div>
          <h1 className="text-4xl leading-[0.9] font-black tracking-tight text-white uppercase sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {project.location && (
            <p className="mt-3 text-lg font-light text-white/60">{project.location}</p>
          )}
        </div>
      </div>
    </section>
  );
}
