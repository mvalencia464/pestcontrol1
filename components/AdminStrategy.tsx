import React from 'react';
import { 
  LayoutDashboard, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Globe,
  MapPin,
  FileText
} from 'lucide-react';

const LOGO_URL = "https://storage.googleapis.com/msgsndr/msNpSAiDTJsqQYSSyPVB/media/69364a8fe0f092c5843f35be.webp";

// Core 30 Strategy Data derived from CSV
const STRATEGY_DATA = [
  {
    group: "Layer 1: Homepage",
    items: [
      { title: "Pest Control Spokane WA", url: "/", status: "Pending" }
    ]
  },
  {
    group: "Layer 2: General Pest Control",
    items: [
      { title: "General Pest Control Spokane WA", url: "/general-pest-control", status: "Pending", type: "Category" },
      { title: "Residential Pest Control Spokane WA", url: "/general-pest-control/residential", status: "Pending", type: "Service" },
      { title: "Pest Inspection Spokane WA", url: "/general-pest-control/inspection", status: "Pending", type: "Service" },
      { title: "Pest Prevention Spokane WA", url: "/general-pest-control/prevention", status: "Pending", type: "Service" },
      { title: "Exterior Pest Treatment Spokane WA", url: "/general-pest-control/exterior-treatment", status: "Pending", type: "Service" },
      { title: "Bed Bug Extermination Spokane WA", url: "/general-pest-control/bed-bug-extermination", status: "Pending", type: "Service" },
      { title: "Ant Control Spokane WA", url: "/general-pest-control/ant-control", status: "Pending", type: "Service" },
      { title: "Spider Control Spokane WA", url: "/general-pest-control/spider-control", status: "Pending", type: "Service" },
      { title: "Cockroach Extermination Spokane WA", url: "/general-pest-control/cockroach-extermination", status: "Pending", type: "Service" },
      { title: "Flea & Tick Treatment Spokane WA", url: "/general-pest-control/flea-tick-treatment", status: "Pending", type: "Service" },
      { title: "Mosquito Control Spokane WA", url: "/general-pest-control/mosquito-control", status: "Pending", type: "Service" },
      { title: "Wasp & Bee Removal Spokane WA", url: "/general-pest-control/wasp-bee-removal", status: "Pending", type: "Service" },
      { title: "Recurring Pest Service Spokane WA", url: "/general-pest-control/recurring-service", status: "Pending", type: "Service" },
      { title: "Pest Proofing Spokane WA", url: "/general-pest-control/proofing", status: "Pending", type: "Service" },
      { title: "Seasonal Pest Treatment Spokane WA", url: "/general-pest-control/seasonal-treatment", status: "Pending", type: "Service" },
    ]
  },
  {
    group: "Layer 2: Rodent & Wildlife",
    items: [
      { title: "Rodent and Wildlife Control Spokane WA", url: "/rodent-wildlife-control", status: "Pending", type: "Category" },
      { title: "Mouse Extermination Spokane WA", url: "/rodent-wildlife-control/mouse-extermination", status: "Pending", type: "Service" },
      { title: "Rat Extermination Spokane WA", url: "/rodent-wildlife-control/rat-extermination", status: "Pending", type: "Service" },
      { title: "Squirrel Removal Spokane WA", url: "/rodent-wildlife-control/squirrel-removal", status: "Pending", type: "Service" },
      { title: "Wildlife Exclusion Spokane WA", url: "/rodent-wildlife-control/wildlife-exclusion", status: "Pending", type: "Service" },
      { title: "Gopher Control Spokane WA", url: "/rodent-wildlife-control/gopher-control", status: "Pending", type: "Service" },
      { title: "Mole Control Spokane WA", url: "/rodent-wildlife-control/mole-control", status: "Pending", type: "Service" },
      { title: "Dead Animal Removal Spokane WA", url: "/rodent-wildlife-control/dead-animal-removal", status: "Pending", type: "Service" },
      { title: "Bird Control Spokane WA", url: "/rodent-wildlife-control/bird-control", status: "Pending", type: "Service" },
    ]
  },
  {
    group: "Layer 2: Termite Control",
    items: [
      { title: "Termite Control Spokane WA", url: "/termite-control", status: "Pending", type: "Category" },
      { title: "Termite Inspection Spokane WA", url: "/termite-control/inspection", status: "Pending", type: "Service" },
      { title: "Subterranean Termite Treatment Spokane WA", url: "/termite-control/subterranean-treatment", status: "Pending", type: "Service" },
      { title: "Termite Bait Systems Spokane WA", url: "/termite-control/bait-systems", status: "Pending", type: "Service" },
      { title: "Liquid Termite Barriers Spokane WA", url: "/termite-control/liquid-barriers", status: "Pending", type: "Service" },
      { title: "Termite Prevention Spokane WA", url: "/termite-control/prevention", status: "Pending", type: "Service" },
      { title: "Pre-Construction Termite Treatment Spokane WA", url: "/termite-control/pre-construction-treatment", status: "Pending", type: "Service" },
    ]
  },
  {
    group: "Layer 2: Commercial Services",
    items: [
      { title: "Commercial Pest Control Spokane WA", url: "/commercial-pest-control", status: "Pending", type: "Category" },
      { title: "Restaurant Pest Control Spokane WA", url: "/commercial-pest-control/restaurant", status: "Pending", type: "Service" },
      { title: "Office Building Pest Control Spokane WA", url: "/commercial-pest-control/office-building", status: "Pending", type: "Service" },
      { title: "Warehouse Pest Control Spokane WA", url: "/commercial-pest-control/warehouse", status: "Pending", type: "Service" },
      { title: "Food Processing Plant Pest Control Spokane WA", url: "/commercial-pest-control/food-processing-plant", status: "Pending", type: "Service" },
      { title: "Custom Commercial Pest Plans Spokane WA", url: "/commercial-pest-control/custom-plans", status: "Pending", type: "Service" },
      { title: "Commercial Rodent Control Programs Spokane WA", url: "/commercial-pest-control/rodent-programs", status: "Pending", type: "Service" },
      { title: "Commercial Insect Management Programs Spokane WA", url: "/commercial-pest-control/insect-programs", status: "Pending", type: "Service" },
      { title: "IPM for Businesses Spokane WA", url: "/commercial-pest-control/ipm-businesses", status: "Pending", type: "Service" },
      { title: "Ongoing Commercial Service Agreements Spokane WA", url: "/commercial-pest-control/ongoing-agreements", status: "Pending", type: "Service" },
    ]
  },
  {
    group: "Layer 2: Eco-Friendly",
    items: [
      { title: "Eco-Friendly Pest Control Spokane WA", url: "/eco-friendly-pest-control", status: "Pending", type: "Category" },
      { title: "Organic Pest Control Spokane WA", url: "/eco-friendly-pest-control/organic", status: "Pending", type: "Service" },
      { title: "Green Pest Management Spokane WA", url: "/eco-friendly-pest-control/green", status: "Pending", type: "Service" },
      { title: "Pet-Friendly Pest Control Spokane WA", url: "/eco-friendly-pest-control/pet-friendly", status: "Pending", type: "Service" },
      { title: "Non-Toxic Pest Solutions Spokane WA", url: "/eco-friendly-pest-control/non-toxic-solutions", status: "Pending", type: "Service" },
      { title: "Bed Bug Heat Treatment Spokane WA", url: "/eco-friendly-pest-control/bed-bug-heat-treatment", status: "Pending", type: "Service" },
      { title: "Fumigation Services Spokane WA", url: "/eco-friendly-pest-control/fumigation-services", status: "Pending", type: "Service" },
      { title: "Odor Control Spokane WA", url: "/eco-friendly-pest-control/odor-control", status: "Pending", type: "Service" },
      { title: "Crawl Space Pest Control Spokane WA", url: "/eco-friendly-pest-control/crawl-space-control", status: "Pending", type: "Service" },
      { title: "Attic Pest Control Spokane WA", url: "/eco-friendly-pest-control/attic-control", status: "Pending", type: "Service" },
    ]
  },
  {
    group: "Geo-Relevance: Local Neighborhoods",
    items: [
      { title: "Pest Control Downtown Spokane", url: "/locations/spokane/pest-control-downtown-spokane", status: "Pending", type: "Location" },
      { title: "Pest Control South Hill Spokane", url: "/locations/spokane/pest-control-south-hill", status: "Pending", type: "Location" },
      { title: "Pest Control Browne's Addition Spokane", url: "/locations/spokane/pest-control-brownes-addition", status: "Pending", type: "Location" },
      { title: "Pest Control Manito/Cannon Hill Spokane", url: "/locations/spokane/pest-control-manito-cannon-hill", status: "Pending", type: "Location" },
      { title: "Pest Control Audubon/Downriver Spokane", url: "/locations/spokane/pest-control-audubon-downriver", status: "Pending", type: "Location" },
      { title: "Pest Control Indian Trail Spokane", url: "/locations/spokane/pest-control-indian-trail", status: "Pending", type: "Location" },
      { title: "Pest Control Gonzaga District Spokane", url: "/locations/spokane/pest-control-gonzaga-district", status: "Pending", type: "Location" },
      { title: "Pest Control West Central Spokane", url: "/locations/spokane/pest-control-west-central", status: "Pending", type: "Location" },
      { title: "Pest Control Logan Spokane", url: "/locations/spokane/pest-control-logan", status: "Pending", type: "Location" },
      { title: "Pest Control Shadle Park Spokane", url: "/locations/spokane/pest-control-shadle-park", status: "Pending", type: "Location" },
    ]
  }
];

