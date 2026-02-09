import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-base font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-glow-teal",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-soft hover:shadow-glow-coral",
        ghost: "hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Geego custom variants
        hero: "bg-gradient-hero text-primary-foreground shadow-glow-teal hover:opacity-90 hover:shadow-lg transform hover:scale-[1.02]",
        coral: "bg-gradient-coral text-secondary-foreground shadow-glow-coral hover:opacity-90 hover:shadow-lg transform hover:scale-[1.02]",
        soft: "bg-geego-teal-light text-primary hover:bg-primary/10",
        "soft-coral": "bg-geego-orange/15 text-secondary hover:bg-secondary/10",
        appstore:
          "text-white shadow-medium bg-[linear-gradient(135deg,#0EB1AF_0%,#3ED6D3_100%)] hover:bg-[linear-gradient(135deg,#0CA6A4_0%,#34C9C6_100%)]",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4 text-sm",
        lg: "h-14 px-8 text-lg rounded-xl",
        xl: "h-16 px-10 text-xl rounded-2xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
