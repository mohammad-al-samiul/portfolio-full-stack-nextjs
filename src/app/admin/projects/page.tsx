import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Plus,
  Briefcase,
  Edit,
  ExternalLink,
  Star,
  Eye,
  EyeOff
} from "lucide-react";
import { format } from "date-fns";
import { DeleteProjectButton } from "@/components/admin/DeleteProjectButton";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  coverImage: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default async function ProjectsDashboard() {
  const session = await auth();
  if (!session) {
    redirect("/admin/login");
  }

  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portfolio Management</h1>
          <p className="text-muted-foreground">Showcase your best work and manage project details.</p>
        </div>

        <Link href="/admin/projects/new">
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all">
            <Plus size={18} />
            Add Project
          </button>
        </Link>
      </div>

      <div className="glass rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Project Info</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Tech Stack</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Status</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Added On</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((project: Project) => (
                <tr key={project.id} className="group hover:bg-white/5 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-10 rounded-lg bg-muted overflow-hidden border border-white/10 flex-shrink-0">
                        {project.coverImage ? (
                          <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center"><Briefcase size={16} className="text-muted-foreground" /></div>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-foreground truncate">{project.title}</span>
                        <div className="flex items-center gap-3 mt-1">
                          {project.githubUrl && (
                            <Link href={project.githubUrl} target="_blank" className="text-[10px] text-muted-foreground hover:text-primary flex items-center gap-1">
                              GitHub <ExternalLink size={10} />
                            </Link>
                          )}
                          {project.liveUrl && (
                            <Link href={project.liveUrl} target="_blank" className="text-[10px] text-muted-foreground hover:text-primary flex items-center gap-1">
                              Live <ExternalLink size={10} />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {project.techStack.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-md bg-primary/5 text-primary border border-primary/10 text-[9px] font-bold uppercase">
                          {tag}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="text-[9px] text-muted-foreground font-bold">+{project.techStack.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-2">
                      {project.featured ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-bold uppercase tracking-wider w-fit">
                          <Star size={10} fill="currentColor" /> Featured
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border text-[10px] font-bold uppercase tracking-wider w-fit">
                          Standard
                        </span>
                      )}
                      {project.published ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider w-fit">
                          <Eye size={10} /> Public
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20 text-[10px] font-bold uppercase tracking-wider w-fit">
                          <EyeOff size={10} /> Private
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm text-muted-foreground font-medium">
                    {format(new Date(project.createdAt), "MMM d, yyyy")}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/projects/${project.id}`}>
                        <button className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-primary/10 hover:text-primary transition-all group/btn">
                          <Edit size={18} className="group-hover/btn:scale-110 transition-transform" />
                        </button>
                      </Link>
                      <DeleteProjectButton id={project.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {projects.length === 0 && (
            <div className="text-center py-24">
              <div className="inline-flex p-6 rounded-full bg-white/5 mb-4">
                <Briefcase size={40} className="text-muted-foreground/30" />
              </div>
              <p className="text-muted-foreground">No projects added yet.</p>
              <Link href="/admin/projects/new" className="text-primary text-sm font-bold mt-2 inline-block">Add your first project</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
