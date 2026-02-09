import { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";

interface FaqItem {
  question: string;
  answer: string;
  content: React.ReactNode;
  slug: string;
}

function slugify(text: string) {
  return text
    .replace(/[^\p{L}\p{N}\s-]+/gu, "")
    .replace(/[äå]/gi, "a")
    .replace(/[ö]/gi, "o")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

export default function FaqPage() {
  const items = useMemo<FaqItem[]>(
    () => [
      {
        question: "📱 Mikä Geego on?",
        answer:
          "Geego on lapsille suunnattu liikunnallinen oppimissovellus, joka kehittää tasapainoa, koordinaatiota, keskittymistä ja itseluottamusta leikin ja liikkeen kautta. Geegoa voi käyttää kotona, ja joissain kouluissa ja varhaiskasvatuksessa myös osana koulupäivää.",
        content: (
          <>
            <p>
              Geego on lapsille suunnattu liikunnallinen oppimissovellus, joka kehittää
              tasapainoa, koordinaatiota, keskittymistä ja itseluottamusta leikin ja liikkeen
              kautta.
            </p>
            <p>
              Geegoa voi käyttää kotona, ja joissain kouluissa ja varhaiskasvatuksessa myös osana
              koulupäivää.
            </p>
          </>
        ),
      },
      {
        question: "📲 Mistä Geego-sovelluksen voi ladata?",
        answer:
          "Geego-sovellus on saatavilla: App Store (iOS), Google Play (Android). Hae nimellä Geego Kids.",
        content: (
          <>
            <p>Geego-sovellus on saatavilla:</p>
            <ul>
              <li>
                <a
                  href="https://apps.apple.com/fi/app/geego-kids-move-learn/id1491009994"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  App Store (iOS)
                </a>
              </li>
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.geego"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Play (Android)
                </a>
              </li>
            </ul>
          </>
        ),
      },
      {
        question: "🔐 Miten Geegoon kirjaudutaan?",
        answer:
          "Avaa sovellus ja valitse Kirjaudu / Luo tili. Luo vanhemman tili sähköpostiosoitteella. Kirjautumisen jälkeen luo lapsille pelaajaprofiilit lisäämällä lapsen nimi tai nimimerkki (Yhdelle tilille voi lisätä enintään 6 pelaajaa).",
        content: (
          <ul>
            <li>Avaa sovellus ja valitse Kirjaudu / Luo tili</li>
            <li>Luo vanhemman tili sähköpostiosoitteella</li>
            <li>
              Kirjautumisen jälkeen luo lapsille pelaajaprofiilit lisäämällä lapsen nimi tai
              nimimerkki (Yhdelle tilille voi lisätä enintään 6 pelaajaa)
            </li>
          </ul>
        ),
      },
      {
        question: "➕ Miten lisään lapsen (pelaajan)?",
        answer:
          "Mene Asetuksiin ja valitse “Lisää uusi pelaaja”. Syötä lapsen nimi tai nimimerkki ja ikä. Valmista! Lapsi voi aloittaa Geegoilun heti.",
        content: (
          <ul>
            <li>Mene Asetuksiin ja valitse “Lisää uusi pelaaja”</li>
            <li>Syötä lapsen nimi tai nimimerkki ja ikä</li>
            <li>Valmista! Lapsi voi aloittaa Geegoilun heti</li>
          </ul>
        ),
      },
      {
        question: "🏫 Miten lisään lapselle luokkakoodin?",
        answer:
          "Jos lapsen koulu tai päiväkoti käyttää Geegoa, saat luokkakoodin opettajalta. Luokkakoodin lisääminen: Avaa lapsen profiili. Valitse Lisää luokkakoodi. Syötä opettajalta saatu luokkakoodi. Tallenna. Tämän jälkeen: lapsi voi tehdä kotitehtäviä, pisteet voivat karttua myös luokalle, koti ja koulu yhdistyvät luontevasti.",
        content: (
          <>
            <p>
              Jos lapsen koulu tai päiväkoti käyttää Geegoa, saat luokkakoodin opettajalta.
            </p>
            <p>
              <strong>Luokkakoodin lisääminen:</strong>
            </p>
            <ul>
              <li>Avaa lapsen profiili</li>
              <li>Valitse Lisää luokkakoodi</li>
              <li>Syötä opettajalta saatu luokkakoodi</li>
              <li>Tallenna</li>
            </ul>
            <p>
              <strong>Tämän jälkeen:</strong>
            </p>
            <ul>
              <li>lapsi voi tehdä kotitehtäviä</li>
              <li>pisteet voivat karttua myös luokalle</li>
              <li>koti ja koulu yhdistyvät luontevasti</li>
            </ul>
          </>
        ),
      },
      {
        question: "🆓 Voiko Geegoa käyttää ilmaiseksi?",
        answer:
          "Kyllä 😊 Sovelluksessa on ilmaisia haasteita (Free Challenges), joiden avulla voit: kokeilla Geegoa ilman sitoutumista, nähdä, millaisesta liikkeestä lapsi innostuu, aloittaa geegoilun heti. Ilmaiset haasteet eivät vaadi tilausta.",
        content: (
          <>
            <p>Kyllä 😊 Sovelluksessa on ilmaisia haasteita (Free Challenges), joiden avulla voit:</p>
            <ul>
              <li>kokeilla Geegoa ilman sitoutumista</li>
              <li>nähdä, millaisesta liikkeestä lapsi innostuu</li>
              <li>aloittaa geegoilun heti</li>
            </ul>
            <p>Ilmaiset haasteet eivät vaadi tilausta.</p>
          </>
        ),
      },
      {
        question: "⭐ Mitä Geego Premium sisältää?",
        answer:
          "Geego Premium antaa käyttöön: kaikki liikuntahaasteet ja sisällöt, ikätasoisesti etenevät tehtävät, koko perheen käytön yhdellä tilillä. Hinnat: 4,90 € / kuukausi, 50 € / vuosi. Tilauksen voi perua milloin tahansa.",
        content: (
          <>
            <p>Geego Premium antaa käyttöön:</p>
            <ul>
              <li>kaikki liikuntahaasteet ja sisällöt</li>
              <li>ikätasoisesti etenevät tehtävät</li>
              <li>koko perheen käytön yhdellä tilillä</li>
            </ul>
            <p>Hinnat:</p>
            <ul>
              <li>4,90 € / kuukausi</li>
              <li>50 € / vuosi</li>
            </ul>
            <p>Tilauksen voi perua milloin tahansa.</p>
          </>
        ),
      },
      {
        question: "📱 Millä laitteilla Geego toimii?",
        answer:
          "Geego toimii: älypuhelimella, tabletilla. Lisäksi Geego toimii kouluissa ja kodeissa myös selaimella osoitteessa: desktop.geegokids.com. Huomioithan, että selainversio ei ole pelillistetty eikä sisällä sovelluksen suositteluominaisuuksia. Se on tarkoitettu erityisesti ohjattuun käyttöön esimerkiksi koulussa. Erillisiä välineitä ei tarvita, ja liikkumiseen riittää pieni tila.",
        content: (
          <>
            <p>Geego toimii:</p>
            <ul>
              <li>älypuhelimella</li>
              <li>tabletilla</li>
            </ul>
            <p>
              Lisäksi Geego toimii kouluissa ja kodeissa myös selaimella osoitteessa:
              <br />
              👉 desktop.geegokids.com
            </p>
            <p>
              Huomioithan, että selainversio ei ole pelillistetty eikä sisällä sovelluksen
              suositteluominaisuuksia. Se on tarkoitettu erityisesti ohjattuun käyttöön esimerkiksi
              koulussa.
            </p>
            <p>Erillisiä välineitä ei tarvita, ja liikkumiseen riittää pieni tila.</p>
          </>
        ),
      },
      {
        question: "🧠 Pitääkö vanhemman ohjata lasta koko ajan?",
        answer:
          "Ei tarvitse. Geego on suunniteltu niin, että: lapsi voi seurata ohjeita itsenäisesti, liikkeet ovat selkeitä ja turvallisia, vanhempi voi halutessaan osallistua tai vain seurata. Monet lapset käyttävät Geegoa täysin omatoimisesti.",
        content: (
          <>
            <p>Ei tarvitse. Geego on suunniteltu niin, että:</p>
            <ul>
              <li>lapsi voi seurata ohjeita itsenäisesti</li>
              <li>liikkeet ovat selkeitä ja turvallisia</li>
              <li>vanhempi voi halutessaan osallistua tai vain seurata</li>
            </ul>
            <p>Monet lapset käyttävät Geegoa täysin omatoimisesti.</p>
          </>
        ),
      },
      {
        question: "🔒 Onko Geego turvallinen lapsille?",
        answer:
          "Kyllä. Ei mainoksia. Ei ulkopuolista viestintää. Ei sosiaalisen median ominaisuuksia. Sisältö on suunniteltu erityisesti lapsille. Kaikki tiedot käsitellään tietosuojalainsäädännön mukaisesti.",
        content: (
          <>
            <p>Kyllä.</p>
            <ul>
              <li>Ei mainoksia</li>
              <li>Ei ulkopuolista viestintää</li>
              <li>Ei sosiaalisen median ominaisuuksia</li>
              <li>Sisältö on suunniteltu erityisesti lapsille</li>
            </ul>
            <p>Kaikki tiedot käsitellään tietosuojalainsäädännön mukaisesti.</p>
          </>
        ),
      },
      {
        question: "🆘 Mistä saan apua, jos jokin ei toimi?",
        answer:
          "Jos tarvitset apua, ota yhteyttä asiakastukeen sähköpostitse: info@geegokids.com. Autamme mielellämme 💚",
        content: (
          <p>
            Jos tarvitset apua, ota yhteyttä asiakastukeen sähköpostitse: info@geegokids.com
            <br />
            Autamme mielellämme 💚
          </p>
        ),
      },
      {
        question: "❤️ Miksi Geego?",
        answer:
          "Koska liike ei ole suoritus. Se on lapsen tapa kasvaa, oppia ja vahvistaa itseluottamustaan.",
        content: (
          <>
            <p>Koska liike ei ole suoritus.</p>
            <p>Se on lapsen tapa kasvaa, oppia ja vahvistaa itseluottamustaan.</p>
          </>
        ),
      },
    ].map((item) => ({
      ...item,
      slug: slugify(item.question),
    })),
    []
  );

  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setOpenItems((prev) => ({ ...prev, [hash]: true }));
      const target = document.getElementById(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [items]);

  const setAll = (open: boolean) => {
    const next: Record<string, boolean> = {};
    items.forEach((item) => {
      next[item.slug] = open;
    });
    setOpenItems(next);
  };

  // Copy-link removed per design

  return (
    <Layout>
      <SEO
        title="FAQ | Geego Kids"
        description="Usein kysytyt kysymykset Geego Kids -sovelluksesta, lataamisesta, kirjautumisesta, turvallisuudesta ja Premiumista."
      />
      <section className="faq-page">
        <div className="faq-page__inner">
          <header className="faq-page__header">
            <h1>FAQ</h1>
            <div className="faq-page__controls">
              <button type="button" className="faq-page__control" onClick={() => setAll(true)}>
                Avaa kaikki
              </button>
              <button type="button" className="faq-page__control" onClick={() => setAll(false)}>
                Sulje kaikki
              </button>
            </div>
          </header>

          <div className="faq-list">
            {items.map((item) => {
              const isOpen = Boolean(openItems[item.slug]);
              const answerId = `${item.slug}-answer`;
              const buttonId = `${item.slug}-button`;
              return (
                <div key={item.slug} id={item.slug} className="faq-item">
                  <div className="faq-item__header">
                    <button
                      id={buttonId}
                      className="faq-item__toggle"
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() =>
                        setOpenItems((prev) => ({
                          ...prev,
                          [item.slug]: !prev[item.slug],
                        }))
                      }
                    >
                      <h2 className="faq-item__question">{item.question}</h2>
                      <span className="faq-item__icon" aria-hidden="true">
                        {isOpen ? "–" : "+"}
                      </span>
                    </button>
                  </div>
                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`faq-item__content ${isOpen ? "is-open" : ""}`}
                  >
                    {item.content}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
