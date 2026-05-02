"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { format } from "date-fns";
import { usePosts } from "@/hooks/usePosts";
import { PostRowActions } from "@/components/admin/PostRowActions";

export default function AdminDashboard() {
  const { data: posts = [], error, isLoading } = usePosts("admin");

  if (error) {
    return (
      <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10">
        <div className="text-center py-24">
          <p className="text-destructive">Failed to load posts</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6 md:p-10 max-w-7xl mx-auto flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading posts…</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Manager</h1>
          <p className="text-muted-foreground mt-1">
            Manage your blog posts and articles
          </p>
        </div>
        <Link href="/admin/posts/new">
          <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">
            <Plus size={18} />
            New Post
          </button>
        </Link>
      </div>

      {/* Post List */}
      <div className="glass rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Post Details
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Category
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Date
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {posts.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-20 text-center text-muted-foreground"
                  >
                    No posts found. Create your first post!
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-muted/10 transition-colors group"
                  >
                    <td className="px-6 py-6">
                      <div className="space-y-1">
                        <p className="font-bold text-foreground line-clamp-1">
                          {post.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          /{post.slug}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      {post.published ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-500 uppercase tracking-widest">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 uppercase tracking-widest">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-6">
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(post.createdAt), "MMM d, yyyy")}
                      </p>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <PostRowActions postId={post.id} slug={post.slug} />
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
