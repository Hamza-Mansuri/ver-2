import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageFrame, PageHero, Heading, QualityMarks, type PageProps } from './PageElements';
import { categoriesData } from '../../data/categoriesData';

export default function HealthCategoriesPage({ onInquiry }: PageProps) {
  return (
    <PageFrame>
      <PageHero
        eyebrow="HEALTH CATEGORIES"
        title={
          <>
            Nutrition for life.<br />
            <em>Ideas with purpose.</em>
          </>
        }
        description="Explore targeted nutrition categories engineered for your brand's next formulation and export conversation."
        image="health-hero.jpg"
        position="center 45%"
      />

      <section id="page-story" className="gip-section">
        <div className="container">
          <Heading
            eyebrow="EXPLORE THE POSSIBILITIES"
            title={
              <>
                Different needs.<br />
                <em>A thoughtful approach.</em>
              </>
            }
            description="Choose a category below to explore clinical active ingredients, available delivery formats, and manufacturing specifications."
          />

          <div className="gip-category-grid">
            {categoriesData.map((category) => (
              <article className="gip-category" key={category.slug}>
                <Link
                  to={`/health-categories/${category.slug}`}
                  className="gip-category-photo"
                  aria-label={`View ${category.title} details`}
                >
                  <img
                    src={category.image}
                    alt={`${category.title} category`}
                    width="650"
                    height="600"
                    loading="lazy"
                    decoding="async"
                  />
                </Link>

                <div className="gip-category-body">
                  <div className="gip-category-top">
                    <span>{category.number}</span>
                    <span>NUTRITION & WELLNESS</span>
                  </div>
                  <h3>
                    <Link to={`/health-categories/${category.slug}`}>{category.title}</Link>
                  </h3>
                  <p>{category.tagline}</p>
                  <Link
                    to={`/health-categories/${category.slug}`}
                    className="gip-category-action-btn"
                    aria-label={`Explore ${category.title} category`}
                  >
                    <span>Explore this category</span>
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="gip-category-cta-strip">
            <div>
              <h3>Have a custom health formulation in mind?</h3>
              <p>Our formulation scientists and regulatory experts can custom-develop and manufacture to your target specification.</p>
            </div>
            <button type="button" className="button button--lime" onClick={onInquiry}>
              Discuss your project <ArrowUpRight size={18} />
            </button>
          </div>

          <p className="gip-muted-note">
            Categories are starting points for product discussions. Final ingredients, suitability and product claims depend on the agreed formulation and destination-market requirements.
          </p>
        </div>
      </section>

      <QualityMarks />
    </PageFrame>
  );
}
