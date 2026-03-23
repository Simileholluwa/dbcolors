"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmailSearchForm from "@/components/consultation/manage/EmailSearchForm";
import BookingCard from "@/components/consultation/manage/BookingCard";
import { useManagement } from "@/hooks/useManagement";

const ManagementView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";

  const {
      email,
      setEmail,
      bookings,
      isSearching,
      error,
      success,
      handleFetchBookings,
      handleDelete,
      setError,
      setSuccess
  } = useManagement(initialEmail);

  // Auto-fetch if email is provided in query
  React.useEffect(() => {
    if (initialEmail && initialEmail.includes("@")) {
      handleFetchBookings(initialEmail);
    }
  }, [initialEmail, handleFetchBookings]);

  const onFetchBookings = (e?: React.FormEvent, searchEmail?: string) => {
    if (e) e.preventDefault();
    handleFetchBookings(searchEmail);
  };

  const handleUpdate = (bookingId: string) => {
    router.push(`/consultation?update=${bookingId}`);
  };

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <section className="pt-24 pb-24 md:pt-48 md:pb-32 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <Link
                href="/consultation"
                className="text-white/30 hover:text-primary transition-colors font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 mb-8 group"
              >
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
                Back to Booking
              </Link>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                Manage Your <span className="text-primary italic">Consultations</span>
              </h2>
              <p className="text-white/40 text-sm font-medium italic leading-relaxed">
                View, update, or cancel your upcoming appointments. Enter your email to get started.
              </p>
            </div>

            {/* Email Form */}
            <EmailSearchForm
              email={email}
              setEmail={setEmail}
              onSubmit={onFetchBookings}
              isSearching={isSearching}
            />

            {/* Notifications */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium text-center"
              >
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 bg-primary/10 border border-primary/20 rounded-xl text-primary text-sm font-medium text-center"
              >
                {success}
              </motion.div>
            )}

            {/* Bookings List */}
            <div className="space-y-4 md:space-y-6">
              <AnimatePresence mode="popLayout">
                {bookings?.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ManagementView;
