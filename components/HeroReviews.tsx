import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const HERO_REVIEWS = [
  { text: "Best service in Spokane!", author: "Sarah J." },
  { text: "Ants gone in one visit.", author: "Mike T." },
  { text: "Professional & on time.", author: "Emily R." },
  { text: "Saved us from termites!", author: "David K." },
  { text: "Jordan is the best.", author: "Lisa M." }
];

export const HeroReviews: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % HERO_REVIEWS.length);
        setFade(true);
      }, 500); // Wait for fade out
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-4 bg-white shadow-xl shadow-brand-900/5 py-3 px-5 rounded-2xl border-l-4 border-brand-500 w-fit mx-auto lg:mx-0 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
      <div className="bg-brand-50 p-2 rounded-full shrink-0">
        <Quote size={18} className="text-brand-600 fill-brand-600" />
      </div>
      <div className={`transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'} flex flex-col`}>
        <span className="text-slate-900 font-bold text-base leading-tight">"{HERO_REVIEWS[index].text}"</span>
        <span className="text-slate-500 text-xs font-medium uppercase tracking-wide mt-0.5 border-t border-gray-100 pt-1 w-fit">
          Verified Customer &bull; {HERO_REVIEWS[index].author}
        </span>
      </div>
    </div>
  );
};