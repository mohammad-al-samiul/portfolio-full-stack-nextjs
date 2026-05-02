"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Save,
  ArrowLeft,
  Loader2,
  Image as ImageIcon,
  Link as LinkIcon,
  Plus,
  X,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import type { CreateProjectData } from "@/lib/types";
import { useCreateProject, useUpdateProject } from "@/hooks/useProjects";

interface ProjectFormProps {
  initialData?: Record<string, unknown> & { id?: string };
}

export function ProjectForm({ initialData }: ProjectFormProps) {
  const router = useRouter();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();

  const [formData, setFormData] = useState({
    title: (initialData?.title as string) || "",
    description: (initialData?.description as string) || "",
    coverImage:
      (initialData?.coverImage as string) ||
      (initialData?.image as string) ||
      "",
    liveUrl:
      (initialData?.liveUrl as string) ||
      (initialData?.liveLink as string) ||
      "",
    githubUrl:
      (initialData?.githubUrl as string) ||
      (initialData?.githubLink as string) ||
      "",
    techStack: (initialData?.techStack as string[]) || [],
    featured: Boolean(initialData?.featured),
    slug: (initialData?.slug as string) || "",
    content: (initialData?.content as string) || "",
    published: (initialData?.published as boolean) ?? true,
  });

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const [newTag, setNewTag] = useState("");

  const addTag = () => {
    if (newTag.trim() && !formData.techStack.includes(newTag.trim())) {
      setFormData({
        ...formData,
        techStack: [...formData.techStack, newTag.trim()],
      });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      techStack: formData.techStack.filter((tag: string) => tag !== tagToRemove),
    });
  };

  const pending = createProject.isPending || updateProject.isPending;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (initialData?.id) {
      updateProject.mutate(
        { id: initialData.id, data: formData },
        {
          onSuccess: () => {
            router.push("/admin/projects");
          },
        },
      );
      return;
    }

    const payload: CreateProjectData = {
      title: formData.title.trim(),
      slug: formData.slug.trim() || generateSlug(formData.title),
      description: formData.description.trim(),
      content: formData.content || "",
      techStack: formData.techStack,
      coverImage: formData.coverImage || undefined,
      liveUrl: formData.liveUrl || undefined,
      githubUrl: formData.githubUrl || undefined,
      featured: formData.featured,
      published: formData.published,
    };

    createProject.mutate(payload, {
      onSuccess: () => {
        router.push("/admin/projects");
      },
    });
  };

  return (
    <form
      className="max-w-5xl mx-auto p-8"
      onSubmit={onSubmit}
    >
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/projects"
            className="p-3 rounded-2xl bg-muted/50 border border-border hover:bg-muted transition-all"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {initialData ? "Edit Project" : "New Project"}
            </h1>
            <p className="text-muted-foreground">
              Fill in the details for your showcase project.
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all disabled:opacity-70"
        >
          {pending ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Save size={18} />
          )}
          {initialData ? "Save Changes" : "Create Project"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-8 rounded-3xl border border-white/5 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Project Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => {
                  const newTitle = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    title: newTitle,
                    slug: initialData ? prev.slug : generateSlug(newTitle),
                  }));
                }}
                className="w-full px-6 py-4 rounded-2xl bg-muted/30 border border-border focus:border-primary/50 outline-none transition-all text-lg font-semibold"
                placeholder="E.g. AI Portfolio Dashboard"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                className="w-full px-6 py-4 rounded-2xl bg-muted/30 border border-border focus:border-primary/50 outline-none transition-all text-sm"
                placeholder="e.g. ai-portfolio-dashboard"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Description
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-6 py-4 rounded-2xl bg-muted/30 border border-border focus:border-primary/50 outline-none transition-all resize-none"
                placeholder="Write a short description of the project..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center justify-between">
                <span>Content (Markdown Supported)</span>
              </label>
              <textarea
                rows={8}
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="w-full px-6 py-4 rounded-2xl bg-muted/30 border border-border focus:border-primary/50 outline-none transition-all resize-y font-mono text-sm"
                placeholder="Write the full project content in markdown..."
              />
            </div>
          </div>

          <div className="glass p-8 rounded-3xl border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                <LinkIcon size={12} /> Live Link
              </label>
              <input
                type="text"
                value={formData.liveUrl}
                onChange={(e) =>
                  setFormData({ ...formData, liveUrl: e.target.value })
                }
                className="w-full px-6 py-4 rounded-2xl bg-muted/30 border border-border focus:border-primary/50 outline-none transition-all"
                placeholder="https://example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                <FaGithub size={12} /> GitHub Repository
              </label>
              <input
                type="text"
                value={formData.githubUrl}
                onChange={(e) =>
                  setFormData({ ...formData, githubUrl: e.target.value })
                }
                className="w-full px-6 py-4 rounded-2xl bg-muted/30 border border-border focus:border-primary/50 outline-none transition-all"
                placeholder="https://github.com/user/repo"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-8 rounded-3xl border border-white/5 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                <ImageIcon size={12} /> Cover Image URL
              </label>
              <input
                type="text"
                value={formData.coverImage}
                onChange={(e) =>
                  setFormData({ ...formData, coverImage: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border focus:border-primary/50 outline-none transition-all text-xs"
                placeholder="https://..."
              />
            </div>
            {formData.coverImage && (
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-border shadow-inner">
                <img
                  src={formData.coverImage}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </div>

          <div className="glass p-8 rounded-3xl border border-white/5 space-y-6">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
              Tech Stack
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
                className="flex-1 px-4 py-3 rounded-xl bg-muted/30 border border-border focus:border-primary/50 outline-none transition-all text-xs"
                placeholder="Add tech..."
              />
              <button
                type="button"
                onClick={addTag}
                className="p-3 rounded-xl bg-primary text-primary-foreground hover:scale-105 transition-all"
              >
                <Plus size={18} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.techStack.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-wider"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-foreground"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="glass p-8 rounded-3xl border border-white/5 space-y-6">
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
                Featured Project
              </span>
              <div
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    setFormData({ ...formData, featured: !formData.featured });
                }}
                onClick={() =>
                  setFormData({ ...formData, featured: !formData.featured })
                }
                className={cn(
                  "w-12 h-6 rounded-full transition-colors duration-300 ease-in-out relative",
                  formData.featured ? "bg-blue-600 dark:bg-blue-500" : "bg-muted",
                )}
              >
                <div
                  className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ease-in-out shadow-sm",
                    formData.featured
                      ? "left-7 shadow-blue-900/50"
                      : "left-1",
                  )}
                />
              </div>
            </label>

            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
                Published
              </span>
              <div
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    setFormData({
                      ...formData,
                      published: !formData.published,
                    });
                }}
                onClick={() =>
                  setFormData({ ...formData, published: !formData.published })
                }
                className={cn(
                  "w-12 h-6 rounded-full transition-colors duration-300 ease-in-out relative",
                  formData.published ? "bg-blue-600 dark:bg-blue-500" : "bg-muted",
                )}
              >
                <div
                  className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ease-in-out shadow-sm",
                    formData.published ? "left-7 shadow-blue-900/50" : "left-1",
                  )}
                />
              </div>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}
