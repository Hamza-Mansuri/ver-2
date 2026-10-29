import React from 'react';
import { PageFrame, PageHero, Heading, QualityMarks, InquiryLink, TickList, RelatedSolutions, asset, type PageProps } from './PageElements';
import { expertiseContent } from './expertiseContent';

export default function PrivateLabelServicesPage({ onInquiry }: PageProps) {
  const content = expertiseContent['private-label-services'];
  const portraitStyle: React.CSSProperties = {
    width: '100%',
    aspectRatio: '379 / 438',
    objectFit: 'cover',
    objectPosition: 'center',
    borderRadius: '4px',
    background: '#f2f5ec',
    border: '1px solid #dce2d4',
  };

  return (
    <PageFrame>
      {/* Hero Banner with clean packaging lineup (Screenshot 1) */}
      <PageHero
        eyebrow={content.eyebrow}
        title={<>{content.title}<br /><em>{content.accent}</em></>}
        description="Turnkey private labeling, contract manufacturing and custom formulation across multiple health verticals."
        image={content.hero}
        variant="light"
      />

      {/* Trust Subtitle Banner Strip (Screenshot 1) */}
      <div className="gip-trust-strip">
        <div className="container">
          <p>
            India’s most trusted Private Labeling / Contract Manufacturing Company with end to end solutions across wide health verticals &amp; multiple delivery formats
          </p>
        </div>
      </div>

      {/* Section 1: Private Label Manufacturers with offset framed bottle card (Screenshot 2) */}
      <section className="gip-section" id="page-story">
        <div className="container gip-split" style={{ alignItems: 'center' }}>
          <div className="gip-split-visual">
            <div className="gip-card-frame">
              <div className="gip-card-frame-inner">
                <img
                  src={asset('your-private-lael-her.jpg')}
                  alt="Supplement container with your private label here"
                  width="552"
                  height="620"
                  loading="lazy"
                  className="gip-framed-img"
                />
              </div>
            </div>
            <p className="gip-caption">READY-TO-BRAND PACKAGING &amp; BESPOKE FORMULATION</p>
          </div>
          <div className="gip-copy">
            <p className="gip-kicker"><i />WHO WE ARE</p>
            <h2>Private Label<br /><em>Manufacturers</em></h2>
            <div className="gip-accent-bar" />
            <p>
              Private labeling is one of the easiest ways to build your brand, whether you’re an established dietary supplement company expanding your product line or a new business entering the nutritional supplement market.
            </p>
            <p>
              Gomzi Lifesciences, one of the leading private label manufacturers, offers numerous ready-to-brand supplement formulas in various dosages and delivery forms to suit your needs. Choose from pre-existing private label formulas and personalize them with your brand name, design, and packaging. As a comprehensive private label manufacturer, Gomzi Lifesciences handles everything from production to packaging, ensuring a seamless experience.
            </p>
            <p>
              When you focus on branding and marketing your products, let trusted private label manufacturers handle the manufacturing. Our supplements are pre-formulated, tested, and certified for safety and regulatory compliance. Simply add your personal touch, and your product is ready to hit the market.
            </p>
            <p>
              For further inquiries about our private label manufacturing services, please contact us for more information!
            </p>
            <TickList items={content.ticks} />
            <InquiryLink onInquiry={onInquiry} label="Explore Private Label Solutions" />
          </div>
        </div>
      </section>

      {/* Section 2: Science-Based Product Formulation (Screenshot 3 - Top) */}
      <section className="gip-section gip-topics">
        <div className="container gip-split" style={{ alignItems: 'center' }}>
          <div className="gip-split-visual">
            <div className="gip-img-rounded-wrap" style={{ maxWidth: '520px', margin: '0 auto' }}>
              <img
                src={asset('science-based-product-formulation.jpg')}
                alt="Formulation research scientist conducting precision microscopy and analytical formulation in laboratory"
                width="682"
                height="1024"
                loading="lazy"
                className="gip-feature-photo"
                style={{ aspectRatio: '3 / 3.8', objectFit: 'cover', objectPosition: 'center 15%' }}
              />
            </div>
            <p className="gip-caption">RESEARCH-BACKED ACTIVE FORMULATION &amp; INGREDIENT EFFICACY</p>
          </div>
          <div className="gip-copy">
            <p className="gip-kicker"><i />SCIENTIFIC EXCELLENCE</p>
            <h2>Science-Based<br /><em>Product Formulation</em></h2>
            <div className="gip-accent-bar" />
            <p>
              Gomzi Lifesciences scientifically designs and customizes nutritional products based on the unique needs of individual clients.
            </p>
            <p>
              New products and formulas are researched and tested prior to full-scale production. The company also directs and participates in research studies to establish consumer benefits and scientific efficacy supporting both product claims and marketing initiatives.
            </p>
            <p>
              Gomzi's team of scientists utilizes the verified results of these studies to design customized nutritional products. Gomzi has performed investigations in affiliation with renowned research institutions. The science behind our formulations ensures that our customers receive the most advanced nutritional supplements available.
            </p>
            <InquiryLink onInquiry={onInquiry} label="Discuss Custom Formulation" />
          </div>
        </div>
      </section>

      {/* Section 3: Testing and Quality Assurance (Screenshot 3 - Bottom) */}
      <section className="gip-section">
        <div className="container gip-split gip-split-reverse" style={{ alignItems: 'center' }}>
          <div className="gip-split-visual">
            <div className="gip-img-rounded-wrap">
              <img
                src={asset('quality-assured.jpg')}
                alt="Quality assured detox supplement bottle range with verified botanical actives"
                width="729"
                height="446"
                loading="lazy"
                className="gip-feature-photo"
              />
            </div>
            <p className="gip-caption">CERTIFIED QUALITY ASSURED BOTANICAL FORMULATIONS</p>
          </div>
          <div className="gip-copy">
            <p className="gip-kicker"><i />QUALITY &amp; COMPLIANCE</p>
            <h2>Testing and<br /><em>Quality Assurance</em></h2>
            <div className="gip-accent-bar" />
            <p>
              Rigorous testing and quality assurance stand at the center of our private label manufacturing process. Every formulation undergoes thorough potency, stability, and microbiological testing to ensure absolute purity and compliance with global regulatory standards.
            </p>
            <p>
              <strong>Active Botanical &amp; Herbal Formulations:</strong> Losing weight can be challenging, for which Green Coffee Bean Extract is a very potent and trusted supplement offering highly beneficial results.
            </p>
            <p>
              <strong>Chlorogenic Acid (CGA):</strong> Green Coffee Bean Extract is currently among the world's most popular weight loss supplements. As the name suggests, this supplement is extracted from finest Robusta green coffee beans.
            </p>
            <p>
              Our active formulations contain very active 50% Chlorogenic Acid, which is responsible for the effective weight loss results. It boosts metabolism and is a hunger suppressant. Green coffee beans are loaded with antioxidants and pharmacological active compounds. Two of the most important actives are Caffeine and Chlorogenic Acid.
            </p>
            <InquiryLink onInquiry={onInquiry} label="Request Quality Documentation" />
          </div>
        </div>
      </section>

      {/* Section 4: Novel Manufacturing Practices */}
      <section className="gip-section gip-topics">
        <div className="container gip-split" style={{ alignItems: 'center' }}>
          <div className="gip-split-visual">
            <div className="gip-img-rounded-wrap">
              <img
                src={asset('NOVEL-MANUFACTURING-PRACTICES.jpg')}
                alt="Novel manufacturing practices integrated process flow"
                width="729"
                height="446"
                loading="lazy"
                className="gip-feature-photo"
              />
            </div>
            <p className="gip-caption">INTEGRATED FULL-PROCESS MANUFACTURING FLOW</p>
          </div>
          <div className="gip-copy">
            <p className="gip-kicker"><i />ADVANCED PRODUCTION</p>
            <h2>Novel Manufacturing<br /><em>Practices</em></h2>
            <div className="gip-accent-bar" />
            <p>
              Our in-house research team designs and fabricates completely integrated full process flow to manufacture premium quality of health supplements and food ingredients at affordable cost.
            </p>
            <p>
              We offer the best in class health supplements and food ingredients with unmatched quality and ensure pure, natural &amp; vegan standards due to highly simplified, self-researched processes.
            </p>
            <div className="gip-about-facts" style={{ marginTop: '24px' }}>
              <div><strong>50+</strong><span>PACKAGING FORMATS</span></div>
              <div><strong>100%</strong><span>FOOD-GRADE BARRIERS</span></div>
              <div><strong>Global</strong><span>EXPORT COMPLIANT</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Brand Packaging Design & Retail Presentation */}
      <section className="gip-section">
        <div className="container gip-split gip-split-reverse" style={{ alignItems: 'center' }}>
          <div className="gip-split-visual">
            <img
              src={asset('brand-packaging-design.png')}
              alt="Brand packaging mockups, custom label proofs and brand colour swatches"
              width="1166"
              height="1349"
              loading="lazy"
              style={portraitStyle}
            />
            <p className="gip-caption">BRAND PACKAGING DESIGN: PROOFS, SWATCHES &amp; FINISHES</p>
          </div>
          <div className="gip-copy">
            <p className="gip-kicker"><i />CUSTOM PRESENTATION</p>
            <h2>Designed for your brand.<br /><em>Engineered for retail impact.</em></h2>
            <div className="gip-accent-bar" />
            <p>
              From matte-finish protein powder jars and amber UV-protective vitamin bottles to eco-friendly stand-up
              zipper pouches and single-serve stick packs, we provide turnkey packaging options with complete label design
              and regulatory compliance support.
            </p>
            <p>
              Every presentation is engineered to capture consumer attention on store shelves and digital storefronts while
              complying with mandatory dietary supplement labeling statutes.
            </p>
            <InquiryLink onInquiry={onInquiry} label="Explore Packaging Catalogue" />
          </div>
        </div>
      </section>

      {/* Section 6: Process Topics */}
      <section className="gip-section gip-topics">
        <div className="container">
          <Heading eyebrow="PRODUCT &amp; APPLICATION" title={content.topicsTitle} />
          <div className="gip-topic-grid">
            {content.topics.map(([title, text], i) => (
              <article className="gip-topic" key={title}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Project Brief Table */}
      <section className="gip-section">
        <div className="container">
          <Heading
            eyebrow="MAKE THE NEXT CONVERSATION USEFUL"
            title={<>What goes into<br /><em>your project brief?</em></>}
            description="Share these details so the team can respond with a relevant proposal."
          />
          <div className="gip-table-wrap">
            <table className="gip-table">
              <thead>
                <tr><th scope="col">Brief area</th><th scope="col">What to share</th></tr>
              </thead>
              <tbody>
                {content.specs.map(([label, text]) => (
                  <tr key={label}><td>{label}</td><td>{text}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <InquiryLink onInquiry={onInquiry} label="Talk through your requirements" />
        </div>
      </section>

      <QualityMarks />
      <RelatedSolutions onInquiry={onInquiry} />
    </PageFrame>
  );
}
