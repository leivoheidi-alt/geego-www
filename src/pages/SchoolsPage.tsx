import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/sections/Hero";
import { Section, SectionHeader } from "@/components/sections/Section";
import { FeatureCard } from "@/components/sections/Card";
import { PricingCard } from "@/components/sections/PricingCard";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { BookOpen, Users, TrendingUp, Clock, LineChart, Award } from "lucide-react";
import { useState } from "react";
import { SkillWheelModal } from "@/components/spinning/SkillWheelModal";

export default function SchoolsPage() {
  const [isSkillWheelOpen, setIsSkillWheelOpen] = useState(false);

  const handleOpenSkillWheel = () => setIsSkillWheelOpen(true);
  const handleCloseSkillWheel = () => setIsSkillWheelOpen(false);

  return (
    <Layout>
      <SEO 
        title="Geego kouluille ja opettajille – 4,99€/kk | Geego"
        description="Tuo oppitunneille sisältöä, joka aktivoi ajattelua ja motivoi oppilaita. Luokkahallintatyökalut, edistymisraportit ja helppokäyttöisyys."
      />
      {/* Hero Section */}
      <Hero
        title="Geego kouluille ja opettajille"
        subtitle="Tuo oppitunneille sisältöä, joka aktivoi ajattelua ja motivoi oppilaita. Helppo ottaa käyttöön, helppo seurata."
        variant="coral"
        className="hero--split"
        sideImage="/images/school_banner1.jpg"
        sideImageAlt="Oppilaita koulussa liikkumassa"
      >
        <Button variant="hero" size="lg" asChild>
          <a href="mailto:hello@geego.app?subject=Geego%20kouluille%20-%20demo">
            Pyydä demo
          </a>
        </Button>
        <Button variant="coral" size="lg" className="hero__btn" type="button" onClick={handleOpenSkillWheel}>
          Kokeile heti
        </Button>
      </Hero>

      <SkillWheelModal isOpen={isSkillWheelOpen} onClose={handleCloseSkillWheel} />

      {/* Benefits Section */}
      <Section>
        <SectionHeader
          title="Miksi opettajat valitsevat Geegon?"
          subtitle="Pedagogisesti suunniteltu, helppo käyttää, tulokset näkyvät."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard
            icon={<BookOpen className="w-7 h-7" />}
            title="Opetussuunnitelmaan sopiva"
            description="Sisällöt tukevat oppimisen tavoitteita matematiikasta luovaan ajatteluun."
          />
          <FeatureCard
            icon={<Users className="w-7 h-7" />}
            title="Luokkahallintatyökalut"
            description="Hallitse oppilaiden pääsyä, seuraa edistymistä ja anna tehtäviä helposti."
          />
          <FeatureCard
            icon={<TrendingUp className="w-7 h-7" />}
            title="Näe oppimisen tulokset"
            description="Reaaliaikaiset raportit näyttävät, missä oppilaat loistavat ja missä tarvitsevat tukea."
          />
          <FeatureCard
            icon={<Clock className="w-7 h-7" />}
            title="Säästä aikaa"
            description="Valmiit aktiviteetit ja automaattinen arviointi vapauttavat aikaa opettamiseen."
          />
          <FeatureCard
            icon={<LineChart className="w-7 h-7" />}
            title="Yksilölliset oppimispolut"
            description="Tehtävät mukautuvat oppilaan taitotasoon – jokainen etenee omaan tahtiinsa."
          />
          <FeatureCard
            icon={<Award className="w-7 h-7" />}
            title="Motivoiva oppiminen"
            description="Pelilliset elementit kannustavat jatkamaan ilman turhia häiriötekijöitä."
          />
        </div>
      </Section>

      {/* Pricing Section */}
      <Section id="hinnoittelu" variant="muted">
        <SectionHeader
          title="Yksinkertainen hinnoittelu"
          subtitle="Ei piilokustannuksia, ei yllätyksiä. Valitse sinulle sopiva vaihtoehto."
        />
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
          <PricingCard
            title="Kuukausitilaus"
            price="4,99€"
            period="kk"
            description="Joustava vaihtoehto, joka sopii kokeiluun."
            features={[
              "Täysi pääsy kaikkeen sisältöön",
              "Luokkahallintatyökalut",
              "Edistymisraportit",
              "Sähköpostituki",
              "Peru milloin vain",
            ]}
            ctaText="Aloita kuukausitilaus"
            ctaHref="mailto:hello@geego.app?subject=Geego%20kuukausitilaus"
          />
          <PricingCard
            title="Vuositilaus"
            price="50€"
            period="vuosi"
            description="Paras hinta sitoutuneille opettajille."
            features={[
              "Kaikki kuukausitilauksen edut",
              "Säästä 17% vuodessa",
              "Prioriteettituki",
              "Uudet ominaisuudet ensimmäisenä",
              "Koulutuswebinaarit",
            ]}
            ctaText="Aloita vuositilaus"
            ctaHref="mailto:hello@geego.app?subject=Geego%20vuositilaus"
            popular
          />
        </div>
        <p className="text-center text-muted-foreground mt-8">
          Isompi koulu tai kunta? <a href="mailto:hello@geego.app?subject=Geego%20kuntalisenssi" className="text-primary font-semibold hover:underline">Kysy räätälöityä tarjousta</a>.
        </p>
      </Section>

      {/* CTA Section */}
      <Section className="text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Kokeile Geegoa luokassasi
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Pyydä ilmainen demo ja näe, miten Geego voi rikastuttaa opetustasi.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <a href="mailto:hello@geego.app?subject=Geego%20demo">
                Pyydä demo
              </a>
            </Button>
            <Button variant="soft" size="lg" asChild>
              <a href="mailto:hello@geego.app">
                Ota yhteyttä
              </a>
            </Button>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
