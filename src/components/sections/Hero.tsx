import { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeroProps {
  title: ReactNode;
  subtitle?: ReactNode;
  highlight?: string;
  children?: ReactNode;
  className?: string;
  variant?: "default" | "coral" | "minimal";
  backgroundImage?: string;
  backgroundPosition?: string;
  backgroundSize?: string;
  sideImage?: string;
  sideImageAlt?: string;
}

export function Hero({
  title,
  subtitle,
  highlight,
  children,
  className,
  variant = "default",
  backgroundImage,
  backgroundPosition,
  backgroundSize,
  sideImage,
  sideImageAlt = "",
}: HeroProps) {
  return (
    <section
      className={cn(
        "hero",
        variant === "default" && "hero--default",
        variant === "coral" && "hero--coral",
        variant === "minimal" && "hero--minimal",
        backgroundImage && "hero--with-image",
        className
      )}
      style={
        backgroundImage
          ? ({
              ["--hero-image" as string]: `url(${backgroundImage})`,
              ["--hero-position" as string]: backgroundPosition,
              ["--hero-size" as string]: backgroundSize,
            } as CSSProperties)
          : undefined
      }
    >
      <div className={sideImage ? "hero__split" : undefined}>
        {sideImage && (
          <div className="hero__side">
            <img
              src={sideImage}
              alt={sideImageAlt}
              className="hero__sideImage"
            />
          </div>
        )}

        <div className="hero__content">
          {highlight && <span className="hero__highlight">{highlight}</span>}

          <h1 className="hero__title">{title}</h1>

          {subtitle && <p className="hero__subtitle">{subtitle}</p>}

          {children && <div className="hero__cta">{children}</div>}
        </div>
      </div>

      {backgroundImage && !sideImage && (
        <div className="hero__imageBanner" aria-hidden="true" />
      )}
    </section>
  );
}
