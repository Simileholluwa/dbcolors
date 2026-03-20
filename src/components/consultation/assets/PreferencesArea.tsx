import React from "react";

interface PreferencesAreaProps {
  value: string;
  onChange: (value: string) => void;
}

const PreferencesArea: React.FC<PreferencesAreaProps> = ({ value, onChange }) => {
  return (
    <div className="mb-12 transition-all duration-500">
      <h3 className="text-[10px] text-primary font-black tracking-[0.3em] uppercase mb-4 text-center">
        Design Preferences
      </h3>
      <textarea
        placeholder="Describe your vision, mood boards, or specific goals for the space..."
        className="w-full h-32 bg-white/[0.05] border border-white/10 rounded-[1.5rem] p-6 focus:outline-none focus:border-primary/50 text-white font-medium text-sm transition-all shadow-inner"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default PreferencesArea;
