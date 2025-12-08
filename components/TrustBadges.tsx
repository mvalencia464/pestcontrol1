import React from 'react';
import { Star, ShieldCheck, Heart, Award, CheckCircle } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4 items-center text-sm font-medium text-gray-700">
      <div className="flex items-center gap-1 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
        <div className="flex text-yellow-400">
          {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
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