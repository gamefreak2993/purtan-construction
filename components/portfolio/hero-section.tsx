import { useTranslations } from "next-intl";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface HeroProps {
  project?: {
    title: { en: string; ro: string };
    coverImage: any;
    location?: string;
  };
  locale: string;
}

export function HeroSection({ project, locale }: HeroProps) {
  const t = useTranslations("hero");

  if (!project) {
    return (
      <section className="relative flex min-h-[70vh] items-center justify-center bg-foreground text-background px-6">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.05) 35px, rgba(255,255,255,0.05) 70px)`,
        }} />
        <div className="relative z-10 max-w-4xl text-center">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tight">
            {t("title")}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-background/60 max-w-2xl mx-auto font-light">
            {t("subtitle")}
          </p>
          <div className="mt-8 h-1 w-24 bg-amber-500 mx-auto" />
        </div>
      </section>
    );
  }

  const title = locale === "ro" ? project.title.ro : project.title.en;
  const imageUrl = urlFor(project.coverImage).width(1920).height(1080).url();

  return (
    <section className="relative min-h-[70vh] overflow-hidden">
      <Image
        src={imageUrl}
        alt={title || ""}
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="relative z-10 flex min-h-[70vh] items-end px-6 pb-16">
        <div className="mx-auto w-full max-w-7xl">
          <div className="inline-block bg-amber-500 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white mb-4">
            Featured
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase leading-[0.9] tracking-tight text-white">
            {title}
          </h1>
          {project.location && (
            <p className="mt-3 text-lg text-white/60 font-light">{project.location}</p>
          )}
        </div>
      </div>
    </section>
  );
}
