import { ProjectCard } from "./project-card";

interface ProjectGridProps {
  projects: Array<{
    _id: string;
    slug: { current: string };
    title: { en: string; ro: string };
    coverImage: any;
    category?: { title: { en: string; ro: string } };
    location?: string;
  }>;
  locale: string;
}

export function ProjectGrid({ projects, locale }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-lg text-muted-foreground">No projects yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} locale={locale} />
      ))}
    </div>
  );
}
