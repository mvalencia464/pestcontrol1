import React, { useState, useEffect, useRef } from 'react';
import { QuoteFormData, PestType, UrgencyLevel, PestIdentificationResult } from '../types';
import { ArrowRight, Check, MapPin, Home, Building2, Loader2, Sparkles, ScanLine, AlertCircle } from 'lucide-react';
import { getPestReassuranceTip, identifyPest } from '../services/geminiService';
import TurnstileWidget from './TurnstileWidget';

// External SVG Icons
const PEST_ICONS_URLS: Record<string, string> = {
  'Ants': 'https://storage.googleapis.com/msgsndr/msNpSAiDTJsqQYSSyPVB/media/693633b41d466e26e349a354.svg',
  'Roaches': 'https://storage.googleapis.com/msgsndr/msNpSAiDTJsqQYSSyPVB/media/693633b4e0f0922c933c090d.svg',
  'Rodents': 'https://storage.googleapis.com/msgsndr/msNpSAiDTJsqQYSSyPVB/media/693633b4ec99b32a1a0f6d2e.svg',
  'Termites': 'https://storage.googleapis.com/msgsndr/msNpSAiDTJsqQYSSyPVB/media/693633b4e6551ce92df856a0.svg',
  'Bed Bugs': 'https://storage.googleapis.com/msgsndr/msNpSAiDTJsqQYSSyPVB/media/693633b481eaa18a4c1eda28.svg',
  'Mosquitoes': 'https://storage.googleapis.com/msgsndr/msNpSAiDTJsqQYSSyPVB/media/693633b41d466e76c249a355.svg',
  'Spiders': 'https://storage.googleapis.com/msgsndr/msNpSAiDTJsqQYSSyPVB/media/693633b41d466eaa1749a356.svg',
};

const PEST_OPTIONS: { type: PestType; label?: string; isSpecial?: boolean }[] = [
  { type: 'Ants' },
  { type: 'Roaches' },
  { type: 'Rodents' },
  { type: 'Termites' },
  { type: 'Bed Bugs' },
  { type: 'Mosquitoes' },
  { type: 'Spiders' },
  // Special "Not Sure" option that replaces "Other"
  { type: 'Other', label: 'Not Sure? Scan It', isSpecial: true },
];

const URGENCY_OPTIONS: UrgencyLevel[] = ['Today', 'Next 2-3 Days', 'Just Planning'];

