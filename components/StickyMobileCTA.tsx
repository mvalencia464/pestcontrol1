import React from 'react';
import { Phone, CalendarCheck } from 'lucide-react';

interface StickyMobileCTAProps {
  onQuoteClick: () => void;
}

const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({ onQuoteClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 md:hidden flex gap-3">
      <a 
        href="tel:+15550123456"
        className="flex-1 flex items-center justify-center gap-2 bg-brand-100 text-brand-800 font-bold py-3 rounded-xl hover:bg-brand-200 transition-colors"
      >
        <Phone className="w-5 h-5" />
        Call Now
      </a>
      <button 
        onClick={onQuoteClick}
        className="flex-1 flex items-center justify-center gap-2 bg-brand-600 text-white font-bold py-3 rounded-xl hover:bg-brand-700 transition-colors shadow-lg"
      >
        <CalendarCheck className="w-5 h-5" />
        Get Quote
      </button>
    </div>
  );
};

export default StickyMobileCTA;