import { useState, useEffect } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";

export const useAdminStats = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingBookings: 0,
    recentClients: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const getAllBookings = httpsCallable(functions, "getAllBookings");
        const result: any = await getAllBookings();
        if (result.data.success) {
          const bookings = result.data.bookings;
          setStats({
            totalBookings: bookings.length,
            upcomingBookings: bookings.filter((b: any) => new Date(b.startDateTime) > new Date()).length,
            recentClients: new Set(bookings.map((b: any) => b.email)).size
          });
        } else {
          throw new Error(result.data.error || "Failed to fetch stats");
        }
      } catch (err: any) {
        console.error("Error fetching stats:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  return { stats, isLoading, error };
};
