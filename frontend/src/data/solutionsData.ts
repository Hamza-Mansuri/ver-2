export interface SolutionDetail {
  slug: string;
  number: string;
  title: string;
  tag: string;
  tagline: string;
  image: string;
  alt: string;
  overview: string;
  highlights: string[];
  capabilities: { title: string; description: string }[];
  process: { step: string; title: string; description: string }[];
  specifications: { label: string; value: string }[];
  deliveryFormats: string[];
  faqs: { question: string; answer: string }[];
}

export const solutionsData: SolutionDetail[] = [
  {
    slug: 'formulation-and-development',
    number: '01',
    title: 'Formulation & development',
    tag: 'THE SCIENCE',
    tagline: 'Thoughtful formulations shaped around your product, audience, and destination market.',
    image: '/assets/solutions/formulation.jpg',
    alt: 'Gloved laboratory worker preparing capsules',
    overview: 'Our in-house R&D and formulation team crafts precision nutraceutical recipes tailored to your brand identity, bioavailability criteria, and statutory limits. From taste masking and active ingredient stability to microencapsulation, we transform raw concepts into scalable, market-ready products.',
    highlights: [
      'In-house formulation and sensory evaluation laboratories',
      'Advanced taste masking for bitter botanicals and amino acids',
      'Therapeutic dose matching and clinical active ingredient ratios',
      'Accelerated stability and shelf-life prediction testing'
    ],
    capabilities: [
      { title: 'Custom Formula Development', description: 'Bespoke formulations engineered from scratch or reverse-engineered to optimize bioavailability and cost.' },
      { title: 'Ingredient Synergies', description: 'Harmonious blending of vitamins, chelated minerals, herbal extracts, and enzymes for enhanced uptake.' },
      { title: 'Pilot Batching & Bench Trials', description: 'Rapid pilot batch production (1kg to 10kg) to validate color, taste, solubility, and mouthfeel before full runs.' },
      { title: 'Label Claim Optimization', description: 'Ensuring 100% active retention across full shelf life with appropriate overages and antioxidant systems.' }
    ],
    process: [
      { step: '01', title: 'Product Brief & Market Target', description: 'Alignment on target market regulatory limits, format preference, flavor profile, and claims.' },
      { step: '02', title: 'R&D Formulation & Pilot Samples', description: 'Benchtop formulation trials with comprehensive sensory, solubility, and preliminary stability checks.' },
      { step: '03', title: 'Client Feedback & Sensory Approval', description: 'Iterative refinement based on your taste panels, physical consistency, and dissolution criteria.' },
      { step: '04', title: 'Scale-up & Master Manufacturing Formula', description: 'Creation of standard operating procedures and validation protocols for commercial manufacturing.' }
    ],
    specifications: [
      { label: 'Pilot Batch Turnaround', value: '7 to 10 Business Days' },
      { label: 'R&D Lab Equipment', value: 'HPLC, UV-Vis, Karl Fischer Titrator, Dissolution Tester' },
      { label: 'Formulation Types', value: 'Powders, Tablets, Softgels, Capsules, Gummies, Liquids' },
      { label: 'Compliance Standards', value: 'FSSAI, US FDA cGMP, WHO-GMP, ISO 22000' }
    ],
    deliveryFormats: ['Encapsulated Powders', 'Effervescent Tablets', 'Chewable Gummies', 'Dry Drink Mixes', 'Softgel Capsules'],
    faqs: [
      { question: 'Can you formulate custom vegan or allergen-free supplements?', answer: 'Yes, we formulate 100% plant-based, gluten-free, dairy-free, and non-GMO nutraceutical products with audited supply chains.' },
      { question: 'Do you provide sample batches for consumer taste testing?', answer: 'Yes, pilot batches are provided with complete sensory scorecards and physical stability data.' }
    ]
  },
  {
    slug: 'private-label-manufacturing',
    number: '02',
    title: 'Private-label manufacturing',
    tag: 'YOUR BRAND',
    tagline: 'Nutraceutical formats developed and manufactured around your brand’s exact commercial requirements.',
    image: '/assets/solutions/manufacturing.jpg',
    alt: 'Capsules being prepared in a laboratory',
    overview: 'State-of-the-art cleanroom manufacturing infrastructure in Surat, Gujarat. Equipped with automated high-speed tablet presses, automated capsule fillers, blister lines, and powder blending suites, we execute high-volume contracts with strict batch-to-batch repeatability.',
    highlights: [
      'Cleanroom Class 100,000 (ISO 8) HVAC environmental control',
      'High-speed automated encapsulation and tableting equipment',
      'End-to-end computerized batch tracking and serialisation',
      'Flexible minimum order quantities (MOQs) for emerging brands'
    ],
    capabilities: [
      { title: 'Solid Dose Encapsulation', description: 'Sizes 00, 0, 1, 2 hard gelatin and vegetarian HPMC capsules with precision powder filling.' },
      { title: 'Effervescent & Chewable Tableting', description: 'Moisture-controlled compression suites for rapid-dissolving effervescent and chewable tablets.' },
      { title: 'Homogeneous Ribbon Powder Blending', description: 'Large capacity double-cone and ribbon blenders delivering CV < 2% blend uniformity.' },
      { title: 'Contract Packaging & Sealing', description: 'Induction sealing, nitrogen flushing, desiccant insertion, and tamper-evident shrink sleeve application.' }
    ],
    process: [
      { step: '01', title: 'Raw Material Quarantine & Testing', description: '100% incoming raw materials screened for identity, purity, heavy metals, and microbes.' },
      { step: '02', title: 'Precision Dispensing & Granulation', description: 'Controlled atmospheric dispensing followed by wet/dry granulation and fluid-bed drying.' },
      { step: '03', title: 'Compression & Encapsulation', description: 'Continuous in-process weight, hardness, friability, and disintegration testing every 15 minutes.' },
      { step: '04', title: 'Blistering & Bottling', description: 'Automated packaging lines with optical vision inspection and checkweigher validation.' }
    ],
    specifications: [
      { label: 'Annual Capsule Capacity', value: '180+ Million Capsules' },
      { label: 'Annual Tablet Capacity', value: '240+ Million Tablets' },
      { label: 'Annual Powder Blending', value: '1,200+ Metric Tons' },
      { label: 'Cleanroom Classification', value: 'ISO Class 8 / Schedule M Compliant' }
    ],
    deliveryFormats: ['Hard Gelatin Capsules', 'Vegetarian HPMC Capsules', 'Coated Tablets', 'Sublingual Pellets', 'High-Protein Powders'],
    faqs: [
      { question: 'What is the standard production lead time?', answer: 'Typical commercial runs take 3 to 4 weeks from raw material approval and packaging clearance.' },
      { question: 'Can we supply our own custom packaging materials?', answer: 'Yes, we accept client-supplied packaging or can manufacture turnkey packaging through our certified partners.' }
    ]
  },
  {
    slug: 'export-planning-and-documentation',
    number: '03',
    title: 'Export planning & documentation',
    tag: 'MARKET READINESS',
    tagline: 'Packaging, labelling, and supporting documentation engineered for your destination market.',
    image: '/assets/solutions/global-export.jpg',
    alt: 'Aerial view of shipping containers at a seaport',
    overview: 'Expanding into overseas markets requires technical regulatory finesse. Gomzi Life Science guides brands through international nutraceutical compliance, including harmonised tariff classification, Certificates of Free Sale (CFS), Halal certification, and Country-of-Origin documentation.',
    highlights: [
      'Comprehensive export dossier compilation (ACTD and CTD formats)',
      'Certificate of Analysis (COA) with full international laboratory accreditation',
      'Regulatory compliance checks for GCC, Southeast Asia, CIS, Africa, and UK/EU',
      'Multi-lingual packaging artwork review and statutory warning alignments'
    ],
    capabilities: [
      { title: 'Country Regulatory Dossiers', description: 'Ready-to-submit technical registration dossiers customized to target country ministry of health guidelines.' },
      { title: 'Apostille & Embassy Legalisation', description: 'Seamless coordination with chamber of commerce, MEA, and international consular divisions.' },
      { title: 'Free Sale & Health Certificates', description: 'Authoritative export certification issued in accordance with Indian regulatory and international export bodies.' },
      { title: 'Customs Classification (HS Codes)', description: 'Accurate tariff classification ensuring smooth clearance and preferential trade agreement duties.' }
    ],
    process: [
      { step: '01', title: 'Destination Regulatory Audit', description: 'Screening formula actives, dosages, and allowable claims against destination jurisdiction rules.' },
      { step: '02', title: 'Dossier Preparation', description: 'Compilation of stability data, manufacturing method summaries, raw material COAs, and flowcharts.' },
      { step: '03', title: 'Artwork & Label Review', description: 'Validating mandatory font sizes, allergen statements, nutritional facts panels, and barcodes.' },
      { step: '04', title: 'Certification Dispatch', description: 'Delivery of physical stamped documents and digital dossiers for local registration.' }
    ],
    specifications: [
      { label: 'Active Export Markets', value: '45+ Global Destinations' },
      { label: 'Supported Dossier Formats', value: 'CTD, ACTD, ASEAN Common Technical Dossier' },
      { label: 'Certification Types', value: 'Halal, Kosher, FSSAI Export, US FDA FEI, GMP, CFS' },
      { label: 'Lead Time for Dossier', value: '10 to 14 Working Days' }
    ],
    deliveryFormats: ['Full Commercial Shipments', 'Registration Sample Kits', 'Stability Study Batches', 'Institutional Bulk Drums'],
    faqs: [
      { question: 'Do you help with Ministry of Health registrations in the Middle East?', answer: 'Yes, we prepare full MOH registration dossiers with Halal certificates, stability reports, and CFS.' },
      { question: 'Can you produce multi-lingual labels on bottles and cartons?', answer: 'Yes, our artwork team supports dual-language packaging including English-Arabic, English-French, and English-Spanish.' }
    ]
  },
  {
    slug: 'dispatch-coordination',
    number: '04',
    title: 'Dispatch coordination',
    tag: 'THE NEXT CHAPTER',
    tagline: 'Coordinated handover from finished pallets to your designated global freight and shipping partners.',
    image: '/assets/solutions/logistics.jpg',
    alt: 'Cargo containers and cranes at an international port',
    overview: 'Strategic proximity to Hazira Port, Nhava Sheva (JNPT) Mumbai, and international cargo airports gives Gomzi Life Science a distinct logistical edge. We manage container stuffings, palletised air cargo, refrigerated shipments, and seamless port handovers.',
    highlights: [
      'Proximity to Hazira Port (20 mins) and JNPT Mumbai for swift container dispatch',
      'ISPM-15 heat-treated fumigated wooden pallets and moisture-barrier wrap',
      'Temperature-monitored refrigerated container (reefer) coordination',
      'Real-time shipment milestone notifications and bill of lading tracking'
    ],
    capabilities: [
      { title: 'FCL & LCL Ocean Freight', description: 'Full container loads (20ft/40ft) and consolidated sea freight coordination with top tier ocean carriers.' },
      { title: 'Priority Air Cargo Logistics', description: 'Rapid airport dispatch through Mumbai (BOM) and Ahmedabad (AMD) international air cargo terminals.' },
      { title: 'Export Packing Rigor', description: 'Heavy-duty 5-ply / 7-ply master cartons, corner edge protectors, shrink stretch wrapping, and strap seals.' },
      { title: 'Customs House Brokerage Handover', description: 'Coordination with accredited freight forwarders and CHA agents for rapid export gate-in.' }
    ],
    process: [
      { step: '01', title: 'Palletisation & Weighing', description: 'Goods stacked on fumigated pallets with anti-crush corner boards and weather-sealed wrap.' },
      { step: '02', title: 'Container Stuffing & Seal', description: 'Supervised factory stuffing with container photos, weight scale tickets, and high-security bolt seals.' },
      { step: '03', title: 'Port Gate-In & Shipping Bill', description: 'Electronic filing of Shipping Bill, EDI clearance, and terminal entry.' },
      { step: '04', title: 'BL Release & Transit Tracking', description: 'Issuance of original Bill of Lading, Certificate of Origin, and packing list documents.' }
    ],
    specifications: [
      { label: 'Closest Ocean Gateway', value: 'Hazira Seaport (20 km) / JNPT Mumbai (280 km)' },
      { label: 'Closest Air Terminals', value: 'Surat Cargo Terminal / Mumbai International Cargo' },
      { label: 'Pallet Standard', value: 'ISPM-15 Certified Heat Treated / Plastic Euro-Pallets' },
      { label: 'Container Types', value: '20ft Dry, 40ft High Cube, 40ft Reefer Temperature-Controlled' }
    ],
    deliveryFormats: ['Full Container Loads (FCL)', 'Less than Container Loads (LCL)', 'Air Cargo Pallets', 'Courier Sample Consignments'],
    faqs: [
      { question: 'Can you handle temperature-sensitive gummy or probiotic shipments?', answer: 'Yes, we utilise thermal insulated pallet covers and refrigerated reefer containers set to controlled 18-22°C.' },
      { question: 'Do you offer FOB, CIF, or Ex-Works commercial terms?', answer: 'We support FOB Mundra/Nhava Sheva/Hazira, CIF destination port, CFR, and Ex-Factory Surat terms.' }
    ]
  },
  {
    slug: 'analytical-testing-and-quality-assurance',
    number: '05',
    title: 'Analytical testing & quality assurance',
    tag: 'ANALYTICAL RIGOR',
    tagline: 'Rigorous in-house HPLC assays, microbial screening, heavy metal testing, and batch COA validation.',
    image: '/assets/solutions/solutions-quality.jpg',
    alt: 'Analytical chemist conducting quality testing with lab equipment',
    overview: 'Quality is non-negotiable in nutraceutical manufacturing. Our in-house analytical testing laboratories perform multi-stage quality control from raw material release to finished batch stability, ensuring complete chemical, physical, and microbiological integrity.',
    highlights: [
      'High-Performance Liquid Chromatography (HPLC) for active ingredient quantification',
      'Inductively Coupled Plasma (ICP) heavy metal screening (Lead, Mercury, Cadmium, Arsenic)',
      'Complete microbiological pathogen testing (E. coli, Salmonella, S. aureus, Yeast & Mold)',
      'Comprehensive Certificate of Analysis (COA) issued for every production batch'
    ],
    capabilities: [
      { title: 'Chromatographic Assay', description: 'Precise quantification of active vitamins, amino acids, botanical markers, and polyphenols.' },
      { title: 'Physical Characterisation', description: 'Disintegration time, friability, hardness, tapped density, particle size distribution, and loss on drying.' },
      { title: 'Microbiological Hygiene Verification', description: 'Testing within cleanroom bio-safety cabinets following international USP/IP microbiological guidelines.' },
      { title: 'Stability Chamber Studies', description: 'Real-time and accelerated stability storage (Zone IVb conditions: 40°C / 75% RH) for export validity.' }
    ],
    process: [
      { step: '01', title: 'Raw Material Quarantine', description: 'Sample collection under laminar flow and comprehensive identity/assay verification.' },
      { step: '02', title: 'In-Process Quality Controls (IPQC)', description: 'Continuous hourly sampling during blending, compression, encapsulation, and packaging.' },
      { step: '03', title: 'Finished Goods Testing', description: 'Full assay verification against release specifications and label claim tolerances.' },
      { step: '04', title: 'COA Generation & Release', description: 'Quality Assurance review and authorized QP sign-off before dispatch.' }
    ],
    specifications: [
      { label: 'Analytical Instrumentation', value: 'Shimadzu HPLC, UV-Vis Spectrophotometer, FTIR, Moisture Analyser' },
      { label: 'Heavy Metal Limits', value: 'Compliant with USP <2232> and EU Regulation (EC) 1881/2006' },
      { label: 'Microbial Limits', value: 'USP <2021>, USP <2022> and Indian Pharmacopoeia standards' },
      { label: 'QA Documentation', value: 'Batch Manufacturing Records (BMR), Batch Packaging Records (BPR), COA' }
    ],
    deliveryFormats: ['Batch-specific COAs', 'Stability Reports (3-24 months)', 'Method Validation Dossiers', 'Safety Data Sheets (SDS)'],
    faqs: [
      { question: 'Can you provide third-party accredited NABL testing reports?', answer: 'Yes, alongside our in-house QC release, we coordinate third-party NABL-accredited laboratory reports upon request.' },
      { question: 'Do you retain batch reference samples?', answer: 'Yes, control reserve samples from every commercial batch are stored in our reference sample room for the full shelf life plus 1 year.' }
    ]
  },
  {
    slug: 'custom-premix-and-microencapsulation',
    number: '06',
    title: 'Custom premix & microencapsulation',
    tag: 'ADVANCED FORMULATION',
    tagline: 'High-homogeneity vitamin, mineral, and botanical premixes engineered for maximum bioavailability.',
    image: '/assets/solutions/solutions-premix.jpg',
    alt: 'Precision microencapsulated nutrient granules and premix blending',
    overview: 'Delivering micro-nutrients with pinpoint accuracy requires advanced powder technology. Gomzi Life Science specialises in customized premixes and microencapsulation, shielding vulnerable vitamins from moisture, heat, and gastric breakdown.',
    highlights: [
      'Microencapsulated fat-soluble vitamins (A, D3, E, K2-MK7) with protective matrices',
      'Homogeneous carrier distribution ensuring zero segregation during transport',
      'Custom premixes for dairy, bakery, beverages, fortified staples, and supplements',
      'Significant reduction in manufacturing overage requirements through enhanced stability'
    ],
    capabilities: [
      { title: 'Vitamin & Mineral Premixes', description: 'Balanced multi-nutrient premixes tailored to specific life-stage or functional health targets.' },
      { title: 'Microencapsulated Lipids & Actives', description: 'Coating active molecules with lipid/polymer films to eliminate off-notes and enhance intestinal release.' },
      { title: 'Direct-Compressible Granules (DC Grade)', description: 'Granulated vitamin/mineral blends engineered for direct tableting with superior flowability.' },
      { title: 'Dispersible Beverage Premixes', description: 'Instantized water-soluble blends designed for clear solutions without sediment or cloudiness.' }
    ],
    process: [
      { step: '01', title: 'Target Potency Calculation', description: 'Mathematical determination of active potencies, target RDA percentages, and shelf-life overages.' },
      { step: '02', title: 'Carrier & Excipient Selection', description: 'Selecting maltodextrin, dicalcium phosphate, or acacia gum based on final processing requirements.' },
      { step: '03', title: 'Geometric Dilution & Blending', description: 'Multi-stage geometric blending to achieve sub-micron dispersion and guaranteed uniformity.' },
      { step: '04', title: 'Packaging in Nitrogen-Flushed Drums', description: 'Sealed inside heavy-duty moisture-barrier aluminum laminate bags within HDPE drums.' }
    ],
    specifications: [
      { label: 'Homogeneity (CV)', value: '< 2.5% across 10-point blend uniformity assays' },
      { label: 'Particle Size Distribution', value: '100% passing 60 mesh, 95% passing 80 mesh' },
      { label: 'Bulk Density Range', value: '0.45 g/ml to 0.75 g/ml (customizable)' },
      { label: 'Packaging Format', value: '10 kg, 20 kg, 25 kg fiber drums with barrier liners' }
    ],
    deliveryFormats: ['Spray-Dried Powders', 'Granulated Premixes', 'Oil-Dispersible Suspensions', 'Water-Soluble Granules'],
    faqs: [
      { question: 'What is the shelf life of your custom premixes?', answer: 'Our standard microencapsulated premixes carry a certified 24-month shelf life under ambient dry storage.' },
      { question: 'Can you formulate fortification premixes for government or NGO food programs?', answer: 'Yes, we formulate fortificants conforming to GAIN, WHO, and FSSAI +F standards for rice, flour, milk, and oil.' }
    ]
  },
  {
    slug: 'regulatory-dossiers-and-global-compliance',
    number: '07',
    title: 'Regulatory dossiers & global compliance',
    tag: 'GLOBAL COMPLIANCE',
    tagline: 'Turnkey technical documentation, stability studies, and registration dossiers tailored for your target export region.',
    image: '/assets/solutions/solutions-regulatory.jpg',
    alt: 'International regulatory compliance and export documentation dossiers',
    overview: 'Navigating international health authorities requires meticulous documentation. Our regulatory affairs team prepares complete technical dossiers that clear ministerial scrutiny across the GCC, Southeast Asia, East Africa, Central Asia, and the Americas.',
    highlights: [
      'Comprehensive CTD/ACTD registration dossiers for international ministries of health',
      'Free Sale Certificates (CFS) and Manufacturing Licenses validated by state licensing authorities',
      'Stability validation data according to ICH guidelines for climatic Zone IVb',
      'Allergen declarations, BSE/TSE-free declarations, and Non-GMO verification certificates'
    ],
    capabilities: [
      { title: 'Ministry of Health Dossiers', description: 'Structured documentation dossiers covering administrative data, chemistry, manufacturing, and controls (CMC).' },
      { title: 'Global Label & Claim Validation', description: 'Reviewing wording, nutrition facts panels, health warnings, and QR code guidelines per local standards.' },
      { title: 'Audit Support & Factory Inspections', description: 'Assisting international client auditing teams and government inspectors with documentation access.' },
      { title: 'Annual Post-Marketing Filings', description: 'Providing updated stability, batch reconciliation, and renewal documentation as required.' }
    ],
    process: [
      { step: '01', title: 'Jurisdiction Assessment', description: 'Reviewing the target country regulatory classification (Food supplement, dietary supplement, or CAM).' },
      { step: '02', title: 'Technical Dossier Compilation', description: 'Compiling formulation rationale, raw material specifications, finished product limits, and analytical methods.' },
      { step: '03', title: 'Notarisation & Consular Stamping', description: 'Facilitating chamber attestations, Ministry of External Affairs legalization, and embassy stamps.' },
      { step: '04', title: 'Regulatory Query Resolution', description: 'Fast technical replies to local health authority queries to expedite product market entry.' }
    ],
    specifications: [
      { label: 'Regulatory Frameworks', value: 'US FDA 21 CFR Part 111, EU Directive 2002/46/EC, GCC GSO 2233, FSSAI' },
      { label: 'Certifications', value: 'US FDA FEI Registered, WHO-GMP Certified, ISO 22000:2018, HACCP, Halal, Kosher' },
      { label: 'Stability Conditions Tested', value: 'Zone I/II (25°C/60% RH) and Zone IVb (40°C/75% RH)' },
      { label: 'Turnaround Time', value: 'Complete Dossier ready within 10 to 14 days' }
    ],
    deliveryFormats: ['Digital eCTD/PDF Dossiers', 'Legalised Hard Copies with MEA Apostille', 'Product Technical Data Sheets', 'Certificate of Origin'],
    faqs: [
      { question: 'Which health authorities have your facilities registered with?', answer: 'We are registered with the US FDA (FEI registration), FSSAI (Central Export License), and certified under WHO-GMP and ISO 22000.' },
      { question: 'Do you provide Halal certification for Islamic markets?', answer: 'Yes, all our facilities and products can be certified with international Halal compliance bodies recognised in the GCC and Southeast Asia.' }
    ]
  },
  {
    slug: 'custom-packaging-and-brand-presentation',
    number: '08',
    title: 'Custom packaging & brand presentation',
    tag: 'BRAND EXCELLENCE',
    tagline: 'Versatile packaging formats including HDPE bottles, blister packs, sachets, stick packs, and luxury cartons.',
    image: '/assets/solutions/solutions-packaging.jpg',
    alt: 'Premium nutraceutical bottles, blister packs, jars and stand-up pouches',
    overview: 'Your packaging is the first physical interaction a customer has with your brand. We offer premium container selection, induction sealing, tamper-evident neck bands, metallised sachet foil printing, and high-impact outer retail cartons.',
    highlights: [
      'Comprehensive container library: HDPE bottles, amber glass, PET jars, metal tins',
      'Child-resistant and senior-friendly closure systems with induction foil seals',
      'High-barrier foil sachets and stick packs for moisture-sensitive powders',
      'FSC-certified paperboard outer cartons with embossing, foil stamping, and spot UV'
    ],
    capabilities: [
      { title: 'Pharmaceutical Bottling', description: 'Automated counting and bottling lines with cotton insertion, silica desiccant, and induction sealing.' },
      { title: 'Blister Packaging', description: 'ALU-ALU cold-form and PVC/PVDC thermoform blister strips for sensitive capsules and softgels.' },
      { title: 'Multi-Lane Sachet & Stick Packs', description: 'High-speed powder packing into 1g to 35g hermetically sealed single-serve foil sachets.' },
      { title: 'Premium Carton Engineering', description: 'Precision folding cartons with tear strips, tamper seals, internal dividers, and luxury matte/gloss finishes.' }
    ],
    process: [
      { step: '01', title: 'Packaging Concept & Die-Lines', description: 'Providing exact engineering dielines and material specifications for your design team.' },
      { step: '02', title: 'Barrier Property Testing', description: 'Verifying oxygen transmission rates (OTR) and water vapor transmission rates (WVTR) for the product formula.' },
      { step: '03', title: 'Pre-Production Proof Approval', description: 'Digital and physical proof validation for color calibration, Pantone matching, and barcode scannability.' },
      { step: '04', title: 'Automated Line Packaging', description: 'High-speed automated packing with in-line visual inspection, batch lot coding, and expiry laser etching.' }
    ],
    specifications: [
      { label: 'Bottle Sizes Available', value: '30cc to 1000cc HDPE / PET / Glass' },
      { label: 'Blister Configurations', value: '10s, 15s, 30s blister cards with ALU-ALU or PVC/PVDC' },
      { label: 'Sachet Fill Range', value: '1g to 45g with nitrogen flush option' },
      { label: 'Carton Finishes', value: 'Soft-touch matte, Spot UV, Foil Stamping, Embossing, FSC Certified' }
    ],
    deliveryFormats: ['Rigid Bottled Products', 'Blister Strips in Unit Cartons', 'Single-Serve Stick Packs', 'Bulk Stand-up Zipper Pouches'],
    faqs: [
      { question: 'Can you match custom brand Pantone colors on bottles?', answer: 'Yes, we provide masterbatch color matching for bottles, caps, and closures for production runs exceeding standard MOQs.' },
      { question: 'Do you offer sustainable or recyclable packaging options?', answer: 'Yes, we provide 100% recyclable PCR (post-consumer recycled) plastic bottles and biodegradable mono-material pouches.' }
    ]
  }
];
