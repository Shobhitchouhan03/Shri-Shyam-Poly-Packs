import { industryImages } from "./imageRegistry.js";

export const industries = [
  {
    id: "agriculture",
    name: "Agriculture & Farming",
    description: "Heavy-duty breathable and moisture-proof packaging for seeds, grains, crops, and harvested produce.",
    image: industryImages.agriculture,
    icon: "Wheat",
  },
  {
    id: "food-processing",
    name: "Food & Grain Processing",
    description: "Hygienic food-grade certified packaging for flour, sugar, pulses, legumes, and rice millers.",
    image: industryImages.foodGrains,
    icon: "Utensils",
  },
  {
    id: "construction",
    name: "Construction & Building",
    description: "Tough block-bottom valve sacks for cement, sand, gravel, wall putty, and dry building mortars.",
    image: industryImages.constructionSvg,
    icon: "Building2",
  },
  {
    id: "fertilizers",
    name: "Fertilizers & Agro-Chemicals",
    description: "Chemically inert sacks with liner protection engineered to prevent seepage and chemical degradation.",
    image: industryImages.fertilizer,
    icon: "Sprout",
  },
  {
    id: "chemical",
    name: "Chemical Powders & Resins",
    description: "Laminated moisture-barrier sacks for hazardous fine chemical powders and polymer granules.",
    image: industryImages.chemical,
    icon: "FlaskConical",
  },
  {
    id: "animal-feed",
    name: "Animal Feed & Nutrition",
    description: "High-tensile woven sacks for cattle feed, poultry nutrition, and mineral supplements.",
    image: industryImages.animalFeed,
    icon: "Package",
  },
  {
    id: "seeds",
    name: "Certified Seed Packaging",
    description: "Precision printed small woven sacks for certified seed producers and distributors.",
    image: industryImages.seeds,
    icon: "Sprout",
  },
  {
    id: "industrial-manufacturing",
    name: "Industrial & Manufacturing",
    description: "Customized heavy wrapping rolls and continuous tubular sacks tailored for bulk machinery and exports.",
    image: industryImages.industrialMaterial,
    icon: "Factory",
  },
];
