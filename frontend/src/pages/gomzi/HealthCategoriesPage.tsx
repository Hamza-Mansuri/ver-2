import { ArrowUpRight } from 'lucide-react';
import { PageFrame, PageHero, Heading, QualityMarks, asset, type PageProps } from './PageElements';

const categories = [
 ['Hair, Skin & Nails','Collagen peptides, biotin and radiant beauty nutrition formulations.','cat-skin.jpg'],
 ['Heart Health','Cardiovascular wellness concepts with CoQ10, omega-3s and antioxidants.','cat-heart.jpg'],
 ['Child Nutrition','Pediatric gummies, multivitamin syrups and age-tailored formulations.','cat-child.jpg'],
 ['Body Detox','Botanical detoxifiers, spirulina, milk thistle and cellular cleanse blends.','cat-detox.jpg'],
 ['Joint Health','Glucosamine, MSM and chondroitin for active mobility and flexibility.','cat-joint.jpg'],
 ['Women’s Health','Targeted nutrition for hormonal balance, iron vitality and prenatal wellness.','cat-women.jpg'],
 ['Men’s Health','Performance vitality, zinc-magnesium complexes and stamina support.','cat-men.jpg'],
 ['Brain Health','Nootropic botanicals, ashwagandha, brahmi and cognitive clarity blends.','cat-brain.jpg'],
 ['Weight Management','Metabolic support, Garcinia cambogia, green tea and balanced energy formats.','cat-weight.jpg'],
 ['Immune Health','High-potency vitamin C, zinc, elderberry and citrus bioflavonoid complexes.','cat-immune.jpg'],
 ['Sleep Management','Restorative evening blends with melatonin, chamomile and magnesium bisglycinate.','cat-sleep.jpg'],
 ['Multivitamins','Comprehensive daily micronutrient profiles spanning chewable, tablet and liquid formats.','cat-multivitamin.jpg'],
 ['Sugar Management','Blood glucose balance formulations with berberine, cinnamon extract and chromium.','cat-sugar.jpg'],
 ['Superfoods','Concentrated greens, moringa, spirulina and nutrient-dense plant complexes.','cat-superfood.jpg'],
 ['Sports Nutrition','Whey protein isolates, BCAAs, creatine monohydrate and pre-workout blends.','cat-sports.jpg'],
 ['Gut Health','Multi-strain probiotics, prebiotic fibres and comprehensive digestive enzyme complexes.','cat-gut.jpg'],
];
export default function HealthCategoriesPage({onInquiry}:PageProps) {
 return <PageFrame><PageHero eyebrow="HEALTH CATEGORIES" title={<>Nutrition for life.<br/><em>Ideas with purpose.</em></>} description="Explore nutrition categories for your next Gomzi product development conversation." image="health-hero.jpg" position="center 55%" />
 <section id="page-story" className="gip-section"><div className="container"><Heading eyebrow="EXPLORE THE POSSIBILITIES" title={<>Different needs.<br/><em>A thoughtful approach.</em></>} description="Choose a category to discuss your audience, formulation and preferred product format with our team."/><div className="gip-category-grid">{categories.map(([title,text,image],i)=><article className="gip-category" key={title}><div className="gip-category-photo"><img src={asset(image)} alt="" width="650" height="600" loading="lazy" decoding="async"/></div><div className="gip-category-body"><div className="gip-category-top"><span>{String(i+1).padStart(2,'0')}</span><span>NUTRITION & WELLNESS</span></div><h3>{title}</h3><p>{text}</p><button type="button" onClick={onInquiry} aria-label={`Discuss ${title}`}>Explore this category<ArrowUpRight size={17} aria-hidden="true"/></button></div></article>)}</div><p className="gip-muted-note">Categories are starting points for product discussions. Final ingredients, suitability and product claims depend on the agreed formulation and destination-market requirements.</p></div></section><QualityMarks/></PageFrame>;
}
