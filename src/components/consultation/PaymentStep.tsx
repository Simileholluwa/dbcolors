import React from "react";

interface PaymentStepProps {
  selectedPackage: any;
  setStep: (s: number) => void;
}

const PaymentStep: React.FC<PaymentStepProps> = ({ selectedPackage, setStep }) => {
  return (
    <div
      key="step2"
      className="max-w-xl mx-auto"
    >
      <div className="text-center mb-12">
        <span className="text-[10px] text-primary font-black tracking-[0.3em] uppercase block mb-4">
          Secure Payment
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
          Finalize Order
        </h2>
        <p className="text-white/40 text-sm font-medium italic max-w-lg mx-auto leading-relaxed">
          Proceed to payment for the{" "}
          <span className="text-white font-bold">{selectedPackage?.name}</span>{" "}
          package.
        </p>
      </div>
      <div className="bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-8 md:p-10 backdrop-blur-3xl text-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2" />
        <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">
              Total to Pay
            </span>
            <span className="text-primary text-2xl font-black">
              {selectedPackage?.currency}
              {selectedPackage?.price}
            </span>
          </div>
        </div>

        <button
          onClick={() => setStep(3)}
          className="w-full py-5 bg-primary text-secondary rounded-2xl font-black text-sm tracking-[0.2em] uppercase shadow-[0_0_30px_rgba(153,255,0,0.2)] hover:brightness-110 transition-all active:scale-[0.98]"
        >
          Pay with Paystack
        </button>

        <button
          onClick={() => setStep(1)}
          className="mt-6 text-white/20 hover:text-white/40 text-[10px] font-black uppercase tracking-widest transition-colors underline underline-offset-4"
        >
          Change Package
        </button>
      </div>
    </div>
  );
};

export default PaymentStep;
