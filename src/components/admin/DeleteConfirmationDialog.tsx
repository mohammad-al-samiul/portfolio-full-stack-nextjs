"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isDeleting?: boolean;
}

export function DeleteConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  title = "Delete Project?",
  description = "Are you sure you want to delete this project? This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  isDeleting = false,
}: DeleteConfirmationDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl bg-card border-border shadow-2xl">
        <DialogHeader className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <DialogTitle className="mt-4 text-xl font-bold tracking-tight">
            {title}
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={() => onOpenChange(false)}
            disabled={isLoading || isDeleting}
            className="px-8"
          >
            {cancelText}
          </Button>
          <Button
            variant="destructive"
            size="lg"
            onClick={handleConfirm}
            disabled={isLoading || isDeleting}
            className="px-8"
          >
            {(isLoading || isDeleting) && (
              <svg
                className="-ml-1 mr-2 h-4 w-4 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
