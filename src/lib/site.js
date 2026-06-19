// Single source of truth for Anna Towing. Schema, nav, neighborhoods, and contact all build from here.

export const SITE = {
  brand: "Anna Towing",
  domain: "https://annatxtowing.com",
  phoneDisplay: "(214) 491-5215",
  phoneTel: "+12144915215",
  email: "dispatch@annatxtowing.com",
  city: "Anna",
  region: "TX",
  zip: "75409",
  // Anna, TX city point (real area centroid, not a fake doorstep)
  geo: { lat: 33.349, lng: -96.5486 },
  priceRange: "$$",
  sameAs: [],
};

// Nearby towns served. Mirrored in copy and in areaServed.
export const AREAS = [
  { name: "Melissa", url: "/melissa-tx/" },
  { name: "McKinney", url: "/mckinney-tx/" },
  { name: "Van Alstyne", url: "/van-alstyne-tx/" },
  { name: "Celina", url: "/celina-tx/" },
  { name: "Princeton", url: "/princeton-tx/" },
];

// Anna neighborhoods and master-planned communities. Powers the neighborhood directory.
export const NEIGHBORHOODS = [
  "West Crossing",
  "Villages of Hurricane Creek",
  "Anna Town Square",
  "Anna Crossing",
  "Lakeview",
  "Avery Pointe",
  "Camden Parc",
  "BridgeWater",
  "Westview",
  "Sherley Heritage",
];

// The roads that thread Anna. Powers the local strip and coverage map.
export const ROADS = [
  { road: "US-75", note: "Central Expressway" },
  { road: "FM-455", note: "White Street, east and west" },
  { road: "SH-5", note: "Powell Parkway" },
  { road: "Ferguson Pkwy", note: "North-south connector" },
  { road: "Rosamond Pkwy", note: "Past Anna High School" },
];

// Local landmarks used as drive-time anchors in copy.
export const LANDMARKS = [
  "Slayter Creek Park",
  "Natural Springs Park",
  "Anna Town Square",
  "Anna High School",
  "Anna ISD campuses",
];

// Services. `klass` is the short tag used on cards. Slugs match the live site exactly.
export const SERVICES = [
  { name: "Towing & Vehicle Recovery", serviceType: "Towing and vehicle recovery", url: "/towing-and-vehicle-recovery-anna-tx/", klass: "Tow", icon: "i-flatbed", blurb: "Cars, trucks, and SUVs hooked and hauled on a flatbed or wheel-lift, anywhere in Anna." },
  { name: "Roadside Assistance", serviceType: "Roadside assistance", url: "/roadside-assistance-anna-tx/", klass: "Roadside", icon: "i-bolt", blurb: "Stuck on the shoulder of US-75 or a side street off FM-455? Help rolls to you fast." },
  { name: "Flat Tire Changing", serviceType: "Flat tire changing", url: "/flat-tire-changing-anna-tx/", klass: "Tire", icon: "i-wrench", blurb: "A spare mounted on the roadside, or a tow to a tire shop if the spare will not hold." },
  { name: "Jump Starts", serviceType: "Jump start service", url: "/jump-starts-anna-tx/", klass: "Battery", icon: "i-battery", blurb: "A dead battery in a driveway or a parking lot gets a quick jump so you can roll." },
  { name: "Car Lockout", serviceType: "Car lockout service", url: "/car-lockout-anna-tx/", klass: "Lockout", icon: "i-key", blurb: "Keys locked inside? Doors opened with the right tools, no damage to the vehicle." },
  { name: "Fuel Delivery", serviceType: "Emergency fuel delivery", url: "/fuel-delivery-anna-tx/", klass: "Fuel", icon: "i-fuel", blurb: "Run dry near Anna Town Square or out on SH-5? Enough fuel brought to get you going." },
];

const ORG_ID = SITE.domain + "/#org";
const SITE_ID = SITE.domain + "/#website";

function geoCircle(radius = 22000) {
  return {
    "@type": "GeoCircle",
    geoMidpoint: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    geoRadius: radius,
  };
}

function cityNodes() {
  return [
    { "@type": "City", name: "Anna", addressRegion: "TX" },
    ...AREAS.map((a) => ({ "@type": "City", name: a.name, addressRegion: "TX" })),
  ];
}

export function orgNode() {
  const node = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "@id": ORG_ID,
    additionalType: "https://en.wikipedia.org/wiki/Towing",
    name: SITE.brand,
    description:
      "24/7 towing, vehicle recovery, and roadside assistance across Anna, TX 75409 and the nearby Collin County towns of Melissa, McKinney, Van Alstyne, Celina, and Princeton.",
    url: SITE.domain + "/",
    logo: SITE.domain + "/favicon.svg",
    image: [SITE.domain + "/images/hero-home.webp", SITE.domain + "/images/hero-recovery.webp"],
    telephone: SITE.phoneTel,
    priceRange: SITE.priceRange,
    areaServed: [...cityNodes(), geoCircle()],
    geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phoneTel,
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: "English",
    },
  };
  if (SITE.sameAs.length) node.sameAs = SITE.sameAs;
  return node;
}

export function websiteNode() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE.domain + "/",
    name: SITE.brand,
    publisher: { "@id": ORG_ID },
  };
}

export function serviceNode({ name, serviceType, description, url, cities }) {
  const area = cities
    ? cities.map((c) => ({ "@type": "City", name: c, addressRegion: "TX" }))
    : cityNodes();
  area.push(geoCircle());
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name, serviceType, description,
    url: SITE.domain + url,
    provider: { "@id": ORG_ID },
    areaServed: area,
  };
}

export function breadcrumb(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem", position: i + 1, name: it.name, item: SITE.domain + it.url,
    })),
  };
}

export function itemListNode(services) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem", position: i + 1, name: s.name, url: SITE.domain + s.url,
    })),
  };
}

export function faqNode(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question", name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleNode({ headline, description, url, datePublished, dateModified }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline, description,
    url: SITE.domain + url,
    datePublished, dateModified,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: SITE.domain + url,
  };
}
