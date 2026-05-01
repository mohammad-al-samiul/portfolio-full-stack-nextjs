"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";

interface DeleteMessageButtonProps {
  id: string;
  onDelete?: (id: string) => Promise<void>;
  disabled?: boolean;
}

export function DeleteMessageButton({ id, onDelete, disabled }: DeleteMessageButtonProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (onDelete) {
      await onDelete(id);
    } else {
      // Fallback to client-side delete if no onDelete handler provided
      try {
        const res = await fetch(`/api/contact/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          toast.success("Message deleted successfully!");
          router.refresh();
        } else {
          toast.error("Failed to delete message");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete message");
      }
    }
    setDialogOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setDialogOpen(true)}
        disabled={disabled}
        className="p-3 rounded-xl bg-destructive/5 text-destructive hover:bg-destructive hover:text-white transition-all group/btn border border-destructive/10 disabled:opacity-50 disabled:hover:bg-destructive/5 disabled:hover:text-destructive"
        title="Delete Message"
      >
        <Trash2 size={18} className="group-hover/btn:scale-110 transition-transform" />
      </button>

      <DeleteConfirmationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={handleDelete}
        title="Delete Message?"
        description="Are you sure you want to delete this message? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}
