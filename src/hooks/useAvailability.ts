import React from "react";
import { api } from "@/lib/api";

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
      const result: any = await api.get(`/consultations/availability/monthly?year=${y}&month=${m}`);
      
      const available = result.available_days || [];
      
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
      const dateStr = `${monthData.year}-${String(monthData.monthNum).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const result: any = await api.get(`/consultations/availability/slots?date=${dateStr}`);

      if (result.available_slots) {
        setAvailableTimes(result.available_slots);
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
