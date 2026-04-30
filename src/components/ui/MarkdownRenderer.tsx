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
  const components = {
    h1: ({ node, ...props }: any) => (
      <h1
        className="text-3xl font-bold text-foreground mt-6 mb-3 leading-tight"
        {...props}
      />
    ),
    h2: ({ node, ...props }: any) => (
      <h2
        className="text-xl font-bold text-foreground mt-5 mb-2 leading-tight"
        {...props}
      />
    ),
    h3: ({ node, ...props }: any) => (
      <h3
        className="text-lg font-bold text-foreground mt-4 mb-2 leading-tight"
        {...props}
      />
    ),
    p: ({ node, ...props }: any) => (
      <p
        className="text-base text-foreground leading-relaxed mb-3"
        {...props}
      />
    ),
    ul: ({ node, ...props }: any) => (
      <ul
        className="list-disc list-inside space-y-1 mb-3 text-base text-foreground"
        {...props}
      />
    ),
    ol: ({ node, ...props }: any) => (
      <ol
        className="list-decimal list-inside space-y-1 mb-3 text-base text-foreground"
        {...props}
      />
    ),
    li: ({ node, ...props }: any) => (
      <li className="leading-relaxed" {...props} />
    ),
    a: ({ node, ...props }: any) => (
      <a
        className="text-primary hover:text-primary/80 transition-colors underline"
        {...props}
      />
    ),
    strong: ({ node, ...props }: any) => (
      <strong className="font-bold text-foreground" {...props} />
    ),
    code: ({ node, inline, ...props }: any) => {
      if (inline) {
        return (
          <code
            className="bg-primary/10 text-primary px-1.5 py-0.5 rounded-md font-mono text-sm"
            {...props}
          />
        );
      }
      return <code className="font-mono text-sm" {...props} />;
    },
    pre: ({ node, ...props }: any) => (
      <pre
        className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto mb-3"
        {...props}
      />
    ),
    blockquote: ({ node, ...props }: any) => (
      <blockquote
        className="border-l-4 border-primary/50 pl-4 py-1 italic text-muted-foreground mb-3"
        {...props}
      />
    ),
    hr: ({ node, ...props }: any) => (
      <hr className="border-t border-border my-4 mb-4" {...props} />
    ),
  };

  return (
    <div className={cn("max-w-none", className)}>
      <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
