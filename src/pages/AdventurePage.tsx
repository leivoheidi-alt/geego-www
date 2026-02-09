import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { AdventureGame } from "@/components/adventure/AdventureGame";

export default function AdventurePage() {
  return (
    <Layout>
      <SEO
        title="Geego Perheseikkailu"
        description="10 minuutin perheseikkailu: seitsemän rastia, kaksi tasoa, paljon naurua."
      />
      <AdventureGame />
    </Layout>
  );
}
