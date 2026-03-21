import React, { Suspense } from "react";
import ManagementView from "./ManagementView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Consultations | Dignified Brand Colors",
  description: "View and manage your upcoming consultations.",
};

export default function ManageConsultationsPage() {
  return (
    <Suspense fallback={null}>
      <ManagementView />
    </Suspense>
  );
}
