"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";

interface DeleteMessageButtonProps {
  id: string;
  onDelete?: (id: string) => void;
  disabled?: boolean;
}

export function DeleteMessageButton({ id, onDelete, disabled }: DeleteMessageButtonProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    } else {
      // Fallback to client-side delete if no onDelete handler provided
      const deleteMessage = async () => {
        try {
          const res = await fetch(`/api/contact/${id}`, {
            method: "DELETE",
          });

          if (!res.ok) {
            throw new Error("Failed to delete");
          }
        } catch (error) {
          console.error(error);
        }
      };
      deleteMessage();
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
