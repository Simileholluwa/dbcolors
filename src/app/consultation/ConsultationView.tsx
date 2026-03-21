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
import { Loader2 } from "lucide-react";
import { useConsultationBooking } from "@/hooks/useConsultationBooking";
import { useSearchParams } from "next/navigation";
import ExistingBookingModal from "@/components/consultation/ExistingBookingModal";
import LoadingOverlay from "@/components/consultation/LoadingOverlay";

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
    handleBooking,
    retryBooking,
    checkExistingBooking,
    bookingData,
    updateBooking,
    getBooking,
    setBookingData,
  } = useConsultationBooking();

  const [existingBooking, setExistingBooking] = React.useState<any>(null);
  const [isCheckingBooking, setIsCheckingBooking] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [wasUpdate, setWasUpdate] = React.useState(false);

  const searchParams = useSearchParams();

  // Handle update from query param
  React.useEffect(() => {
    const updateId = searchParams.get("update");
    if (updateId) {
      const fetchAndSet = async () => {
        setIsUpdating(true);
        const result = await getBooking(updateId);
        if (result && result.success && result.booking) {
          setExistingBooking(result.booking);
          setAssets(prev => ({
            ...prev,
            email: result.booking.email,
            name: result.booking.name
          }));
          setSelectedPackage({ name: result.booking.package });
          setStep(4);
        } else {
          setError("Could not find the booking to update.");
        }
      };
      fetchAndSet();
    }
  }, [searchParams]);

  // Scroll to top on step change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const handlePackageSelect = (pkg: any) => {
    setSelectedPackage(pkg);
    setStep(pkg.price === "Free" ? 3 : 2);
  };

  const onTimeSelected = async (
    isoDate: string,
    timeStr: string,
    displayDate: string
  ) => {
    if (isUpdating && existingBooking) {
      // Use the new updateBooking logic
      const updateRes = await updateBooking(existingBooking.id, isoDate, timeStr);
      if (updateRes.success) {
        setIsUpdating(false);
        setExistingBooking(null);
        setWasUpdate(true);

        // Prepare booking data for SuccessStep
        const finalBooking = {
          date: displayDate,
          isoDate: isoDate,
          time: timeStr,
          hangoutLink: existingBooking.hangoutLink || "",
          email: assets.email,
          name: assets.name,
          packageName: selectedPackage.name,
        };
        setBookingData(finalBooking);
        setStep(5);
        return;
      } else {
        setError(updateRes.error || "Failed to update booking. Please try again.");
        return;
      }
    }

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

  const handleContinueFromAssets = async () => {
    setIsCheckingBooking(true);
    const result = await checkExistingBooking(assets.email);
    setIsCheckingBooking(false);

    if (result.exists) {
      setExistingBooking(result.bookings[0]);
    } else {
      setStep(4);
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
          <LoadingOverlay
            isVisible={isBooking}
            title={isUpdating ? "Updating Your Booking..." : "Confirming Your Booking..."}
            message={isUpdating ? "Securing your new slot." : "Uploading assets and securing your slot."}
          />

          <div className="flex justify-center mb-16">
            <Link
              href="/consultation/manage"
              className="group flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 hover:border-primary/50 rounded-full transition-all backdrop-blur-sm shadow-xl"
            >
              <span className="text-[10px] font-black text-white/40 group-hover:text-white uppercase tracking-[0.2em] transition-colors">
                Already have a booking?
              </span>
              <div className="h-4 w-[1px] bg-white/10" />
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">
                  Manage Here
                </span>
                <ArrowRight size={14} className="text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

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

          <AnimatePresence>
            <ExistingBookingModal
              isVisible={!!existingBooking && !isUpdating}
              existingBooking={existingBooking}
              email={assets.email}
            />
          </AnimatePresence>

          <LoadingOverlay
            isVisible={isCheckingBooking}
            title="Checking for existing bookings..."
            zIndex="z-[110]"
          />

          <AnimatePresence mode="wait">
            {step === 1 && (
              <PackageStep handlePackageSelect={handlePackageSelect} />
            )}

            {step === 2 && (
              <PaymentStep selectedPackage={selectedPackage} setStep={setStep} />
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {step === 3 && (
              <AssetsStep
                assets={assets}
                setAssets={setAssets}
                setStep={(s) => {
                  if (s === 4) {
                    handleContinueFromAssets();
                  } else {
                    setStep(s);
                  }
                }}
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
                wasUpdate={wasUpdate}
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
