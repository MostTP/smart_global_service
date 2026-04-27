export type ServiceCategory =
  | "transportation"
  | "logistics"
  | "security"
  | "procurement"
  | "marine"
  | "aviation"
  | "investment";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "select"
  | "datetime"
  | "email"
  | "tel";

export type ServiceField =
  | {
      key: string;
      label: string;
      type: Exclude<FieldType, "select">;
      required?: boolean;
      placeholder?: string;
      helpText?: string;
    }
  | {
      key: string;
      label: string;
      type: "select";
      required?: boolean;
      options: { value: string; label: string }[];
      placeholder?: string;
      helpText?: string;
    };

export type ServiceDefinition = {
  slug: string;
  name: string;
  category: ServiceCategory;
  summary: string;
  /** Shown on homepage and /services grid cards */
  cardImage: { src: string; alt: string };
  premiumNote?: string;
  highlights: string[];
  requestForm: {
    title: string;
    fields: ServiceField[];
  };
  externalLinks?: { label: string; href: string }[];
};

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  transportation: "Transportation",
  logistics: "Logistics & Haulage",
  security: "Security",
  procurement: "Procurement",
  marine: "Marine",
  aviation: "Aviation",
  investment: "Investment",
};

export const SERVICES: ServiceDefinition[] = [
  {
    slug: "vip-diplomatic-transfer",
    name: "VIP / Diplomatic Transfer",
    category: "transportation",
    summary:
      "Secure, discreet transfers for high-profile individuals, government officials, and executives.",
    cardImage: {
      src: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
      alt: "Premium executive vehicle",
    },
    premiumNote: "Discretion-first operations and time-sensitive routing.",
    highlights: [
      "Secure routing & coordination",
      "Discreet meet-and-greet options",
      "Professional, vetted chauffeurs",
    ],
    requestForm: {
      title: "Request VIP / Diplomatic Transfer",
      fields: [
        { key: "pickupLocation", label: "Pickup location", type: "text", required: true },
        { key: "destination", label: "Destination", type: "text", required: true },
        { key: "dateTime", label: "Date & time", type: "datetime", required: true },
        {
          key: "vehicleType",
          label: "Vehicle type",
          type: "select",
          required: true,
          options: [
            { value: "sedan", label: "Executive sedan" },
            { value: "suv", label: "Premium SUV" },
            { value: "armored", label: "Armored (on request)" },
            { value: "other", label: "Other" },
          ],
        },
        {
          key: "duration",
          label: "Estimated duration",
          type: "select",
          required: false,
          options: [
            { value: "one-way", label: "One-way" },
            { value: "2-4h", label: "2–4 hours" },
            { value: "half-day", label: "Half-day" },
            { value: "full-day", label: "Full-day" },
            { value: "multi-day", label: "Multi-day" },
          ],
        },
        { key: "specialInstructions", label: "Special instructions", type: "textarea" },
      ],
    },
  },
  {
    slug: "executive-chauffeur",
    name: "Executive Chauffeur Services",
    category: "transportation",
    summary:
      "Professional chauffeur services for corporate and personal use—hourly, daily, or contract.",
    cardImage: {
      src: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
      alt: "Luxury sedan on a city street",
    },
    highlights: ["Hourly or contract coverage", "Uniformed chauffeurs", "Fleet options available"],
    requestForm: {
      title: "Request Executive Chauffeur",
      fields: [
        { key: "pickupLocation", label: "Starting location", type: "text", required: true },
        { key: "dateTime", label: "Start date & time", type: "datetime", required: true },
        {
          key: "duration",
          label: "Duration",
          type: "select",
          required: true,
          options: [
            { value: "2-4h", label: "2–4 hours" },
            { value: "half-day", label: "Half-day" },
            { value: "full-day", label: "Full-day" },
            { value: "weekly", label: "Weekly" },
            { value: "monthly", label: "Monthly/Contract" },
          ],
        },
        {
          key: "vehicleType",
          label: "Vehicle type",
          type: "select",
          required: true,
          options: [
            { value: "client-provided", label: "Client-provided vehicle" },
            { value: "sedan", label: "Executive sedan" },
            { value: "suv", label: "Premium SUV" },
            { value: "other", label: "Other" },
          ],
        },
        { key: "notes", label: "Notes", type: "textarea" },
      ],
    },
  },
  {
    slug: "airport-transfer",
    name: "Airport Transfers",
    category: "transportation",
    summary: "Pick-up and drop-off services with optional meet-and-greet coordination.",
    cardImage: {
      src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
      alt: "Commercial aircraft viewed from the terminal",
    },
    highlights: ["Meet-and-greet available", "Flight tracking (on request)", "Reliable scheduling"],
    requestForm: {
      title: "Request Airport Transfer",
      fields: [
        {
          key: "transferType",
          label: "Transfer type",
          type: "select",
          required: true,
          options: [
            { value: "pickup", label: "Airport pickup" },
            { value: "dropoff", label: "Airport drop-off" },
            { value: "roundtrip", label: "Round trip" },
          ],
        },
        { key: "airport", label: "Airport", type: "text", required: true },
        { key: "pickupLocation", label: "Pickup/Starting location", type: "text", required: true },
        { key: "destination", label: "Destination", type: "text", required: true },
        { key: "dateTime", label: "Date & time", type: "datetime", required: true },
        { key: "flightNumber", label: "Flight number (optional)", type: "text" },
        {
          key: "meetGreet",
          label: "Meet-and-greet",
          type: "select",
          required: false,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ],
        },
      ],
    },
  },
  {
    slug: "fleet-management",
    name: "Fleet Management",
    category: "transportation",
    summary:
      "Management of client or company fleets—drivers, maintenance, scheduling, and logistics coordination.",
    cardImage: {
      src: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80",
      alt: "Row of fleet vehicles",
    },
    highlights: ["Driver management", "Maintenance coordination", "Operational reporting"],
    requestForm: {
      title: "Request Fleet Management",
      fields: [
        { key: "fleetSize", label: "Fleet size", type: "number", required: true },
        { key: "location", label: "Primary location", type: "text", required: true },
        {
          key: "coverage",
          label: "Coverage type",
          type: "select",
          required: true,
          options: [
            { value: "drivers-only", label: "Drivers only" },
            { value: "maintenance", label: "Maintenance coordination" },
            { value: "full", label: "Full fleet management" },
          ],
        },
        { key: "duration", label: "Contract duration", type: "text", required: false },
        { key: "notes", label: "Operational notes", type: "textarea" },
      ],
    },
  },
  {
    slug: "logistics-haulage",
    name: "Logistics & Haulage",
    category: "logistics",
    summary: "Movement of goods via trucks and cargo systems (local and interstate).",
    cardImage: {
      src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      alt: "Cargo truck on the road",
    },
    highlights: ["Local & interstate coverage", "Cargo coordination", "Scheduling & tracking"],
    requestForm: {
      title: "Request Logistics & Haulage",
      fields: [
        { key: "pickupLocation", label: "Pickup location", type: "text", required: true },
        { key: "destination", label: "Destination", type: "text", required: true },
        { key: "pickupDateTime", label: "Pickup date & time", type: "datetime", required: true },
        { key: "cargoDescription", label: "Cargo description", type: "textarea", required: true },
        {
          key: "truckType",
          label: "Truck/cargo type",
          type: "select",
          required: true,
          options: [
            { value: "van", label: "Van" },
            { value: "pickup", label: "Pickup" },
            { value: "flatbed", label: "Flatbed" },
            { value: "box", label: "Box truck" },
            { value: "other", label: "Other" },
          ],
        },
        { key: "notes", label: "Handling notes", type: "textarea" },
      ],
    },
  },
  {
    slug: "transport-consulting",
    name: "Transport Consulting",
    category: "logistics",
    summary: "Advisory services for routing, cost optimization, and operational efficiency.",
    cardImage: {
      src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      alt: "Team reviewing logistics documents",
    },
    highlights: ["Routing strategy", "Cost optimization", "Operational process design"],
    requestForm: {
      title: "Request Transport Consulting",
      fields: [
        { key: "companyName", label: "Company name", type: "text", required: true },
        { key: "scope", label: "Scope / challenge", type: "textarea", required: true },
        { key: "currentRegion", label: "Operating region", type: "text" },
        { key: "timeline", label: "Timeline", type: "text" },
      ],
    },
  },
  {
    slug: "security-escort",
    name: "Security Escort",
    category: "security",
    summary: "Armed or unarmed escort services for individuals, VIPs, and high-value cargo.",
    cardImage: {
      src: "https://images.pexels.com/photos/595804/pexels-photo-595804.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Professional security personnel",
    },
    premiumNote: "Safety-led planning with clear escalation protocols.",
    highlights: ["Armed/unarmed options", "Cargo escort available", "Discreet coordination"],
    requestForm: {
      title: "Request Security Escort",
      fields: [
        {
          key: "escortType",
          label: "Type of escort",
          type: "select",
          required: true,
          options: [
            { value: "unarmed", label: "Unarmed" },
            { value: "armed", label: "Armed (where permitted)" },
          ],
        },
        { key: "location", label: "Location", type: "text", required: true },
        { key: "dateTime", label: "Start date & time", type: "datetime", required: true },
        {
          key: "personnelCount",
          label: "Number of personnel",
          type: "number",
          required: true,
        },
        { key: "duration", label: "Duration", type: "text", required: true },
        { key: "notes", label: "Additional context", type: "textarea" },
      ],
    },
  },
  {
    slug: "procurement",
    name: "Procurement",
    category: "procurement",
    summary:
      "Sourcing and purchasing locally and internationally—plus delivery coordination on your behalf.",
    cardImage: {
      src: "https://images.pexels.com/photos/4483616/pexels-photo-4483616.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Warehouse inventory and logistics",
    },
    highlights: ["Local & international sourcing", "Budget-aware procurement", "Delivery coordination"],
    requestForm: {
      title: "Request Procurement",
      fields: [
        { key: "itemDescription", label: "Item description", type: "textarea", required: true },
        { key: "quantity", label: "Quantity", type: "number", required: true },
        { key: "budget", label: "Budget", type: "text", required: false },
        { key: "deliveryLocation", label: "Delivery location", type: "text", required: true },
        { key: "notes", label: "Notes", type: "textarea" },
      ],
    },
  },
  {
    slug: "boat-cruises",
    name: "Boat Cruises",
    category: "marine",
    summary: "Luxury and commercial boat services for leisure, events, and transport.",
    cardImage: {
      src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      alt: "Yacht on open water at sunset",
    },
    highlights: ["Events & leisure", "Transfers & private bookings", "Flexible durations"],
    requestForm: {
      title: "Request Boat Cruise",
      fields: [
        { key: "location", label: "Location", type: "text", required: true },
        { key: "dateTime", label: "Date & time", type: "datetime", required: true },
        { key: "hours", label: "Duration (hours)", type: "number", required: true },
        { key: "guestCount", label: "Number of guests", type: "number", required: true },
        {
          key: "cruiseType",
          label: "Cruise type",
          type: "select",
          required: true,
          options: [
            { value: "leisure", label: "Leisure cruise" },
            { value: "event", label: "Event/celebration" },
            { value: "transfer", label: "Boat transfer" },
          ],
        },
        { key: "notes", label: "Preferences / notes", type: "textarea" },
      ],
    },
    externalLinks: [
      { label: "Explore cruise inspirations", href: "https://kamparitours.com/boat-cruise-in-lagos/" },
    ],
  },
  {
    slug: "jet-lease",
    name: "Jet Lease",
    category: "aviation",
    summary: "Private jet charter and leasing for business or personal travel.",
    cardImage: {
      src: "https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Private jet on the tarmac",
    },
    premiumNote: "Fast turnaround with tailored aircraft recommendations.",
    highlights: ["Charter & lease options", "Route planning support", "Crewed operations"],
    requestForm: {
      title: "Request Jet Lease",
      fields: [
        { key: "departure", label: "Departure", type: "text", required: true },
        { key: "arrival", label: "Arrival", type: "text", required: true },
        { key: "dateTime", label: "Date & time", type: "datetime", required: true },
        { key: "passengers", label: "Number of passengers", type: "number", required: true },
        {
          key: "tripType",
          label: "Trip type",
          type: "select",
          required: true,
          options: [
            { value: "one-way", label: "One-way" },
            { value: "round-trip", label: "Round trip" },
            { value: "multi-city", label: "Multi-city" },
          ],
        },
        { key: "notes", label: "Notes / preferences", type: "textarea" },
      ],
    },
    externalLinks: [
      {
        label: "Reference fleet models (external)",
        href: "https://www.swiftwingsjet.com/fleet-specification/66d2fbd84c5741f3e289800c",
      },
    ],
  },
  {
    slug: "investment",
    name: "Investment",
    category: "investment",
    summary:
      "Opportunities and partnerships in transport, logistics, and infrastructure projects.",
    cardImage: {
      src: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&q=80",
      alt: "Business analytics and investment planning",
    },
    highlights: ["Partnership structuring", "Project screening", "Long-term value creation"],
    requestForm: {
      title: "Request Investment Discussion",
      fields: [
        { key: "fullName", label: "Full name", type: "text", required: true },
        { key: "organization", label: "Organization", type: "text" },
        { key: "interest", label: "Area of interest", type: "textarea", required: true },
        { key: "notes", label: "Notes", type: "textarea" },
      ],
    },
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug) ?? null;
}

export function getServicesByCategory(category: ServiceCategory | "all") {
  if (category === "all") return SERVICES;
  return SERVICES.filter((s) => s.category === category);
}
