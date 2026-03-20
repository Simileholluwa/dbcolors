"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProgressIndicator from "@/components/consultation/ProgressIndicator";
import PackageStep from "@/components/consultation/PackageStep";
import AssetsStep from "@/components/consultation/AssetsStep";
import PaymentStep from "@/components/consultation/PaymentStep";
import ScheduleStep from "@/components/consultation/ScheduleStep";
import SuccessStep from "@/components/consultation/SuccessStep";
import { functions } from "@/lib/firebase";
import { httpsCallable } from "firebase/functions";
import { Loader2 } from "lucide-react";
import { useConsultationBooking } from "@/hooks/useConsultationBooking";

const ConsultationView = () => {
  const [step, setStep] = React.useState(1);
  const [selectedPackage, setSelectedPackage] = React.useState<any>(null);
  const [assets, setAssets] = React.useState<{
    photos: File[];
    drawing?: File;
    layout?: File;
    preferences?: string;
    email: string;
    name: string;
  }>({
    photos: [],
    email: "",
    name: "",
  });

  const {
    isBooking,
    error,
    setError,
    bookingData,
    handleBooking,
    retryBooking,
  } = useConsultationBooking();

  // Scroll to top on step change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const handlePackageSelect = (pkg: any) => {
    setSelectedPackage(pkg);
    setStep(pkg.price === "Free" ? 3 : 2);
  };

  const onTimeSelected = async (isoDate: string, timeStr: string, displayDate: string) => {
    const result = await handleBooking(isoDate, timeStr, displayDate, {
      assets,
      selectedPackage,
    });
    
    if (result.success) {
      // Clear form data on success
      setSelectedPackage(null);
      setAssets({
        photos: [],
        email: "",
        name: "",
        preferences: "",
      });
      setStep(5);
    }
  };

  const isStepSelectable = (s: number) => {
    if (s === 1) return true;
    if (s === 2)
      return selectedPackage !== null && selectedPackage.price !== "Free";
    if (s === 3) return selectedPackage !== null;
    if (s === 4) {
      const assetsReady = assets.photos.length > 0;
      const emailReady = assets.email.includes("@") && assets.email.includes(".");
      return assetsReady && emailReady && (step >= 3 || step === 4);
    }
    if (s === 5) return !!bookingData;
    return false;
  };

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <ProgressIndicator
        step={step}
        selectedPackage={selectedPackage}
        isStepSelectable={isStepSelectable}
        setStep={setStep}
      />

      <section className="pt-32 pb-24 md:pt-48 md:pb-32 relative z-10">
        <div className="container mx-auto px-6">
          {isBooking && (
            <div className="absolute inset-0 z-[100] flex items-center justify-center backdrop-blur-sm">
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-6" />
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">
                  Confirming Your Booking...
                </h3>
                <p className="text-white/40 text-sm font-medium italic">
                  Uploading assets and securing your slot.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="max-w-xl mx-auto mb-12 bg-red-500/10 border border-red-500/20 p-6 rounded-2xl flex items-center justify-between gap-4 backdrop-blur-[40px] shadow-2xl">
              <div className="flex-1">
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
              <div className="flex items-center gap-6">
                <button
                  onClick={retryBooking}
                  className="text-primary hover:text-white text-[10px] font-black uppercase tracking-widest transition-all px-4 py-2 bg-primary/20 rounded-lg hover:bg-primary/40"
                >
                  Retry
                </button>
                <button
                  onClick={() => setError(null)}
                  className="text-white/20 hover:text-white/40 text-[10px] font-black uppercase tracking-widest transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <PackageStep handlePackageSelect={handlePackageSelect} />
            )}

            {step === 2 && (
              <PaymentStep selectedPackage={selectedPackage} setStep={setStep} />
            )}

            {step === 3 && (
              <AssetsStep
                assets={assets}
                setAssets={setAssets}
                setStep={setStep}
                selectedPackage={selectedPackage}
              />
            )}

            {step === 4 && (
              <ScheduleStep
                handleTimeSelected={onTimeSelected}
                setStep={setStep}
              />
            )}

            {step === 5 && (
              <SuccessStep
                bookingData={bookingData}
              />
            )}
          </AnimatePresence>

          <div className="mt-20 text-center">
            <Link
              href="/"
              className="text-white/30 hover:text-primary transition-colors font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-2"
            >
              <span className="rotate-180">
                <ArrowRight size={12} />
              </span>
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ConsultationView;
