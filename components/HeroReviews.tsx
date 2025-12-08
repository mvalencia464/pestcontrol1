import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

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
    <div className="flex items-center gap-3 text-sm font-medium text-slate-600 bg-white/80 backdrop-blur-sm py-2 px-4 rounded-full border border-gray-100 shadow-sm w-fit mx-auto lg:mx-0 mb-8 animate-in fade-in zoom-in duration-700 delay-300">
      <div className="flex gap-0.5 text-yellow-400 shrink-0">
        <Star size={14} fill="currentColor" />
        <Star size={14} fill="currentColor" />
        <Star size={14} fill="currentColor" />
        <Star size={14} fill="currentColor" />
        <Star size={14} fill="currentColor" />
      </div>
      <div className={`transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'} flex gap-2 whitespace-nowrap overflow-hidden text-ellipsis`}>
        <span className="text-slate-900 font-semibold">"{HERO_REVIEWS[index].text}"</span>
        <span className="text-slate-500 hidden sm:inline">- {HERO_REVIEWS[index].author}</span>
      </div>
    </div>
  );
};