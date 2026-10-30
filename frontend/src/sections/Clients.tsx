const clientLogos = [
  { name: 'Athnex Nutrition', src: '/assets/logos/Athnex%20Nutrtion.png' },
  { name: 'Aura Whey', src: '/assets/logos/Aura%20Whey.png' },
  { name: 'Fit Core Nutrition', src: '/assets/logos/Fit%20Core%20Nutrtion.png' },
  { name: 'Go Rich Nutrition', src: '/assets/logos/Go%20Rich%20Nutrtion.png' },
  { name: 'Mcore Nutrition', src: '/assets/logos/Mcore%20Nutriion.png' },
  { name: 'Mk Nutracare', src: '/assets/logos/Mk%20Nutracare.png' },
  { name: 'Muscle Power', src: '/assets/logos/muscle%20power%20logo.png' },
  { name: 'NuroX Nutrition', src: '/assets/logos/NuroX%20Nutrition.png' },
  { name: 'Nx Nutrilabs', src: '/assets/logos/Nx%20Nutrilabs.png' },
  { name: 'Valeo', src: '/assets/logos/Valeo.png' },
];

const displayLogos = [...clientLogos, ...clientLogos];

export default function Clients() {
  return (
    <section className="clients section" aria-labelledby="clients-title">
      <div className="container">
        <div className="clients-heading">
          <span className="eyebrow">MADE FOR PARTNERSHIP</span>
          <h2 id="clients-title">Our Clients</h2>
          <p>Meaningful products begin with a strong partnership.</p>
        </div>
        <div className="client-strip client-ticker" aria-label="Our Clients">
          <div className="client-ticker-track">
            {displayLogos.map((client, idx) => (
              <div className="client-item" key={`${client.name}-${idx}`}>
                <img
                  src={client.src}
                  alt={`${client.name} logo`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
