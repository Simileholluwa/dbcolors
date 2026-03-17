import { Metadata } from "next";
import ConsultationView from "./ConsultationView";

export const metadata: Metadata = {
  title: "Consultation | dbcolors.ng",
  description: "Book a professional interior design consultation with dbcolors.ng. Choose from our tiered packages tailored to your vision.",
};

export default function ConsultationPage() {
  return <ConsultationView />;
}
