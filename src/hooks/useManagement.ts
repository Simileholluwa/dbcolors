import { useState, useCallback } from "react";
import { useConsultationBooking } from "./useConsultationBooking";
import { Booking } from "./useAdminBookings";

export const useManagement = (initialEmail: string) => {
  const [email, setEmail] = useState(initialEmail);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { checkExistingBooking, deleteBooking: apiDeleteBooking } = useConsultationBooking();

  const handleFetchBookings = useCallback(async (searchEmail?: string) => {
    const targetEmail = searchEmail || email;
    if (!targetEmail || !targetEmail.includes("@")) return;

    setIsSearching(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await checkExistingBooking(targetEmail);
      if (result?.exists && Array.isArray(result?.bookings)) {
        setBookings(result.bookings);
      } else {
        setBookings([]);
        setError(`No future consultations found for ${targetEmail}.`);
      }
    } catch (err: any) {
      console.error("Fetch bookings error:", err);
      setError("An error occurred while fetching bookings.");
    } finally {
      setIsSearching(false);
    }
  }, [email, checkExistingBooking]);

  const handleDelete = async (bookingId: string) => {
    if (!window.confirm("Are you sure you want to cancel this consultation?")) return;

    setIsSearching(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await apiDeleteBooking(bookingId);
      if (result.success) {
        setBookings((prev) => prev.filter((b) => b.id !== bookingId));
        setSuccess("Consultation cancelled successfully.");
      } else {
        setError(result.error || "Failed to cancel consultation.");
      }
    } catch (err: any) {
      console.error("Delete booking error:", err);
      setError("An error occurred while cancelling the consultation.");
    } finally {
      setIsSearching(false);
    }
  };

  return {
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
  };
};
