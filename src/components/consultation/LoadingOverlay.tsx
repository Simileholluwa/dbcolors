import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
  isVisible: boolean;
  title: string;
  message?: string;
  zIndex?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
  title,
  message,
  zIndex = "z-[100]",
}) => {
  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 ${zIndex} flex items-center justify-center backdrop-blur-md`}>
      <div className="bg-secondary p-12 rounded-[1.5rem] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)] text-center max-w-sm w-full mx-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-6" />
        <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">
          {title}
        </h3>
        {message && (
          <p className="text-white/40 text-sm font-medium italic">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingOverlay;
