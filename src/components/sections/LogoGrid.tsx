import { cn } from "@/lib/utils";

interface Logo {
  name: string;
  imageUrl?: string;
}

interface LogoGridProps {
  logos: Logo[];
  title?: string;
  className?: string;
}

export function LogoGrid({ logos, title, className }: LogoGridProps) {
  return (
    <div className={cn("text-center", className)}>
      {title && (
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8">
          {title}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {logos.map((logo) => (
          <div
            key={logo.name}
            className="flex items-center justify-center w-32 h-16 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          >
            {logo.imageUrl ? (
              <img
                src={logo.imageUrl}
                alt={logo.name}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="px-4 py-2 bg-muted rounded-lg text-muted-foreground font-medium text-sm">
                {logo.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
