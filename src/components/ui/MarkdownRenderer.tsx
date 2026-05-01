import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps) {
  const formattedContent = content
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\n")
    .replace(/\r\n?/g, "\n");

  return (
    <div
      className={cn(
        "prose prose-neutral dark:prose-invert prose-lg leading-relaxed max-w-none selection:bg-primary/30 selection:text-foreground dark:selection:bg-primary/40",
        "prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground",
        "prose-h1:mt-0 prose-h1:mb-6 prose-h1:text-4xl prose-h1:leading-tight",
        "prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border/50 prose-h2:pb-3 prose-h2:text-3xl",
        "prose-h3:mt-10 prose-h3:mb-3 prose-h3:text-2xl",
        "prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:my-6",
        "prose-li:my-2 prose-li:leading-7 prose-li:marker:text-primary",
        "prose-ul:my-6 prose-ol:my-6",
        "prose-code:rounded-md prose-code:bg-primary/10 prose-code:px-2 prose-code:py-1 prose-code:font-mono prose-code:text-sm prose-code:text-primary prose-code:before:content-none prose-code:after:content-none",
        "dark:prose-code:bg-primary/20 dark:prose-code:text-primary-foreground",
        "prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:border prose-pre:border-border/50 prose-pre:bg-muted/50 prose-pre:p-5 prose-pre:my-8",
        "dark:prose-pre:bg-muted/70 dark:prose-pre:border-border/50",
        "prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-5 prose-blockquote:text-muted-foreground prose-blockquote:italic prose-blockquote:my-8 prose-blockquote:text-lg",
        "prose-a:text-primary prose-a:no-underline prose-a:hover:underline prose-a:transition-colors",
        "prose-strong:text-foreground",
        "prose-table:my-10 prose-table:rounded-xl prose-table:overflow-hidden prose-th:bg-muted/50 prose-th:p-4 prose-th:text-left prose-th:font-bold prose-td:p-4 prose-td:border-border/50",
        "dark:prose-th:bg-muted/70 dark:prose-td:border-border/50",
        "prose-hr:my-12 prose-hr:border-border/50 prose-hr:border-t-2",
        "prose-img:rounded-xl prose-img:my-8",
        "leading-relaxed",
        className,
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {formattedContent}
      </ReactMarkdown>
    </div>
  );
}
