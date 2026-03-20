import React from "react";
import { ArrowRight } from "lucide-react";
import { consultationPackages } from "@/constants/consultation";

interface PackageStepProps {
  handlePackageSelect: (pkg: any) => void;
}

const PackageStep: React.FC<PackageStepProps> = ({ handlePackageSelect }) => {
  return (
    <div
      key="step1"
      className="w-full"
    >
      <div className="text-center mb-12">
        <span className="text-[10px] text-primary font-black tracking-[0.3em] uppercase block mb-4">
          Packages
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
          Choose Your Consultation
        </h2>
        <p className="text-white/40 text-sm font-medium italic max-w-lg mx-auto leading-relaxed">
          Select the tier that matches your project's scope.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {consultationPackages.map((pkg, idx) => (
          <div
            key={idx}
            className={`flex flex-col relative group h-full rounded-[1.5rem] border transition-all duration-500 p-8 md:p-10 backdrop-blur-2xl overflow-hidden md:last:odd:col-span-2 lg:last:odd:col-span-1 md:last:odd:max-w-md md:last:odd:mx-auto md:last:odd:w-full
              ${pkg.highlight
                ? "bg-white/[0.05] border-primary/30 shadow-[0_0_50px_rgba(153,255,0,0.1)]"
                : "bg-white/[0.02] border-white/10 hover:border-white/20"
              }
            `}
          >
            {pkg.highlight && (
              <div className="absolute top-0 right-0 px-6 py-2 bg-primary text-secondary font-black text-[10px] uppercase tracking-widest rounded-bl-2xl">
                Most Popular
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-xl md:text-2xl font-black text-white tracking-tight mb-2 uppercase break-words">
                {pkg.name}
              </h3>
              <div className="flex items-baseline gap-1">
                {pkg.currency && (
                  <span className="text-lg font-bold text-white/40">
                    {pkg.currency}
                  </span>
                )}
                <span className="text-3xl md:text-5xl font-black text-primary tracking-tighter">
                  {pkg.price}
                </span>
              </div>
            </div>

            <p className="text-white/40 text-sm font-medium leading-relaxed mb-8 italic">
              {pkg.description}
            </p>

            <div className="space-y-4 mb-10 flex-grow">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] block mb-2">
                Package Includes
              </span>
              {pkg.features.map((feature, fIdx) => (
                <div key={fIdx} className="flex items-center gap-3 text-white/70 group/item">
                  <div
                    className={`p-2 rounded-lg transition-colors duration-300
                    ${pkg.highlight
                        ? "bg-primary/20 text-primary"
                        : "bg-white/5 text-white/40 group-hover/item:text-primary group-hover/item:bg-primary/10"
                      }
                  `}
                  >
                    {feature.icon}
                  </div>
                  <span className="text-sm font-bold tracking-tight">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handlePackageSelect(pkg)}
              className={`w-full py-4 rounded-xl font-black text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 group/btn
                ${pkg.highlight
                  ? "bg-primary text-secondary shadow-[0_0_30px_rgba(153,255,0,0.2)] hover:brightness-110"
                  : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-primary/50"
                }
              `}
            >
              {pkg.cta}
              <ArrowRight
                size={16}
                className="group-hover/btn:translate-x-1 transition-transform"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageStep;