export const AdminStrategy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-900">
      
      {/* Sidebar / Topbar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <a href="/">
               <img src={LOGO_URL} alt="Freedom Pest Control" className="h-10 w-auto" />
             </a>
             <div className="h-6 w-px bg-gray-200"></div>
             <div className="flex items-center gap-2 text-slate-500 font-medium">
               <LayoutDashboard size={18} />
               <span>Strategy Dashboard</span>
             </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm font-medium text-gray-500 hover:text-brand-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              View Site
            </a>
            <div className="text-right hidden sm:block">
               <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Strategy</div>
               <div className="text-sm font-bold text-brand-600">Core 30 SEO Plan</div>
            </div>
            <div className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center text-brand-700 font-bold border border-brand-100">
              JW
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Total Target Pages</p>
              <h3 className="text-3xl font-black text-slate-900">65</h3>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
              <FileText size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Content Status</p>
              <h3 className="text-3xl font-black text-yellow-500">Pending</h3>
            </div>
            <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-lg flex items-center justify-center">
              <Clock size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Target Locations</p>
              <h3 className="text-3xl font-black text-green-600">10</h3>
            </div>
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
              <MapPin size={24} />
            </div>
          </div>
        </div>

        {/* Strategy Table */}
        <div className="space-y-8">
          {STRATEGY_DATA.map((group, groupIdx) => (
            <div key={groupIdx} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                   {group.group.includes('Homepage') && <Globe size={18} className="text-brand-500" />}
                   {group.group.includes('Layer 2') && <FileText size={18} className="text-brand-500" />}
                   {group.group.includes('Geo') && <MapPin size={18} className="text-brand-500" />}
                   {group.group}
                </h3>
                <span className="text-xs font-semibold bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-500">
                  {group.items.length} Pages
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white border-b border-gray-100 text-xs uppercase tracking-wider text-gray-400 font-semibold">
                    <tr>
                      <th className="px-6 py-4 w-1/3">Target Keyword / Title</th>
                      <th className="px-6 py-4 w-1/4">Permalink Structure</th>
                      <th className="px-6 py-4 w-1/3">Planned Assets</th>
                      <th className="px-6 py-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {group.items.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-800 text-sm mb-1">{item.title}</div>
                          {item.type && (
                            <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                              {item.type}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <a href={item.url} className="group/link flex items-center gap-2 text-sm text-brand-600 hover:text-brand-800 font-medium font-mono bg-blue-50/50 px-3 py-1.5 rounded border border-blue-100/50 w-fit">
                            <LinkIcon size={12} className="opacity-50 group-hover/link:opacity-100" />
                            {item.url}
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-3">
                             {/* Placeholder Assets */}
                             <div className="w-16 h-10 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-gray-300 hover:border-brand-300 hover:bg-white transition-all cursor-help" title="Hero Image">
                               <ImageIcon size={14} />
                             </div>
                             <div className="w-10 h-10 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-gray-300 hover:border-brand-300 hover:bg-white transition-all cursor-help" title="Content Image">
                               <FileText size={14} />
                             </div>
                             <div className="w-10 h-10 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-gray-300 hover:border-brand-300 hover:bg-white transition-all cursor-help" title="Infographic/Map">
                               <MapPin size={14} />
                             </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-yellow-50 text-yellow-600 border border-yellow-100">
                             <Clock size={12} />
                             Pending
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};