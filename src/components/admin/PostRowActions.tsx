"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Edit, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface PostRowActionsProps {
  postId: string;
  slug: string;
}

export function PostRowActions({ postId, slug }: PostRowActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Post deleted successfully!");
        router.refresh();
      } else {
        toast.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Failed to delete post", error);
      toast.error("Failed to delete post");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Link href={`/blog/${slug}`} target="_blank">
        <button
          className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-primary transition-colors border border-border/50"
          title="Preview"
        >
          <ExternalLink size={16} />
        </button>
      </Link>
      <Link href={`/admin/posts/${postId}`}>
        <button
          className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-primary transition-colors border border-border/50"
          title="Edit"
        >
          <Edit size={16} />
        </button>
      </Link>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-destructive transition-colors border border-border/50 disabled:opacity-50"
        title="Delete"
      >
        {isDeleting ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Trash2 size={16} />
        )}
      </button>
    </div>
  );
}