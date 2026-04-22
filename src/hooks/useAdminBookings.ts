import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import { useAdminAuth } from "@/context/AdminAuthContext";

export interface Booking {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  preferences?: string;
  hangoutLink?: string;
  startDateTime?: string;
  assets?: {
    photos?: string[];
    drawing?: string;
    layout?: string;
  };
}

export const useAdminBookings = () => {
  const { user, loading: authLoading } = useAdminAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result: any = await api.get("/consultations/admin/all", true);
      setBookings(result.bookings as Booking[]);
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && user) {
      fetchBookings();
    }
  }, [authLoading, user, fetchBookings]);

  const deleteBooking = async (docId: string) => {
    const previousBookings = [...bookings];
    setBookings(prev => prev.filter(b => b.id !== docId));
    if (selectedBooking?.id === docId) {
      setSelectedBooking(null);
    }

    try {
      const result: any = await api.delete(`/consultations/admin/${docId}`, true);

      if (!result.success) {
        throw new Error(result.error || "Failed to delete booking");
      }

      return { success: true };
    } catch (err: any) {
      console.error("Delete error:", err);
      setBookings(previousBookings);
      setError(`Failed to delete booking: ${err.message}. The list has been restored.`);
      return { success: false, error: err.message };
    }
  };

  const closeDetails = () => setSelectedBooking(null);
  const openDetails = (booking: Booking) => setSelectedBooking(booking);

  return {
    bookings,
    isLoading,
    error,
    selectedBooking,
    fetchBookings,
    deleteBooking,
    openDetails,
    closeDetails,
  };
};
