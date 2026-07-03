import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

type StaticPageContentProps = {
  content: string;
  className?: string;
};

export function StaticPageContent({ content, className }: StaticPageContentProps) {
  return (
    <div
      className={cn(
        "prose-content text-lg text-foreground",
        "[&>*:first-child]:!mt-0 [&>*:last-child]:!mb-0",
        "[&_h2]:mt-10 [&_h2]:mb-5 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-snug",
        "[&_h3]:mt-10 [&_h3]:mb-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:leading-snug",
        "[&_h4]:mt-8 [&_h4]:mb-4 [&_h4]:text-lg [&_h4]:font-semibold",
        "[&_p]:my-5 [&_ul]:my-5 [&_ol]:my-5",
        "[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-8",
        "[&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-8",
        "[&_strong]:font-bold",
        "[&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary/80",
        "[&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-4",
        "[&_hr]:my-10 [&_hr]:border-border",
        className
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}