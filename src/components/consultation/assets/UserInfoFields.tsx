import React from "react";

interface UserInfoFieldsProps {
  name: string;
  email: string;
  onChange: (field: string, value: string) => void;
}

const UserInfoFields: React.FC<UserInfoFieldsProps> = ({ name, email, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      {/* Name Input */}
      <div className="bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-8 md:p-10 backdrop-blur-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2" />
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-primary/20 text-primary rounded-xl">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-black text-white tracking-tight uppercase">Full Name</h3>
            <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Required</span>
          </div>
        </div>
        <input
          type="text"
          placeholder="John Doe"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white font-medium focus:outline-none focus:border-primary/50 transition-all"
          value={name}
          onChange={(e) => onChange("name", e.target.value)}
        />
      </div>

      {/* Email Input */}
      <div className="bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-8 md:p-10 backdrop-blur-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2" />
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-primary/20 text-primary rounded-xl">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-black text-white tracking-tight uppercase">Email Address</h3>
            <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Required</span>
          </div>
        </div>
        <input
          type="email"
          placeholder="your@email.com"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white font-medium focus:outline-none focus:border-primary/50 transition-all"
          value={email}
          onChange={(e) => onChange("email", e.target.value)}
        />
      </div>
    </div>
  );
};

export default UserInfoFields;
