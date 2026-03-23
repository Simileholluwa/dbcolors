import { useState, useEffect, useCallback } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";
import { useAdminAuth } from "@/context/AdminAuthContext";

export interface Booking {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  package: string;
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
      const getAllBookingsFn = httpsCallable(functions, "getAllBookings");
      const result: any = await getAllBookingsFn();
      if (result.data.success) {
        setBookings(result.data.bookings as Booking[]);
      } else {
        throw new Error(result.data.error || "Failed to fetch bookings");
      }
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
    if (!confirm("Are you sure you want to delete this booking? This will also remove the calendar event.")) return;
    
    try {
      const deleteFn = httpsCallable(functions, "deleteBooking");
      const result: any = await deleteFn({ docId });
      if (result.data.success) {
        setBookings(prev => prev.filter(b => b.id !== docId));
        if (selectedBooking?.id === docId) setSelectedBooking(null);
        return { success: true };
      } else {
        throw new Error(result.data.error || "Failed to delete booking");
      }
    } catch (err: any) {
      console.error("Delete error:", err);
      alert(err.message || "Failed to delete booking");
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
