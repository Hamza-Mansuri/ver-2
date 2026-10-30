const clientLogos = [
  { name: 'Ant War', src: '/assets/logos/Ant%20war.webp' },
  { name: 'Athnex Nutrition', src: '/assets/logos/Athnex%20Nutrtion.webp' },
  { name: 'Aura Whey', src: '/assets/logos/Aura%20Whey.webp' },
  { name: 'Dexter King', src: '/assets/logos/Dexter%20king.webp' },
  { name: 'Fit Core Nutrition', src: '/assets/logos/Fit%20Core%20Nutrtion.webp' },
  { name: 'Fz Logo', src: '/assets/logos/Fz%20Logo.webp' },
  { name: 'Go Rich Nutrition', src: '/assets/logos/Go%20Rich%20Nutrtion.webp' },
  { name: 'Mcore Nutrition', src: '/assets/logos/Mcore%20Nutriion.webp' },
  { name: 'Mk Nutracare', src: '/assets/logos/Mk%20Nutracare.webp' },
  { name: 'Muscle Power', src: '/assets/logos/muscle%20power%20logo.webp' },
  { name: 'Muscleyn Nutrition', src: '/assets/logos/Muscleyn%20Nutrtion.webp' },
  { name: 'NuroX Nutrition', src: '/assets/logos/NuroX%20Nutrition.webp' },
  { name: 'Nx Nutrilabs', src: '/assets/logos/Nx%20Nutrilabs.webp' },
  { name: 'One Shot Energy', src: '/assets/logos/One%20shot%20energy.webp' },
  { name: 'Steel Stage', src: '/assets/logos/Steel%20Stage.webp' },
  { name: 'Valeo', src: '/assets/logos/Valeo.webp' },
  { name: 'Yodha Fuel', src: '/assets/logos/Yodha%20Fule.webp' },
  { name: 'Partner Brand', src: '/assets/logos/logo-black_2.webp' },
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
