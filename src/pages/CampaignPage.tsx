import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/sections/Hero";
import { Section, SectionHeader } from "@/components/sections/Section";
import { Card, TestimonialCard } from "@/components/sections/Card";
import { LogoGrid } from "@/components/sections/LogoGrid";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Calendar, Target, Users, Sparkles, ArrowRight } from "lucide-react";

const celebrities = [
  { name: "Tunnettu henkilö 1", memory: "Lapsuuden lempiohjelmat opettivat minulle..." },
  { name: "Tunnettu henkilö 2", memory: "Muistan kuinka luova leikki muokkasi ajatteluani..." },
  { name: "Tunnettu henkilö 3", memory: "Parhaat muistoni liittyvät sisältöön, joka inspiroi..." },
  { name: "Tunnettu henkilö 4", memory: "Vanhempani antoivat minun tutkia ja oppia..." },
];

const partners = [
  { name: "Kumppani 1" },
  { name: "Kumppani 2" },
  { name: "Kumppani 3" },
  { name: "Kumppani 4" },
  { name: "Kumppani 5" },
  { name: "Kumppani 6" },
];

export default function CampaignPage() {
  return (
    <Layout>
      <SEO 
        title="Sisältö ratkaisee – 3kk haaste perheille | Geego"
        description="Kolmen kuukauden kansallinen haaste suomalaisille perheille: vaihda aivot tylsistyttävä ruutuaika sisältöön, joka kasvattaa lasta."
      />
      {/* Hero Section */}
      <Hero
        title="Sisältö ratkaisee."
        subtitle="Kolmen kuukauden kansallinen haaste perheille: vaihda aivot tylsistyttävä ruutuaika sisältöön, joka kasvattaa lasta. Osallistu ilmaiseksi."
        highlight="🇫🇮 Suomi-kampanja"
      >
        <Button variant="hero" size="lg" asChild>
          <Link to="/fi/lataa" className="flex items-center gap-2">
            Osallistu haasteeseen
            <ArrowRight className="w-5 h-5" />
          </Link>
        </Button>
      </Hero>

      {/* What is the Challenge */}
      <Section>
        <SectionHeader
          title="Mikä on Sisältö ratkaisee -haaste?"
          subtitle="Kolme kuukautta, jotka voivat muuttaa lapsesi ruutuajan pysyvästi."
        />
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <Card variant="elevated" className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-5">
              <Calendar className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-3">3 kuukautta</h3>
            <p className="text-muted-foreground">
              Sitoudu kokeilemaan laadukasta ruutuaikaa perheesi kanssa kolmen kuukauden ajan.
            </p>
          </Card>
          <Card variant="elevated" className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-secondary/10 text-secondary mb-5">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-3">Selkeä tavoite</h3>
            <p className="text-muted-foreground">
              Vaihda passivoiva sisältö aktivoivaan. Ei täydellistä, vaan parempaa.
            </p>
          </Card>
          <Card variant="elevated" className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/20 text-foreground mb-5">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-3">Yhdessä</h3>
            <p className="text-muted-foreground">
              Tuhannet perheet ympäri Suomen osallistuvat. Et ole yksin tässä.
            </p>
          </Card>
        </div>
      </Section>

      {/* Celebrity Memories */}
      <Section variant="muted">
        <SectionHeader
          title="Lapsuuden sisältö jätti jälkensä"
          subtitle="Tunnetut suomalaiset muistelevat, miten lapsuuden sisältö vaikutti heihin."
        />
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {celebrities.map((celeb) => (
            <TestimonialCard
              key={celeb.name}
              quote={celeb.memory}
              author={celeb.name}
              role="Tulossa pian"
            />
          ))}
        </div>
        <p className="text-center text-muted-foreground mt-8 italic">
          Julkaisemme muistelot kampanjan alkaessa.
        </p>
      </Section>

      {/* Partners */}
      <Section>
        <SectionHeader
          title="Kumppanit ja mahdollistajat"
          subtitle="Nämä organisaatiot tukevat Sisältö ratkaisee -haastetta."
        />
        <LogoGrid logos={partners} />
        <p className="text-center text-muted-foreground mt-8">
          Haluatko mukaan kumppaniksemme?{" "}
          <a href="mailto:hello@geego.app?subject=Sisältö%20ratkaisee%20kumppanuus" className="text-primary font-semibold hover:underline">
            Ota yhteyttä
          </a>
        </p>
      </Section>

      {/* CTA Section */}
      <Section className="text-center bg-gradient-to-b from-geego-teal-light to-background">
        <div className="max-w-2xl mx-auto">
          <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Oletko valmis muutokseen?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Lataa Geego ja aloita Sisältö ratkaisee -haaste perheesi kanssa. Se on ilmaista.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/fi/lataa" className="flex items-center gap-2">
              Lataa Geego ja osallistu
              <ArrowRight className="w-6 h-6" />
            </Link>
          </Button>
        </div>
      </Section>
    </Layout>
  );
}
