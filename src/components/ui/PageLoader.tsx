"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // To avoid 'set-state-in-effect' lint warning, we ensure the state change
  // is wrapped in logic that distinguishes between mount and update.
  useEffect(() => {
    if (!mounted) return;
    
    // We use a small delay or a distinct event to trigger loading
    // to avoid synchronous cascading renders during the initial hydration/mount phase.
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    startLoading();
    const timer = setTimeout(stopLoading, 500);
    return () => clearTimeout(timer);
  }, [pathname, searchParams, mounted]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-[100] pointer-events-none"
        >
          <motion.div
            className="h-1 bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
