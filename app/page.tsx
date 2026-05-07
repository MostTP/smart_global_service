import DesktopHomePage from "@/app/desktop/page";

type ServiceItem = {
  icon: string;
  title: string;
  href: string;
  description?: string;
  active?: boolean;
};

const services: ServiceItem[] = [
  {
    icon: "speed",
    title: "Transportation",
    description:
      "Elite chauffeur services and armored transport for high-net-worth individuals and corporate executives.",
    href: "/services/transportation",
    active: true,
  },
  { icon: "local_shipping", title: "Logistics", href: "/services/logistics" },
  { icon: "security", title: "Security", href: "/services/security" },
  { icon: "shopping_cart", title: "Procurement", href: "/services/procurement" },
  { icon: "sailing", title: "Marine", href: "/services/marine" },
  { icon: "flight_takeoff", title: "Aviation", href: "/services/aviation" },
  { icon: "payments", title: "Investment", href: "/services/investment" },
];

export default function HomePage() {
  return <DesktopHomePage />;
}

