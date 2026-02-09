import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "bordered" | "elevated" | "gradient";
  hover?: boolean;
}

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
  tone?: "teal" | "orange" | "blue" | "purple" | "redorange";
}

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
  className?: string;
}

export function Card({
  children,
  className,
  variant = "default",
  hover = true,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 md:p-8 transition-all duration-300",
        variant === "default" && "bg-card",
        variant === "bordered" && "bg-card border-2 border-border",
        variant === "elevated" && "bg-card-sheen shadow-soft",
        variant === "gradient" && "bg-gradient-to-br from-primary/5 to-secondary/5",
        hover && "hover:shadow-medium hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}

export function FeatureCard({
  icon,
  title,
  description,
  className,
  tone = "teal",
}: FeatureCardProps) {
  const toneStyles: Record<NonNullable<FeatureCardProps["tone"]>, string> = {
    teal: "bg-geego-teal/12 text-geego-teal",
    orange: "bg-geego-orange/18 text-geego-orange",
    blue: "bg-geego-blue/12 text-geego-blue",
    purple: "bg-geego-purple/12 text-geego-purple",
    redorange: "bg-geego-redorange/12 text-geego-redorange",
  };

  return (
    <Card variant="elevated" className={cn("text-center", className)}>
      <div
        className={cn(
          "w-full aspect-[4/3] rounded-2xl overflow-hidden mb-7",
          toneStyles[tone]
        )}
      >
        {icon}
      </div>
      <h3 className="text-2xl font-black tracking-tight text-foreground mb-4 uppercase">
        {title}
      </h3>
      <p className="text-lg text-foreground/80 leading-relaxed">{description}</p>
    </Card>
  );
}

export function TestimonialCard({
  quote,
  author,
  role,
  avatar,
  className,
}: TestimonialCardProps) {
  return (
    <Card variant="bordered" className={cn("flex flex-col", className)}>
      <p className="text-lg leading-relaxed mb-6 flex-1">"{quote}"</p>
      <div className="flex items-center gap-4">
        {avatar ? (
          <img
            src={avatar}
            alt={author}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            {author.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-semibold">{author}</p>
          {role && <p className="text-sm text-muted-foreground">{role}</p>}
        </div>
      </div>
    </Card>
  );
}
