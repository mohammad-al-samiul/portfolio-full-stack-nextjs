"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function DeleteProjectButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onDelete = async () => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Project deleted");
        router.refresh();
      } else {
        toast.error("Failed to delete project");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={onDelete}
      disabled={loading}
      className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-destructive/10 hover:text-destructive transition-all group/btn"
    >
      {loading ? (
        <Loader2 className="animate-spin" size={18} />
      ) : (
        <Trash size={18} className="group-hover/btn:scale-110 transition-transform" />
      )}
    </button>
  );
}
