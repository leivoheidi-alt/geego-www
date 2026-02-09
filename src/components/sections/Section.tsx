import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "muted" | "primary" | "coral";
  id?: string;
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function Section({
  children,
  className,
  variant = "default",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24 lg:py-32",
        variant === "default" && "bg-background",
        variant === "muted" && "bg-muted",
        variant === "primary" && "bg-primary text-primary-foreground",
        variant === "coral" && "bg-geego-orange/10",
        className
      )}
    >
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}

export function SectionHeader({
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        centered && "text-center",
        className
      )}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
