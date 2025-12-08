import React from 'react';
import { Star, CheckCircle2, ThumbsUp, MapPin } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    location: "Northside",
    date: "2 days ago",
    rating: 5,
    text: "I was panicked when I found carpenter ants in the kitchen. Freedom came out the same day. The tech, Mike, was super polite, explained everything, and didn't try to upsell me on stuff I didn't need. Haven't seen an ant since!",
    service: "Ant Control",
    verified: true,
    platform: "Google"
  },
  {
    id: 2,
    name: "David Chen",
    location: "West Hills",
    date: "1 week ago",
    rating: 5,
    text: "Used their AI tool to identify a weird bug. Turns out it was a silverfish. Booked a treatment and the process was seamless. The online portal to manage appointments is a huge plus.",
    service: "General Pest",
    verified: true,
    platform: "Yelp"
  },
  {
    id: 3,
    name: "Emily R.",
    location: "Downtown",
    date: "2 weeks ago",
    rating: 5,
    text: "Best price in town for rodent exclusion. They actually sealed the entry points instead of just setting traps like the last guys did. Highly recommend if you want a permanent solution.",
    service: "Rodent Control",
    verified: true,
    platform: "Google"
  },
  {
    id: 4,
    name: "Marcus T.",
    location: "Suburbs",
    date: "3 weeks ago",
    rating: 4,
    text: "Solid service. Technician arrived within the 1-hour window (rare these days). Treatment was quick and pet-friendly as promised. Taking off one star because I had to wait on hold for a bit to reschedule, but otherwise great.",
    service: "Mosquito Defense",
    verified: true,
    platform: "Facebook"
  },
  {
    id: 5,
    name: "Jessica & Tom",
    location: "Oak Creek",
    date: "1 month ago",
    rating: 5,
    text: "We have a newborn and a dog, so safety was our #1 concern. The technician used eco-friendly products and explained exactly how long we needed to stay out of the yard (just 30 mins). Peace of mind is priceless.",
    service: "Eco-Friendly Spray",
    verified: true,
    platform: "Google"
  },
  {
    id: 6,
    name: "Robert Wilson",
    location: "Highland Park",
    date: "1 month ago",
    rating: 5,
    text: "They got rid of a massive wasp nest under my deck. The guy was geared up like a pro and handled it in 15 minutes. Super impressed.",
    service: "Wasp Removal",
    verified: true,
    platform: "Nextdoor"
  }
];

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-slate-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-1.5 rounded-full shadow-sm mb-6">
            <div className="flex -space-x-1">
              {[1,2,3,4].map(i => (
                 <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                 </div>
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700 pl-2">Loved by 2,500+ Neighbors</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">Don't just take our word for it.</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
             <div className="flex flex-col items-center">
                <span className="text-5xl font-black text-slate-900">4.9</span>
                <div className="flex text-yellow-400 my-1">
                   {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <span className="text-sm text-gray-500 font-medium">Google Reviews</span>
             </div>
             <div className="hidden sm:block w-px h-16 bg-gray-200"></div>
             <div className="flex flex-col items-center">
                <span className="text-5xl font-black text-slate-900">A+</span>
                <div className="h-6 w-24 bg-gray-200 rounded mt-1 relative overflow-hidden">
                    {/* Mock BBB logo placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-500 tracking-tighter">BBB ACCREDITED</div>
                </div>
                <span className="text-sm text-gray-500 font-medium mt-1">Rating</span>
             </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full">
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-700 flex items-center justify-center font-bold text-lg">
                      {review.name.charAt(0)}
                   </div>
                   <div>
                      <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <MapPin size={10} /> {review.location}
                      </div>
                   </div>
                </div>
                {review.platform === 'Google' && <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">G</span>}
                {review.platform === 'Yelp' && <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">Yelp</span>}
              </div>

              <div className="flex text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-gray-300" : ""} />
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">"{review.text}"</p>

              <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-xs">
                 <span className="font-semibold text-brand-600 bg-brand-50 px-2 py-1 rounded-md">
                   {review.service}
                 </span>
                 <div className="flex items-center gap-1 text-green-600 font-medium">
                    <CheckCircle2 size={12} /> Verified Customer
                 </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
           <button className="text-brand-600 font-bold hover:text-brand-700 hover:underline">
              Read all 250+ reviews on Google &rarr;
           </button>
        </div>

      </div>
    </section>
  );
};