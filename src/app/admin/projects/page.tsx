"use client";

import Link from "next/link";
import {
  Plus,
  Briefcase,
  Edit,
  ExternalLink,
  Star,
  Eye,
  EyeOff,
} from "lucide-react";
import { format } from "date-fns";
import { useProjects } from "@/hooks/useProjects";
import { DeleteProjectButton } from "@/components/admin/DeleteProjectButton";

export default function ProjectsDashboard() {

  const { data: projects = [], error } = useProjects();

  if (error) {
    return (
      <div className="p-8 max-w-7xl mx-auto bg-background">
        <div className="text-center py-24">
          <p className="text-destructive">Failed to load projects</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto bg-background">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Portfolio Management
          </h1>
          <p className="text-muted-foreground">
            Showcase your best work and manage project details.
          </p>
        </div>

        <Link href="/admin/projects/new">
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-xs uppercase tracking-widest hover:scale-105 transition-all">
            <Plus size={18} />
            Add Project
          </button>
        </Link>
      </div>

      {/* Table Container (NO GLASS) */}
      <div className="rounded-2xl overflow-hidden border border-border bg-background">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Header */}
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Project Info
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Tech Stack
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Added On
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-border">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="inline-flex p-5 rounded-full bg-muted mb-4">
                      <Briefcase
                        size={36}
                        className="text-muted-foreground/50"
                      />
                    </div>
                    <p className="text-muted-foreground">
                      No projects added yet.
                    </p>
                    <Link
                      href="/admin/projects/new"
                      className="text-primary text-sm font-medium mt-2 inline-block"
                    >
                      Add your first project
                    </Link>
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-muted transition-colors"
                  >
                    {/* Project Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-10 rounded-md bg-muted overflow-hidden border border-border">
                          {project.coverImage ? (
                            <img
                              src={project.coverImage}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Briefcase
                                size={16}
                                className="text-muted-foreground"
                              />
                            </div>
                          )}
                        </div>

                        <div>
                          <p className="font-semibold">{project.title}</p>

                          <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                            {project.githubUrl && (
                              <Link href={project.githubUrl} target="_blank">
                                GitHub
                              </Link>
                            )}
                            {project.liveUrl && (
                              <Link href={project.liveUrl} target="_blank">
                                Live
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Tech */}
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-xs rounded-md bg-muted border border-border"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-sm">
                      <div className="flex flex-col gap-2">
                        {project.featured ? (
                          <span className="text-amber-500 text-xs font-medium">
                            Featured
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-xs">
                            Standard
                          </span>
                        )}

                        {project.published ? (
                          <span className="text-green-500 text-xs">Public</span>
                        ) : (
                          <span className="text-red-500 text-xs">Private</span>
                        )}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {format(new Date(project.createdAt), "MMM d, yyyy")}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/projects/${project.id}`}>
                          <button className="p-2 rounded-md bg-muted border border-border hover:bg-primary/10 transition">
                            <Edit size={16} />
                          </button>
                        </Link>

                        <DeleteProjectButton id={project.id} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
