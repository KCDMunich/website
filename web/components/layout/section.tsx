import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  as?: "section" | "div";
};

export function Section({
  children,
  id,
  className,
  containerClassName,
  as: Component = "section",
}: SectionProps) {
  return (
    <Component id={id} className={cn("w-full py-16 md:py-24", className)}>
      <div
        className={cn(
          "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
          containerClassName
        )}
      >
        {children}
      </div>
    </Component>
  );
}

type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
  as?: "h2" | "h3";
};

export function SectionTitle({
  children,
  className,
  as: Component = "h2",
}: SectionTitleProps) {
  return (
    <Component
      className={cn(
        "mb-8 font-heading text-3xl font-bold tracking-tight text-primary md:mb-10 md:text-4xl",
        className
      )}
    >
      {children}
    </Component>
  );
}