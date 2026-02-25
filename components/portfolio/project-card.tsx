import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { urlFor } from "@/sanity/lib/image";

interface ProjectCardProps {
  project: {
    slug: { current: string };
    title: { en: string; ro: string };
    coverImage: any;
    category?: { title: { en: string; ro: string } };
    location?: string;
  };
  locale: string;
}

export function ProjectCard({ project, locale }: ProjectCardProps) {
  const title = locale === "ro" ? (project.title.ro || project.title.en) : project.title.en;
  const categoryTitle = project.category
    ? locale === "ro"
      ? (project.category.title.ro || project.category.title.en)
      : project.category.title.en
    : null;

  const imageUrl = project.coverImage
    ? urlFor(project.coverImage).width(800).height(600).url()
    : null;

  return (
    <Link
      href={`/projects/${project.slug.current}`}
      className="group block border-2 border-foreground/10 bg-card transition-all hover:border-amber-500 hover:shadow-[8px_8px_0_0_rgba(245,158,11,0.15)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
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
      <div className="p-5">
        {categoryTitle && (
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
            {categoryTitle}
          </span>
        )}
        <h3 className="mt-1 text-lg font-black uppercase tracking-wide leading-tight">
          {title}
        </h3>
        {project.location && (
          <p className="mt-1 text-sm text-muted-foreground">{project.location}</p>
        )}
      </div>
    </Link>
  );
}
