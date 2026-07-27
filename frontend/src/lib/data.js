// Central data source for the Kashmir Atelier Dubai site.

export const BRAND = {
  name: "The Kashmir Atelier Dubai",
  short: "Kashmir Atelier",
  phone: "+91 6006921213",
  phoneRaw: "+916006921213",
  email: "thekashmiratelier@gmail.com",
  whatsapp: "916006921213",
  address:
    "Sangar Mall, Nishat Brein Link Road, Srinagar, Jammu & Kashmir, 191121",
  addressShort: "Sangar Mall, Nishat Brein Link Road, Srinagar 191121",
  city: "Srinagar · Dubai",
  founded: "Est. 2009",
  social: {
    instagram: "https://instagram.com/thekashmiratelier",
    facebook: "https://facebook.com/thekashmiratelier",
    linkedin: "https://linkedin.com/company/thekashmiratelier",
    youtube: "https://youtube.com/@thekashmiratelier",
  },
};

// User-uploaded assets — these are their real reference works.
export const USER_ASSETS = {
  villaElevations:
    "https://customer-assets-agu9un31.emergentagent.net/job_5705b8c8-bfe0-4194-b328-e2be07e88aef/artifacts/kogqt5mh_1775294291099.png",
  dubaiPenthouse:
    "https://customer-assets-agu9un31.emergentagent.net/job_5705b8c8-bfe0-4194-b328-e2be07e88aef/artifacts/wts1236q_1775748347566.png",
  arabicMajlis:
    "https://customer-assets-agu9un31.emergentagent.net/job_5705b8c8-bfe0-4194-b328-e2be07e88aef/artifacts/k8utogaf_1779214285348.png",
  kashmirMountainHouse:
    "https://customer-assets-agu9un31.emergentagent.net/job_5705b8c8-bfe0-4194-b328-e2be07e88aef/artifacts/066rqm8q_1782120012443.png",
};

// Curated luxury imagery (Unsplash, freely licensed).
export const IMG = {
  hero1:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85",
  hero2:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=85",
  hero3:
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2400&q=85",
  marble:
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1800&q=85",
  interior1:
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=85",
  interior2:
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=85",
  interior3:
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1800&q=85",
  villa1:
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1800&q=85",
  villa2:
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85",
  villa3:
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1800&q=85",
  drone:
    "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1800&q=85",
  chandelier:
    "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1600&q=85",
  bathroom:
    "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=85",
  kitchen:
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
  facade:
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=85",
  landscape:
    "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1800&q=85",
  hotel:
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1800&q=85",
  office:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=85",
  restaurant:
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1800&q=85",
  farmhouse:
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1800&q=85",
  dubai:
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1800&q=85",
  before:
    "https://images.unsplash.com/photo-1587582423116-ec07293f0395?auto=format&fit=crop&w=1600&q=85",
  after:
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
  studio:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85",
  ceilingKashmir:
    "https://images.unsplash.com/photo-1519643381401-22c77e60520e?auto=format&fit=crop&w=1600&q=85",
  night:
    "https://images.unsplash.com/photo-1600585153490-76fb20a32601?auto=format&fit=crop&w=1800&q=85",
};

// Featured Projects (curated)
export const FEATURED_PROJECTS = [
  {
    id: "villa-nishat",
    title: "Villa Nishat",
    location: "Nishat, Srinagar",
    category: "Luxury Villa",
    area: "12,400 sqft",
    status: "Delivered · 2024",
    cover: USER_ASSETS.villaElevations,
    caption: "A neo-classical European envelope engineered for Kashmiri winters.",
  },
  {
    id: "majlis-jumeirah",
    title: "Majlis Jumeirah",
    location: "Palm Jumeirah, Dubai",
    category: "Bespoke Interior",
    area: "4,800 sqft",
    status: "Delivered · 2023",
    cover: USER_ASSETS.arabicMajlis,
    caption: "Walnut-carved coffered ceilings, Burj Khalifa in the frame.",
  },
  {
    id: "penthouse-palm",
    title: "Penthouse · The Palm",
    location: "Palm West Beach, Dubai",
    category: "Ultra-Luxury Residence",
    area: "9,200 sqft",
    status: "In Handover",
    cover: USER_ASSETS.dubaiPenthouse,
    caption: "Kashmiri-inspired jaali screens meet a sunset Dubai skyline.",
  },
  {
    id: "chalet-gulmarg",
    title: "Chalet Gulmarg",
    location: "Gulmarg, Kashmir",
    category: "Mountain Residence",
    area: "3,400 sqft",
    status: "Delivered · 2024",
    cover: USER_ASSETS.kashmirMountainHouse,
    caption: "Steep pitch, red brick, snow. A Valley silhouette re-drawn.",
  },
  {
    id: "the-dune-hotel",
    title: "The Dune · Boutique Hotel",
    location: "Downtown Dubai",
    category: "Hospitality",
    area: "48,000 sqft",
    status: "Under Construction",
    cover: IMG.hotel,
    caption: "42 keys, one uninterrupted view of the fountains.",
  },
  {
    id: "atelier-office",
    title: "Atelier Corporate HQ",
    location: "Business Bay, Dubai",
    category: "Corporate Interior",
    area: "18,000 sqft",
    status: "Delivered · 2025",
    cover: IMG.office,
    caption: "A quiet, black-and-brass workspace for a family office.",
  },
];

