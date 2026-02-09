import { Link } from "react-router-dom";

const footerLinks = {
  geego: [
    { label: "Etusivu", href: "/fi" },
    { label: "Lataa", href: "/fi/lataa" },
    { label: "Kouluille", href: "/fi/kouluille" },
    { label: "FAQ", href: "/fi/faq" },
    { label: "Sisältö ratkaisee", href: "/fi/sisalto-ratkaisee" },
  ],
  perheille: [
    { label: "App Store", href: "#" },
    { label: "Google Play", href: "#" },
    { label: "Selainversio", href: "#" },
  ],
  kouluille: [
    { label: "Tilaa", href: "/fi/kouluille" },
    { label: "Pyydä demo", href: "mailto:hello@geego.app?subject=Geego%20demo" },
    { label: "Ota yhteyttä", href: "mailto:hello@geego.app" },
  ],
  media: [
    { label: "Yhteistyö", href: "#" },
    { label: "Lehdistö", href: "#" },
    { label: "Tietosuoja", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-geego-navy text-geego-light">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Column 1 */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/fi" className="flex items-center gap-3 text-xl font-bold mb-4">
              <img
                src="/brand-logo.svg"
                alt="Geego Kids"
                className="h-10 w-auto"
              />
            </Link>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-geego-light/50">
              Geego
            </h4>
            <ul className="space-y-3">
              {footerLinks.geego.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-geego-light/70 hover:text-geego-light transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-geego-light/50">
              Perheille
            </h4>
            <ul className="space-y-3">
              {footerLinks.perheille.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-geego-light/70 hover:text-geego-light transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-geego-light/50">
              Kouluille
            </h4>
            <ul className="space-y-3">
              {footerLinks.kouluille.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("mailto:") ? (
                    <a
                      href={link.href}
                      className="text-geego-light/70 hover:text-geego-light transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-geego-light/70 hover:text-geego-light transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-geego-light/50">
              Media & kumppanit
            </h4>
            <ul className="space-y-3">
              {footerLinks.media.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-geego-light/70 hover:text-geego-light transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-geego-light/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-geego-light/50 text-sm">
            © {new Date().getFullYear()} Geego. Kaikki oikeudet pidätetään.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:hello@geego.app"
              className="text-geego-light/70 hover:text-geego-light transition-colors text-sm"
            >
              hello@geego.app
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
