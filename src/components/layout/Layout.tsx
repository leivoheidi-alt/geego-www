import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-brand">
      <Navigation />
      <main className="flex-1 pt-[20px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
