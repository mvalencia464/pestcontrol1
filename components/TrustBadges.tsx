import React from 'react';
import { Star, ShieldCheck, Heart, Award, CheckCircle } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4 items-center text-sm font-medium text-gray-700">
      <div className="flex items-center gap-1 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
        <div className="flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          <div className="flex text-yellow-400">
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
          </div>
        </div>
        <span className="ml-1">4.9 (250+ Reviews)</span>
      </div>
      <div className="flex items-center gap-1 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
        <ShieldCheck size={16} className="text-brand-600" />
        <span>Licensed & Insured</span>
      </div>
      <div className="flex items-center gap-1 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
        <Heart size={16} className="text-red-500" />
        <span>Pet & Family Safe</span>
      </div>
      <div className="flex items-center gap-1 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
        <CheckCircle size={16} className="text-brand-600" />
        <span>No Contracts</span>
      </div>
      <div className="flex items-center gap-1 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
        <CheckCircle size={16} className="text-brand-600" />
        <span>Money-Back Guarantee</span>
      </div>
    </div>
  );
};