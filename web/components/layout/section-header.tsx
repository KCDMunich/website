import { Eyebrow } from "@/components/layout/eyebrow";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 max-w-3xl md:mb-14",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <div className={cn("mb-4", align === "center" && "flex justify-center")}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      ) : null}
      <h2 className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl lg:leading-[1.1]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}