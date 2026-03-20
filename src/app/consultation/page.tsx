import { Metadata } from "next";
import ConsultationView from "./ConsultationView";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description: "Schedule a professional interior design consultation with dbcolors.ng. We offer tiered packages from concept brainstorming to full-scale architectural planning.",
  openGraph: {
    title: "Interior Design Consultation | dbcolors.ng",
    description: "Tailored design expertise to bring your architectural dreams to life. Select a consultation tier that matches your project scope.",
    url: "https://dbcolors.ng/consultation",
  },
};

export default function ConsultationPage() {
  return <ConsultationView />;
}
