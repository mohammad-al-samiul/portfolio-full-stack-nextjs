"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function DeleteMessageButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onDelete = async () => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Message deleted");
        router.refresh();
      } else {
        toast.error("Failed to delete");
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
      className="p-3 rounded-xl bg-destructive/5 text-destructive hover:bg-destructive hover:text-white transition-all group/btn border border-destructive/10"
      title="Delete Message"
    >
      {loading ? (
        <Loader2 className="animate-spin" size={18} />
      ) : (
        <Trash2 size={18} className="group-hover/btn:scale-110 transition-transform" />
      )}
    </button>
  );
}