export const PORTFOLIO_CATEGORIES = [
  "All",
  "Architecture",
  "Interiors",
  "Construction",
  "Commercial",
  "Residential",
  "Luxury Villas",
  "Hotels",
  "Restaurants",
  "Office Spaces",
];

export const PORTFOLIO = [
  { id: "p1", title: "Neo-Classical Villa", cat: "Architecture", img: USER_ASSETS.villaElevations, loc: "Srinagar" },
  { id: "p2", title: "Palm Penthouse", cat: "Interiors", img: USER_ASSETS.dubaiPenthouse, loc: "Dubai" },
  { id: "p3", title: "Majlis Jumeirah", cat: "Interiors", img: USER_ASSETS.arabicMajlis, loc: "Dubai" },
  { id: "p4", title: "Chalet Gulmarg", cat: "Luxury Villas", img: USER_ASSETS.kashmirMountainHouse, loc: "Gulmarg" },
  { id: "p5", title: "Statuario Bath", cat: "Interiors", img: IMG.bathroom, loc: "Dubai" },
  { id: "p6", title: "Marble Foyer", cat: "Construction", img: IMG.marble, loc: "Srinagar" },
  { id: "p7", title: "Corporate HQ", cat: "Office Spaces", img: IMG.office, loc: "Business Bay" },
  { id: "p8", title: "The Dune Hotel", cat: "Hotels", img: IMG.hotel, loc: "Downtown Dubai" },
  { id: "p9", title: "Restaurant Ostraya", cat: "Restaurants", img: IMG.restaurant, loc: "DIFC" },
  { id: "p10", title: "Villa Facade Study", cat: "Architecture", img: IMG.villa1, loc: "Kashmir" },
  { id: "p11", title: "Aerial Villa", cat: "Luxury Villas", img: IMG.villa2, loc: "Jumeirah" },
  { id: "p12", title: "Panorama Kitchen", cat: "Interiors", img: IMG.kitchen, loc: "Palm Jumeirah" },
  { id: "p13", title: "Chandelier Study", cat: "Interiors", img: IMG.chandelier, loc: "Studio" },
  { id: "p14", title: "Facade at Dusk", cat: "Commercial", img: IMG.facade, loc: "Business Bay" },
  { id: "p15", title: "Farmhouse Estate", cat: "Luxury Villas", img: IMG.farmhouse, loc: "Pahalgam" },
  { id: "p16", title: "Residence at Dawn", cat: "Residential", img: IMG.villa3, loc: "Nishat" },
];

export const SERVICES = [
  { g: "Design", items: [
    "Architecture Design", "Interior Design", "Landscape Design",
    "Villa Landscaping", "Lighting Design", "Smart Home Integration",
    "Project Consultancy", "Custom Furniture", "False Ceiling",
    "Wardrobes", "Walk-in Closets",
  ]},
  { g: "Build", items: [
    "Luxury Villas", "Residential Construction", "Commercial Construction",
    "Custom Home Building", "Turnkey Projects", "Hotel Construction",
    "Site Excavation", "Foundation Construction", "Concrete Construction",
    "Steel Structures", "Roof Installation",
  ]},
  { g: "Craft", items: [
    "Italian Marble Flooring", "Tile Installation", "Drywall Installation",
    "Painting", "Structural Repairs", "Basement Waterproofing",
    "Waterproofing", "Plumbing", "MEP Services",
    "Furniture Installation", "Deck Construction",
  ]},
  { g: "Spaces", items: [
    "Luxury Renovation", "Home Extensions", "Kitchen Remodeling",
    "Bathroom Remodeling", "Luxury Apartments", "Luxury Farmhouses",
    "Luxury Offices", "Restaurant Interiors", "Retail Interiors",
    "Corporate Interiors", "Commercial Buildings", "Residential Buildings",
  ]},
  { g: "Manage", items: [
    "Construction Management", "Maintenance", "Refurbishment", "Civil Engineering",
  ]},
];

