import { Apple, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppStoreButtonsProps {
  className?: string;
}

export function AppStoreButtons({ className }: AppStoreButtonsProps) {
  return (
    <div className={`flex flex-col sm:flex-row items-center gap-4 ${className}`}>
      <Button
        variant="appstore"
        size="lg"
        className="w-full sm:w-auto min-w-[200px]"
        asChild
      >
        <a href="#" className="flex items-center gap-3">
          <Apple className="w-7 h-7" />
          <div className="text-left">
            <span className="block text-xs opacity-80">Lataa</span>
            <span className="block text-sm font-semibold">App Store</span>
          </div>
        </a>
      </Button>
      
      <Button
        variant="appstore"
        size="lg"
        className="w-full sm:w-auto min-w-[200px]"
        asChild
      >
        <a href="#" className="flex items-center gap-3">
          <Play className="w-7 h-7" />
          <div className="text-left">
            <span className="block text-xs opacity-80">Lataa</span>
            <span className="block text-sm font-semibold">Google Play</span>
          </div>
        </a>
      </Button>
    </div>
  );
}

interface CTAButtonsProps {
  primaryText: string;
  primaryHref: string;
  secondaryText?: string;
  secondaryHref?: string;
  className?: string;
}

export function CTAButtons({
  primaryText,
  primaryHref,
  secondaryText,
  secondaryHref,
  className,
}: CTAButtonsProps) {
  return (
    <div className={`flex flex-col sm:flex-row items-center gap-4 ${className}`}>
      <Button variant="hero" size="lg" asChild>
        <a href={primaryHref}>{primaryText}</a>
      </Button>
      
      {secondaryText && secondaryHref && (
        <Button variant="outline" size="lg" asChild>
          <a href={secondaryHref}>{secondaryText}</a>
        </Button>
      )}
    </div>
  );
}
