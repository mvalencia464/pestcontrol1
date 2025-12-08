import React from 'react';
import { MapPin, ChevronRight, Shield, Globe, Leaf, Bug, Building2, Home } from 'lucide-react';

// Data structure for the footer SEO directory
const DIRECTORY_DATA = [
  {
    category: "General Pest Control",
    icon: <Bug className="w-5 h-5" />,
    links: [
      { title: "Residential Pest Control", url: "/general-pest-control/residential" },
      { title: "Pest Inspection", url: "/general-pest-control/inspection" },
      { title: "Pest Prevention", url: "/general-pest-control/prevention" },
      { title: "Exterior Treatment", url: "/general-pest-control/exterior-treatment" },
      { title: "Bed Bug Extermination", url: "/general-pest-control/bed-bug-extermination" },
      { title: "Ant Control", url: "/general-pest-control/ant-control" },
      { title: "Spider Control", url: "/general-pest-control/spider-control" },
      { title: "Cockroach Extermination", url: "/general-pest-control/cockroach-extermination" },
      { title: "Flea & Tick Treatment", url: "/general-pest-control/flea-tick-treatment" },
      { title: "Mosquito Control", url: "/general-pest-control/mosquito-control" },
      { title: "Wasp & Bee Removal", url: "/general-pest-control/wasp-bee-removal" },
    ]
  },
  {
    category: "Rodent & Wildlife",
    icon: <Shield className="w-5 h-5" />,
    links: [
      { title: "Rodent Control", url: "/rodent-wildlife-control" },
      { title: "Mouse Extermination", url: "/rodent-wildlife-control/mouse-extermination" },
      { title: "Rat Extermination", url: "/rodent-wildlife-control/rat-extermination" },
      { title: "Squirrel Removal", url: "/rodent-wildlife-control/squirrel-removal" },
      { title: "Wildlife Exclusion", url: "/rodent-wildlife-control/wildlife-exclusion" },
      { title: "Gopher Control", url: "/rodent-wildlife-control/gopher-control" },
      { title: "Mole Control", url: "/rodent-wildlife-control/mole-control" },
      { title: "Dead Animal Removal", url: "/rodent-wildlife-control/dead-animal-removal" },
      { title: "Bird Control", url: "/rodent-wildlife-control/bird-control" },
    ]
  },
  {
    category: "Termite Control",
    icon: <Home className="w-5 h-5" />,
    links: [
      { title: "Termite Inspection", url: "/termite-control/inspection" },
      { title: "Subterranean Treatment", url: "/termite-control/subterranean-treatment" },
      { title: "Bait Systems", url: "/termite-control/bait-systems" },
      { title: "Liquid Barriers", url: "/termite-control/liquid-barriers" },
      { title: "Termite Prevention", url: "/termite-control/prevention" },
      { title: "Pre-Construction", url: "/termite-control/pre-construction-treatment" },
    ]
  },
  {
    category: "Commercial Services",
    icon: <Building2 className="w-5 h-5" />,
    links: [
      { title: "Restaurant Pest Control", url: "/commercial-pest-control/restaurant" },
      { title: "Office Buildings", url: "/commercial-pest-control/office-building" },
      { title: "Warehouse Control", url: "/commercial-pest-control/warehouse" },
      { title: "Food Processing", url: "/commercial-pest-control/food-processing-plant" },
      { title: "Rodent Programs", url: "/commercial-pest-control/rodent-programs" },
      { title: "Insect Management", url: "/commercial-pest-control/insect-programs" },
    ]
  },
  {
    category: "Eco-Friendly",
    icon: <Leaf className="w-5 h-5" />,
    links: [
      { title: "Organic Pest Control", url: "/eco-friendly-pest-control/organic" },
      { title: "Green Management", url: "/eco-friendly-pest-control/green" },
      { title: "Pet-Friendly Solutions", url: "/eco-friendly-pest-control/pet-friendly" },
      { title: "Non-Toxic Solutions", url: "/eco-friendly-pest-control/non-toxic-solutions" },
      { title: "Heat Treatment", url: "/eco-friendly-pest-control/bed-bug-heat-treatment" },
    ]
  },
  {
    category: "Service Areas",
    icon: <MapPin className="w-5 h-5" />,
    links: [
      { title: "Downtown Spokane", url: "/locations/spokane/pest-control-downtown-spokane" },
      { title: "South Hill", url: "/locations/spokane/pest-control-south-hill" },
      { title: "Browne's Addition", url: "/locations/spokane/pest-control-brownes-addition" },
      { title: "Manito/Cannon Hill", url: "/locations/spokane/pest-control-manito-cannon-hill" },
      { title: "Audubon/Downriver", url: "/locations/spokane/pest-control-audubon-downriver" },
      { title: "Indian Trail", url: "/locations/spokane/pest-control-indian-trail" },
      { title: "Gonzaga District", url: "/locations/spokane/pest-control-gonzaga-district" },
      { title: "West Central", url: "/locations/spokane/pest-control-west-central" },
      { title: "Logan", url: "/locations/spokane/pest-control-logan" },
      { title: "Shadle Park", url: "/locations/spokane/pest-control-shadle-park" },
    ]
  }
];

export const ServiceDirectory: React.FC = () => {
  return (
    <section className="bg-slate-900 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-800 text-brand-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-slate-700">
            <Globe size={14} />
            <span>Sitemap & Coverage</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Explore Our Services & Locations</h2>
          <p className="text-slate-400 mt-2 max-w-2xl mx-auto text-sm">
            Comprehensive pest management solutions designed for your specific needs and neighborhood.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {DIRECTORY_DATA.map((section, idx) => (
            <div key={idx} className="group">
              <div className="flex items-center gap-3 mb-4 pb-2 border-b border-slate-800 group-hover:border-brand-500/50 transition-colors">
                <div className="p-2 rounded-lg bg-slate-800 text-slate-400 group-hover:bg-brand-900/50 group-hover:text-brand-400 transition-all duration-300">
                  {section.icon}
                </div>
                <h3 className="font-bold text-slate-200 text-sm uppercase tracking-wide">
                  {section.category}
                </h3>
              </div>

              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.url}
                      className="flex items-start gap-2 text-sm text-slate-500 hover:text-brand-400 transition-colors group/link py-0.5"
                    >
                      <ChevronRight className="w-3.5 h-3.5 mt-1 text-slate-700 group-hover/link:text-brand-500 transition-colors shrink-0" />
                      <span className="leading-snug">{link.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-wrap justify-center gap-6 text-sm text-slate-600">
          <span>Licensed</span>
          <span className="w-1 h-1 rounded-full bg-slate-700 my-auto"></span>
          <span>Bonded</span>
          <span className="w-1 h-1 rounded-full bg-slate-700 my-auto"></span>
          <span>Insured</span>
          <span className="w-1 h-1 rounded-full bg-slate-700 my-auto"></span>
          <span>Family Owned</span>
        </div>
      </div>
    </section>
  );
};