export const WHY_US = [
  { t: "European Design Philosophy", d: "Silhouettes and ratios drawn from the great Continental studios." },
  { t: "Luxury Materials", d: "Statuario, Calacatta, Kashmiri walnut, aged brass, hand-loomed textiles." },
  { t: "Expert Engineers", d: "Site-hardened teams that survey, model and build every detail in-house." },
  { t: "Award-Level Craftsmanship", d: "Millimetric joinery. Hairline reveals. Nothing hidden with caulk." },
  { t: "Transparent Pricing", d: "A single bill of quantities. No mid-project surprises." },
  { t: "On-Time Delivery", d: "Weekly critical-path reviews with photographic evidence." },
  { t: "Turnkey Solutions", d: "Land to keys. Furniture, styling, and the first fresh flowers." },
  { t: "Premium Client Experience", d: "One director, one WhatsApp thread, one signed manifesto." },
  { t: "Smart Planning", d: "BIM-first, clash-checked, engineered for maintenance decades out." },
  { t: "Lifetime Quality", d: "Structural and interior warranties measured in decades, not months." },
];

export const PROCESS = [
  { n: "01", t: "Consultation", d: "A quiet conversation in Srinagar, Dubai or over a private video call." },
  { n: "02", t: "Concept Design", d: "Mood, mass, material — an unpaid schematic direction to align." },
  { n: "03", t: "Planning", d: "Site survey, statutory drawings, and the bill of quantities." },
  { n: "04", t: "3D Visualisation", d: "Photoreal renders and a walk-through you can stand inside." },
  { n: "05", t: "Engineering", d: "Structural, MEP, façade and interior technical detailing." },
  { n: "06", t: "Construction", d: "Weekly critical-path reviews with photo and cost transparency." },
  { n: "07", t: "Luxury Interior Installation", d: "Marble, joinery, chandeliers, textiles — installed by our own artisans." },
  { n: "08", t: "Project Delivery", d: "A private handover, keys in a linen wrap, first flowers on the console." },
];

export const STATS = [
  { n: 250, suf: "+", label: "Projects Delivered" },
  { n: 150, suf: "+", label: "Happy Clients" },
  { n: 15, suf: "+", label: "Years of Craft" },
  { n: 100, suf: "%", label: "Client Satisfaction" },
];

export const TESTIMONIALS = [
  {
    q: "They didn't design a house. They quietly authored the way our family will live for the next thirty years.",
    n: "Faisal Reza",
    r: "Owner, Villa Nishat · Srinagar",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    stars: 5,
  },
  {
    q: "Zubair and his atelier delivered a Dubai penthouse that feels like a private museum. Every joint is intentional.",
    n: "Aliya Al-Marri",
    r: "Palm Jumeirah",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    stars: 5,
  },
  {
    q: "The only construction firm I have ever hired that finished under budget and two weeks early. Impossible, until now.",
    n: "Rohan Kapoor",
    r: "Family Office, Dubai",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    stars: 5,
  },
  {
    q: "The majlis takes your breath away, and it still feels warm. That is a rare, rare gift.",
    n: "Sheikh Mohammed A.",
    r: "Downtown Dubai",
    img: "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=200&q=80",
    stars: 5,
  },
];

export const GALLERY = [
  USER_ASSETS.dubaiPenthouse,
  IMG.marble,
  USER_ASSETS.arabicMajlis,
  IMG.villa1,
  IMG.chandelier,
  IMG.interior2,
  USER_ASSETS.kashmirMountainHouse,
  IMG.bathroom,
  IMG.hotel,
  USER_ASSETS.villaElevations,
  IMG.kitchen,
  IMG.villa2,
  IMG.office,
  IMG.restaurant,
  IMG.facade,
];

export const MARQUEE_WORDS = [
  "Timeless",
  "Kashmir",
  "Dubai",
  "Architecture",
  "Craft",
  "Marble",
  "Walnut",
  "Turnkey",
  "Since 2009",
  "Masterpieces",
];
