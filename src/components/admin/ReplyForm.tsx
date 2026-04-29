"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiOutlinePaperAirplane, 
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineChevronDown,
  HiOutlineChevronUp
} from "react-icons/hi2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Reply {
  id: string;
  content: string;
  createdAt: Date;
}

interface ReplyFormProps {
  messageId: string;
  existingReplies: Reply[];
}

export function ReplyForm({ messageId, existingReplies }: ReplyFormProps) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/messages/${messageId}/reply`, {
        method: "POST",
        body: JSON.stringify({ content }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Reply submitted. Email Status:", data.emailStatus);
        
        if (data.emailStatus === "success") {
          toast.success("Reply sent and email delivered!");
        } else if (data.emailStatus === "sandbox_delivered") {
          toast.success("Reply saved (Email sent to YOUR inbox for testing)");
        } else if (data.emailStatus === "error") {
          toast.warning("Reply saved, but email delivery failed");
        } else {
          toast.success("Reply saved to database");
        }

        setContent("");
        setIsOpen(false);
        router.refresh();
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to send reply");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 pt-8 border-t border-white/5">
      {/* Existing Replies Thread */}
      {existingReplies.length > 0 && (
        <div className="mb-8 space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Previous Replies</p>
          {existingReplies.map((reply) => (
            <div key={reply.id} className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
              <div className="flex items-center gap-2 mb-2 text-[10px] font-bold text-primary uppercase tracking-widest">
                <HiOutlineChatBubbleBottomCenterText size={12} />
                Sent by you
              </div>
              <p className="text-sm text-foreground whitespace-pre-wrap">{reply.content}</p>
              <p suppressHydrationWarning className="mt-4 text-[10px] text-muted-foreground">
                {new Date(reply.createdAt).toLocaleString("en-US")}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Reply Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
      >
        {isOpen ? <HiOutlineChevronUp size={14} /> : <HiOutlineChevronDown size={14} />}
        {isOpen ? "Cancel Reply" : "Write a Reply"}
      </button>

      {/* Reply Form */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={4}
                className="w-full px-6 py-4 rounded-2xl bg-muted/50 border border-border focus:border-primary/50 outline-none transition-all resize-none text-sm"
                placeholder="Type your response here..."
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading || !content.trim()}
                  className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? (
                    <AiOutlineLoading3Quarters className="animate-spin" size={14} />
                  ) : (
                    <HiOutlinePaperAirplane size={14} />
                  )}
                  Send Reply
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
