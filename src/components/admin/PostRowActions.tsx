"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Edit, Trash2, Loader2 } from "lucide-react";
import { useDeletePost } from "@/hooks/usePosts";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";

interface PostRowActionsProps {
  postId: string;
  slug: string;
}

export function PostRowActions({ postId, slug }: PostRowActionsProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const deletePost = useDeletePost();

  const handleDelete = async () => {
    deletePost.mutate(postId, {
      onSettled: () => setDialogOpen(false),
    });
  };

  return (
    <>
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
        onClick={() => setDialogOpen(true)}
        disabled={deletePost.isPending}
        className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-destructive transition-colors border border-border/50 disabled:opacity-50"
        title="Delete"
      >
        {deletePost.isPending ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Trash2 size={16} />
        )}
      </button>
    </div>

    <DeleteConfirmationDialog
      open={dialogOpen}
      onOpenChange={setDialogOpen}
      onConfirm={handleDelete}
      title="Delete Post?"
      description="Are you sure you want to delete this post? This action cannot be undone."
      confirmText="Delete"
      cancelText="Cancel"
      isDeleting={deletePost.isPending}
    />
  </>
);
}