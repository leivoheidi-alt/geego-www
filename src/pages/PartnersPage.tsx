import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";

export default function PartnersPage() {
  return (
    <Layout>
      <SEO
        title="Kumppanit | Geego Kids"
        description="Tietoa Geego Kids -kumppanuuksista. Tulossa pian."
      />
      <section className="partners-page">
        <div className="partners-page__inner">
          <h1>Kumppanit</h1>
          <p>Tulossa pian. Ota yhteyttä: info@geegokids.com</p>
        </div>
      </section>
    </Layout>
  );
}
