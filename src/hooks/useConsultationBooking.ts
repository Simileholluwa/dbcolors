import React from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";

interface BookingParams {
  assets: {
    photos: File[];
    drawing?: File;
    layout?: File;
    preferences?: string;
    email: string;
    name: string;
  };
  selectedPackage: any;
}

export const useConsultationBooking = () => {
  const [isBooking, setIsBooking] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [lastAttempt, setLastAttempt] = React.useState<{
    isoDate: string;
    timeStr: string;
    displayDate: string;
    params: BookingParams;
  } | null>(null);
  const [bookingData, setBookingData] = React.useState<any>(null);

  const handleBooking = async (
    isoDate: string,
    timeStr: string,
    displayDate: string,
    params: BookingParams
  ) => {
    setIsBooking(true);
    setError(null);
    setLastAttempt({ isoDate, timeStr, displayDate, params });

    const { assets, selectedPackage } = params;

    try {
      // 1. Get Signed Upload URLs via Cloud Function
      const getSignedUploadUrls = httpsCallable(functions, "getSignedUploadUrls");
      const filesToUpload: any[] = [];
      const fileMap: { [key: string]: File } = {};

      assets.photos.forEach((f, idx) => {
        const id = `photo-${idx}-${Date.now()}`;
        const type = f.type || 'application/octet-stream';
        filesToUpload.push({ id, name: f.name, type, category: 'photos' });
        fileMap[id] = f;
      });

      if (assets.drawing) {
        const id = `drawing-${Date.now()}`;
        const type = assets.drawing.type || 'application/octet-stream';
        filesToUpload.push({ id, name: assets.drawing.name, type, category: 'technical' });
        fileMap[id] = assets.drawing;
      }

      if (assets.layout) {
        const id = `layout-${Date.now()}`;
        const type = assets.layout.type || 'application/octet-stream';
        filesToUpload.push({ id, name: assets.layout.name, type, category: 'technical' });
        fileMap[id] = assets.layout;
      }

      if (filesToUpload.length === 0) {
        throw new Error("No assets selected for upload.");
      }

      const urlResponse: any = await getSignedUploadUrls({
        email: assets.email,
        files: filesToUpload,
      });

      if (!urlResponse.data.success) {
        throw new Error("Failed to secure upload channels. Please try again.");
      }

      const { uploads } = urlResponse.data;
      const assetPaths: any = { photos: [] };

      // 2. Upload files directly to Storage via Signed URLs (PUT)
      for (const upload of uploads) {
        const file = fileMap[upload.id];
        if (!file) continue;

        const type = file.type || 'application/octet-stream';
        const uploadResponse = await fetch(upload.url, {
          method: 'PUT',
          headers: { 'Content-Type': type },
          body: file,
        });

        if (!uploadResponse.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        if (upload.storagePath.includes('/photos/')) {
          assetPaths.photos.push(upload.storagePath);
        } else if (upload.id.startsWith('drawing-')) {
          assetPaths.drawing = upload.storagePath;
        } else if (upload.id.startsWith('layout-')) {
          assetPaths.layout = upload.storagePath;
        }
      }

      // 3. Call createBooking Cloud Function
      const createBooking = httpsCallable(functions, "createBooking");
      const result: any = await createBooking({
        email: assets.email,
        name: assets.name,
        selectedPackage: {
          name: selectedPackage.name,
          price: selectedPackage.price,
        },
        date: isoDate,
        time: timeStr,
        preferences: assets.preferences,
        assets: assetPaths,
      });

      if (result.data.success) {
        const finalBooking = {
          date: displayDate,
          isoDate: isoDate,
          time: timeStr,
          hangoutLink: result.data.hangoutLink,
          email: assets.email,
          name: assets.name,
          packageName: selectedPackage.name,
        };
        setBookingData(finalBooking);
        return { success: true, data: finalBooking };
      } else {
        throw new Error("Booking failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Booking error:", err);
      setError(err.message || "An unexpected error occurred.");
      return { success: false, error: err.message };
    } finally {
      setIsBooking(false);
    }
  };

  const retryBooking = () => {
    if (lastAttempt) {
      handleBooking(
        lastAttempt.isoDate,
        lastAttempt.timeStr,
        lastAttempt.displayDate,
        lastAttempt.params
      );
    }
  };

  const checkExistingBooking = async (email: string) => {
    try {
      const checkFn = httpsCallable(functions, "checkExistingBooking");
      const result: any = await checkFn({ email });
      return result.data;
    } catch (err: any) {
      console.error("Check existing booking error:", err);
      return { exists: false, error: err.message };
    }
  };

  const deleteBooking = async (docId: string) => {
    setIsBooking(true);
    try {
      const deleteFn = httpsCallable(functions, "deleteBooking");
      const result: any = await deleteFn({ docId });
      return result.data;
    } catch (err: any) {
      console.error("Delete booking error:", err);
      return { success: false, error: err.message };
    } finally {
      setIsBooking(false);
    }
  };

  const updateBooking = async (oldDocId: string, newDate: string, newTime: string) => {
    setIsBooking(true);
    try {
      const updateFn = httpsCallable(functions, "updateBooking");
      const result: any = await updateFn({ oldDocId, newDate, newTime });
      return result.data;
    } catch (err: any) {
      console.error("Update booking error:", err);
      return { success: false, error: err.message };
    } finally {
      setIsBooking(false);
    }
  };

  const getBooking = async (docId: string) => {
    try {
      const getFn = httpsCallable(functions, "getBooking");
      const result: any = await getFn({ docId });
      return result.data;
    } catch (err: any) {
      console.error("Get booking error:", err);
      return { success: false, error: err.message };
    }
  };

  return {
    isBooking,
    error,
    setError,
    bookingData,
    handleBooking,
    retryBooking,
    checkExistingBooking,
    deleteBooking,
    updateBooking,
    getBooking,
    setBookingData,
  };
};
