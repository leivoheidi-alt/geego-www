import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/fi", label: "Perheille" },
  { href: "/fi/kouluille", label: "Kouluille" },
  { href: "/fi/faq", label: "FAQ" },
  { href: "/fi/sisalto-ratkaisee", label: "Sisältö ratkaisee" },
];

const perheilleLinks = [
  { href: "/fi/lataa", label: "Lataa" },
  { href: "/fi/perheseikkailu", label: "Perheseikkailu" },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-geego-navy text-geego-light border-b border-geego-navy/60">
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/fi" 
            className="flex items-center gap-3 text-xl font-bold text-geego-light hover:opacity-80 transition-opacity"
          >
            <img
              src="/brand-logo.svg"
              alt="Geego Kids"
              className="h-12 md:h-[3.6rem] w-auto py-1.5"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            <div className="nav-dropdown">
              <Link
                to="/fi"
                className={cn(
                  "text-[1.2rem] md:text-[1.35rem] font-semibold tracking-wide transition-colors nav-dropdown__trigger",
                  location.pathname === "/fi"
                    ? "text-[#F9B200]"
                    : "text-white hover:text-[#F9B200]"
                )}
              >
                Perheille
              </Link>
              <div className="nav-dropdown__menu">
                {perheilleLinks.map((link) => (
                  <Link key={link.href} to={link.href} className="nav-dropdown__item">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-[1.2rem] md:text-[1.35rem] font-semibold tracking-wide transition-colors",
                  location.pathname === link.href
                    ? "text-[#F9B200]"
                    : "text-white hover:text-[#F9B200]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Languages */}
          <div className="hidden md:flex items-center gap-3">
            <button className="text-lg leading-none hover:opacity-80" aria-label="English">
              🇬🇧
            </button>
            <button className="text-lg leading-none hover:opacity-80" aria-label="Suomi">
              🇫🇮
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-geego-light/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-geego-light/10 animate-fade-up">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-[1.2rem] font-medium transition-colors",
                    location.pathname === link.href
                      ? "bg-geego-light/10 text-white"
                      : "text-white hover:text-geego-light hover:bg-geego-light/10"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4 pt-2 pb-1 text-sm uppercase tracking-wider text-geego-light/50">
                Perheille
              </div>
              {perheilleLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-[1.05rem] text-geego-light/80 hover:text-geego-light"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 flex items-center gap-3 px-4">
                <button className="text-lg leading-none hover:opacity-80" aria-label="English">
                  🇬🇧
                </button>
                <button className="text-lg leading-none hover:opacity-80" aria-label="Suomi">
                  🇫🇮
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
