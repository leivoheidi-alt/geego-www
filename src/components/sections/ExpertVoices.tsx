interface ExpertVoice {
  quote: string;
  name: string;
  title: string;
  image: string;
}

interface ExpertVoicesProps {
  items: ExpertVoice[];
  eyebrow?: string;
}

export function ExpertVoices({ items, eyebrow }: ExpertVoicesProps) {
  return (
    <section className="expert-voices">
      <div className="expert-voices__inner">
        {eyebrow && <span className="expert-voices__eyebrow">{eyebrow}</span>}
        <div className="expert-voices__grid">
          {items.map((item) => (
            <article key={item.name} className="expert-voice">
              <p className="expert-voice__quote">{item.quote}</p>
              <div className="expert-voice__footer">
                <img
                  src={item.image}
                  alt={item.name}
                  className="expert-voice__avatar"
                />
                <div>
                  <p className="expert-voice__name">{item.name}</p>
                  <p className="expert-voice__title">{item.title}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
