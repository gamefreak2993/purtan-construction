import { ProjectCard } from "./project-card";
import type { PROJECTS_QUERY_RESULT } from "@/sanity.types";

interface ProjectGridProps {
  projects: PROJECTS_QUERY_RESULT;
  locale: string;
}

export function ProjectGrid({ projects, locale }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-muted-foreground text-lg">No projects yet.</p>
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
