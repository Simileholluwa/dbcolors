import { Video, MapPin, Ruler, Layout, Square, ShoppingBag, FileText, Box, Play, Globe } from "lucide-react";
import React from "react";

export const consultationPackages = [
  {
    name: "Design Discovery",
    price: "Free",
    description: "The perfect starting point to discuss your vision and explore possibilities.",
    features: [
      { text: "30-minute virtual call", icon: <Video className="w-4 h-4" /> },
    ],
    cta: "Book Discovery Call",
    highlight: false,
  },
  {
    name: "Signature Transformation",
    price: "750,000",
    currency: "₦",
    description: "A professional foundation for your space with comprehensive planning and technical details.",
    features: [
      { text: "30-minute virtual call", icon: <Video className="w-4 h-4" /> },
      { text: "Site inspection", icon: <MapPin className="w-4 h-4" /> },
      { text: "Measurements & estimates", icon: <Ruler className="w-4 h-4" /> },
      { text: "Space layout & optimization", icon: <Layout className="w-4 h-4" /> },
      { text: "2D visualization", icon: <Square className="w-4 h-4" /> },
      { text: "Shopping list", icon: <ShoppingBag className="w-4 h-4" /> },
      { text: "Invoice for procurement", icon: <FileText className="w-4 h-4" /> },
    ],
    cta: "Start Transformation",
    highlight: true,
  },
  {
    name: "Elite Visionary",
    price: "1,500,000",
    currency: "₦",
    description: "The ultimate design experience with immersive visualizations and end-to-end support.",
    features: [
      { text: "30-minute virtual call", icon: <Video className="w-4 h-4" /> },
      { text: "Site inspection", icon: <MapPin className="w-4 h-4" /> },
      { text: "Measurements & estimates", icon: <Ruler className="w-4 h-4" /> },
      { text: "Space layout & optimization", icon: <Layout className="w-4 h-4" /> },
      { text: "2D visualization", icon: <Square className="w-4 h-4" /> },
      { text: "Shopping list", icon: <ShoppingBag className="w-4 h-4" /> },
      { text: "Invoice for procurement", icon: <FileText className="w-4 h-4" /> },
      { text: "3D visualization (HD)", icon: <Box className="w-4 h-4" /> },
      { text: "3D animation walk-through", icon: <Play className="w-4 h-4" /> },
      { text: "Full product sourcing", icon: <Globe className="w-4 h-4" /> },
    ],
    cta: "Go Elite",
    highlight: false,
  },
];
