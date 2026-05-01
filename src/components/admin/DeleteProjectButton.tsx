"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";

interface DeleteProjectButtonProps {
  id: string;
  onDelete?: (id: string) => void;
  disabled?: boolean;
}

export function DeleteProjectButton({ id, onDelete, disabled }: DeleteProjectButtonProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (onDelete) {
      onDelete(id);
    } else {
      // Fallback to client-side delete if no onDelete handler provided
      try {
        const res = await fetch(`/api/projects/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          toast.success("Project deleted successfully!");
          router.refresh();
        } else {
          toast.error("Failed to delete project");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete project");
      }
    }
    setDialogOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setDialogOpen(true)}
        disabled={disabled}
        className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-destructive/10 hover:text-destructive transition-all group/btn disabled:opacity-50 disabled:hover:bg-white/5 disabled:hover:text-inherit"
      >
        <Trash size={18} className="group-hover/btn:scale-110 transition-transform" />
      </button>

      <DeleteConfirmationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={handleDelete}
        title="Delete Project?"
        description="Are you sure you want to delete this project? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}
