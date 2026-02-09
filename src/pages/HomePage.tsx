import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/sections/Section";
import { FeatureCard, Card } from "@/components/sections/Card";
import { ExpertVoices } from "@/components/sections/ExpertVoices";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Compass,
  Dumbbell,
  GraduationCap,
  Hand,
  Home,
  Map,
  Mic,
  Move,
  Monitor,
  Shield,
  Sparkles,
  Star,
  Target,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SkillWheelModal } from "@/components/spinning/SkillWheelModal";

export default function HomePage() {
  const AUTO_OPEN_KEY = "geego_skillwheel_seen";
  const carouselImages = [
    "1 Geego-1284-×-2778-FI-kopio-rhi91a5dbtjvo2yu2owiak325hcqrhlsn7te9ecr74.webp",
    "2 Geego-1284-×-2778-FI2-kopio-rhi91b37inl5zoxgx7b4v1uiqv83z6pizcgvqobd0w.webp",
    "3. Geego-1284-×-2778-FI3-kopio-rhi91c11phmgbaw3rpprfjlzc93h6vt9bh4d7y9yuo.webp",
    "4 Geego-1284-×-2778-FI4-kopio-rhi91c11phmgbaw3rpprfjlzc93h6vt9bh4d7y9yuo.webp",
    "5 Geego-1284-×-2778-FI5-kopio-rhi91cyvwbnqmwuqm84e01dfxmyuekwznlrup88kog.webp",
    "6 Geego-1284-×-2778-FI6-kopio-rhi91dwq35p0yitdgqj0kj4wj0u7ma0pzqfc6i76i8.webp",
    "7 Geego-1284-×-2778-FI7-kopio-rhi91dwq35p0yitdgqj0kj4wj0u7ma0pzqfc6i76i8.webp",
  ];
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isSkillWheelOpen, setIsSkillWheelOpen] = useState(false);
  const autoOpenTimer = useRef<number | null>(null);
  const visibleCount = 3;
  const totalImages = carouselImages.length;
  const visibleImages = Array.from({ length: visibleCount }, (_, offset) => {
    const index = (carouselIndex + offset) % totalImages;
    return carouselImages[index];
  });

  const handlePrev = () =>
    setCarouselIndex((index) => (index - 1 + totalImages) % totalImages);
  const handleNext = () =>
    setCarouselIndex((index) => (index + 1) % totalImages);

  const handleOpenSkillWheel = () => {
    if (autoOpenTimer.current) {
      window.clearTimeout(autoOpenTimer.current);
      autoOpenTimer.current = null;
    }
    window.sessionStorage.setItem(AUTO_OPEN_KEY, "true");
    setIsSkillWheelOpen(true);
  };

  const handleCloseSkillWheel = () => setIsSkillWheelOpen(false);

  useEffect(() => {
    if (window.sessionStorage.getItem(AUTO_OPEN_KEY)) return;
    autoOpenTimer.current = window.setTimeout(() => {
      window.sessionStorage.setItem(AUTO_OPEN_KEY, "true");
      setIsSkillWheelOpen(true);
    }, 10000);

    return () => {
      if (autoOpenTimer.current) {
        window.clearTimeout(autoOpenTimer.current);
        autoOpenTimer.current = null;
      }
    };
  }, []);

  const logoCarousel = [
    { name: "Helsingborg", src: "/images/logos/helsingborg-se-vector-logo-xs.png" },
    { name: "Tampere Finland", src: "/images/logos/tampere.finland_rgb-scaled.png" },
    { name: "DigiOne", src: "/images/logos/DigiOne-tunnus.png" },
    { name: "Hämeenlinna", src: "/images/logos/HML_Kaupunki_RGB-7-1-1-scaled.jpg" },
    { name: "Varala", src: "/images/logos/Varala-logo.png" },
    { name: "Tampere University", src: "/images/logos/Tampere_University_logo.svg" },
    { name: "UEF", src: "/images/logos/UEF_logo-1.webp" },
  ];

  return (
    <Layout>
      <SEO
        title="Geego – Ruutuaika ei ole ongelma. Sisältö on."
        description="Geego tekee ruutuajasta liikettä ja taitoja. Ilmaiseksi koteihin. Kouluille oma opettajaversio, joka toimii heti arjessa."
      />

      {/* Hero */}
      <Hero
        title={
          <>
            Tämä ei ole ruutuaikaa.
          </>
        }
        subtitle={
          <>
            Geego on lasten liikunnallinen oppimissovellus, joka muuttaa ruutuajan oikeaksi
            liikkeeksi ja taidoiksi.
          </>
        }
        backgroundImage="/images/geego-kids-banner.webp"
        backgroundPosition="center 35%"
      >
        <Button variant="ghost" size="lg" className="hero__btn hero__btn--primary" asChild>
          <a href="/fi">Perheille</a>
        </Button>
        <Button variant="ghost" size="lg" className="hero__btn hero__btn--secondary" asChild>
          <a href="/fi/kouluille">Kouluille</a>
        </Button>
        <Button variant="coral" size="lg" className="hero__btn" asChild>
          <a href="/fi/perheseikkailu">Testaa Geegoa</a>
        </Button>
      </Hero>

      <SkillWheelModal isOpen={isSkillWheelOpen} onClose={handleCloseSkillWheel} />

      <div className="trust-belt">
        <div className="trust-belt__inner">
          <div className="logo-marquee">
            <div className="logo-marquee__track">
              {[...logoCarousel, ...logoCarousel].map((logo, index) => (
                <div key={`${logo.name}-${index}`} className="logo-marquee__item">
                  <img src={logo.src} alt={logo.name} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="statement-cards">
        <div className="statement-cards__inner">
          <div className="statement-section__inner">
            <h2 className="statement-section__title">Lapset oppivat liikkumalla.</h2>
            <p className="statement-section__subtitle">Eivät vain katsomalla, vaan tekemällä.</p>
          </div>
          <div className="value-cards-grid">
            <FeatureCard
              className="value-card"
              title="Liike ensin."
              description="Lapset oppivat liikkumalla – eivät vain katsomalla."
              icon={
                <img
                  src="/images/1%20Liike%20ensin.webp"
                  alt="Liike ensin"
                  className="w-full h-full object-cover"
                />
              }
              tone="teal"
            />
            <FeatureCard
              className="value-card"
              title="Ohjattu, ei koukuttava."
              description="Ruutu ohjaa liikettä, se ei korvaa sitä."
              icon={
                <img
                  src="/images/2%20Ohjattu.webp"
                  alt="Ohjattu"
                  className="w-full h-full object-cover"
                />
              }
              tone="orange"
            />
            <FeatureCard
              className="value-card"
              title="Taidot jotka jäävät."
              description="Tasapaino, koordinaatio, kehonhallinta ja rohkeus – etumatka arkeen."
              icon={
                <img
                  src="/images/3%20Taidot.webp"
                  alt="Taidot"
                  className="w-full h-full object-cover"
                />
              }
              tone="blue"
            />
          </div>
        </div>
      </section>

      {/* Section 2.5 */}
      <Section className="carousel-section">
        <div className="carousel-section__inner">
          <h2 className="carousel-section__title">
            Ei välineitä. Ei suunnittelua. Paina vain play.
          </h2>
          <div className="carousel-section__slider">
            <button
              type="button"
              onClick={handlePrev}
              className="carousel-nav carousel-nav--prev"
              aria-label="Edellinen"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="carousel-grid">
              {visibleImages.map((name) => (
                <div
                  key={name}
                  className="carousel-card"
                >
                  <img
                    src={encodeURI(`/images/Carousel/fi/${name}`)}
                    alt="Geego käyttö"
                    className="carousel-image"
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="carousel-nav carousel-nav--next"
              aria-label="Seuraava"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="carousel-mobile-controls">
            <button
              type="button"
              onClick={handlePrev}
              className="carousel-nav"
              aria-label="Edellinen"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="carousel-nav"
              aria-label="Seuraava"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="family-benefits-header">
            <h2>Perheille: ilmainen tapa saada liike takaisin arkeen</h2>
            <p>Liike kuuluu kaikille – Geego tekee siitä helppoa ja innostavaa.</p>
          </div>
          <div className="feature-icon-grid">
            <div className="feature-icon-card">
              <div className="feature-icon-badge">
                <Sparkles aria-hidden="true" />
              </div>
              <h4 className="feature-icon-title">Ilmainen kodeille</h4>
              <p className="feature-icon-text">
                Geego on lapsille ilmainen, koska liike ei saa olla maksullinen etuoikeus. Lapsi
                ei ole asiakas.
              </p>
            </div>
            <div className="feature-icon-card">
              <div className="feature-icon-badge">
                <Monitor aria-hidden="true" />
              </div>
              <h4 className="feature-icon-title">Ruutu ohjaa liikettä</h4>
              <p className="feature-icon-text">
                Geego ei lisää passiivista ruutuaikaa – se tekee ruudusta “liikekäskijän”, joka
                saa kehon mukaan.
              </p>
            </div>
            <div className="feature-icon-card">
              <div className="feature-icon-badge">
                <Home aria-hidden="true" />
              </div>
              <h4 className="feature-icon-title">Pieni tila riittää</h4>
              <p className="feature-icon-text">
                Olohuone, käytävä tai piha. Ei välineitä, ei valmisteluja – paina play ja anna
                lapsen liikkua.
              </p>
            </div>
            <div className="feature-icon-card">
              <div className="feature-icon-badge">
                <Mic aria-hidden="true" />
              </div>
              <h4 className="feature-icon-title">Selkeä puheohjaus</h4>
              <p className="feature-icon-text">
                Lapsi seuraa ohjeita ja liikkuu omaehtoisesti ilman että katse on koko ajan
                ruudussa.
              </p>
            </div>
            <div className="feature-icon-card">
              <div className="feature-icon-badge">
                <Star aria-hidden="true" />
              </div>
              <h4 className="feature-icon-title">Taidot ja itseluottamus</h4>
              <p className="feature-icon-text">
                Tasapaino, koordinaatio ja kehonhallinta kehittyvät huomaamatta – ja lapsi
                huomaa itse, että “mä osaan”.
              </p>
            </div>
            <div className="feature-icon-card">
              <div className="feature-icon-badge">
                <GraduationCap aria-hidden="true" />
              </div>
              <h4 className="feature-icon-title">Pedagogisesti laadukas</h4>
              <p className="feature-icon-text">
                Sisältöä kehitetään tutkimusperustaisesti ja pedagogisesti – mukana Varalan
                Urheiluopiston osaaminen.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Section 6 */}
      <section className="methodology-hero">
        <div className="methodology-hero__inner">
          <div className="methodology-hero__grid">
            <div className="methodology-hero__content">
              <span className="methodology-hero__eyebrow">GEEGON MENETELMÄ</span>
              <h2 className="methodology-hero__title">Menetelmä, ei vain sisältöä.</h2>
              <p className="methodology-hero__lead">
                Kehitetty yhdessä{" "}
                <a
                  className="methodology-hero__link"
                  href="https://varala.fi/geego-kids-helppo-ja-tehokas-tapa-lisata-liikuntaa-lapsen-paivaan/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Varalan Urheiluopiston
                </a>{" "}
                kanssa vahvistamaan lasten keskeisiä liikuntataitoja.
              </p>
              <p className="methodology-hero__body">
                Geegon liikuntamenetelmä perustuu pitkäjänteiseen asiantuntijuuteen lasten
                fyysisestä kehityksestä. Sisältö varmistaa, että lapset harjoittelevat
                monipuolisesti kaikkia olennaisia liikuntataitoja – ei vain niitä, jotka tuntuvat
                helpoimmilta tai hauskimmilta.
              </p>
              <div className="methodology-hero__skills">
                <div className="methodology-hero__skill">
                  <span className="methodology-hero__skill-icon" aria-hidden="true">
                    <Compass />
                  </span>
                  <span>Tasapaino</span>
                </div>
                <div className="methodology-hero__skill">
                  <span className="methodology-hero__skill-icon" aria-hidden="true">
                    <Target />
                  </span>
                  <span>Koordinaatio</span>
                </div>
                <div className="methodology-hero__skill">
                  <span className="methodology-hero__skill-icon" aria-hidden="true">
                    <Dumbbell />
                  </span>
                  <span>Voima</span>
                </div>
                <div className="methodology-hero__skill">
                  <span className="methodology-hero__skill-icon" aria-hidden="true">
                    <Move />
                  </span>
                  <span>Liikkuvuus</span>
                </div>
                <div className="methodology-hero__skill">
                  <span className="methodology-hero__skill-icon" aria-hidden="true">
                    <Shield />
                  </span>
                  <span>Kehonhallinta</span>
                </div>
                <div className="methodology-hero__skill">
                  <span className="methodology-hero__skill-icon" aria-hidden="true">
                    <Hand />
                  </span>
                  <span>Välineenkäsittely</span>
                </div>
                <div className="methodology-hero__skill">
                  <span className="methodology-hero__skill-icon" aria-hidden="true">
                    <Map />
                  </span>
                  <span>Tilanhahmotus</span>
                </div>
              </div>
            </div>
            <div className="methodology-hero__media">
              <img
                src="/images/geego bike.webp"
                alt="Lapsi liikkumassa Geegon kanssa"
              />
            </div>
          </div>
        </div>
      </section>

      <ExpertVoices
        eyebrow="ASIANTUNTIJOIDEN NÄKEMYS"
        items={[
          {
            quote:
              "Geegon asiantuntijaryhmään liittymällä voin vaikuttaa suoraan lasten terveyteen ja hyvinvointiin. Tämä on sijoitus lasten ja koko yhteiskunnan tulevaisuuteen.",
            name: "Jari Parkkari",
            title: "Liikunta- ja urheilulääketieteen professori",
            image: "/images/jari.webp",
          },
          {
            quote:
              "Varalassa pidämme tärkeänä olla aktiivisesti mukana ratkaisemassa lasten liikkumattomuuden haastetta. Geego on meille moderni, kustannustehokas ja käytännössä toimivaksi todettu tapa saada lapset liikkeelle.",
            name: "Riku Granat",
            title: "CEO, Varala",
            image: "/images/riku.jpeg",
          },
        ]}
      />

      {/* Section 7 */}
      <section id="campaign" className="campaign-section">
        <div className="campaign-section__inner">
          <h2>Sisältö ratkaisee.</h2>
          <p>
            Kolmen kuukauden julkinen haaste: siirretään katse ruudusta siihen, mitä ruudulla
            tapahtuu.
          </p>
          <p>Kokeile Geegoa kotona ja kerro oma “lapsuuden liike” -juttusi.</p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/fi/sisalto-ratkaisee">Lue haasteesta</Link>
          </Button>
        </div>
      </section>

      <section className="final-cta">
        <div className="final-cta__inner">
          <div>
            <h2>Aloita ilmaiseksi tänään.</h2>
            <p>Lataa Geego kotiin ja kokeile heti.</p>
          </div>
          <Button variant="hero" size="lg" asChild>
            <a href="#download">Aloita ilmaiseksi tänään</a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
