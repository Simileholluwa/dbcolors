import React from "react";

interface EmailSearchFormProps {
  email: string;
  setEmail: (e: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSearching: boolean;
}

const EmailSearchForm: React.FC<EmailSearchFormProps> = ({
  email,
  setEmail,
  onSubmit,
  isSearching,
}) => {
  return (
    <div className="bg-white/5 border border-white/10 p-4 md:p-8 rounded-[1.5rem] shadow-2xl backdrop-blur-md mb-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      <form onSubmit={onSubmit} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative group">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all font-medium"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSearching}
          className="px-8 py-4 bg-primary text-secondary rounded-xl font-black text-[12px] uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_20px_rgba(153,255,0,0.2)] disabled:opacity-50"
        >
          {isSearching ? "Searching..." : "Find My Bookings"}
        </button>
      </form>
    </div>
  );
};

export default EmailSearchForm;