export const QuoteForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [tip, setTip] = useState<string>('');
  const [loadingTip, setLoadingTip] = useState(false);

  // AI Scanning States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<QuoteFormData>({
    pestType: null,
    urgency: null,
    zipCode: '',
    isCommercial: false,
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });
  const [hasConsented, setHasConsented] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState('');

  // Fetch AI reassurance tip when pest type changes
  useEffect(() => {
    if (formData.pestType && step === 2) {
      setLoadingTip(true);
      getPestReassuranceTip(formData.pestType).then(result => {
        setTip(result);
        setLoadingTip(false);
      });
    }
  }, [formData.pestType, step]);

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const updateField = <K extends keyof QuoteFormData>(key: K, value: QuoteFormData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleScanClick = () => {
    fileInputRef.current?.click();
  };

  const mapAiResultToPestType = (aiName: string): PestType => {
    const lowerName = aiName.toLowerCase();
    if (lowerName.includes('ant')) return 'Ants';
    if (lowerName.includes('roach') || lowerName.includes('cockroach')) return 'Roaches';
    if (lowerName.includes('mouse') || lowerName.includes('rat') || lowerName.includes('rodent')) return 'Rodents';
    if (lowerName.includes('termite')) return 'Termites';
    if (lowerName.includes('bed bug') || lowerName.includes('cimex')) return 'Bed Bugs';
    if (lowerName.includes('mosquito')) return 'Mosquitoes';
    if (lowerName.includes('spider') || lowerName.includes('arachnid')) return 'Spiders';
    return 'Other';
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    setScanError(null);

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];

        // Call Gemini Service
        const result = await identifyPest(base64Data);

        // Auto-select category based on AI result
        const mappedType = mapAiResultToPestType(result.name);

        setFormData(prev => ({
          ...prev,
          pestType: mappedType,
          identifiedPestDetails: result
        }));

        // Move to next step automatically
        handleNext();
      } catch (err) {
        console.error(err);
        setScanError("Couldn't identify image. Please select manually.");
        // Don't move to next step, let them select manually
      } finally {
        setIsAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasConsented) return;

    if (!turnstileToken) {
      setTurnstileError('Please complete the security check.');
      return;
    }

    // TODO: Send to backend with turnstileToken in payload
    // const payload = { ...formData, 'cf-turnstile-response': turnstileToken };

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md mx-auto border-t-4 border-brand-500 animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check size={32} strokeWidth={3} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Received!</h3>
        <p className="text-gray-600 mb-6">
          Thanks {formData.firstName}. A specialist is analyzing your request for <strong>{formData.identifiedPestDetails ? formData.identifiedPestDetails.name : formData.pestType}</strong> control.
        </p>
        <div className="bg-gray-50 rounded-xl p-4 text-left text-sm text-gray-700 space-y-2 mb-6">
          <p className="font-semibold text-gray-900">What happens next:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Our local tech will call you within 10-15 mins.</li>
            <li>We'll confirm details and give you an exact price.</li>
            <li>Same-day service availability will be checked.</li>
          </ul>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="text-brand-600 font-semibold hover:text-brand-700 hover:underline"
        >
          Start a new quote
        </button>
      </div>
    );
  }

  return (
    <div id="quote-form" className="bg-white rounded-2xl shadow-2xl shadow-brand-900/10 overflow-hidden max-w-lg mx-auto border border-brand-100 ring-1 ring-brand-100/50 relative transform hover:scale-[1.01] transition-transform duration-500">

      {/* Hidden File Input for Scanner */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Loading Overlay */}
      {isAnalyzing && (
        <div className="absolute inset-0 z-50 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 animate-in fade-in">
          <Loader2 className="w-12 h-12 text-brand-600 animate-spin mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Identifying Pest...</h3>
          <p className="text-gray-500 text-sm">Our AI is analyzing your photo to match it with local species.</p>
        </div>
      )}

      {/* Header & Progress */}
      <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Step {step} of 3</span>
        <div className="w-1/3 bg-gray-200 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-brand-500 h-full transition-all duration-500 ease-out rounded-full"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="p-6 md:p-8">

        {/* Step 1: Pest Type */}
        {step === 1 && (
          <div className="animate-in slide-in-from-right duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-1">What are you dealing with?</h3>
            <p className="text-sm text-gray-500 mb-6">Select the main pest causing issues.</p>

            {scanError && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                <AlertCircle size={16} /> {scanError}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 mb-6">
              {PEST_OPTIONS.map((pest) => (
                <button
                  key={pest.type}
                  onClick={() => {
                    if (pest.isSpecial) {
                      handleScanClick();
                    } else {
                      updateField('pestType', pest.type);
                      // Clear any previous AI data if they manually switch
                      updateField('identifiedPestDetails', undefined);
                      handleNext();
                    }
                  }}
                  className={`p-4 rounded-xl border text-left transition-all hover:shadow-md flex flex-col items-center gap-2 justify-center relative overflow-hidden group
                    ${formData.pestType === pest.type
                      ? 'border-brand-500 bg-brand-50 text-brand-700 ring-1 ring-brand-500'
                      : pest.isSpecial
                        ? 'border-brand-200 bg-brand-50/50 hover:bg-brand-100 text-brand-800'
                        : 'border-gray-200 hover:border-brand-300 text-gray-700 bg-white'}`}
                >
                  {pest.isSpecial && (
                    <div className="absolute top-0 right-0 bg-brand-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
                      AI TOOL
                    </div>
                  )}
                  <div className={`transition-transform duration-300 ${formData.pestType === pest.type ? 'scale-110' : pest.isSpecial ? 'text-brand-600' : 'group-hover:scale-110'}`}>
                    {pest.isSpecial ? (
                      <ScanLine className="w-8 h-8" />
                    ) : (
                      <img
                        src={PEST_ICONS_URLS[pest.type]}
                        alt={pest.type}
                        className="w-10 h-10 object-contain"
                      />
                    )}
                  </div>
                  <span className="font-medium text-sm text-center leading-tight">
                    {pest.label || pest.type}
                  </span>
                </button>
              ))}
            </div>
            <div className="text-center">
              <button
                onClick={() => {
                  updateField('pestType', 'Other');
                  updateField('identifiedPestDetails', undefined);
                  handleNext();
                }}
                className="text-xs text-gray-400 hover:text-gray-600 underline"
              >
                Skip AI, just select "Other"
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Property & Urgency */}
        {step === 2 && (
          <div className="animate-in slide-in-from-right duration-300">
            <button onClick={handleBack} className="text-xs text-gray-400 hover:text-gray-600 mb-2 uppercase tracking-wide font-bold">
              &larr; Back
            </button>

            {/* AI Identification Success Banner */}
            {formData.identifiedPestDetails && (
              <div className="mb-6 bg-green-50 border border-green-200 p-4 rounded-xl flex gap-3 animate-in fade-in slide-in-from-top-4">
                <div className="bg-green-100 p-2 rounded-full h-fit">
                  <ScanLine className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <p className="text-xs font-bold text-green-800 uppercase tracking-wide mb-1">AI Identification Match</p>
                  <p className="font-bold text-gray-900">{formData.identifiedPestDetails.name}</p>
                  <p className="text-sm text-gray-600 mt-1">{formData.identifiedPestDetails.description.substring(0, 60)}...</p>
                </div>
              </div>
            )}

            <h3 className="text-xl font-bold text-gray-900 mb-4">Property & Urgency</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">How soon do you need us?</label>
                <div className="grid grid-cols-1 gap-2">
                  {URGENCY_OPTIONS.map((level) => (
                    <label key={level} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all
                      ${formData.urgency === level ? 'border-brand-500 bg-brand-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input
                        type="radio"
                        name="urgency"
                        className="w-4 h-4 text-brand-600 focus:ring-brand-500 border-gray-300"
                        checked={formData.urgency === level}
                        onChange={() => updateField('urgency', level)}
                      />
                      <span className="ml-3 font-medium text-gray-900">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => updateField('isCommercial', false)}
                    className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium flex items-center justify-center gap-2
                    ${!formData.isCommercial ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-gray-600 border-gray-300'}`}
                  >
                    <Home size={16} /> Residential
                  </button>
                  <button
                    onClick={() => updateField('isCommercial', true)}
                    className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium flex items-center justify-center gap-2
                    ${formData.isCommercial ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-gray-600 border-gray-300'}`}
                  >
                    <Building2 size={16} /> Commercial
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    maxLength={5}
                    placeholder="12345"
                    value={formData.zipCode}
                    onChange={(e) => updateField('zipCode', e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  />
                </div>
              </div>

              <button
                disabled={!formData.urgency || formData.zipCode.length < 5}
                onClick={handleNext}
                className="w-full mt-4 bg-gray-900 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Continue <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Contact Info */}
        {step === 3 && (
          <div className="animate-in slide-in-from-right duration-300">
            <button onClick={handleBack} className="text-xs text-gray-400 hover:text-gray-600 mb-2 uppercase tracking-wide font-bold">
              &larr; Back
            </button>

            <h3 className="text-xl font-bold text-gray-900 mb-2">Where should we send the quote?</h3>
            <p className="text-sm text-gray-500 mb-4">No spam. Just a fast quote from a local tech.</p>

            {/* AI Tip Section */}
            {(tip || loadingTip) && (
              <div className="mb-6 bg-blue-50 border border-blue-100 p-3 rounded-lg flex gap-3 items-start">
                <Sparkles className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  {loadingTip ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="animate-spin w-3 h-3" /> analyzing pest info...
                    </span>
                  ) : (
                    <span className="italic">"{tip}"</span>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">First Name</label>
                  <input
                    required
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Last Name</label>
                  <input
                    required
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number</label>
                <input
                  required
                  type="tel"
                  placeholder="(555) 555-5555"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>

              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={hasConsented}
                    onChange={(e) => setHasConsented(e.target.checked)}
                    className="mt-1 w-4 h-4 text-brand-600 border-gray-300 rounded focus:ring-brand-500 shrink-0"
                  />
                  <span className="text-[10px] leading-tight text-gray-500">
                    By entering your phone number and submitting this form, you consent to receive marketing and service-related text messages from Freedom Pest Control at the number you provide. Up to 4 msgs/month. Message and data rates may apply. Text STOP to cancel, HELP for help. Consent is not a condition of purchase. View our Privacy Policy and Terms of Service.
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>

              {/* Cloudflare Turnstile Widget */}
              <div className="my-4">
                <TurnstileWidget
                  siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                  onVerify={(token) => {
                    setTurnstileToken(token);
                    setTurnstileError('');
                  }}
                  onError={(err) => console.error('Turnstile Error:', err)}
                />
                {turnstileError && <p className="text-red-500 text-sm mt-2">{turnstileError}</p>}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!hasConsented}
                  className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-700 transition-colors shadow-lg shadow-brand-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none"
                >
                  Get My Free Quote
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};