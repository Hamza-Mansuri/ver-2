export type ExpertiseKey = 'food-fortification' | 'private-label-services' | 'spray-dried-fat-powder' | 'micronutrient-vitamin-mineral-custom-premix' | 'api-supplement-premixes' | 'bulk-supplements-manufacturing';
export type ExpertiseContent = {
 title:string; accent:string; eyebrow:string; hero:string; introTitle:string; intro:string[]; image?:string; illustration?:'bottle'|'pouch'; caption:string; ticks:string[];
 topicsTitle:string; topics:[string,string][]; specs:[string,string][]; secondary?:{title:string;text:string;image:string};
};
export const expertiseContent:Record<ExpertiseKey,ExpertiseContent>={
  'food-fortification':{
   title:'Better nutrition.',accent:'Built into everyday food.',eyebrow:'FOOD FORTIFICATION',hero:'food-fortification-hero.jpg',introTitle:'A small addition. A considered formulation.',
   intro:['Food fortification introduces selected nutrients into a food or beverage. A useful brief starts with the food itself, the intended audience and the nutritional objective.','Discuss your application with Gomzi to explore the ingredient blend, serving size and production conditions before a sample is developed.'],
   image:'produce.jpg',caption:'ILLUSTRATIVE FOOD INGREDIENTS',ticks:['Food and beverage application','Nutrient selection and serving size','Taste, stability and process considerations'],topicsTitle:'Start with the application.',
   topics:[['Foods & staples','Consider how a nutrient blend can fit the texture and preparation of an everyday food.'],['Beverages & powders','Review dispersion, flavour and the effect of processing on the finished product.'],['Purposeful nutrition','Define the consumer group and nutritional brief before choosing the blend.']],
   specs:[['Application','Food type, processing method and serving size'],['Nutrient brief','Target nutrients and intended declaration'],['Evaluation','Pilot sample, sensory review and stability plan']]
  },
  'private-label-services':{
    title:'Your identity.',accent:'Our manufacturing partnership.',eyebrow:'PRIVATE LABEL SERVICES',hero:'Banner.jpg',introTitle:'A product that belongs to your brand.',
    intro:['Build your supplement brand with Gomzi’s support across formulation, manufacturing, packaging and launch preparation.','Begin with the product category and your audience. Then shape the formulation, format and visual identity around the requirements of your brand.'],
    image:'your-private-lael-her.jpg',caption:'READY-TO-BRAND FORMULATION & PACKAGING',ticks:['Brand-led product brief & formulation review','Complete custom packaging & label coordination','Certified safety, quality testing & regulatory compliance'],topicsTitle:'Build the detail into the process.',
    topics:[['Product identity','Clarify your audience, positioning and preferred dosage format.'],['Sample approval','Review the proposed composition and sample before agreeing the production brief.'],['Packaging coordination','Bring the brand, pack size and label information together for review.']],
    secondary:{title:'Shelf-Ready Nutrition Family',text:'From initial concept proofs to commercial shelf-ready packaging, Gomzi coordinates every format with your brand guidelines and destination-market compliance.',image:'retail-impact-collection.png'},
    specs:[['Your brief','Category, audience, format and brand positioning'],['Your identity','Logo, pack size, design direction and label text'],['Your launch','Sample approval, quantity and delivery requirements']]
   },
  'spray-dried-fat-powder':{
   title:'Functional ingredients.',accent:'A more versatile format.',eyebrow:'SPRAY DRIED FAT POWDER',hero:'functional-ingredients-banner.png',introTitle:'The convenience of a powder. The function of a fat.',
   intro:['Spray drying can transform a fat-containing emulsion into a powder with a carrier system. The resulting ingredient is selected around its intended food application.','Discuss your fat source, nutritional brief and processing requirements with Gomzi. The composition, dispersibility and finished-product behaviour should be reviewed for the specific use.'],
   image:'powder.jpg',caption:'ILLUSTRATIVE POWDER TEXTURE / NOT A PRODUCT SPECIFICATION',ticks:['Discuss the fat source and carrier','Define the intended application','Review handling and dispersion needs'],topicsTitle:'Function comes first.',
   topics:[['Beverage applications','Evaluate how the ingredient disperses and interacts with the other components in your formula.'],['Dry blends','Consider blend compatibility, handling and the nutritional declaration of the finished mix.'],['Food applications','Review sensory performance and the conditions under which the ingredient will be used.']],
   specs:[['Composition','Fat source, carrier system and allergen requirements'],['Performance','Target fat content, dispersion and sensory brief'],['Handling','Pack format, storage requirements and intended usage']]
  },
  'micronutrient-vitamin-mineral-custom-premix':{
   title:'Small nutrients.',accent:'A precise formulation brief.',eyebrow:'VITAMIN & MINERAL PREMIX',hero:'premix-hero.jpg',introTitle:'A blend shaped around your product.',
   intro:['A vitamin and mineral premix combines selected micronutrients into a blend for a defined application. The nutrient forms and quantities depend on the serving size, audience and finished-product requirements.','Share your target nutrient profile with Gomzi to discuss ingredient compatibility, blend inclusion and the evaluation required before production.'],
   image:'softgels.jpg',caption:'ILLUSTRATIVE NUTRITION FORMATS / PREMIX IS DEVELOPED TO BRIEF',ticks:['Defined nutrient profile','Serving-size and inclusion-rate review','Application-led compatibility checks'],topicsTitle:'Precision begins with the brief.',
   topics:[['Target profile','Specify the desired vitamins, minerals and amounts per serving.'],['Ingredient compatibility','Review nutrient forms and their interaction with the food matrix.'],['Consistent inclusion','Consider mixing requirements, inclusion rate and the sampling plan.']],
   specs:[['Nutrition','Audience, serving size and target nutrient declaration'],['Application','Finished format, processing and sensory requirements'],['Review','Ingredient forms, compatibility and testing requirements']]
  },
  'api-supplement-premixes':{
   title:'A defined blend.',accent:'A clearer development path.',eyebrow:'API & SUPPLEMENT PREMIXES',hero:'api-premixes-banner.png',introTitle:'Start with the composition. Define the scope.',
   intro:['Supplement premixes bring selected ingredients together for a specified product application. A clear brief identifies ingredient identity, intended use and the relevant quality documentation.','For API-related enquiries, share the exact ingredient and intended use so Gomzi can confirm the applicable scope before quoting. Pharmaceutical permissions and requirements are distinct from a nutraceutical product brief.'],
   image:'premix-composition-portrait.png',caption:'MEASURED PREMIX LABORATORY INGREDIENTS / PRECISE BLEND SPECIFICATION',ticks:['Ingredient identity and intended use','Specification and compatibility review','Documentation requirements agreed upfront'],topicsTitle:'The details that define the blend.',
   topics:[['Ingredient specification','Identify the ingredient form, required documentation and acceptance criteria.'],['Product compatibility','Consider excipients, serving size and the proposed finished format.'],['Scope confirmation','Agree the product category, market and required permissions before proceeding.']],
   specs:[['Ingredients','Names, forms, amounts and reference specifications'],['Intended use','Product category and destination market'],['Documentation','Required identity, quality and regulatory documents']]
  },
  'bulk-supplements-manufacturing':{
   title:'Your next product.',accent:'Built for your next chapter.',eyebrow:'BULK SUPPLEMENTS MANUFACTURING',hero:'bulk-manufacturing-banner.png',introTitle:'A clear brief. A considered production plan.',
   intro:['Gomzi supports B2B supplement projects across sports nutrition, whey protein and multivitamin products. Begin with the formulation, format and order requirements.','Align the sample, packaging and production brief before the batch is scheduled. Final quantities, specifications and timelines are confirmed for the individual project.'],
   image:'production-plan-portrait.png',caption:'PRODUCTION-READY UNBRANDED SUPPLEMENT PACKAGING & BATCH PLANNING',ticks:['Product and formulation brief','Sample and batch requirements','Packaging, quality review and dispatch'],topicsTitle:'Bring the product journey together.',
   topics:[['Define the batch','Agree product composition, quantity and the acceptance criteria.'],['Prepare the presentation','Choose pack sizes, labels and the required retail or bulk format.'],['Coordinate dispatch','Confirm documents, delivery requirements and the destination.']],
   secondary:{title:'Quality is part of the production brief.',text:'Agree the sampling, quality documentation and review points alongside the product specification, rather than leaving them until dispatch.',image:'bulk-quality.jpg'},
   specs:[['Product','Formula, format, flavour and pack size'],['Order','Requested quantity, samples and required schedule'],['Delivery','Destination, packaging and supporting documents']]
  },
};
