"use client";

import { useState } from "react";
import { Trash, Loader2 } from "lucide-react";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
import { useDeleteProject } from "@/hooks/useProjects";

interface DeleteProjectButtonProps {
  id: string;
  onDelete?: (id: string) => Promise<void>;
  disabled?: boolean;
}

export function DeleteProjectButton({
  id,
  onDelete,
  disabled,
}: DeleteProjectButtonProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const deleteProject = useDeleteProject();

  const handleDelete = async () => {
    if (onDelete) {
      await onDelete(id);
      setDialogOpen(false);
      return;
    }

    deleteProject.mutate(id, {
      onSettled: () => setDialogOpen(false),
    });
  };

  const pending = deleteProject.isPending;

  return (
    <>
      <button
        type="button"
        onClick={() => setDialogOpen(true)}
        disabled={disabled || pending}
        className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-destructive/10 hover:text-destructive transition-all group/btn disabled:opacity-50 disabled:hover:bg-white/5 disabled:hover:text-inherit"
      >
        {pending ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Trash size={18} className="group-hover/btn:scale-110 transition-transform" />
        )}
      </button>

      <DeleteConfirmationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={handleDelete}
        title="Delete Project?"
        description="Are you sure you want to delete this project? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDeleting={pending}
      />
    </>
  );
}
