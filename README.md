# Shri Shyam Poly Packs — Premium B2B Industrial Packaging Website

"Strong Packaging. Reliable Protection."

This is the production-ready, ultra-premium web application for **Shri Shyam Poly Packs**, a leading manufacturer and bulk supplier of Polypropylene (PP) woven sacks, HDPE woven bags, BOPP laminated bags, flexographic printed bags, breathable mesh bags, fabric rolls, and block-bottom valve cement sacks.

---

## 🚀 Tech Stack

- **Core**: React 18 + JavaScript (JSX) + Vite 6
- **Styling**: Tailwind CSS v4 + Custom Theme System
- **Animations**: GSAP 3 (ScrollTrigger, context cleanup, reduced-motion fallback)
- **3D Graphics**: Three.js + React Three Fiber + React Three Drei (Procedural 3D industrial models, soft studio lighting, offscreen pause, WebGL 2D fallback)
- **Icons**: Lucide React
- **Architecture**: ES Module Image Registry (`SafeImage`), 8-Step Guided Smart Enquiry Wizard, Lead Source Tracking, WhatsApp Click-to-Chat Generator, Dynamic SEO & JSON-LD Structured Data Schema.

---

## 📁 Directory Structure

```text
shri-shyam-poly-pack/
├── public/
│   ├── favicon.svg             # Industrial woven grid SVG favicon
│   ├── site.webmanifest        # Web App manifest
│   ├── sitemap.xml             # Production XML sitemap
│   └── robots.txt              # Search crawler directives
├── src/
│   ├── assets/
│   │   └── images/             # Business-specific local WebP/JPG image assets
│   ├── components/
│   │   ├── common/             # Reusable UI (Button, Card, SafeImage, PageHero, SEO, Reveal, RequestQuoteModal)
│   │   ├── home/               # Homepage sections (TrustStrip, FeaturedProducts, ManufacturingProcess, etc.)
│   │   ├── layout/             # Navigation header (Navbar), MobileMenu, Footer, ScrollProgress
│   │   └── three/              # Three.js 3D architecture (HeroCanvas, HeroScene, IndustrialBag, IndustrialRoll, Lights, Environment, CameraRig, Product3DVisual)
│   ├── data/
│   │   ├── company.js          # Editable company details, phone, email, address, business hours
│   │   ├── imageRegistry.js    # Central ES Module image imports & fallbacks
│   │   ├── products.js         # Complete product catalogue data & specifications
│   │   └── industries.js       # Target industry sector data
│   ├── hooks/
│   │   ├── useGSAPReveal.js    # GSAP reveal animation hook
│   │   ├── useReducedMotion.js # Reduced motion accessibility hook
│   │   └── useScrollToTop.js   # Route change scroll restoration hook
│   ├── pages/
│   │   ├── Home.jsx            # Homepage
│   │   ├── About.jsx           # Company profile & infrastructure page
│   │   ├── Products.jsx        # Interactive filterable product catalogue
│   │   ├── ProductDetails.jsx  # Detailed product specification page
│   │   ├── Industries.jsx      # Industry solutions page
│   │   ├── Quality.jsx         # Quality assurance & testing standards page
│   │   ├── Contact.jsx         # Quick message form, contact info, Google Maps, & FAQ
│   │   └── NotFound.jsx       # 404 Error page
│   ├── utils/
│   │   ├── animation.js        # Central GSAP animation presets & helpers
│   │   ├── seoSchema.js        # JSON-LD Organization, Product, & FAQPage schemas
│   │   └── whatsapp.js         # WhatsApp URL & Mailto text formatting utilities
│   ├── App.jsx                 # Main application shell with route transitions
│   ├── index.css               # Tailwind CSS theme tokens, custom scrollbars, safe-area insets
│   └── main.jsx                # React root entry point
├── package.json
├── PROJECT_STATUS.md           # Complete step-by-step development history
└── README.md
```

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### 3. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## ⚙️ How to Customize & Content Maintenance

### 1. Replacing Company Contact Details
Edit [`src/data/company.js`](file:///Users/apple/Downloads/shri-shyam-poly-packs/src/data/company.js) to update official details:
- `phone`: Contact phone number
- `whatsapp`: WhatsApp number with country code (e.g., `+919876543210`)
- `email`: Contact email address
- `officeAddress`: Corporate office address
- `factoryAddress`: Manufacturing plant address
- `businessHours`: Working hours
- `googleMapsUrl`: Google Maps directions embed URL

### 2. Modifying Products & Specifications
Edit [`src/data/products.js`](file:///Users/apple/Downloads/shri-shyam-poly-packs/src/data/products.js) to add, edit, or remove products. Each product object contains:
- `id`, `slug`, `name`, `category`
- `shortDescription`, `fullDescription`
- `material`, `laminated`, `printed`, `customizationOptions`
- `applications` array
- `features` array
- `specifications` key-value matrix

### 3. Updating Images
1. Save your WebP or JPG images into `src/assets/images/products/` or `src/assets/images/company/`.
2. Import and assign them inside [`src/data/imageRegistry.js`](file:///Users/apple/Downloads/shri-shyam-poly-packs/src/data/imageRegistry.js).

### 4. Changing Theme Brand Colors
Edit theme variables in [`src/index.css`](file:///Users/apple/Downloads/shri-shyam-poly-packs/src/index.css):
- Deep Forest: `#103D2D`
- Industrial Green: `#1D6448`
- Dark Charcoal: `#171A18`
- Warm Beige: `#E8E0D1`
- Off White: `#F6F4EE`
- Gold Accent: `#C59A4A`

---

## 🌐 Deployment Instructions

### Vercel Deployment
1. Connect your repository to Vercel.
2. Build Settings:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy!

### Netlify Deployment
1. Connect your repository to Netlify.
2. Build Settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
3. Add `_redirects` rule if needed: `/* /index.html 200`.

### Cloudflare Pages / Static Server
- Deploy the contents of the generated `dist/` directory after running `npm run build`. Update `sitemap.xml` with your final domain name.

---

## 🔒 Policy & Rules Followed

- **Strict No-Pricing Policy**: Zero prices, rates, or currency symbols anywhere on the website.
- **Brand Consistency**: Official brand name **Shri Shyam Poly Packs** used strictly across all files, components, titles, metadata, and documentation.
- **Frontend-Only**: No server or database dependencies; all enquiry submissions generate WhatsApp URLs, plain-text emails, and `mailto:` links with lead source tracking.

---

© 2026 **Shri Shyam Poly Packs**. All Rights Reserved.
