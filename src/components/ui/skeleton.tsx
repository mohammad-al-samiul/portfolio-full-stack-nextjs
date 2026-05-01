import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("rounded-md bg-muted/50 border border-border animate-pulse", className)}
      {...props}
    />
  );
}

export function SkeletonCard({
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-muted/30 border border-border p-6 space-y-4",
        className
      )}
      {...props}
    >
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  );
}
