import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/sections/Hero";
import { Section, SectionHeader } from "@/components/sections/Section";
import { FeatureCard } from "@/components/sections/Card";
import { AppStoreButtons } from "@/components/sections/CTAButtons";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Globe, Heart, Shield, Sparkles } from "lucide-react";

export default function DownloadPage() {
  return (
    <Layout>
      <SEO 
        title="Lataa Geego – Ilmainen perheille | Geego"
        description="Lataa Geego ilmaiseksi ja anna lapsesi nauttia ruutuajasta, joka kehittää ajattelua ja luovuutta. Saatavilla iOS, Android ja selaimessa."
      />
      {/* Hero Section */}
      <Hero
        title="Lataa Geego – ilmaiseksi kotiin"
        subtitle="Anna lapsesi nauttia ruutuajasta, joka kehittää ajattelua ja luovuutta. Ilman mainoksia, ilman ostopainikkeita."
        highlight="100% ilmainen perheille"
        className="hero--download"
        className="hero--split"
        sideImage="/images/Geego Home.jpg"
        sideImageAlt="Geego kotona"
      >
        <AppStoreButtons />
      </Hero>

      {/* Why Free Section */}
      <Section variant="muted">
        <SectionHeader
          title="Miksi Geego on ilmainen perheille?"
          subtitle="Uskomme, että jokainen lapsi ansaitsee laadukasta sisältöä – taloudellisesta tilanteesta riippumatta."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard
            icon={<Heart className="w-7 h-7" />}
            title="Lasten hyvinvointi edellä"
            description="Emme optimoi koukuttavuutta, vaan kehitystä. Siksi emme tarvitse mainosrahaa perheiltä."
          />
          <FeatureCard
            icon={<Shield className="w-7 h-7" />}
            title="Ei mainoksia tai ostopainikkeita"
            description="Lapsesi ei näe mainoksia eikä vahingossa osta mitään. Turvallisuus ensin."
          />
          <FeatureCard
            icon={<Sparkles className="w-7 h-7" />}
            title="Koulut rahoittavat"
            description="Koulujen ja opettajien tilaukset mahdollistavat ilmaisen kotikäytön. Win-win."
          />
        </div>
      </Section>

      {/* Browser Section */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
            <Globe className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Toimii myös selaimessa
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Ei pakko ladata? Ei hätää. Geego toimii suoraan selaimessa osoitteessa{" "}
            <strong>play.geego.app</strong>. Käynnistä ja pelaa heti.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <a href="https://play.geego.app" target="_blank" rel="noopener noreferrer">
                Avaa selaimessa
              </a>
            </Button>
            <Button variant="soft" size="lg" asChild>
              <Link to="/fi/kouluille">Kiinnostaako koulukäyttö?</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section variant="muted" className="text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Lataa nyt – se on ilmaista
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Saatavilla iOS- ja Android-laitteille sekä selaimessa.
          </p>
          <AppStoreButtons className="justify-center" />
        </div>
      </Section>
    </Layout>
  );
}
