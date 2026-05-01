"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCreatePost, useUpdatePost } from "@/hooks/usePosts";

import { cn } from "@/lib/utils";
import {
  Save,
  ArrowLeft,
  Loader2,
  Image as ImageIcon,
  FileText,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";

// Dynamic import for SimpleMDE to avoid SSR issues
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface PostFormProps {
  initialData?: Record<string, unknown>;
}

interface FormDataType {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage: string;
  tags: string;
  published: boolean;
}

export function PostForm({ initialData }: PostFormProps) {
  const router = useRouter();
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();

  const [formData, setFormData] = useState<FormDataType>({
    title: (initialData?.title as string) || "",
    slug: (initialData?.slug as string) || "",
    excerpt: (initialData?.excerpt as string) || "",
    content: (initialData?.content as string) || "",
    category: (initialData?.category as string) || "Frontend",
    coverImage: (initialData?.coverImage as string) || "",
    tags: ((initialData?.tags as string[])?.join(", ")) || "",
    published: (initialData?.published as boolean) || false,
  });

  const simpleMdeOptions = useMemo(() => ({
    spellChecker: false,
    autofocus: false,
    placeholder: "Write your amazing content here...",
    minHeight: "400px",
  }), []);

  const handleContentChange = useCallback((value: string) => {
    setFormData((prev) => ({
      ...prev,
      content: value,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((t: string) => t.trim())
        .filter(Boolean),
    };

    if (initialData?.id) {
      updatePost.mutate(
        { id: initialData.id as string, data: payload },
        {
          onSuccess: () => {
            router.push("/admin/posts");
            router.refresh();
          },
        },
      );
    } else {
      createPost.mutate(payload, {
        onSuccess: () => {
          router.push("/admin/posts");
          router.refresh();
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-background/80 backdrop-blur-md sticky top-0 z-20 py-4 border-b border-border/50 -mx-6 px-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/posts">
            <button
              type="button"
              className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors border border-border/50"
            >
              <ArrowLeft size={20} />
            </button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">
            {initialData?.id ? "Edit Post" : "Create New Post"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              setFormData({ ...formData, published: !formData.published })
            }
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
              formData.published
                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                : "bg-amber-500/10 text-amber-500 border border-amber-500/20",
            )}
          >
            {formData.published ? "Published" : "Draft"}
          </button>
          <button
            type="submit"
            disabled={createPost.isPending || updatePost.isPending}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 disabled:opacity-70"
          >
            {createPost.isPending || updatePost.isPending ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Save size={18} />
            )}
            Save Post
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-4">
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter post title..."
              className="w-full text-4xl md:text-5xl font-bold bg-transparent border-none outline-none placeholder:text-muted-foreground/30 focus:ring-0 p-0"
              required
            />
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span className="font-mono">slug:</span>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                  })
                }
                placeholder="post-slug"
                className="bg-transparent border-none outline-none focus:ring-0 p-0 font-mono text-primary"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
              Excerpt
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              placeholder="Brief summary for listing pages..."
              rows={3}
              className="w-full p-4 rounded-2xl bg-muted/50 border border-border focus:border-primary/50 focus:ring-0 transition-all outline-none text-muted-foreground"
              required
            />
          </div>

          <div className="space-y-2 prose prose-invert max-w-none">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
              Content (Markdown)
            </label>
            <SimpleMDE
              value={formData.content}
              onChange={handleContentChange}
              options={simpleMdeOptions}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="p-6 rounded-3xl bg-card border border-border/50 shadow-xl space-y-6">
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1 block">
                Category
              </label>
              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full p-3 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:ring-0 transition-all outline-none appearance-none cursor-pointer hover:bg-muted/70 peer"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Fullstack">Fullstack</option>
                  <option value="DevOps">DevOps</option>
                  <option value="AI">AI</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform peer-focus:rotate-180">
                  <svg
                    className="w-4 h-4 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1 block">
                Cover Image URL
              </label>
              <div className="relative">
                <ImageIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={16}
                />
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) =>
                    setFormData({ ...formData, coverImage: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:ring-0 transition-all outline-none text-sm"
                />
              </div>
              {formData.coverImage && (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-border">
                  <Image
                    src={formData.coverImage}
                    alt="Cover preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1 block">
                Tags (comma separated)
              </label>
              <div className="relative">
                <FileText
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={16}
                />
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  placeholder="React, Next.js, AI"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:ring-0 transition-all outline-none text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
