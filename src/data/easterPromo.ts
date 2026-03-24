export interface EasterPackage {
  id: string;
  name: string;
  price: string;
  bestFor: string;
  includes: string[];
  outcome: string;
  image: string;
}

export const easterPackages: EasterPackage[] = [
  {
    id: "kitchen-transformation",
    name: "Kitchen Transformation",
    price: "₦4.5 - ₦20 million",
    bestFor: "Homeowners upgrading outdated or inefficient kitchens",
    includes: [
      "Kitchen layout redesign (if needed)",
      "Cabinetry (new or upgrade)",
      "Countertops & backsplash",
      "Lighting & electrical adjustments",
      "Appliance integration planning",
      "Finishing (paint, fittings, detailing)",
    ],
    outcome: "A modern, functional, and durable kitchen designed for everyday ease and long-term use",
    image: "/promo/easter/kitchen.png",
  },
  {
    id: "living-room-makeover",
    name: "Living Room Makeover",
    price: "₦4.2 - ₦9 million",
    bestFor: "Renters or homeowners needing a fast, visible upgrade",
    includes: [
      "Space planning & layout optimization",
      "Furniture selection & placement",
      "Lighting upgrade (ambient + accent)",
      "Wall treatments (paint, panels, decor)",
      "Soft furnishings (curtains, rugs, etc.)",
    ],
    outcome: "A stylish, cohesive living room that feels more spacious, comfortable, and inviting",
    image: "/promo/easter/living-room.png",
  },
  {
    id: "bedroom-full-renovations",
    name: "Bedroom Full Renovations",
    price: "₦18 - ₦30 million",
    bestFor: "Old flats needing complete transformation",
    includes: [
      "Full structural and interior overhaul",
      "Kitchen & bathroom upgrades",
      "Flooring replacement",
      "Electrical & plumbing work",
      "Painting & finishing",
      "Project management & supervision",
    ],
    outcome: "A fully transformed, move-in-ready home with improved structure, function, and value",
    image: "/promo/easter/bedroom-reno.png",
  },
  {
    id: "bedroom-interior-finishing",
    name: "Bedroom Interior Finishing",
    price: "₦10 - ₦15 million",
    bestFor: "Newly built or semi-finished flats",
    includes: [
      "Painting & wall finishes",
      "Flooring (if incomplete)",
      "Lighting installation",
      "Wardrobes & fittings",
      "Kitchen/basic installations",
      "Final detailing & styling",
    ],
    outcome: "A completed, polished home ready for comfortable living",
    image: "/promo/easter/bedroom-finishing.png",
  },
  {
    id: "duplex-full-renovations",
    name: "Duplex Full Renovations",
    price: "₦20 - ₦50 million",
    bestFor: "High-end homeowners renovating entire duplex properties",
    includes: [
      "Full structural and interior renovation",
      "Multi-room upgrades (kitchen, bathrooms, living areas)",
      "Electrical & plumbing overhaul",
      "Premium finishing & detailing",
      "End-to-end project management",
    ],
    outcome: "A high-quality, luxury-standard home with modern design and strong long-term value",
    image: "/promo/easter/duplex-reno.png",
  },
  {
    id: "duplex-interior-finishing",
    name: "Duplex Interior Finishing",
    price: "₦20 - ₦35 million",
    bestFor: "New duplex owners needing premium finishing",
    includes: [
      "Full interior finishing across all rooms",
      "Lighting & electrical fittings",
      "Wardrobes, kitchen, and storage installations",
      "Painting & premium finishes",
      "Styling and final touches",
    ],
    outcome: "A fully finished, elegant duplex ready for immediate move-in",
    image: "/promo/easter/duplex-finishing.png",
  },
];
