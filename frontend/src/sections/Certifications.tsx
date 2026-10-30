import { certifications } from '../data/certifications';

export default function Certifications() {
  return (
    <section className="certifications" aria-labelledby="certificate-title">
      <div className="container">
        <div className="certificate-heading">
          <span className="section-index">02 / QUALITY &amp; COMPLIANCE</span>
          <h2 id="certificate-title">
            Quality, at the heart<br />of what we do.
          </h2>
          <p>
            Recognized international standards and quality certifications from our company profile.
          </p>
        </div>
        <div className="certificate-grid">
          {certifications.map(c => (
            <figure key={c.id}>
              <img
                src={`/assets/certifications/${c.id}.webp`}
                width="96"
                height="96"
                loading="lazy"
                alt={`${c.name} certification mark`}
                onError={(e) => {
                  if (c.id === 'gpsr') {
                    (e.target as HTMLImageElement).src = '/assets/certifications/gpsr.svg';
                  }
                }}
              />
              <figcaption>{c.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
