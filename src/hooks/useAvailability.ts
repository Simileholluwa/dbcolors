import React from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";

export const useAvailability = (initialMonth: number, initialYear: string) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingTimes, setIsLoadingTimes] = React.useState(false);
  const [availableDays, setAvailableDays] = React.useState<number[]>([]);
  const [availableTimes, setAvailableTimes] = React.useState<string[]>([]);
  const [monthData, setMonthData] = React.useState({
    name: new Date(parseInt(initialYear), initialMonth - 1).toLocaleString('default', { month: 'long' }).toUpperCase(),
    year: initialYear,
    monthNum: initialMonth,
    days: Array.from({ length: new Date(parseInt(initialYear), initialMonth, 0).getDate() }, (_, i) => i + 1)
  });

  const fetchMonthlyAvailability = React.useCallback(async (y: string, m: number, retry = true) => {
    setIsLoading(true);
    try {
      const getMonthlyAvailability = httpsCallable(functions, "getMonthlyAvailability");
      const result: any = await getMonthlyAvailability({ year: y, month: m });
      
      const available = result.data.availableDays || [];
      
      const now = new Date();
      const isCurrentMonth = parseInt(y) === now.getFullYear() && m === (now.getMonth() + 1);
      
      if (isCurrentMonth && available.length < 3 && retry) {
        const nextDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const nextYear = nextDate.getFullYear().toString();
        const nextMonth = nextDate.getMonth() + 1;
        const daysInNextMonth = new Date(nextDate.getFullYear(), nextDate.getMonth() + 1, 0).getDate();
        
        setMonthData({
          name: nextDate.toLocaleString('default', { month: 'long' }).toUpperCase(),
          year: nextYear,
          monthNum: nextMonth,
          days: Array.from({ length: daysInNextMonth }, (_, i) => i + 1)
        });
        
        return fetchMonthlyAvailability(nextYear, nextMonth, false);
      }

      setAvailableDays(available);
    } catch (error) {
      console.warn('Availability fetch failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchDaySlots = React.useCallback(async (day: number) => {
    setIsLoadingTimes(true);
    try {
      const getAvailableSlots = httpsCallable(functions, "getAvailableSlots");
      const result: any = await getAvailableSlots({
        year: monthData.year,
        month: monthData.monthNum,
        day
      });

      if (result.data.availableSlots) {
        setAvailableTimes(result.data.availableSlots);
      }
    } catch (error) {
      console.warn('Failed to fetch daily slots:', error);
      setAvailableTimes(["09:00", "11:00", "14:00", "16:00"]);
    } finally {
      setIsLoadingTimes(false);
    }
  }, [monthData.year, monthData.monthNum]);

  React.useEffect(() => {
    fetchMonthlyAvailability(monthData.year, monthData.monthNum);
  }, [monthData.year, monthData.monthNum, fetchMonthlyAvailability]);

  return {
    isLoading,
    isLoadingTimes,
    availableDays,
    availableTimes,
    monthData,
    fetchDaySlots,
    setAvailableTimes
  };
};
