import React, { useRef, useState } from 'react';
import { Phone, CheckCircle, MapPin, Clock, Shield, Star, Menu, X, ArrowDown, Quote, MousePointerClick, Globe } from 'lucide-react';
import { QuoteForm } from './components/QuoteForm';
import { TrustBadges } from './components/TrustBadges';
import StickyMobileCTA from './components/StickyMobileCTA';
import { BugIdentifier } from './components/BugIdentifier';
import { ReviewsSection } from './components/ReviewsSection';
import { HeroReviews } from './components/HeroReviews';
import { Modal } from './components/Modal';
import { ServiceDirectory } from './components/ServiceDirectory';

// Placeholder images
const HERO_BG = "https://storage.googleapis.com/msgsndr/msNpSAiDTJsqQYSSyPVB/media/69364a0981eaa15ae521fe2a.webp";
const LOGO_URL = "https://storage.googleapis.com/msgsndr/msNpSAiDTJsqQYSSyPVB/media/69364a8fe0f092c5843f35be.webp";
const JORDAN_WEBB_IMG = "https://storage.googleapis.com/msgsndr/msNpSAiDTJsqQYSSyPVB/media/69364de481eaa13838227b96.webp";

const PEST_ICONS: Record<string, string> = {
  'Ants': 'https://storage.googleapis.com/msgsndr/msNpSAiDTJsqQYSSyPVB/media/693633b41d466e26e349a354.svg',
  'Spiders': 'https://storage.googleapis.com/msgsndr/msNpSAiDTJsqQYSSyPVB/media/693633b41d466eaa1749a356.svg',
  'Rodents': 'https://storage.googleapis.com/msgsndr/msNpSAiDTJsqQYSSyPVB/media/693633b4ec99b32a1a0f6d2e.svg',
  'Roaches': 'https://storage.googleapis.com/msgsndr/msNpSAiDTJsqQYSSyPVB/media/693633b4e0f0922c933c090d.svg',
  'Mosquitoes': 'https://storage.googleapis.com/msgsndr/msNpSAiDTJsqQYSSyPVB/media/693633b41d466e76c249a355.svg',
  'Termites': 'https://storage.googleapis.com/msgsndr/msNpSAiDTJsqQYSSyPVB/media/693633b4e6551ce92df856a0.svg',
  'Bed Bugs': 'https://storage.googleapis.com/msgsndr/msNpSAiDTJsqQYSSyPVB/media/693633b481eaa18a4c1eda28.svg',
  'Wasps': 'https://storage.googleapis.com/msgsndr/msNpSAiDTJsqQYSSyPVB/media/693633b4ec99b357eb0f6d2a.svg',
};

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const quoteSectionRef = useRef<HTMLDivElement>(null);

  const scrollToQuote = () => {
    // If mobile or if directed, we could open modal instead. 
    // But keeping scroll for main "Get Quote" buttons for now, 
    // and using Modal for the extra CTA sprinkles.
    quoteSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const openQuoteModal = () => setIsQuoteModalOpen(true);

  return (
    <div className="font-sans text-gray-900 bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 md:py-3">
            <div className="flex items-center gap-2">
              <img src={LOGO_URL} alt="Freedom Pest Control" className="h-14 md:h-16 w-auto" />
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-sm font-medium text-gray-600 hover:text-brand-600">Services</a>
              <a href="#tool" className="text-sm font-medium text-gray-600 hover:text-brand-600">Bug ID Tool</a>
              <a href="#process" className="text-sm font-medium text-gray-600 hover:text-brand-600">How It Works</a>
              <a href="#reviews" className="text-sm font-medium text-gray-600 hover:text-brand-600">Reviews</a>
              <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                <a
                  href="tel:+15550123456"
                  className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-lg font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <Phone size={18} fill="currentColor" /> 555-012-3456
                </a>
              </div>
            </div>

            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white absolute w-full shadow-xl">
            <div className="px-4 pt-2 pb-6 space-y-1">
              <a href="#services" className="block px-3 py-4 text-base font-medium text-gray-700 border-b border-gray-50" onClick={() => setMobileMenuOpen(false)}>Services</a>
              <a href="#tool" className="block px-3 py-4 text-base font-medium text-gray-700 border-b border-gray-50" onClick={() => setMobileMenuOpen(false)}>Bug ID Tool</a>
              <a href="#process" className="block px-3 py-4 text-base font-medium text-gray-700 border-b border-gray-50" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
              <a href="#reviews" className="block px-3 py-4 text-base font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative pt-10 pb-20 lg:pt-20 lg:pb-32 overflow-hidden min-h-[600px] flex items-center">
        {/* Hero Background with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_BG}
            alt="Pest Control Technician"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <HeroReviews />

              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur border border-brand-100 px-3 py-1 rounded-full text-brand-700 text-sm font-semibold mb-6 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                </span>
                Same & Next-Day Service Available
              </div>

              <h1 className="text-4xl lg:text-7xl font-black text-slate-900 tracking-tighter mb-6 leading-[1.1]">
                Fast, Safe Pest Control <br className="hidden lg:block" />in <span className="text-brand-600 decoration-4 decoration-brand-200 underline-offset-4">Your City</span>.
              </h1>

              <p className="text-lg text-slate-800 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Don't let pests take over your home. We provide hospital-grade, family-friendly treatments that eliminate the problem at the source.
              </p>

              <div className="flex justify-center lg:justify-start mb-10">
                <TrustBadges />
              </div>

              <div className="hidden lg:flex gap-6 text-sm text-slate-600 font-bold">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-brand-500 w-5 h-5" /> No Contracts Required
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-brand-500 w-5 h-5" /> 100% Money-Back Guarantee
                </div>
              </div>
            </div>

            {/* Quote Form Container */}
            <div ref={quoteSectionRef} className="relative w-full max-w-md mx-auto lg:max-w-full lg:ml-auto">
              <QuoteForm />
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Logo Cloud */}
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Certified, Licensed & Trusted By</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Text placeholders for logos to simulate branding */}
            <span className="text-xl font-black text-slate-800">NPMA</span>
            <span className="text-xl font-black text-slate-800">QualityPro</span>
            <span className="text-xl font-black text-slate-800">EcoWise</span>
            <span className="text-xl font-black text-slate-800">Sentricon</span>
            <span className="text-xl font-black text-slate-800">Angi</span>
          </div>
        </div>
      </div>

      {/* Common Pests Grid */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">What We Treat</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {['Ants', 'Spiders', 'Rodents', 'Roaches', 'Mosquitoes', 'Termites', 'Bed Bugs', 'Wasps'].map((pest) => (
              <div key={pest} className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow group cursor-default border border-gray-100">
                <div className="w-16 h-16 bg-gray-50 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-brand-50 transition-colors p-3">
                  {PEST_ICONS[pest] ? (
                    <img src={PEST_ICONS[pest]} alt={pest} className="w-full h-full object-contain" />
                  ) : (
                    <Shield className="w-8 h-8 text-gray-400 group-hover:text-brand-600" />
                  )}
                </div>
                <h4 className="font-bold text-gray-900">{pest}</h4>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={openQuoteModal}
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <MousePointerClick size={18} /> Get A Free Quote For Your Pest
            </button>
            <p className="mt-3 text-sm text-gray-500">Don't see your bug? We handle 50+ species. Ask us!</p>
          </div>
        </div>
      </section>

      {/* AI Tool Section */}
      <section id="tool" className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand-500 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-500 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                New Free Tool
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Not sure what crawled out?</h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Use our AI-powered pest identifier. Upload a photo, and our system will instantly identify the bug, tell you if it's dangerous, and give you local prevention tips.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-lg">
                    <Shield className="w-5 h-5 text-brand-400" />
                  </div>
                  <span className="font-medium">Instant identification & danger analysis</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-brand-400" />
                  </div>
                  <span className="font-medium">Local insights based on your region</span>
                </li>
              </ul>
            </div>

            <div className="relative">
              <BugIdentifier onQuoteClick={scrollToQuote} />
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="process" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Pest-Free in 3 Simple Steps</h2>
            <p className="text-gray-600 text-lg">We've removed the friction. No 4-hour appointment windows, no confusing contracts.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 relative mb-12">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>

            <div className="relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-slate-900 text-white rounded-xl flex items-center justify-center text-xl font-bold mb-6 shadow-lg shadow-slate-200">1</div>
              <h3 className="text-xl font-bold mb-3">Instant Quote & Schedule</h3>
              <p className="text-gray-600 leading-relaxed">Fill out the form above. We'll call you within 15 minutes to confirm the pest type and book a tech.</p>
            </div>

            <div className="relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-brand-600 text-white rounded-xl flex items-center justify-center text-xl font-bold mb-6 shadow-lg shadow-brand-200">2</div>
              <h3 className="text-xl font-bold mb-3">Targeted Treatment</h3>
              <p className="text-gray-600 leading-relaxed">Our licensed local tech arrives on time, inspects the source, and applies pet-safe treatments.</p>
            </div>

            <div className="relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-white border-2 border-brand-500 text-brand-600 rounded-xl flex items-center justify-center text-xl font-bold mb-6">3</div>
              <h3 className="text-xl font-bold mb-3">Problem Solved</h3>
              <p className="text-gray-600 leading-relaxed">We monitor the situation. If pests return between scheduled visits, we re-treat for free.</p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={openQuoteModal}
              className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Start My Quote Now
            </button>
          </div>
        </div>
      </section>

      {/* About Us / Trust & Local Section */}
      <section className="py-20 bg-white overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Text Content */}
            <div>
              <div className="flex items-center gap-2 text-brand-600 font-bold mb-4 uppercase tracking-wider text-sm">
                <MapPin size={18} /> Locally Owned & Operated
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">Your Neighbor, Your Exterminator</h2>

              <div className="prose prose-lg text-gray-600 mb-8 leading-relaxed">
                <p className="font-medium text-gray-900">
                  Hi, I'm Jordan Webb, and I was born and raised right here in our community. Freedom Pest Control isn't just a business to me—it's my way of serving the neighbors I've known my whole life.
                </p>
                <p>
                  I started this company to do things the old-fashioned way. In a world of big sales teams, fancy offices, and endless middlemen designed to make you overpay, we stand for something different.
                </p>
                <p>
                  We believe in honest work, quality service, and affordable prices. When you call us, you get me. Not a pushy sales rep, just a local expert who will listen to your needs and give you a fair, transparent quote personally.
                </p>
              </div>

              <div className="bg-brand-50 p-6 rounded-2xl border border-brand-100 mb-8 relative">
                <Quote className="absolute top-4 left-4 w-8 h-8 text-brand-200 -z-0" />
                <p className="relative z-10 text-brand-900 font-medium italic">
                  "Quality work doesn't just meet expectations—it exceeds them. When you care about every detail, it shows. That commitment doesn't go unnoticed."
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <div className="font-black text-slate-900 text-lg font-serif">Jordan Webb</div>
                  <div className="text-sm text-brand-600 font-bold uppercase tracking-wide">Owner & Operator</div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-brand-600 rounded-3xl rotate-3 translate-x-2 translate-y-2 opacity-10"></div>
              <img
                src={JORDAN_WEBB_IMG}
                alt="Jordan Webb - Owner"
                className="relative z-10 rounded-3xl shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500 border-4 border-white object-cover object-[75%_center] aspect-[4/5] w-full max-w-md mx-auto"
              />

              {/* Stats Overlay */}
              <div className="absolute bottom-8 -left-4 z-20 bg-white p-4 rounded-xl shadow-lg border border-gray-100 hidden md:block animate-in slide-in-from-bottom duration-1000">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle size={24} className="text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900">100%</div>
                    <div className="text-xs font-bold text-gray-500 uppercase">Local Guarantee</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <div className="relative">
        <ReviewsSection />
        <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none">
          <button
            onClick={openQuoteModal}
            className="pointer-events-auto bg-white/90 backdrop-blur text-slate-900 border border-slate-200 px-6 py-2 rounded-full font-bold shadow-lg hover:bg-white hover:scale-105 transition-all text-sm"
          >
            Join 500+ Happy Neighbors Today
          </button>
        </div>
      </div>

      {/* Service Area Map & CPA */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <div className="text-left">
              <div className="inline-flex items-center gap-2 bg-brand-900/50 border border-brand-700/50 text-brand-400 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                <MapPin size={16} />
                <span>Serving Spokane & Beyond</span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                We're In Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-200">Neighborhood</span>
              </h2>

              <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-lg">
                Our technicians are locally stationed across the county, meaning we can get to your home faster.
                <br /><br />
                <span className="text-white font-bold">Don't wait for an out-of-town crew.</span> Call the local team that knows your specific pest pressures.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={openQuoteModal}
                  className="bg-brand-600 hover:bg-brand-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-brand-900/20 transition-all transform hover:-translate-y-1 text-lg flex items-center justify-center gap-2"
                >
                  <MapPin size={20} /> Check Availability
                </button>
                <a
                  href="tel:+15550123456"
                  className="px-8 py-4 rounded-xl font-bold text-white border border-slate-700 hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                >
                  <Phone size={20} /> 555-012-3456
                </a>
              </div>
            </div>

            {/* Right Map Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-800">
                <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur text-slate-900 px-4 py-2 rounded-lg text-xs font-bold shadow-lg flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  Techs Active Now
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31772.448033434655!2d-117.12631118444229!3d47.65143396872218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549e185c30bbe7e5%3A0xddfcc9d60b84d9b1!2sSpokane%2C%20WA!5e0!3m2!1sen!2sus!4v1765161972160!5m2!1sen!2sus"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Service Directory */}
      <ServiceDirectory />

      {/* Footer */}
      <footer className="bg-slate-950 pt-20 pb-10 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">

            {/* Brand Column */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <img src={LOGO_URL} alt="Freedom Pest Control" className="h-10 w-auto brightness-0 invert opacity-90" />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-8">
                We are a locally owned, family-operated pest control company dedicated to keeping homes safe, healthy, and pest-free. We don't just kill bugs; we give you your freedom back.
              </p>
              <div className="flex gap-4">
                {/* Social Placeholders */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-brand-600 hover:text-white transition-all cursor-pointer">
                    <Globe size={16} />
                  </div>
                ))}
              </div>
            </div>

            {/* Links Column */}
            <div>
              <h5 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Company</h5>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><a href="#" className="hover:text-brand-400 transition-colors">Home</a></li>
                <li><a href="#services" className="hover:text-brand-400 transition-colors">Services</a></li>
                <li><a href="#process" className="hover:text-brand-400 transition-colors">How It Works</a></li>
                <li><a href="#reviews" className="hover:text-brand-400 transition-colors">Reviews</a></li>
                <li><a href="#tool" className="hover:text-brand-400 transition-colors">Bug ID Tool</a></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h5 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Contact Us</h5>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex items-start gap-3">
                  <Phone size={18} className="text-brand-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-medium">Phone</div>
                    <a href="tel:5550123456" className="hover:text-brand-400 transition-colors">555-012-3456</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={18} className="text-brand-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-medium">Hours</div>
                    <span>Mon-Sat: 8am - 6pm</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-brand-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-medium">Service Area</div>
                    <span>Spokane, WA & Surrounding</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-500 text-xs">
              © {new Date().getFullYear()} Freedom Pest Control. All rights reserved.
            </div>
            <div className="flex gap-6 text-xs text-slate-500 font-medium">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="?admin=true" className="hover:text-white transition-colors">Admin Login</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Action Bar */}
      <StickyMobileCTA onQuoteClick={openQuoteModal} />

      {/* Global Quote Modal */}
      <Modal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)}>
        <QuoteForm />
      </Modal>
    </div>
  );
};

export default App;