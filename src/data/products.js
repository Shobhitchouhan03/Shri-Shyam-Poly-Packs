import { productImages, manufacturingImages } from "./imageRegistry.js";

/**
 * Shri Shyam Poly Packs — Master Products Catalogue Data
 * High-resolution authentic product photography mappings with multi-image gallery views.
 * Strictly B2B technical specifications (No product pricing or rates).
 */
export const products = [
  {
    id: "pp-woven-bags",
    slug: "pp-woven-bags",
    name: "PP Woven Bags",
    category: "PP Woven Bags",
    shortDescription: "High-strength polypropylene woven sacks for heavy-duty agricultural and industrial bulk packaging.",
    fullDescription: "Our Polypropylene (PP) Woven Bags are engineered using high-tenacity virgin polypropylene resin tapes on advanced circular looms. Built to withstand rough handling during loading, transit, and long-term stack storage, these sacks deliver exceptional bursting strength and tearing resistance across all weather conditions.",
    applications: [
      "Grain & Seed Storage (Wheat, Rice, Pulses, Maize)",
      "Animal & Poultry Feed Packaging",
      "Chemicals & Mineral Powder Containment",
      "Sugar & Salt Bulk Logistics",
      "Sand & Construction Material Transport"
    ],
    features: [
      "Manufactured from 100% virgin high-tenacity polypropylene polymers",
      "UV-stabilized polymer formulation for outdoor weather protection",
      "Reinforced double-fold bottom stitching preventing seam failure under load",
      "Anti-skid weave texture preventing stack slippage in warehouses",
      "Available in un-hemmed or hemmed top cut with custom gusset options"
    ],
    material: "100% Virgin Polypropylene (PP)",
    laminated: "Available in Laminated or Unlaminated Options",
    printed: "Flexographic Printing up to 6 Colors",
    image: productImages.ppWovenBag,
    gallery: [
      productImages.ppWovenBag,
      productImages.ppWovenBagView2,
      productImages.ppWovenBagView3,
      productImages.unlaminatedBag
    ],
    customizationOptions: "Customizable according to requirement",
    specifications: {
      "Fabric Weight (GSM)": "50 GSM to 140 GSM",
      "Bag Width": "30 cm to 90 cm (12 inch to 35 inch)",
      "Bag Length": "45 cm to 140 cm (18 inch to 55 inch)",
      "Weave Density": "8x8 to 14x14 mesh per square inch",
      "Denier Rating": "600D to 1200D high tenacity tape",
      "Color Options": "Milky White, Yellow, Blue, Green, Natural Transparent"
    }
  },
  {
    id: "hdpe-woven-bags",
    slug: "hdpe-woven-bags",
    name: "HDPE Woven Bags",
    category: "PP Woven Bags",
    shortDescription: "Ultra-durable High-Density Polyethylene woven sacks designed for severe abrasion and heavy impact resistance.",
    fullDescription: "High-Density Polyethylene (HDPE) Woven Bags offer maximum tensile toughness, puncture endurance, and chemical inertness. Specifically formulated for sharp, heavy, or abrasive contents such as coarse minerals, aggregates, dynamic chemical compounds, and dense agricultural goods.",
    applications: ["Coarse Minerals & Ores", "Industrial Chemicals", "Fertilizer Pellets", "Construction Aggregates", "Heavy Commodity Logistics"],
    features: [
      "Superior puncture and drop resistance compared to standard packaging",
      "Chemical & solvent inertness preventing bag degradation",
      "High temperature stability during hot-filling operations",
      "Custom gussets allowing efficient box-like stacking on pallets",
      "Flexo printed with high-adhesion corona treated surface ink"
    ],
    material: "High-Density Polyethylene (HDPE)",
    laminated: "Extrusion Laminated / Inner Liner Insert Available",
    printed: "Custom Flexographic Printing",
    image: productImages.hdpeWovenBag,
    gallery: [
      productImages.hdpeWovenBag,
      productImages.ppWovenBagView2,
      productImages.ppWovenBagView3,
      productImages.unlaminatedBag
    ],
    customizationOptions: "Customizable according to requirement",
    specifications: {
      "Fabric GSM": "65 GSM - 150 GSM",
      "Width Range": "35 cm - 85 cm",
      "Length Range": "50 cm - 130 cm",
      "Tensile Strength": "> 950 N / 50mm warp & weft endurance",
      "Liner Thickness": "20 micron to 75 micron HM-HDPE / LDPE liner"
    }
  },
  {
    id: "laminated-woven-sacks",
    slug: "laminated-woven-sacks",
    name: "Laminated Woven Sacks",
    category: "Laminated Bags",
    shortDescription: "Moisture-barrier woven sacks coated with PP/PE film or glossy printed BOPP film for total atmospheric protection.",
    fullDescription: "Laminated Woven Sacks combine the structural strength of woven fabric with a continuous extruded polymer film barrier. Ideal for moisture-sensitive products such as fine chemicals, milk powder, sugar, processed food grains, and hygroscopic fertilizers.",
    applications: ["Hygroscopic Chemicals", "Refined Sugar & Salt", "Specialty Fertilizers", "Animal Feed Concentrates", "Processed Flour & Pulses"],
    features: [
      "100% moisture-proof and dust-tight seal",
      "Glossy or matte BOPP reverse-printed photo-realistic artwork",
      "Prevents product aroma loss and external contamination",
      "High burst resistance during high-drop transit",
      "Anti-static and UV stabilization options"
    ],
    material: "PP Woven Fabric + Polyethylene / BOPP Lamination Film",
    laminated: "100% Extrusion / BOPP Laminated",
    printed: "Reverse Gravure / Flexo Printing up to 8 Colors",
    image: productImages.laminatedSack,
    gallery: [
      productImages.laminatedSack,
      productImages.printedBag,
      productImages.foodGrainBag,
      productImages.fertilizerBag
    ],
    customizationOptions: "Customizable according to requirement",
    specifications: {
      "Lamination Thickness": "15 to 35 microns coating layer",
      "Fabric Weight": "60 GSM - 160 GSM total laminated GSM",
      "Width": "30 cm - 80 cm",
      "Finish": "High Gloss, Silk Matte, Metallic Foil Effect"
    }
  },
  {
    id: "unlaminated-woven-bags",
    slug: "unlaminated-woven-bags",
    name: "Unlaminated Woven Bags",
    category: "PP Woven Bags",
    shortDescription: "Breathable woven sacks allowing natural air circulation for agricultural produce and moisture-releasing commodities.",
    fullDescription: "Unlaminated woven polypropylene sacks feature micro-porous weave gaps that facilitate internal aeration. Essential for agricultural commodities requiring heat dissipation and natural moisture evaporation during storage.",
    applications: ["Raw Potatoes & Onions", "Fresh Harvest Pulses", "Raw Agricultural Produce", "Wood Pellets & Biomass", "Coarse Animal Fodder"],
    features: [
      "Natural breathability preventing moisture build-up and mold growth",
      "Lightweight yet capable of carrying up to 50 kg load capacities",
      "Cost-effective bulk packaging solution for commodity trading",
      "Easy manual or automated sewing machine closing",
      "Fully recyclable polymer material"
    ],
    material: "100% Polypropylene Woven Fabric",
    laminated: "Unlaminated (Breathable)",
    printed: "Standard 1-4 Color Flexographic Branding",
    image: productImages.unlaminatedBag,
    gallery: [
      productImages.unlaminatedBag,
      productImages.ppWovenBagView2,
      productImages.ppWovenBagView3,
      productImages.ppWovenBag
    ],
    customizationOptions: "Customizable according to requirement",
    specifications: {
      "GSM Range": "48 GSM - 110 GSM",
      "Porosity": "Controlled breathability via weave mesh",
      "Top Cut": "Heat cut zig-zag or turned hemmed top",
      "Bottom Stitch": "Single or double fold lock stitch"
    }
  },
  {
    id: "pp-woven-rolls",
    slug: "pp-woven-rolls",
    name: "PP Woven Rolls",
    category: "PP Woven Rolls",
    shortDescription: "Continuous tubular and flat woven polypropylene fabric rolls for industrial bag converting and wrap covers.",
    fullDescription: "High-quality continuous PP Woven Fabric Rolls supplied in tubular or open-flat roll form. Manufactured on high-speed loom machinery with uniform GSM and width control for automated sack making, lumber wrapping, and industrial ground covers.",
    applications: ["Automated Bag Converting Lines", "Industrial Steel & Pipe Wrapping", "Agricultural Crop & Hay Covers", "Geotextile Ground Control", "Lumber & Timber Protection"],
    features: [
      "Available in tubular mesh or open-slits flat cloth format",
      "Consistent GSM across roll length up to 5000 meters",
      "Precision edge trimming preventing selvedge fraying",
      "Corona treated surface for downstream flexo printing",
      "High UV resistance option for outdoor tarpaulins"
    ],
    material: "Polypropylene (Tubular or Flat Fabric)",
    laminated: "Available Unlaminated or Extrusion Laminated",
    printed: "Unprinted or Continuous Strip Printed",
    image: productImages.ppWovenRoll,
    gallery: [
      productImages.ppWovenRoll,
      manufacturingImages.weavingJpg,
      manufacturingImages.extrusionJpg,
      productImages.ppWovenRoll
    ],
    customizationOptions: "Customizable according to requirement",
    specifications: {
      "Roll Width": "25 cm to 150 cm (Tubular), up to 300 cm (Flat)",
      "Roll Length": "500 meters to 5000 meters continuous reel",
      "Fabric Weight": "50 GSM - 180 GSM",
      "Core Diameter": "76mm (3 inch) heavy paper or PVC core"
    }
  },
  {
    id: "printed-woven-bags",
    slug: "printed-woven-bags",
    name: "Printed Woven Bags",
    category: "Printed Bags",
    shortDescription: "High-definition multi-color flexographic printed sacks for strong brand identity and regulatory markings.",
    fullDescription: "Enhance product visibility in retail and B2B markets with our high-definition printed woven sacks. Using computerized flexographic printing presses, we deliver sharp brand logos, barcodes, batch numbers, and regulatory safety guidelines.",
    applications: ["Branded Cattle & Poultry Feed", "Retail Pack Wheat & Rice", "Branded Seeds & Agro Inputs", "Commercial Fertilizer Sacks"],
    features: [
      "Multi-color flexographic printing up to 6 colors with crisp registration",
      "Fade-resistant inks ensuring vibrant appearance during yard storage",
      "Corona-treated polymer surface for permanent ink adhesion",
      "Bar code & QR code printable for logistics tracking",
      "Custom branding artwork design support available"
    ],
    material: "PP / HDPE Woven Fabric",
    laminated: "Optional Lamination Layer for Gloss Finish",
    printed: "High-Precision Flexographic Printing",
    image: productImages.printedBag,
    gallery: [
      productImages.printedBag,
      productImages.laminatedSack,
      productImages.foodGrainBag,
      productImages.fertilizerBag
    ],
    customizationOptions: "Customizable according to requirement",
    specifications: {
      "Print Colors": "1 to 6 colors flexo print",
      "Registration": "+/- 1.0mm accurate alignment",
      "Ink Type": "Treated solvent-based / water-based non-toxic inks",
      "Bag Sizes": "All custom bag dimensions supported"
    }
  },
  {
    id: "food-grain-bags",
    slug: "food-grain-bags",
    name: "Food Grain Bags",
    category: "Food Grain Bags",
    shortDescription: "Food-grade virgin polypropylene sacks specifically manufactured for hygienic food crop containment.",
    fullDescription: "Hygienically produced food grain packaging sacks manufactured from 100% food-contact safe virgin polymer resins. Free from heavy metals, recycled contaminants, or harmful chemical odors, ensuring compliance with food safety transportation standards.",
    applications: ["Polished Rice Packaging", "Wheat Flour & Semolina", "Pulses, Beans & Lentils", "Spices & Mustard Seeds", "Sugar & Food Ingredients"],
    features: [
      "100% food-grade virgin polymer certification",
      "Odorless material preserving natural food grain aroma",
      "High drop test rating ensuring zero bag rupture during rail/truck loading",
      "Optional micro-perforations for controlled grain respiration",
      "Clear transparent window option for product visibility"
    ],
    material: "100% Food-Grade Virgin PP Polymer",
    laminated: "Laminated or Inner Food-Grade Liner Insert",
    printed: "Food-Safe Non-Toxic Ink Flexo Printing",
    image: productImages.foodGrainBag,
    gallery: [
      productImages.foodGrainBag,
      productImages.unlaminatedBag,
      productImages.ppWovenBagView2,
      productImages.laminatedSack
    ],
    customizationOptions: "Customizable according to requirement",
    specifications: {
      "Bag Capacities": "5 kg, 10 kg, 25 kg, 50 kg standard grain capacities",
      "Polymer Grade": "FDA / Food Contact Compliant Virgin Polypropylene",
      "Safety Factor": "5:1 safe handling load ratio",
      "Liner Option": "Virgin LDPE inner liner bag inserted"
    }
  },
  {
    id: "fertilizer-packaging-bags",
    slug: "fertilizer-packaging-bags",
    name: "Fertilizer Packaging Bags",
    category: "Fertilizer Bags",
    shortDescription: "Heavy-duty chemical resistant sacks with HM-HDPE liners for active chemical fertilizers and agro-nutrients.",
    fullDescription: "Engineered specifically for active chemical compounds such as Urea, DAP, NPK, and organic composts. Features robust chemical inertness, high tear resistance, and optional inner liner insertion to shield contents from ambient humidity.",
    applications: ["Urea & DAP Fertilizer", "NPK Complex Fertilizers", "Organic Manure & Bio-Fertilizers", "Micronutrient Granules", "Pesticide Carrier Powders"],
    features: [
      "HM-HDPE liner inserted and top hemmed for 100% humidity barrier",
      "High resistance to acidic and alkaline chemical action",
      "UV-stabilized for extended outdoor farm yard storage",
      "Reinforced heavy-duty bottom stitching to support 50 kg fill",
      "High-adhesion printing resistant to chemical fumes"
    ],
    material: "PP / HDPE Heavy Woven Fabric + HM Liner",
    laminated: "Extrusion Laminated / Liner Insert",
    printed: "Standard Agricultural Regulatory Layout Print",
    image: productImages.fertilizerBag,
    gallery: [
      productImages.fertilizerBag,
      productImages.greenWovenBag,
      productImages.printedBag,
      productImages.laminatedSack
    ],
    customizationOptions: "Customizable according to requirement",
    specifications: {
      "Standard Capacity": "25 kg & 50 kg bag sizes",
      "Fabric Weight": "70 GSM - 120 GSM",
      "Liner Specification": "25 to 50 micron HM-HDPE liner sealed bottom",
      "Chemical Test": "Acid/Alkali resistance verified"
    }
  },
  {
    id: "cement-packaging-bags",
    slug: "cement-packaging-bags",
    name: "Cement Packaging Bags",
    category: "Cement Bags",
    shortDescription: "Valve and block-bottom sacks designed for high-speed automated cement filling lines.",
    fullDescription: "Engineered for high-speed automatic filling lines in cement and dry mortar plants. Features self-closing internal valves and micro-perforations to allow trapped air to escape while keeping cement dust completely sealed.",
    applications: ["Portland Cement", "Wall Putty", "Tile Adhesives", "Dry Mortar Mix", "Gypsum Plaster"],
    features: [
      "Micro-perforated air release vents for dustless filling",
      "Self-closing valve options for high-speed packing lines",
      "High temperature filling tolerance up to 100°C",
      "Zero material seepage design with tight block bottom",
      "High drop test rating for rough handling on construction sites"
    ],
    material: "High Strength PP Woven Fabric + Extrusion Coating",
    laminated: "Extrusion laminated with kraft paper/BOPP layer",
    printed: "Standard construction brand layout flexo print",
    image: productImages.cementBag,
    gallery: [
      productImages.cementBag,
      productImages.ppWovenBagView2,
      productImages.ppWovenBagView3,
      productImages.hdpeWovenBag
    ],
    customizationOptions: "Contact for suitable specifications",
    specifications: {
      "Bag Style": "Block Bottom Valve Sack / Top Open Valve",
      "Valve Size": "90mm to 130mm automatic valve sleeve",
      "Fabric GSM": "75 GSM - 110 GSM",
      "Filling Temp": "Up to 100°C filling line endurance",
      "Air Venting": "Controlled pin-hole micro-perforation"
    }
  },
  {
    id: "customized-industrial-packaging",
    slug: "customized-industrial-packaging",
    name: "Customized Industrial Packaging",
    category: "B2B Solutions",
    shortDescription: "Bespoke engineered woven packaging tailormade for specialized dimensions, loads, and environments.",
    fullDescription: "For unique industrial applications requiring non-standard bag dimensions, extreme load capacities, or specialized polymer blends. Our engineering team custom builds sacks with gussets, lifting loops, anti-static treatments, and heavy liners.",
    applications: ["Heavy Machinery Cover", "Export Shipping Packaging", "Hazardous Goods Handling", "Bulk Polymer Granules"],
    features: [
      "Custom GSM, dimensions, gusseting, and lifting loop options",
      "Specialized liner insertion & moisture barrier layering",
      "Reinforced corner stitching for multi-ton tensile strength",
      "Special anti-static / flame retardant polymer treatments available",
      "Full custom branding, hazard symbols, and handling artwork"
    ],
    material: "Polypropylene / Polyethylene Blends",
    laminated: "Tailored to client specification",
    printed: "Full custom branding & handling symbols",
    image: productImages.customIndustrial,
    gallery: [
      productImages.customIndustrial,
      productImages.ppWovenRoll,
      productImages.hdpeWovenBag,
      productImages.laminatedSack
    ],
    customizationOptions: "Customizable according to requirement",
    specifications: {
      "Customization Depth": "100% tailored to technical drawing",
      "Weight Capacity": "Up to 1000 kg (FIBC / Heavy Duty Sacks)",
      "Special Coatings": "Anti-static, Anti-skid, UV, Flame Retardant",
      "Sampling": "Custom prototype production on approval"
    }
  },
  {
    id: "blue-pp-woven-sack-bag",
    slug: "blue-pp-woven-sack-bag",
    name: "Blue PP Woven Sack Bag",
    category: "PP Woven Bags",
    shortDescription: "Durable blue polypropylene woven sack designed for bulk packaging, storage and transportation applications.",
    fullDescription: "Our Blue PP Woven Sack Bags are engineered using high-tenacity virgin polypropylene resin with heavy-duty blue color pigmentation. Specifically designed for high-visibility industrial color coding, bulk chemical granule packaging, agricultural produce, and heavy-duty commodity logistics.",
    applications: ["Bulk Commodity Logistics", "Chemical Granules", "Agro Packaging", "Fertilizers", "Industrial Powders"],
    features: [
      "Vivid blue industrial color coding for quick inventory identification",
      "High tensile bursting strength and drop impact resistance",
      "UV stabilized polymer formulation for outdoor yard storage",
      "Hemmed top cut with double stitched bottom seam",
      "Customizable GSM (55 GSM to 130 GSM) and denier specifications"
    ],
    material: "100% Virgin Polypropylene (Blue Pigmented)",
    laminated: "Unlaminated or Laminated option",
    printed: "Custom Flexographic printing up to 4 colors",
    image: productImages.blueWovenBag,
    gallery: [
      productImages.blueWovenBag,
      productImages.blueWovenBagView2,
      productImages.ppWovenBagView3,
      productImages.blueWovenBag
    ],
    customizationOptions: "Customizable according to requirement",
    specifications: {
      "Fabric Weight (GSM)": "55 GSM - 130 GSM",
      "Bag Width": "35 cm to 85 cm",
      "Bag Length": "50 cm to 135 cm",
      "Fabric Color": "Industrial Royal Blue / Sky Blue",
      "Top Style": "Heat cut or hemmed top",
      "Bottom Stitching": "Double line lock stitch"
    }
  },
  {
    id: "green-pp-woven-sack-bag",
    slug: "green-pp-woven-sack-bag",
    name: "Green PP Woven Sack Bag",
    category: "PP Woven Bags",
    shortDescription: "Strong green polypropylene woven sack suitable for agricultural, industrial and bulk material packaging.",
    fullDescription: "Crafted for agricultural and industrial packaging, Green PP Woven Sack Bags combine high load-bearing capacity with color-coded containment. Popular across seed processing plants, organic fertilizer distributors, animal feed mills, and bulk agro-commodity exporters.",
    applications: ["Organic Fertilizers", "Seed Packaging", "Animal Feed Sacks", "Agricultural Commodities", "Grain Storage"],
    features: [
      "Industrial green pigmentation ideal for agro & organic branding",
      "Heavy load-bearing capacity with reinforced bottom seam",
      "Moisture-resistant extrusion coating and liner options",
      "100% recyclable high-density polypropylene composition",
      "Precision cut size for high-speed automated packing lines"
    ],
    material: "100% Virgin Polypropylene (Green Pigmented)",
    laminated: "Extrusion Lamination / Liner Insertion available",
    printed: "High-definition flexo printing up to 6 colors",
    image: productImages.greenWovenBag,
    gallery: [
      productImages.greenWovenBag,
      productImages.greenWovenBagView2,
      productImages.ppWovenBagView3,
      productImages.greenWovenBag
    ],
    customizationOptions: "Available based on packaging application",
    specifications: {
      "Fabric Weight (GSM)": "60 GSM - 135 GSM",
      "Bag Width": "35 cm to 90 cm",
      "Bag Length": "50 cm to 140 cm",
      "Fabric Color": "Agricultural Forest Green / Bright Green",
      "Bottom Stitching": "Double seam chain stitch",
      "UV Resistance": "Minimum 500 hours outdoor stability"
    }
  },
  {
    id: "yellow-pp-woven-sack-bag",
    slug: "yellow-pp-woven-sack-bag",
    name: "Yellow PP Woven Bag",
    category: "PP Woven Bags",
    shortDescription: "Durable yellow PP woven sack designed for reliable bulk packaging, storage and transportation across agricultural, industrial and commercial applications.",
    fullDescription: "High-visibility Yellow PP Woven Bag engineered for heavy-duty bulk material handling, grain storage, polymer resin transport, and industrial commodity packaging. Features anti-slip weave structure, high tensile yarn tenacity, and optional moisture-barrier liner insertion.",
    applications: ["Aggregates & Resins", "Seed & Grain Storage", "Agricultural Produce", "Chemical Bulk Supply", "Animal Feed"],
    features: [
      "High-visibility industrial yellow pigmentation",
      "Superior tensile yarn strength with burst-proof seam stitching",
      "UV stabilized polymer composition for outdoor storage",
      "Moisture-proof liner and lamination customization",
      "Suitable for manual loading and high-speed automated bagging lines"
    ],
    material: "100% Virgin Polypropylene (Yellow Pigmented)",
    laminated: "Available (BOPP / PE Extrusion Lamination)",
    printed: "Custom flexo printing up to 6 colors",
    image: productImages.yellowWovenBag,
    gallery: [
      productImages.yellowWovenBag,
      productImages.yellowWovenBagView2,
      productImages.yellowWovenBagView3,
      productImages.yellowWovenBagView4
    ],
    customizationOptions: "Custom width, length, GSM, liner thickness, and printing",
    specifications: {
      "Fabric Weight (GSM)": "55 GSM - 140 GSM",
      "Bag Width": "30 cm to 95 cm",
      "Bag Length": "45 cm to 150 cm",
      "Fabric Color": "Industrial Safety Yellow",
      "Lining Option": "Inserted HM-HDPE or LDPE Liner",
      "UV Stabilization": "200 to 1000 Hours UV Protection"
    }
  }
];
