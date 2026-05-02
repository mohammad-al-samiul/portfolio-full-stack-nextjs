"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Link, Check, X } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { toast } from "sonner";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  slug: string;
  title: string;
}

export function ShareModal({ isOpen, onClose, slug, title }: ShareModalProps) {
  const BASE_URL = "https://portfolio-full-stack-nextjs.vercel.app";
  const shareUrl = `${BASE_URL}/blog/${slug}`;

  const [isCopied, setIsCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Prevent background scroll, handle ESC key, and focus management
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
      setTimeout(() => modalRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  }, [shareUrl]);

  const handleNativeShare = useCallback(async () => {
    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          url: shareUrl,
        });
        toast.success("Shared successfully!");
      } else {
        await handleCopyLink();
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        toast.error("Failed to share");
      }
    } finally {
      setIsSharing(false);
    }
  }, [title, shareUrl, handleCopyLink]);

  const shareToTwitter = useCallback(() => {
    const text = `Check out: ${title}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank", "width=600,height=400");
  }, [title, shareUrl]);

  const shareToLinkedIn = useCallback(() => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, "_blank", "width=600,height=400");
  }, [shareUrl]);

  const shareToFacebook = useCallback(() => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, "_blank", "width=600,height=400");
  }, [shareUrl]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm mx-4 rounded-2xl bg-card border border-border/50 shadow-2xl overflow-hidden will-change-transform"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Share2 size={16} className="text-primary" />
                </div>
                <h3 className="font-bold text-foreground">Share Article</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
                aria-label="Close share dialog"
              >
                <X size={18} className="text-muted-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* URL Copy Section */}
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Copy Link
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={shareUrl}
                      readOnly
                      className="w-full px-3 py-2 pr-10 text-sm bg-muted/50 border border-border rounded-lg focus:border-primary/50 focus:ring-0 outline-none truncate"
                      onClick={(e) => (e.target as HTMLInputElement).select()}
                    />
                    {isCopied && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <Check size={14} className="text-green-500" />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleCopyLink}
                    disabled={isCopied}
                    className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                  >
                    {isCopied ? (
                      <>
                        <Check size={14} />
                        Copied
                      </>
                    ) : (
                      <>
                        <Link size={14} />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="h-px bg-border/50" />

              {/* Social Share Section */}
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Share to
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={shareToTwitter}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border/50 bg-muted/30 hover:bg-muted/50 hover:border-primary/20 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#1DA1F2]/10 flex items-center justify-center group-hover:bg-[#1DA1F2]/20 transition-colors">
                      <FaTwitter size={18} className="text-[#1DA1F2]" />
                    </div>
                    <span className="text-xs font-medium text-foreground">
                      Twitter
                    </span>
                  </button>

                  <button
                    onClick={shareToLinkedIn}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border/50 bg-muted/30 hover:bg-muted/50 hover:border-primary/20 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#0A66C2]/10 flex items-center justify-center group-hover:bg-[#0A66C2]/20 transition-colors">
                      <FaLinkedin size={18} className="text-[#0A66C2]" />
                    </div>
                    <span className="text-xs font-medium text-foreground">
                      LinkedIn
                    </span>
                  </button>

                  <button
                    onClick={shareToFacebook}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border/50 bg-muted/30 hover:bg-muted/50 hover:border-primary/20 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#1877F2]/10 flex items-center justify-center group-hover:bg-[#1877F2]/20 transition-colors">
                      <FaFacebook size={18} className="text-[#1877F2]" />
                    </div>
                    <span className="text-xs font-medium text-foreground">
                      Facebook
                    </span>
                  </button>
                </div>
              </div>

              {/* Native Share Button */}
              {typeof window !== "undefined" &&
                typeof navigator.share === "function" && (
                  <>
                    <div className="h-px bg-border/50" />
                    <button
                      onClick={handleNativeShare}
                      disabled={isSharing}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary font-medium hover:bg-primary/20 hover:border-primary/30 transition-all duration-200 disabled:opacity-50"
                    >
                      {isSharing ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Share2 size={18} />
                        </motion.div>
                      ) : (
                        <Share2 size={18} />
                      )}
                      {isSharing ? "Sharing..." : "Share via System"}
                    </button>
                  </>
                )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
