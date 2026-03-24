import React from "react";

export const EasterTerms = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter">Terms & <span className="text-primary italic">Conditions</span></h2>
          </div>

          <div className="grid gap-12 text-white/60 text-sm font-medium leading-relaxed">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-4 flex items-center gap-3">
                    <div className="w-3 h-[1px] bg-primary" />
                    01. Promo Period
                  </h4>
                  <p>This promotion is valid for bookings made between March 20 and April 10, 2026. Projects may be scheduled for execution after this period, subject to availability.</p>
                </div>
                <div>
                  <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-4 flex items-center gap-3">
                    <div className="w-3 h-[1px] bg-primary" />
                    02. Scope of Services
                  </h4>
                  <p>Each package includes only the services explicitly listed. Any additional requests will attract extra charges and will be quoted separately.</p>
                </div>
                <div>
                  <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-4 flex items-center gap-3">
                    <div className="w-3 h-[1px] bg-primary" />
                    03. Payment Terms
                  </h4>
                  <p>A minimum of 50% deposit is required to secure all bookings. The balance must be completed before project execution or installation.</p>
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-4 flex items-center gap-3">
                    <div className="w-3 h-[1px] bg-primary" />
                    04. Refunds & Cancellations
                  </h4>
                  <p>Deposits are non-refundable once project planning or sourcing has commenced. Rescheduling is subject to availability and must be communicated in advance.</p>
                </div>
                <div>
                  <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-4 flex items-center gap-3">
                    <div className="w-3 h-[1px] bg-primary" />
                    05. Timelines & Suppliers
                  </h4>
                  <p>All completion timelines are estimates and may be affected by material availability or third-party delays. DB Colors is not liable for vendor delays.</p>
                </div>
                <div>
                  <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-4 flex items-center gap-3">
                    <div className="w-3 h-[1px] bg-primary" />
                    06. Client Responsibilities
                  </h4>
                  <p>Clients are expected to provide timely approvals, feedback, and site access. Delays caused by the client may affect project completion timelines.</p>
                </div>
              </div>
            </div>

            <div className="pt-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1 italic">For inquiries or clarifications, please contact:</p>
                <p className="text-lg font-black text-white tracking-tight">support@dbcolors.ng</p>
                <p className="text-primary font-bold">07041123790</p>
              </div>
              <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl md:max-w-xs">
                <p className="text-[10px] font-black lowercase tracking-widest text-primary mb-2">Agreement Statement</p>
                <p className="text-[10px] italic leading-tight">By making payment for any Easter promotional package, the client acknowledges that they have read, understood, and agreed to these Terms & Conditions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
