export interface HealthCategoryDetail {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  image: string;
  overview: string;
  keyIngredients: { name: string; benefit: string }[];
  deliveryFormats: { format: string; description: string }[];
  marketInsights: string[];
  formulationAdvantages: string[];
  specifications: { label: string; value: string }[];
  faqs: { question: string; answer: string }[];
}

export const categoriesData: HealthCategoryDetail[] = [
  {
    slug: 'hair-skin-and-nails',
    number: '01',
    title: 'Hair, Skin & Nails',
    tagline: 'Collagen peptides, pharmaceutical-grade biotin, and cellular radiant beauty nutrition.',
    image: '/assets/gomzi-pages/cat-skin.jpg',
    overview: 'The nutricosmetics and ingestible beauty sector demands bioactive collagen peptides, botanical antioxidants, and vital cofactors that nourish dermis, hair follicles, and nail beds from within. We formulate bioavailable beauty supplements designed for visible consumer efficacy.',
    keyIngredients: [
      { name: 'Hydrolyzed Marine Collagen Peptides', benefit: 'Type I & III low-molecular-weight peptides for dermal elasticity and collagen matrix density.' },
      { name: 'Pure D-Biotin (Vitamin B7)', benefit: 'Supports keratin synthesis for thicker hair shaft diameter and resilient nail plates.' },
      { name: 'Fermented Hyaluronic Acid', benefit: 'Locks deep cellular hydration and restores plumpness to aging dermis.' },
      { name: 'Reduced L-Glutathione', benefit: 'Potent cellular antioxidant inhibiting melanin synthesis for luminous, even skin tone.' },
      { name: 'Bamboo Silica Extract (70% Organic)', benefit: 'Strengthens structural connective tissue and prevents hair breakage.' }
    ],
    deliveryFormats: [
      { format: 'Pectin Beauty Gummies', description: 'Strawberry and berry flavored chewables with zero gelatin and high temperature stability.' },
      { format: 'Effervescent Glow Tablets', description: 'Fast-dissolving effervescents delivering instant hydration and active antioxidants.' },
      { format: 'Single-Serve Collagen Sachets', description: 'Micro-dissolvable 5g to 10g collagen powder sticks for smoothies and coffee blending.' },
      { format: 'Vegetarian HPMC Capsules', description: 'High-density vegetarian capsules packed with botanical extracts and antioxidant complexes.' }
    ],
    marketInsights: [
      'Fastest growing category in Southeast Asia, Middle East, and North American retail channels.',
      'Massive consumer migration from topical cosmetics to ingestible wellness supplements.',
      'High repeat purchase rate when combined with delicious berry/citrus fruit flavor systems.'
    ],
    formulationAdvantages: [
      'Odor-free, neutral-tasting marine and bovine collagen peptides',
      'Advanced microencapsulation for moisture-sensitive glutathione and biotin',
      'Sugar-free and low-glycemic formulation options for keto and beauty brands'
    ],
    specifications: [
      { label: 'Collagen Molecular Weight', value: '< 2,000 Daltons for rapid gastrointestinal uptake' },
      { label: 'Minimum Batch Run', value: 'Flexible private-label MOQs starting from 1,000 units' },
      { label: 'Export Certifications', value: 'Halal Certified, FSSAI Export, US FDA cGMP, ISO 22000' },
      { label: 'Stability Shelf Life', value: '24 Months under ambient tropical conditions' }
    ],
    faqs: [
      { question: 'Can you manufacture 100% vegetarian beauty formulations?', answer: 'Yes! We formulate vegan collagen builders using amino acid blends, bamboo silica, vitamin C, and hyaluronic acid.' },
      { question: 'Are your beauty gummies melting-resistant for warm climates?', answer: 'Yes, our proprietary 100% citrus pectin matrix withstands temperatures up to 45°C without deformation.' }
    ]
  },
  {
    slug: 'heart-health',
    number: '02',
    title: 'Heart Health',
    tagline: 'Cardiovascular wellness concepts powered by CoQ10, omega-3s, and arterial antioxidants.',
    image: '/assets/gomzi-pages/cat-heart.jpg',
    overview: 'Targeted cardiovascular wellness is essential for healthy longevity. Our heart formulations combine cellular energy catalysts like CoQ10, fermented red yeast rice, botanical polyphenols, and microencapsulated phytosterols to support arterial elasticity, healthy blood lipids, and optimal cardiac muscle function.',
    keyIngredients: [
      { name: 'Ubiquinone & Ubiquinol (CoQ10)', benefit: 'Vital cellular bioenergetics catalyst supporting mitochondrial ATP in cardiac tissue.' },
      { name: 'High-EPA/DHA Marine Omega-3', benefit: 'Purified triglyceride-form fatty acids promoting balanced triglyceride levels and arterial flexibility.' },
      { name: 'Fermented Red Yeast Rice (Monacolin K)', benefit: 'Naturally supports healthy LDL and total cholesterol homeostasis.' },
      { name: 'Standardized Hawthorn Berry Extract', benefit: 'Promotes coronary blood flow, vascular relaxation, and balanced blood pressure.' },
      { name: 'Trans-Resveratrol 98%', benefit: 'Potent sirtuin activator protecting endothelial walls from oxidative stiffness.' }
    ],
    deliveryFormats: [
      { format: 'Seamless Softgel Capsules', description: 'Nitrogen-flushed enteric-coated softgels eliminating fishy reflux and oxidative rancidity.' },
      { format: 'Two-Piece HPMC Capsules', description: 'Dry powder formulations featuring microencapsulated CoQ10 and herbal polyphenol blends.' },
      { format: 'Instantized Drink Mixes', description: 'Beetroot and nitric oxide boosting cardio powders for morning heart vitality drinks.' }
    ],
    marketInsights: [
      'High lifetime value category with strong recurring subscription models.',
      'Growing demand among adults aged 35+ seeking preventative cardiovascular nutrition.',
      'Significant export demand across GCC, CIS regions, and European distribution networks.'
    ],
    formulationAdvantages: [
      'Micro-emulsified CoQ10 with 3x higher bioavailability than standard crystalline powder',
      'Zero fishy aftertaste via natural lemon and rosemary antioxidant preservation',
      'Heavy-metal free marine sources with certified batch testing for mercury, dioxins, and PCBs'
    ],
    specifications: [
      { label: 'EPA/DHA Ratio Options', value: 'Custom 18:12, 33:22, or high-EPA 50:20 concentrations' },
      { label: 'Quality Verification', value: 'Peroxide Value (PV) < 5 meq/kg, Anisidine Value (AV) < 15' },
      { label: 'Packaging Formats', value: 'Amber HDPE bottles, blister packs with desiccant film' },
      { label: 'Standard Shelf Life', value: '24 Months' }
    ],
    faqs: [
      { question: 'Do you offer vegan heart health formulas?', answer: 'Yes, we utilize algal omega-3 oils, phytosterols, and fermented CoQ10 for 100% plant-based cardio solutions.' },
      { question: 'Can you formulate custom nitric oxide booster powders?', answer: 'Yes, we blend L-arginine, L-citrulline, and fermented red beet extract for potent vascular nitric oxide release.' }
    ]
  },
  {
    slug: 'child-nutrition',
    number: '03',
    title: 'Child Nutrition',
    tagline: 'Pediatric gummies, multivitamin syrups, and age-tailored growth formulations.',
    image: '/assets/gomzi-pages/cat-child.jpg',
    overview: 'Children require precision nutrient balances wrapped in delightful, clean-label formats they love taking daily. We formulate pediatrician-approved growth formulas, brain-supporting DHA gummies, and immune shields using natural fruit juices and zero artificial colorants.',
    keyIngredients: [
      { name: 'Algal DHA (Docosahexaenoic Acid)', benefit: 'Vegetarian omega-3 essential for early childhood retinal and cognitive synaptic development.' },
      { name: 'Active Vitamin D3 & K2 (MK-7)', benefit: 'Directs calcium into growing bone matrix for optimal skeletal density and stature.' },
      { name: 'Bioavailable Zinc Bisglycinate', benefit: 'Gentle, non-irritating zinc supporting cellular immunity and appetite balance.' },
      { name: 'Natural Elderberry & Vitamin C', benefit: 'Broad-spectrum seasonal defense protecting school-age children.' },
      { name: 'Prebiotic Fructooligosaccharides (FOS)', benefit: 'Feeds beneficial pediatric microbiota to promote nutrient absorption and smooth digestion.' }
    ],
    deliveryFormats: [
      { format: 'Animal & Star Shaped Gummies', description: '100% pectin vegan gummies in mango, strawberry, and citrus with natural colors from beetroot and turmeric.' },
      { format: 'Palatable Pediatric Syrups', description: 'Great-tasting liquid drops and syrups free of artificial parabens, sugar-loaded syrups, or synthetic dyes.' },
      { format: 'Melt-in-Mouth Powder Sachets', description: 'Direct-dissolving micro-granules designed to be poured directly onto the tongue or mixed with milk.' }
    ],
    marketInsights: [
      'Parents strongly prioritize clean-label, low-sugar or zero-sugar options with organic credentials.',
      'Gummies represent over 65% of all new pediatric supplement launches worldwide.',
      'High brand loyalty among parents who find a supplement their children take willingly.'
    ],
    formulationAdvantages: [
      'Strict pediatric heavy metal and microbial tolerance standards (exceeding adult thresholds)',
      'Natural fruit flavor masking of bitter B-complex and mineral notes',
      'Child-resistant cap closures with tamper-evident seals on every bottle'
    ],
    specifications: [
      { label: 'Sugar Profile', value: 'Sugar-free (Maltitol/Stevia) or Organic Cane Sugar options' },
      { label: 'Gummy Base', value: '100% Pectin (Gelatin-Free / Halal / Vegan)' },
      { label: 'Compliance Standards', value: 'FSSAI Child Nutrition Guidelines, Codex Alimentarius' },
      { label: 'Production Batch Sizes', value: 'From 50,000 bottles or 250,000 gummies' }
    ],
    faqs: [
      { question: 'Are your children’s gummies choking-hazard tested?', answer: 'Yes, our gummy shapes and soft chew textures are engineered to disintegrate rapidly with chewing.' },
      { question: 'Do you use synthetic food colors like Red 40 or Yellow 5?', answer: 'Never. All our child formulations use natural botanical colors extracted from black carrot, spirulina, and paprika.' }
    ]
  },
  {
    slug: 'body-detox',
    number: '04',
    title: 'Body Detox',
    tagline: 'Botanical detoxifiers, spirulina, milk thistle, and cellular liver cleanse complexes.',
    image: '/assets/gomzi-pages/cat-detox.jpg',
    overview: 'Modern lifestyle stresses, processed diets, and environmental toxins tax natural filtration organs. Our detoxification and liver support formulations activate Phase I and Phase II hepatic detoxification enzymes, flush metabolic waste, and neutralize oxidative stress.',
    keyIngredients: [
      { name: 'Standardized Milk Thistle (80% Silymarin)', benefit: 'Regenerates hepatocytes and stimulates hepatic protein synthesis against toxin insult.' },
      { name: 'N-Acetyl Cysteine (NAC)', benefit: 'Direct precursor to endogenous glutathione, the body’s master intracellular detoxifier.' },
      { name: 'Organic Broken-Cell Wall Chlorella', benefit: 'Natural heavy-metal chelator binding environmental impurities in the gastrointestinal tract.' },
      { name: 'Dandelion Root & Artichoke Extract', benefit: 'Stimulates bile production and digestive enzyme secretion for thorough toxin elimination.' },
      { name: 'Alpha Lipoic Acid (ALA)', benefit: 'Universal fat- and water-soluble antioxidant recycling vitamins C, E, and glutathione.' }
    ],
    deliveryFormats: [
      { format: 'Cellular Cleanse Capsules', description: 'Vegetarian capsules containing targeted botanical extracts and sulfur-bearing amino acids.' },
      { format: 'Green Superfood Detox Powders', description: 'Effortlessly mixable alkalizing greens with spirulina, wheatgrass, and matcha.' },
      { format: 'Detox Tea Sachets & Liquid Elixirs', description: 'Instantized botanical herbal blends for morning and evening cleansing rituals.' }
    ],
    marketInsights: [
      'Huge seasonal surges in Q1 (New Year resets) and post-holiday wellness campaigns.',
      'Strong appeal across both fitness enthusiasts and everyday lifestyle consumers.',
      'Excellent pairing potential with weight management and gut health product ranges.'
    ],
    formulationAdvantages: [
      'High-potency botanical standardization ensuring verifiable active marker compounds',
      'Synergistic inclusion of lipotropic factors (choline, inositol, methionine)',
      'Clean earthy taste profiles balanced with natural spearmint, lemon, or ginger'
    ],
    specifications: [
      { label: 'Silymarin Assay', value: 'HPLC verified >= 80% total silymarin content' },
      { label: 'Heavy Metal Compliance', value: 'ICP-MS verified Lead < 0.5 ppm, Cadmium < 0.3 ppm' },
      { label: 'Packaging Options', value: 'Matte green HDPE bottles, luxury paper tubes, daily sachet strips' },
      { label: 'Standard Shelf Life', value: '24 Months' }
    ],
    faqs: [
      { question: 'Can you formulate non-laxative daily detox supplements?', answer: 'Yes! We focus on physiological cellular liver and kidney support without harsh stimulant laxatives.' },
      { question: 'Can this be combined with metabolism-boosting thermogenics?', answer: 'Yes, we create dual-action "Detox & Burn" hybrid formulations combining silymarin with green tea extract.' }
    ]
  },
  {
    slug: 'joint-health',
    number: '05',
    title: 'Joint Health',
    tagline: 'Glucosamine, MSM, chondroitin, and mobile cartilage rejuvenation for active living.',
    image: '/assets/gomzi-pages/cat-joint.jpg',
    overview: 'From aging seniors to high-performance athletes, joint cartilage and synovial fluid need specialized structural precursors. Our joint and mobility formulations combine fast-acting botanical anti-inflammatories like Boswellia and curcumin with restorative chondroprotective glycosaminoglycans.',
    keyIngredients: [
      { name: 'Glucosamine Sulfate Potassium Salt', benefit: 'Essential building block for cartilage proteoglycans and synovial fluid replenishment.' },
      { name: 'Pure Methylsulfonylmethane (MSM)', benefit: 'Organic sulfur donor reducing exercise-induced joint inflammation and stiffness.' },
      { name: 'Avian/Bovine Chondroitin Sulfate', benefit: 'Inhibits cartilage-degrading enzymes while drawing water into structural joint tissues.' },
      { name: 'Boswellia Serrata (30% AKBA)', benefit: 'Clinically shown to inhibit 5-LOX inflammatory pathway and provide rapid comfort within 7 days.' },
      { name: 'Curcumin 95% + BioPerine®', benefit: 'High-absorption turmeric extract modulating NF-kB inflammatory cascades.' }
    ],
    deliveryFormats: [
      { format: 'Coated Mobility Tablets', description: 'Smooth film-coated caplets designed for effortless swallowing of high-potency daily doses.' },
      { format: 'Joint Comfort Gummies', description: 'Chewable glucosamine and turmeric gummies appealing to seniors and pill-averse consumers.' },
      { format: 'Collagen-Infused Joint Drink Mix', description: 'Berry-flavored drink powder combining Type II collagen, MSM, and hyaluronic acid.' }
    ],
    marketInsights: [
      'Consistently ranks among the top 5 global supplement categories by sales volume.',
      'Extremely high customer retention and chronic daily compliance among aging demographics.',
      'Expanding rapidly into the active lifestyle and crossfit/marathon runner fitness markets.'
    ],
    formulationAdvantages: [
      'Dual-action formulation architecture: Fast-relief botanicals + long-term cartilage repair',
      'Vegetarian glucosamine alternatives available (fermented corn source)',
      'Low sodium options utilizing potassium salt complexes'
    ],
    specifications: [
      { label: 'Dosage Formats', value: '1,500mg Glucosamine / 1,200mg Chondroitin industry benchmark' },
      { label: 'Disintegration Time', value: '< 20 minutes in simulated gastric fluid' },
      { label: 'Manufacturing Standards', value: 'US FDA cGMP, WHO-GMP, ISO 22000' },
      { label: 'Packaging', value: '60, 90, 120-count bottles or blister packs' }
    ],
    faqs: [
      { question: 'Do you offer shellfish-free glucosamine for allergic consumers?', answer: 'Yes, we formulate with non-GMO fermented vegetarian glucosamine hydrochloride.' },
      { question: 'Can you formulate Type II undenatured collagen for joints?', answer: 'Yes, we offer native UC-II® type formulations requiring only small 40mg daily capsules.' }
    ]
  },
  {
    slug: 'womens-health',
    number: '06',
    title: 'Women’s Health',
    tagline: 'Targeted nutrition for hormonal balance, iron vitality, prenatal care, and active menopause.',
    image: '/assets/gomzi-pages/cat-women.jpg',
    overview: 'Women experience distinct physiological transitions throughout life—from menstrual regularity and fertility to pregnancy, postpartum recovery, and menopause. Our women’s health portfolio provides hormone-modulating botanicals, gentle chelated iron, and methylated folates.',
    keyIngredients: [
      { name: 'Myo-Inositol & D-Chiro-Inositol (40:1)', benefit: 'Restores ovarian insulin sensitivity and regular ovulatory cycles in PCOS management.' },
      { name: 'Ferrous Bisglycinate (Chelated Iron)', benefit: 'Highly absorbed, non-constipating gentle iron preventing anemia and fatigue.' },
      { name: 'L-Methylfolate (5-MTHF)', benefit: 'Active, bioavailable folate bypassing MTHFR genetic polymorphisms for prenatal safety.' },
      { name: 'Evening Primrose Oil (10% GLA)', benefit: 'Essential gamma-linolenic acid easing premenstrual breast tenderness and mood swings.' },
      { name: 'Black Cohosh & Red Clover Extract', benefit: 'Phytoestrogen complexes providing natural relief from menopausal hot flashes and night sweats.' }
    ],
    deliveryFormats: [
      { format: 'Targeted Dual-Release Capsules', description: 'Beadlet-in-capsule technology releasing vitamins and evening primrose oil smoothly.' },
      { format: 'Pre & Postnatal Powder Blends', description: 'Nutrient-rich drink mixes fortified with DHA, iron, calcium, and B-complex.' },
      { format: 'Hormone Balance Gummies', description: 'Delicious cranberry and peach gummies packed with inositol and chasteberry extract.' }
    ],
    marketInsights: [
      'High growth category with distinct lifecycle sub-segments: PMS, Fertility, Prenatal, Menopause.',
      'Strong willingness to pay a premium for certified clean-label, bioavailable ingredients.',
      'Booming D2C brand interest in PCOS support and cycle-synced supplement subscriptions.'
    ],
    formulationAdvantages: [
      'Gentle on the stomach: Chelated minerals avoiding nausea and constipation',
      'Clinical 40:1 physiological ratio of Myo-Inositol to D-Chiro-Inositol',
      'Certified non-GMO, vegan, and hormone-free manufacturing protocols'
    ],
    specifications: [
      { label: 'Iron Form', value: 'Ferrochel® / Ferrous Bisglycinate Chelate' },
      { label: 'Folate Active Form', value: 'Quatrefolic® / (6S)-5-Methyltetrahydrofolate' },
      { label: 'Export Documentation', value: 'Full technical dossier with stability data' },
      { label: 'Shelf Life', value: '24 Months' }
    ],
    faqs: [
      { question: 'Do you formulate non-nausea prenatal vitamins?', answer: 'Yes! We formulate with gentle bisglycinate minerals and ginger root extract to soothe morning sickness.' },
      { question: 'Can you manufacture cranberry urinary tract health supplements?', answer: 'Yes, we formulate high-PAC standardized cranberry extract with D-mannose and women-specific probiotics.' }
    ]
  },
  {
    slug: 'mens-health',
    number: '07',
    title: 'Men’s Health',
    tagline: 'Performance vitality, zinc-magnesium complexes, prostate care, and stamina support.',
    image: '/assets/gomzi-pages/cat-men.jpg',
    overview: 'Men face specific wellness challenges surrounding testosterone optimization, prostate health, cardiovascular stamina, and physical vitality. We formulate high-potency male wellness products integrating clinically studied botanicals like ashwagandha, shilajit, saw palmetto, and zinc-magnesium complexes.',
    keyIngredients: [
      { name: 'Purified Shilajit (50% Fulvic Acid)', benefit: 'Rich in 84+ ionic trace minerals, enhances cellular ATP and supports free testosterone.' },
      { name: 'KSM-66® Ashwagandha Root Extract', benefit: 'Reduces cortisol, enhances male sexual vigor, and boosts muscle strength and recovery.' },
      { name: 'Saw Palmetto Berry (45% Fatty Acids)', benefit: 'Natural 5-alpha reductase inhibitor supporting normal prostate size and urinary flow.' },
      { name: 'Zinc Monomethionine & Magnesium Aspartate (ZMA)', benefit: 'Essential cofactor complex supporting nighttime testosterone synthesis and deep sleep.' },
      { name: 'Korean Red Ginseng 20% Ginsenosides', benefit: 'Adaptogenic root promoting nitric oxide production, physical endurance, and erectile vigor.' }
    ],
    deliveryFormats: [
      { format: 'High-Density Male Vitality Tablets', description: 'Concentrated multi-herb caplets featuring matte coating and premium masculine branding.' },
      { format: 'Vegetarian HPMC Capsules', description: 'Clean-label capsules featuring purified shilajit resin extract and standardized botanicals.' },
      { format: 'Instant Energy & Stamina Shots', description: 'Concentrated 60ml liquid vitality shots for pre-workout or endurance vigor.' }
    ],
    marketInsights: [
      'Exponential growth in testosterone support and longevity supplements across men aged 25 to 55.',
      'Strong crossover between sports performance brands and everyday men’s vitality lines.',
      'High average order value with strong subscription reorder rates.'
    ],
    formulationAdvantages: [
      '100% free of synthetic hormones or banned anabolic substances',
      'HPLC standardized fulvic acid and withanolide marker guarantees',
      'Dark amber and black packaging compatibility for bold shelf appeal'
    ],
    specifications: [
      { label: 'Active Marker Guarantee', value: '5% Withanolides (HPLC), 50% Fulvic Acid' },
      { label: 'WADA Compliance', value: 'Batch screening for prohibited and anabolic substances' },
      { label: 'Packaging Types', value: 'Matte black bottles, luxury blister cartons, tin canisters' },
      { label: 'Standard Shelf Life', value: '24 Months' }
    ],
    faqs: [
      { question: 'Do you formulate prostate health supplements for older men?', answer: 'Yes! We blend saw palmetto, beta-sitosterol, stinging nettle, lycopene, and zinc.' },
      { question: 'Can you provide liquid shilajit resin or drops?', answer: 'Yes, we manufacture purified water-soluble shilajit resin drops with calibrated glass pipettes.' }
    ]
  },
  {
    slug: 'brain-health',
    number: '08',
    title: 'Brain Health',
    tagline: 'Nootropic botanicals, ashwagandha, brahmi, and cognitive focus formulations.',
    image: '/assets/gomzi-pages/cat-brain.jpg',
    overview: 'In an era of cognitive overload and demanding work schedules, consumers seek sustained mental focus, working memory, and mental clarity without nervous caffeine jitters. We formulate neuroprotective nootropics, cholinergic brain supplements, and adaptogenic memory enhancers.',
    keyIngredients: [
      { name: 'Bacopa Monnieri (50% Bacosides)', benefit: 'Traditional Brahmi enhancing synaptic transmission and spatial working memory.' },
      { name: 'Lion’s Mane Mushroom (30% Beta-Glucans)', benefit: 'Stimulates Nerve Growth Factor (NGF) synthesis for neurogenesis and neuronal plasticity.' },
      { name: 'Alpha-GPC (L-Alpha Glycerylphosphorylcholine)', benefit: 'Direct precursor to acetylcholine, the neurotransmitter responsible for attention and focus.' },
      { name: 'L-Theanine 99% Pure', benefit: 'Promotes calming alpha brainwave activity, smoothing out cognitive stimulant peaks.' },
      { name: 'Phosphatidylserine (PS)', benefit: 'Vital component of neuronal cell membranes supporting neurochemical communication and memory.' }
    ],
    deliveryFormats: [
      { format: 'Nootropic Focus Capsules', description: 'Multi-compound capsules formulated for morning productivity, coding, or studying.' },
      { format: 'Cognitive Brain Gummies', description: 'Brain-shaped chewable gummies delivering botanical nootropics in a fun, accessible format.' },
      { format: 'Instant Nootropic Coffee / Drink Mix', description: 'Micro-ground beverage powders combining Lion’s Mane and Bacopa with cold brew.' }
    ],
    marketInsights: [
      'Massive popularity among esports gamers, tech professionals, students, and active executives.',
      'Consumers actively avoid heavy caffeine crashes, preferring sustained clean cognitive flow.',
      'High social media virality and community-driven brand engagement.'
    ],
    formulationAdvantages: [
      'Stimulant-free and micro-caffeine hybrid formulation options',
      'Standardized herbal bacoside guarantees for verified memory outcomes',
      'Water-dispersible powders designed for crystal clear beverage solubility'
    ],
    specifications: [
      { label: 'Standardized Markers', value: '50% Bacosides, 30% Polysaccharides, 50% Alpha-GPC' },
      { label: 'Allergen Profile', value: 'Soy-Free (Sunflower-derived Phosphatidylserine)' },
      { label: 'Packaging', value: 'UV-blocking amber bottles, pocket blister packs' },
      { label: 'Shelf Life', value: '24 Months' }
    ],
    faqs: [
      { question: 'Can you formulate daytime focus and nighttime cognitive reset products?', answer: 'Yes! We create dual AM/PM nootropic stacks tailored for day focus and evening neuro-recovery.' },
      { question: 'Do you offer clean mushroom dual-extract blends?', answer: 'Yes, we supply 100% fruiting body organic Lion’s Mane, Reishi, and Cordyceps extracts.' }
    ]
  },
  {
    slug: 'weight-management',
    number: '09',
    title: 'Weight Management',
    tagline: 'Metabolic support, Garcinia cambogia, green tea, and balanced energy nutrition.',
    image: '/assets/gomzi-pages/cat-weight.jpg',
    overview: 'Healthy weight management combines appetite satiety, thermogenic calorie expenditure, and metabolic carbohydrate balance. We formulate science-backed weight wellness products incorporating EGCG green tea extracts, Garcinia HCA, dietary fibers, and thermogenic lipotropic compounds.',
    keyIngredients: [
      { name: 'Garcinia Cambogia (60% Hydroxycitric Acid)', benefit: 'Inhibits ATP-citrate lyase, an enzyme crucial for fatty acid synthesis from dietary carbs.' },
      { name: 'Green Tea Extract (50% EGCG)', benefit: 'Stimulates catechol-O-methyltransferase to increase thermogenesis and daily caloric expenditure.' },
      { name: 'Apple Cider Vinegar (ACV with Mother)', benefit: 'Promotes post-meal satiety and stabilizes healthy post-prandial glucose curves.' },
      { name: 'Chromium Picolinate', benefit: 'Enhances insulin receptor signaling, curbing afternoon sugar and carbohydrate cravings.' },
      { name: 'Konjac Glucomannan Fiber', benefit: 'Water-soluble expanding fiber that promotes prolonged gastrointestinal fullness.' }
    ],
    deliveryFormats: [
      { format: 'ACV & Metabolism Gummies', description: 'Crisp apple flavored gummies delivering 500mg ACV without the harsh acidic liquid burn.' },
      { format: 'Thermogenic Burner Capsules', description: 'Multi-phase metabolic capsules with timed-release botanical thermogenic actives.' },
      { format: 'Meal Replacement Shake Powders', description: 'Nutrient-complete shakes with 20g protein, 5g fiber, and 26 essential vitamins and minerals.' }
    ],
    marketInsights: [
      'Consistently one of the highest grossing nutritional supplement verticals worldwide.',
      'Gummies containing Apple Cider Vinegar remain a top selling supplement SKU globally.',
      'Increasing demand for clean stimulant-free formulas suitable for evening use.'
    ],
    formulationAdvantages: [
      'Clinically validated 60% HCA water-soluble Garcinia cambogia extract',
      'No jitters: Balanced formulations avoiding excessive caffeine or synthetic stimulants',
      'Delicious natural apple, peach, and berry flavorings in gummy and powder lines'
    ],
    specifications: [
      { label: 'Standardized HCA Content', value: '60% Water-Soluble Hydroxycitric Acid' },
      { label: 'EGCG Potency', value: 'HPLC tested >= 50% Epigallocatechin Gallate' },
      { label: 'Format Options', value: 'Gummies, Capsules, Powder drink mixes, Tablets' },
      { label: 'Shelf Life', value: '24 Months' }
    ],
    faqs: [
      { question: 'Do you offer keto-friendly weight management formulations?', answer: 'Yes! We formulate zero-carb MCT oil powders, exogenous BHB ketones, and electrolyte blends.' },
      { question: 'Are your Apple Cider Vinegar gummies harsh on tooth enamel?', answer: 'No, our pectin gummies are balanced with buffer salts to protect dental enamel while delivering full ACV benefits.' }
    ]
  },
  {
    slug: 'immune-health',
    number: '10',
    title: 'Immune Health',
    tagline: 'High-potency vitamin C, zinc, elderberry, and seasonal cellular defense complexes.',
    image: '/assets/gomzi-pages/cat-immune.jpg',
    overview: 'Immune resilience is a year-round priority for modern consumers. Our immune defense portfolio spans buffered vitamin C, liposomal complexes, black elderberry, medicinal mushrooms, and bioactive zinc bisglycinate that strengthen innate and adaptive immune cell activity.',
    keyIngredients: [
      { name: 'Ester-C® / Calcium Ascorbate', benefit: 'Non-acidic, gentle vitamin C retained in white blood cells longer than standard ascorbic acid.' },
      { name: 'European Black Elderberry (Sambucus Nigra)', benefit: 'Rich in anthocyanins that neutralize viral attachment and support upper respiratory comfort.' },
      { name: 'Zinc Bisglycinate Chelate', benefit: 'Direct inhibitor of viral replication and vital cofactor for T-lymphocyte maturation.' },
      { name: 'Vitamin D3 & K2-MK7 Complex', benefit: 'Essential immunomodulator activating cathelicidin antimicrobial peptides.' },
      { name: 'Citrus Bioflavonoid Complex (40% Hesperidin)', benefit: 'Synergistic botanical partner enhancing vitamin C absorption and microvascular resilience.' }
    ],
    deliveryFormats: [
      { format: 'Effervescent Immunity Fizz Tablets', description: 'Orange and berry effervescent tablets delivering 1,000mg vitamin C and 10mg zinc in a refreshing drink.' },
      { format: 'Elderberry Immune Gummies', description: 'Dark purple pectin gummies packed with elderberry extract, zinc, and vitamin C.' },
      { format: 'Immunity Shot Sachets', description: 'Pocket-sized tear-and-drink liquid sachets with natural honey, ginger, and turmeric.' }
    ],
    marketInsights: [
      'Universal consumer category with high household penetration across all age groups.',
      'Effervescent tablets and chewable gummies dominate retail pharmacy and e-commerce sales.',
      'Strong seasonal demand spikes in autumn and winter with high baseline all-year consumption.'
    ],
    formulationAdvantages: [
      'Non-acidic stomach-friendly buffered mineral ascorbates',
      'Effervescent formulas with rapid complete dissolution under 90 seconds without residue',
      'Halal, Kosher, and vegan compliance across all delivery matrices'
    ],
    specifications: [
      { label: 'Effervescent Dissolution', value: '< 90 seconds in 200ml ambient water' },
      { label: 'Anthocyanin Potency', value: 'Standardized Sambucus extract with high ORAC value' },
      { label: 'Packaging', value: 'Moisture-tight plastic effervescent tubes with silica desiccant caps' },
      { label: 'Shelf Life', value: '24 Months' }
    ],
    faqs: [
      { question: 'Can you manufacture effervescent tablets with custom fruit flavors?', answer: 'Yes! We formulate crisp lemon-lime, orange burst, mixed berry, and ginger-honey flavors.' },
      { question: 'Do your effervescent tubes provide long shelf-life in humid climates?', answer: 'Yes, our automated packaging lines utilize spiral desiccant stopper caps that lock out humidity.' }
    ]
  },
  {
    slug: 'sleep-management',
    number: '11',
    title: 'Sleep Management',
    tagline: 'Restorative evening formulations with melatonin, chamomile, and magnesium bisglycinate.',
    image: '/assets/gomzi-pages/cat-sleep.jpg',
    overview: 'Sleep deprivation impairs immunity, cognition, and physical recovery. Our restorative sleep formulations promote natural GABA synthesis, calm hyperactive neurological states, and regulate the circadian rhythm without morning grogginess or dependency.',
    keyIngredients: [
      { name: 'Pharmaceutical-Grade Melatonin', benefit: 'Calibrated micro-dosing (1mg to 5mg) signaling sleep onset and re-aligning circadian rhythms.' },
      { name: 'Magnesium Bisglycinate Chelate', benefit: 'Highly bioavailable relaxation mineral easing nocturnal muscle cramping and nervous tension.' },
      { name: 'L-Theanine & GABA (Gamma-Aminobutyric Acid)', benefit: 'Inhibitory neurotransmitters inducing serene alpha brainwaves and tranquil mental states.' },
      { name: 'Chamomile & Passionflower Extract', benefit: 'Traditional botanical calmers containing apigenin, binding to central benzodiazepine receptors.' },
      { name: 'Tart Cherry Extract (Natural Phyto-Melatonin)', benefit: 'Whole-food source of proanthocyanidins and natural melatonin enhancing sleep duration.' }
    ],
    deliveryFormats: [
      { format: 'Nighttime Sleep Gummies', description: 'Calming lavender-blueberry pectin gummies formulated for effortless 30-minute bedtime routines.' },
      { format: 'Sublingual Sleep Strips & Drops', description: 'Fast-acting sublingual delivery bypassing liver first-pass for rapid 15-minute sleep onset.' },
      { format: 'Evening Cocoa / Moon Milk Powders', description: 'Decadent nighttime cocoa drinks blending magnesium, theanine, and calming adaptogens.' }
    ],
    marketInsights: [
      'One of the fastest-growing supplement sub-categories globally, fueled by screen time and stress.',
      'Gummies account for over 50% of direct-to-consumer sleep supplement purchases.',
      'High consumer appetite for non-habit-forming botanical and melatonin-free formulations.'
    ],
    formulationAdvantages: [
      'Dual-layer timed-release tableting: Immediate release for falling asleep + sustained release for staying asleep',
      'Melatonin-free botanical options for markets with prescription-only melatonin restrictions (e.g., UK/EU)',
      'Sugar-free bedtime gummy options that do not compromise nighttime dental hygiene'
    ],
    specifications: [
      { label: 'Melatonin Dosing Range', value: '0.5mg, 1mg, 3mg, 5mg, or 10mg custom formulations' },
      { label: 'Magnesium Elemental Yield', value: '14.1% elemental magnesium from 100% chelated bisglycinate' },
      { label: 'Format Compliance', value: 'Sugar-Free (Maltitol/Stevia) available' },
      { label: 'Shelf Life', value: '24 Months' }
    ],
    faqs: [
      { question: 'Can you manufacture sleep products for countries where melatonin is regulated?', answer: 'Yes! We formulate 100% melatonin-free sleep solutions using magnesium, theanine, valerian, and 5-HTP.' },
      { question: 'Do your sleep gummies cause morning grogginess?', answer: 'No, we precision-dose active levels so they clear the bloodstream by morning, leaving users refreshed.' }
    ]
  },
  {
    slug: 'multivitamins',
    number: '12',
    title: 'Multivitamins',
    tagline: 'Comprehensive daily micronutrient profiles spanning chewable, tablet, and liquid formats.',
    image: '/assets/gomzi-pages/cat-multivitamin.jpg',
    overview: 'The foundation of nutritional wellness. Our full-spectrum multivitamin complexes provide 100% or greater RDA of essential vitamins, chelated trace minerals, antioxidant cofactors, and botanical bio-enhancers tailored by age, gender, and lifestyle.',
    keyIngredients: [
      { name: 'Active B-Complex (B1, B2, B3, B5, B6, B12)', benefit: 'Methylated and coenzymated forms (Methylcobalamin, P-5-P) supporting cellular ATP production.' },
      { name: 'Vitamin A (Natural Mixed Carotenoids)', benefit: 'Broad-spectrum beta-carotene, lutein, and zeaxanthin supporting vision and epithelial integrity.' },
      { name: 'Chelated Trace Mineral Blend (Zinc, Copper, Selenium)', benefit: 'Albion-type amino acid chelates preventing mineral antagonism and gastrointestinal irritation.' },
      { name: 'Vitamin C & Citrus Bioflavonoids', benefit: 'Immune cell support, collagen synthesis, and antioxidant cellular defense.' },
      { name: 'K2-MK7 & D3 Sunshine Complex', benefit: 'Cardiovascular calcium routing and skeletal bone mineralization synergy.' }
    ],
    deliveryFormats: [
      { format: 'One-A-Day Coated Caplets', description: 'High-density compressed tablets packing 25+ micronutrients into a smooth, easy-to-swallow pill.' },
      { format: 'Daily Multivitamin Gummies', description: 'Delicious daily gummy vitamins in assorted citrus and berry flavors for the whole family.' },
      { format: 'Effervescent Daily Multi Fizz', description: 'Orange-flavored effervescent tablets providing rapid nutrient hydration.' }
    ],
    marketInsights: [
      'The single largest dietary supplement product category by global retail revenue.',
      'High daily compliance resulting in consistent monthly replenishment orders.',
      'Growing consumer preference for gender-specific (Men’s Multi / Women’s Multi) tailored profiles.'
    ],
    formulationAdvantages: [
      'Zero mineral-vitamin competitive degradation through microencapsulation',
      'Gentle on an empty stomach with low-acid mineral ascorbates and chelated minerals',
      'Full compliance with destination country Recommended Dietary Allowances (RDA/DRI)'
    ],
    specifications: [
      { label: 'Nutrient Spectrum', value: 'Up to 30 active vitamins, minerals, and phytonutrients' },
      { label: 'Coating Options', value: 'Clear aqueous coating, chlorophyll green, or natural titanium-free white' },
      { label: 'Regulatory Alignment', value: 'US RDA, EU NRV, FSSAI RDA, and GCC GSO standards' },
      { label: 'Shelf Life', value: '24 Months' }
    ],
    faqs: [
      { question: 'Do you formulate 100% vegetarian multivitamins?', answer: 'Yes! We use vegetarian HPMC capsules, plant-derived vitamins (like D3 from lichen), and pectin gummies.' },
      { question: 'Can you customize the vitamin potencies for specific regional requirements?', answer: 'Yes, our regulatory team adjusts individual vitamin potencies to comply precisely with your country’s maximum permissible levels.' }
    ]
  },
  {
    slug: 'sugar-management',
    number: '13',
    title: 'Sugar Management',
    tagline: 'Blood glucose balance formulations with berberine, cinnamon extract, and chromium.',
    image: '/assets/gomzi-pages/cat-sugar.jpg',
    overview: 'With the worldwide rise of metabolic syndrome and insulin resistance, consumers are actively managing blood glucose curves. We formulate clinically driven botanical glucose control products utilizing berberine, standardized cinnamon, gymnema sylvestre, and chromium.',
    keyIngredients: [
      { name: 'Berberine HCl 97% (Berberis Aristata)', benefit: 'Activates AMP-activated protein kinase (AMPK), the body’s master metabolic switch, enhancing glucose uptake.' },
      { name: 'Ceylon Cinnamon Extract (Cinnamomum Verum)', benefit: 'Improves insulin receptor sensitivity while being low in potentially toxic coumarin.' },
      { name: 'Gymnema Sylvestre (75% Gymnemic Acids)', benefit: 'The "sugar destroyer" botanical that suppresses sweet taste receptors and slows intestinal glucose absorption.' },
      { name: 'Chromium Picolinate / Polynicotinate', benefit: 'Enhances insulin action and promotes balanced post-prandial glycemic responses.' },
      { name: 'Alpha Lipoic Acid (ALA)', benefit: 'Improves cellular insulin sensitivity and protects peripheral nerves from glycation damage.' }
    ],
    deliveryFormats: [
      { format: 'Pre-Meal Glycemic Capsules', description: 'Targeted capsules designed to be taken 15-30 minutes before carbohydrate-rich meals.' },
      { format: 'Metabolic Balance Tablets', description: 'High-potency berberine tablets with natural cellulose film coating.' },
      { format: 'Botanical Herbal Tea Sachets', description: 'Functional cinnamon and bitter melon herbal tea blends for after-meal digestion.' }
    ],
    marketInsights: [
      'Huge surge in consumer awareness driven by continuous glucose monitors (CGMs) and metabolic health trends.',
      'Berberine has become a viral super-ingredient dubbed nature’s metabolic balancer.',
      'High repeat purchase velocity from consumers monitoring pre-diabetic and weight targets.'
    ],
    formulationAdvantages: [
      'High-purity 97% Berberine HCl with guaranteed low solvent residue',
      'True Ceylon cinnamon extract (Coumarin < 0.005%) avoiding liver toxicity',
      'Synergistic inclusion of BioPerine® black pepper extract to overcome berberine’s natural low absorption'
    ],
    specifications: [
      { label: 'Berberine Purity', value: '>= 97% by HPLC' },
      { label: 'Standardized Gymnemic Acids', value: '75% Active Gymnemic Acids' },
      { label: 'Packaging', value: 'Dark amber bottles, blister packs with protective barrier foil' },
      { label: 'Shelf Life', value: '24 Months' }
    ],
    faqs: [
      { question: 'How do you overcome the bitter taste and low bioavailability of berberine?', answer: 'We use lipid microencapsulation and phytosome technology to boost absorption and eliminate bitter taste in non-capsule formats.' },
      { question: 'Can these products be taken alongside standard dietary programs?', answer: 'Yes, our formulations are designed as dietary supplements that complement healthy nutrition and exercise programs.' }
    ]
  },
  {
    slug: 'superfoods',
    number: '14',
    title: 'Superfoods',
    tagline: 'Concentrated greens, moringa, spirulina, and nutrient-dense raw plant complexes.',
    image: '/assets/gomzi-pages/cat-superfood.jpg',
    overview: 'Modern consumers want whole-food nourishment from organic, nutrient-dense botanicals. Our superfood blends combine cold-milled spirulina, moringa leaf, organic wheatgrass, antioxidant berries, and digestive enzyme cofactors into delicious daily alkalizing greens powders.',
    keyIngredients: [
      { name: 'Organic Moringa Oleifera Leaf Powder', benefit: 'Rich in 90+ nutrients, 46 antioxidants, and essential plant amino acids.' },
      { name: 'Spirulina Platensis (60% Protein)', benefit: 'Microalgae packed with phycocyanin, chlorophyll, B vitamins, and natural iron.' },
      { name: 'Cold-Pressed Wheatgrass & Barley Grass', benefit: 'Alkalizing greens delivering active superoxide dismutase (SOD) enzymes.' },
      { name: 'Organic Ashwagandha & Maca Root', benefit: 'Adaptogenic roots balancing adrenal stress responses and promoting daily vigor.' },
      { name: 'Berry Antioxidant Blend (Acai, Goji, Pomegranate)', benefit: 'High ORAC fruit extracts protecting cellular membranes from oxidative degradation.' }
    ],
    deliveryFormats: [
      { format: 'Daily Greens Drink Powders', description: 'Finely micro-milled powders that dissolve effortlessly in water without gritty sludge or grass taste.' },
      { format: 'Superfood Concentrated Tablets', description: 'Cold-pressed green tablets delivering pure spirulina and chlorella without synthetic binders.' },
      { format: 'Single-Serve On-The-Go Stick Packs', description: 'Convenient 10g stick packs for mixing into water bottles during travel or workouts.' }
    ],
    marketInsights: [
      'The "Daily Greens" powder format is one of the highest value wellness trends globally.',
      'Consumers demand incredible natural taste (peach, green apple, mint) that masks natural earthy greens.',
      'High average order value with strong social media influencer adoption.'
    ],
    formulationAdvantages: [
      'Proprietary natural flavor systems (Green Apple, Tropical Passionfruit, Refreshing Mint)',
      'Low-temperature drying retaining active live digestive enzymes and chlorophyll',
      'Certified non-GMO, organic source availability, and strict pathogen testing'
    ],
    specifications: [
      { label: 'Particle Sizing', value: '100% passing 100 mesh for instant dispersion' },
      { label: 'Heavy Metals', value: 'Strictly tested: Lead < 0.2 ppm, Cadmium < 0.1 ppm' },
      { label: 'Packaging Types', value: 'Wide-mouth HDPE tubs (300g/500g) with measuring scoop, or stick packs' },
      { label: 'Shelf Life', value: '24 Months' }
    ],
    faqs: [
      { question: 'How do you make superfood greens taste delicious without sugar?', answer: 'We use natural monk fruit and Reb-M stevia extract blended with crisp natural fruit flavors to create a refreshing drink.' },
      { question: 'Can you include probiotics in superfood powders?', answer: 'Yes! We blend heat-stable spore-forming Bacillus coagulans probiotics that remain active for the full 24-month shelf life.' }
    ]
  },
  {
    slug: 'sports-nutrition',
    number: '15',
    title: 'Sports Nutrition',
    tagline: 'Whey protein isolates, fermented BCAAs, creatine monohydrate, and pre-workout formulas.',
    image: '/assets/gomzi-pages/cat-sports.jpg',
    overview: 'Athletic performance demands uncompromising ingredient purity, verified macro ratios, and instant solubility. We engineer high-purity Whey Protein Isolates (WPI), Whey Protein Concentrates (WPC), Micronized Creatine, and explosive pre-workout formulations trusted by fitness brands worldwide.',
    keyIngredients: [
      { name: 'Cross-Flow Microfiltered Whey Protein Isolate (90%)', benefit: 'Ultra-pure protein with minimal fat and lactose, promoting rapid post-exercise muscle protein synthesis.' },
      { name: 'Micronized Creatine Monohydrate (200 Mesh)', benefit: 'Rapidly resynthesizes cellular phosphocreatine for explosive muscular power and strength gains.' },
      { name: 'Fermented Instantized BCAAs (2:1:1 Ratio)', benefit: 'Vegan leucine, isoleucine, and valine that dissolve completely clear in cold water.' },
      { name: 'L-Citrulline Malate 2:1', benefit: 'Increases plasma arginine and nitric oxide levels, delivering massive muscle pumps and vascularity.' },
      { name: 'Beta-Alanine (CarnoSyn® Equivalent)', benefit: 'Buffers intracellular lactic acid accumulation, delaying muscular burn and fatigue.' }
    ],
    deliveryFormats: [
      { format: 'Gourmet Whey Protein Powders', description: 'Decadent chocolate fudge, vanilla bean, and strawberry milkshake flavors with zero chalky mouthfeel.' },
      { format: 'Pre-Workout Explosive Powders', description: 'Instantized sour apple, blue raspberry, and fruit punch powders with laser-focus nootropics.' },
      { format: 'Protein Energy Bars & Bites', description: 'Cold-extruded high-protein, low-sugar bars with soft chewy texture.' },
      { format: 'BCAA & Hydration Stick Packs', description: 'Electrolyte-rich branch chain amino acid powders for intra-workout hydration.' }
    ],
    marketInsights: [
      'The multi-billion dollar cornerstone of the active consumer goods industry.',
      'Rapidly expanding beyond hardcore bodybuilders to casual gym-goers, marathoners, and active women.',
      'Third-party testing for banned substances (WADA/Informed-Choice) is a key buying criterion.'
    ],
    formulationAdvantages: [
      'Instantized with non-GMO sunflower lecithin for zero-clump shaker bottle mixing in 5 seconds',
      'Proprietary enzyme blend (DigeZyme®) for smooth gastrointestinal digestion without bloating',
      'True-to-label protein nitrogen testing (guaranteeing zero amino spiking)'
    ],
    specifications: [
      { label: 'Protein Purity Options', value: 'WPC 80%, WPI 90%, Hydrolyzed WPI, Plant Protein 75%' },
      { label: 'Instantization', value: 'Disperses in cold water in under 5 seconds' },
      { label: 'Container Types', value: '1 lb, 2 lb, 5 lb wide-mouth plastic jars, and multi-layer gusset pouches' },
      { label: 'Quality Verification', value: 'Dumas protein method testing, WADA compliance screening' }
    ],
    faqs: [
      { question: 'Do you guarantee zero amino spiking in protein powders?', answer: '100% guaranteed. Every batch is tested using advanced HPLC amino acid profiling to prove full protein integrity.' },
      { question: 'Can you formulate plant-based vegan protein blends?', answer: 'Yes! We formulate smooth, delicious vegan protein using fermented pea protein isolate and organic brown rice protein.' }
    ]
  },
  {
    slug: 'gut-health',
    number: '16',
    title: 'Gut Health',
    tagline: 'Multi-strain spore probiotics, prebiotic fibers, and comprehensive digestive enzyme complexes.',
    image: '/assets/gomzi-pages/cat-gut.jpg',
    overview: 'The gut microbiome is the master conductor of human immunity, mental clarity, and metabolic vitality. We formulate resilient multi-strain probiotics, spore-forming stable cultures, digestive enzyme spectrums, and prebiotic fiber matrices that survive stomach acid to flourish in the colon.',
    keyIngredients: [
      { name: 'Spore-Forming Bacillus Coagulans & Subtilis', benefit: 'Extremely resilient spore probiotics surviving harsh gastric acidity and high heat storage.' },
      { name: 'Lactobacillus & Bifidobacterium Multi-Strain Matrix', benefit: 'Clinical 10-strain blend restoring microbial diversity after antibiotics or digestive stress.' },
      { name: 'Full-Spectrum Digestive Enzyme Complex', benefit: 'Protease, amylase, lipase, lactase, and cellulase optimizing complete macronutrient breakdown.' },
      { name: 'Prebiotic Fructooligosaccharides & Inulin', benefit: 'Selective dietary fibers that nourish bifidobacteria and stimulate short-chain fatty acid (SCFA) production.' },
      { name: 'L-Glutamine & Zinc Carnosine', benefit: 'Strengthens tight junction integrity in the intestinal mucosal barrier, preventing leaky gut syndrome.' }
    ],
    deliveryFormats: [
      { format: 'Delayed-Release Acid-Resistant Capsules', description: 'DRcaps® targeted capsules that protect live cultures through stomach acid to release directly into the gut.' },
      { format: 'Gut Health & Probiotic Gummies', description: 'Shelf-stable Bacillus coagulans gummies delivering 5 Billion CFU per serving with tropical flavors.' },
      { format: 'Synbiotic Daily Powder Sachets', description: 'Unflavored or citrus powder sachets blending prebiotic fiber with 50 Billion CFU live probiotics.' }
    ],
    marketInsights: [
      'One of the fastest-growing categories in modern nutraceuticals with immense research backing.',
      'Strong crossover into skin health (gut-skin axis) and mental health (gut-brain axis).',
      'High consumer preference for shelf-stable probiotics that do not require refrigeration.'
    ],
    formulationAdvantages: [
      'Guaranteed CFU count at end of shelf-life (incorporating scientifically verified overages)',
      'Moisture-barrier desiccant bottles preventing ambient humidity from degrading cultures',
      'Acid-resistant encapsulation protecting sensitive strains without enteric chemical coatings'
    ],
    specifications: [
      { label: 'CFU Strength Available', value: '1 Billion to 100 Billion CFU per daily serving' },
      { label: 'Strain Identification', value: 'DNA-sequenced and verified probiotic strains' },
      { label: 'Packaging Standard', value: 'CSP Activ-Polymer™ moisture-absorbing bottles or ALU-ALU cold form blisters' },
      { label: 'Shelf Life', value: '24 Months at ambient 25°C without refrigeration' }
    ],
    faqs: [
      { question: 'Do your probiotic products require cold-chain refrigeration during export?', answer: 'No! We use shelf-stable spore probiotics and specialized microencapsulated strains that remain 100% viable at tropical ambient temperatures.' },
      { question: 'Can you formulate combined probiotic + digestive enzyme products?', answer: 'Yes, our "Synbiotic Digest" formulations combine digestive enzymes with probiotic spores and prebiotics in a single capsule.' }
    ]
  }
];

