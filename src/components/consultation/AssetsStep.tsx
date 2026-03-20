import React from "react";
import UserInfoFields from "./assets/UserInfoFields";
import PhotoUpload from "./assets/PhotoUpload";
import TechnicalUpload from "./assets/TechnicalUpload";
import PreferencesArea from "./assets/PreferencesArea";

interface AssetsStepProps {
  assets: {
    photos: File[];
    drawing?: File;
    layout?: File;
    preferences?: string;
    email: string;
    name: string;
  };
  setAssets: React.Dispatch<React.SetStateAction<any>>;
  setStep: (s: number) => void;
  selectedPackage: any;
}

const AssetsStep: React.FC<AssetsStepProps> = ({
  assets,
  setAssets,
  setStep,
  selectedPackage,
}) => {
  const handleUserChange = (field: string, value: string) => {
    setAssets((prev: any) => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (files: File[]) => {
    setAssets((prev: any) => ({
      ...prev,
      photos: [...prev.photos, ...files].slice(0, 5),
    }));
  };

  const handlePhotoRemove = (index: number) => {
    setAssets((prev: any) => ({
      ...prev,
      photos: prev.photos.filter((_: any, idx: number) => idx !== index),
    }));
  };

  const handleTechnicalSelect = (field: string, file: File | undefined) => {
    setAssets((prev: any) => ({ ...prev, [field]: file }));
  };

  const handlePreferencesChange = (value: string) => {
    setAssets((prev: any) => ({ ...prev, preferences: value }));
  };

  const isContinueDisabled =
    assets.photos.length === 0 ||
    !assets.name ||
    !assets.email.includes("@") ||
    !assets.email.includes(".");

  return (
    <div key="step3" className="max-w-4xl mx-auto w-full">
      <div className="text-center mb-12">
        <span className="text-[10px] text-primary font-black tracking-[0.3em] uppercase block mb-4">
          Preparation
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
          Project Assets
        </h2>
        <p className="text-white/40 text-sm font-medium italic max-w-lg mx-auto leading-relaxed">
          Help us understand your space better. Please provide context and files
          related to your project.
        </p>
      </div>

      <UserInfoFields
        name={assets.name}
        email={assets.email}
        onChange={handleUserChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <PhotoUpload
          photos={assets.photos}
          onChange={handlePhotoChange}
          onRemove={handlePhotoRemove}
        />
        <TechnicalUpload
          drawing={assets.drawing}
          layout={assets.layout}
          onFileSelect={handleTechnicalSelect}
        />
      </div>

      <PreferencesArea
        value={assets.preferences || ""}
        onChange={handlePreferencesChange}
      />

      <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
        <button
          onClick={() => setStep(4)}
          disabled={isContinueDisabled}
          className="w-full md:w-auto px-12 py-5 bg-primary text-secondary rounded-2xl font-black text-sm tracking-[0.2em] uppercase shadow-[0_0_30px_rgba(153,255,0,0.2)] hover:brightness-110 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Schedule
        </button>
        <button
          onClick={() => setStep(selectedPackage?.price === "Free" ? 1 : 2)}
          className="text-white/20 hover:text-white/40 text-[10px] font-black uppercase tracking-widest transition-colors"
        >
          {selectedPackage?.price === "Free" ? "Change Package" : "Go Back to Payment"}
        </button>
      </div>
    </div>
  );
};

export default AssetsStep;
;
