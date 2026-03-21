import React from "react";
import { FileUp, Square, Layout } from "lucide-react";

interface TechnicalUploadProps {
  drawing?: File;
  layout?: File;
  onFileSelect: (field: string, file: File | undefined) => void;
}

const TechnicalUpload: React.FC<TechnicalUploadProps> = ({ drawing, layout, onFileSelect }) => {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-4 md:p-8 backdrop-blur-3xl transition-all duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-white/5 text-white/40 rounded-xl">
          <FileUp size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black text-white tracking-tight uppercase">
            Technical Details
          </h3>
          <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">
            Optional
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/20 transition-all cursor-pointer">
          <div className="flex items-center gap-3">
            <Square size={16} className="text-primary" />
            <span className="text-sm font-bold text-white/60 tracking-tight">
              Architectural Drawing
            </span>
          </div>
          <input
            type="file"
            className="hidden"
            id="drawing-upload"
            onChange={(e) => onFileSelect("drawing", e.target.files?.[0])}
          />
          <label
            htmlFor="drawing-upload"
            className="px-4 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest cursor-pointer"
          >
            {drawing ? "Re-upload" : "Upload"}
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/20 transition-all cursor-pointer">
          <div className="flex items-center gap-3">
            <Layout size={16} className="text-primary" />
            <span className="text-sm font-bold text-white/60 tracking-tight">
              Existing Floor Layout
            </span>
          </div>
          <input
            type="file"
            className="hidden"
            id="layout-upload"
            onChange={(e) => onFileSelect("layout", e.target.files?.[0])}
          />
          <label
            htmlFor="layout-upload"
            className="px-4 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest cursor-pointer"
          >
            {layout ? "Re-upload" : "Upload"}
          </label>
        </div>
      </div>
    </div>
  );
};

export default TechnicalUpload;
