import React from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";

interface PhotoUploadProps {
  photos: File[];
  onChange: (files: File[]) => void;
  onRemove: (index: number) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ photos, onChange, onRemove }) => {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-8 md:p-10 backdrop-blur-3xl group">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-primary/20 text-primary rounded-xl">
          <ImageIcon size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black text-white tracking-tight uppercase">
            Photos & Videos
          </h3>
          <span className="text-[10px] text-primary font-bold uppercase tracking-widest">
            Mandatory • Max 5
          </span>
        </div>
      </div>

      <div className="border-2 border-dashed border-white/5 rounded-2xl p-8 transition-colors hover:border-primary/30 group/upload cursor-pointer text-center">
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          id="photo-upload"
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            onChange(files);
          }}
        />
        <label
          htmlFor="photo-upload"
          className="cursor-pointer flex flex-col items-center gap-4"
        >
          <Upload
            size={32}
            className="text-white/20 group-hover/upload:text-primary transition-colors"
          />
          <div className="space-y-1">
            <p className="text-sm font-bold text-white/60 group-hover/upload:text-white transition-colors">
              Click to upload or drag and drop
            </p>
            <p className="text-[10px] text-white/20 font-medium">
              PNG, JPG or MP4
            </p>
          </div>
        </label>
      </div>

      {photos.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          {photos.map((file, i) => (
            <div
              key={i}
              className="px-4 py-2 bg-white/5 rounded-full border border-white/10 flex items-center gap-2"
            >
              <span className="text-[10px] font-bold text-white/60 truncate max-w-[100px]">
                {file.name}
              </span>
              <button
                onClick={() => onRemove(i)}
                className="text-white/20 hover:text-red-500 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
