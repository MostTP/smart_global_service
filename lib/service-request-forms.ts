export type ServiceRequestSlug =
  | "transportation"
  | "logistics"
  | "security"
  | "procurement"
  | "marine"
  | "aviation"
  | "investment";

export type ServiceRequestFieldType =
  | "text"
  | "textarea"
  | "email"
  | "tel"
  | "date"
  | "datetime-local"
  | "number"
  | "select";

export type ServiceRequestSelectOption = { value: string; label: string };

export type ServiceRequestField = {
  name: string;
  label: string;
  type: ServiceRequestFieldType;
  required?: boolean;
  placeholder?: string;
  options?: ServiceRequestSelectOption[];
};

export type ServiceRequestFormDefinition = {
  title: string;
  description: string;
  fields: ServiceRequestField[];
};

export const SERVICE_REQUEST_FORM_CONFIG: Record<
  ServiceRequestSlug,
  ServiceRequestFormDefinition
> = {
  transportation: {
    title: "Transportation request",
    description:
      "Chauffeur and secure mobility. We route your request to the desk team immediately.",
    fields: [
      {
        name: "pickup",
        label: "Pickup",
        type: "text",
        required: true,
        placeholder: "Address or landmark",
      },
      {
        name: "destination",
        label: "Destination",
        type: "text",
        required: true,
        placeholder: "Address or landmark",
      },
      {
        name: "pickupDateTime",
        label: "Date & time",
        type: "datetime-local",
        required: true,
      },
      {
        name: "vehicleType",
        label: "Vehicle type",
        type: "text",
        required: true,
        placeholder: "e.g. sedan, SUV, armored",
      },
      {
        name: "serviceSubtype",
        label: "Service subtype",
        type: "select",
        required: true,
        options: [
          { value: "", label: "Select…" },
          { value: "chauffeur", label: "Executive chauffeur" },
          { value: "armored", label: "Armored transport" },
          { value: "motorcade", label: "Motorcade / convoy" },
          { value: "airport", label: "Airport transfer" },
        ],
      },
      {
        name: "duration",
        label: "Duration",
        type: "text",
        required: true,
        placeholder: "e.g. 4 hours, single transfer",
      },
      {
        name: "contactEmail",
        label: "Contact email",
        type: "email",
        required: true,
        placeholder: "you@example.com",
      },
      {
        name: "contactPhone",
        label: "Contact phone",
        type: "tel",
        required: false,
        placeholder: "+1 …",
      },
    ],
  },
  procurement: {
    title: "Procurement request",
    description:
      "Sourcing and fulfillment. Include specifications and delivery constraints.",
    fields: [
      {
        name: "item",
        label: "Item / specification",
        type: "textarea",
        required: true,
        placeholder: "Part numbers, standards, alternatives accepted…",
      },
      {
        name: "quantity",
        label: "Quantity",
        type: "text",
        required: true,
        placeholder: "Units or volume",
      },
      {
        name: "budget",
        label: "Budget",
        type: "text",
        required: true,
        placeholder: "Currency and band",
      },
      {
        name: "delivery",
        label: "Delivery",
        type: "textarea",
        required: true,
        placeholder: "Delivery location, Incoterms, deadlines…",
      },
      {
        name: "contactEmail",
        label: "Contact email",
        type: "email",
        required: true,
        placeholder: "you@example.com",
      },
      {
        name: "contactPhone",
        label: "Contact phone",
        type: "tel",
        required: false,
        placeholder: "+1 …",
      },
    ],
  },
  security: {
    title: "Security request",
    description:
      "Executive protection and secure operations. All enquiries are handled discreetly.",
    fields: [
      {
        name: "escortType",
        label: "Escort type",
        type: "select",
        required: true,
        options: [
          { value: "", label: "Select…" },
          { value: "armed", label: "Armed escort" },
          { value: "unarmed", label: "Unarmed escort" },
          { value: "motorcade", label: "Motorcade detail" },
          { value: "static", label: "Static site security" },
        ],
      },
      {
        name: "personnelCount",
        label: "Personnel",
        type: "text",
        required: true,
        placeholder: "Number of agents / team size",
      },
      {
        name: "duration",
        label: "Duration",
        type: "text",
        required: true,
        placeholder: "Hours, days, or ongoing",
      },
      {
        name: "location",
        label: "Location",
        type: "textarea",
        required: true,
        placeholder: "City, venues, corridor — be as specific as permissible",
      },
      {
        name: "contactEmail",
        label: "Contact email",
        type: "email",
        required: true,
        placeholder: "you@example.com",
      },
      {
        name: "contactPhone",
        label: "Contact phone",
        type: "tel",
        required: true,
        placeholder: "Secure line or mobile",
      },
    ],
  },
  logistics: {
    title: "Logistics request",
    description:
      "Haulage, freight, or consulting engagement — we align the right operations team.",
    fields: [
      {
        name: "engagementType",
        label: "Haulage vs consulting",
        type: "select",
        required: true,
        options: [
          { value: "", label: "Select…" },
          { value: "haulage", label: "Haulage / freight" },
          { value: "consulting", label: "Transport consulting" },
        ],
      },
      {
        name: "cargoDescription",
        label: "Cargo description",
        type: "textarea",
        required: true,
        placeholder: "Commodity, dimensions, weight, special handling…",
      },
      {
        name: "origin",
        label: "Origin",
        type: "text",
        required: true,
        placeholder: "Port, city, facility",
      },
      {
        name: "destination",
        label: "Destination",
        type: "text",
        required: true,
        placeholder: "Port, city, facility",
      },
      {
        name: "contactEmail",
        label: "Contact email",
        type: "email",
        required: true,
        placeholder: "you@example.com",
      },
      {
        name: "contactPhone",
        label: "Contact phone",
        type: "tel",
        required: false,
        placeholder: "+1 …",
      },
    ],
  },
  marine: {
    title: "Marine request",
    description:
      "Leisure, corporate hosting, or commercial logistics — our maritime desk responds within hours.",
    fields: [
      {
        name: "tripType",
        label: "Trip type",
        type: "select",
        required: true,
        options: [
          { value: "", label: "Select…" },
          { value: "leisure", label: "Leisure / yacht charter" },
          { value: "corporate", label: "Corporate event" },
          { value: "vip", label: "VIP expedition" },
          { value: "commercial", label: "Commercial transport" },
        ],
      },
      {
        name: "tripDate",
        label: "Date",
        type: "date",
        required: true,
      },
      {
        name: "guestsOrPayload",
        label: "Guests / payload",
        type: "text",
        required: true,
        placeholder: "Guest count or tonnage",
      },
      {
        name: "duration",
        label: "Duration",
        type: "text",
        required: true,
        placeholder: "Hours or days",
      },
      {
        name: "port",
        label: "Port",
        type: "text",
        required: true,
        placeholder: "Departure port or global node",
      },
      {
        name: "requirements",
        label: "Operational notes",
        type: "textarea",
        required: false,
        placeholder: "Clearance, equipment, catering…",
      },
      {
        name: "contactEmail",
        label: "Contact email",
        type: "email",
        required: true,
        placeholder: "you@example.com",
      },
      {
        name: "contactPhone",
        label: "Contact phone",
        type: "tel",
        required: false,
        placeholder: "+1 …",
      },
    ],
  },
  aviation: {
    title: "Aviation request",
    description:
      "Charter, lease, or cargo — provide routing and timing for a tailored quote.",
    fields: [
      {
        name: "mode",
        label: "Mode",
        type: "select",
        required: true,
        options: [
          { value: "", label: "Select…" },
          { value: "charter", label: "Charter" },
          { value: "lease", label: "Crewed lease" },
          { value: "cargo", label: "Cargo / handling" },
        ],
      },
      {
        name: "route",
        label: "Route",
        type: "text",
        required: true,
        placeholder: "Origin — destination",
      },
      {
        name: "departure",
        label: "Departure",
        type: "datetime-local",
        required: true,
      },
      {
        name: "passengers",
        label: "Passengers / crew",
        type: "text",
        required: true,
        placeholder: "PAX count or N/A for cargo",
      },
      {
        name: "preferences",
        label: "Preferences",
        type: "textarea",
        required: false,
        placeholder: "Aircraft class, catering, sensitivities…",
      },
      {
        name: "contactEmail",
        label: "Contact email",
        type: "email",
        required: true,
        placeholder: "you@example.com",
      },
      {
        name: "contactPhone",
        label: "Contact phone",
        type: "tel",
        required: false,
        placeholder: "+1 …",
      },
    ],
  },
  investment: {
    title: "Investment inquiry",
    description:
      "Share mandate, scale, and jurisdiction. Partnerships are reviewed by the principal desk.",
    fields: [
      {
        name: "sector",
        label: "Sector",
        type: "text",
        required: true,
        placeholder: "e.g. infrastructure, aviation equity",
      },
      {
        name: "capital",
        label: "Capital",
        type: "text",
        required: true,
        placeholder: "Deployment size / band",
      },
      {
        name: "timeline",
        label: "Timeline",
        type: "text",
        required: true,
        placeholder: "Expected close or horizon",
      },
      {
        name: "jurisdiction",
        label: "Jurisdiction",
        type: "text",
        required: true,
        placeholder: "Primary legal / tax jurisdiction",
      },
      {
        name: "summary",
        label: "Summary",
        type: "textarea",
        required: true,
        placeholder: "Thesis, constraints, prior engagement…",
      },
      {
        name: "contactEmail",
        label: "Contact email",
        type: "email",
        required: true,
        placeholder: "you@example.com",
      },
      {
        name: "contactPhone",
        label: "Contact phone",
        type: "tel",
        required: false,
        placeholder: "+1 …",
      },
    ],
  },
};

export function isServiceRequestSlug(s: string): s is ServiceRequestSlug {
  return s in SERVICE_REQUEST_FORM_CONFIG;
}
