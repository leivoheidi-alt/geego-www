import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "./Card";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  popular?: boolean;
  className?: string;
}

export function PricingCard({
  title,
  price,
  period,
  description,
  features,
  ctaText,
  ctaHref,
  popular = false,
  className,
}: PricingCardProps) {
  return (
    <Card
      variant={popular ? "gradient" : "bordered"}
      hover
      className={cn(
        "relative flex flex-col",
        popular && "border-2 border-primary ring-4 ring-primary/10",
        className
      )}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
          Suosituin
        </span>
      )}
      
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      
      <div className="mb-6">
        <span className="text-4xl font-extrabold">{price}</span>
        <span className="text-muted-foreground">/{period}</span>
      </div>
      
      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button
        variant={popular ? "hero" : "outline"}
        size="lg"
        className="w-full"
        asChild
      >
        <a href={ctaHref}>{ctaText}</a>
      </Button>
    </Card>
  );
}
