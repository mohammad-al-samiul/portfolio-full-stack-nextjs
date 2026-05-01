"use client";

import { useEffect, useState } from "react";
import { useIsFetching } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

export function GlobalLoader() {
  const isFetching = useIsFetching({
    predicate: (query) => {
      // Exclude projects and posts queries from global loader
      const queryKey = query.queryKey as string[];
      return !queryKey.some(key => key === 'projects' || key === 'posts');
    }
  });
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (isFetching > 0) {
      const timer = setTimeout(() => setShowLoader(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowLoader(false);
    }
  }, [isFetching]);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/10 border border-white/20 shadow-2xl backdrop-blur-md"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Loader2 size={48} className="text-white" />
            </motion.div>
            <p className="text-white/80 text-sm font-medium">Loading...</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}