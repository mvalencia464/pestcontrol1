import React, { useState, useRef } from 'react';
import { Camera, Upload, ScanLine, AlertTriangle, CheckCircle2, Info, Loader2, X } from 'lucide-react';
import { identifyPest } from '../services/geminiService';
import { PestIdentificationResult } from '../types';

interface BugIdentifierProps {
  onQuoteClick: () => void;
}

export const BugIdentifier: React.FC<BugIdentifierProps> = ({ onQuoteClick }) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PestIdentificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset state
    setResult(null);
    setError(null);
    setLoading(true);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      setImage(base64String);

      try {
        // Strip the data:image/xyz;base64, prefix for the API
        const base64Data = base64String.split(',')[1];
        const data = await identifyPest(base64Data);
        setResult(data);
      } catch (err) {
        setError("Could not identify the image. Please try a clearer photo.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-brand-100 overflow-hidden">
      <div className="bg-brand-900 p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-700 rounded-full mix-blend-overlay filter blur-2xl opacity-50 -mr-10 -mt-10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2 text-brand-300 font-bold uppercase tracking-wider text-xs">
            <ScanLine size={16} /> Free AI Tool
          </div>
          <h3 className="text-2xl font-bold mb-2">Instant Pest Identifier</h3>
          <p className="text-brand-100 text-sm">Snap a photo. Our AI identifies the pest and tells you if it's dangerous.</p>
        </div>
      </div>

      <div className="p-6">
        {!image ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 hover:border-brand-400 transition-all group"
          >
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Camera size={32} />
            </div>
            <h4 className="font-bold text-gray-900 mb-1">Upload or Take Photo</h4>
            <p className="text-sm text-gray-500">Supports JPG, PNG</p>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="animate-in fade-in duration-300">
            <div className="relative h-48 bg-gray-100 rounded-xl overflow-hidden mb-6 group">
              <img src={image} alt="Uploaded pest" className="w-full h-full object-cover" />
              <button 
                onClick={reset}
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full backdrop-blur-sm transition-colors"
              >
                <X size={16} />
              </button>
              {loading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center text-brand-700 z-10">
                  <Loader2 className="w-10 h-10 animate-spin mb-3" />
                  <span className="font-semibold animate-pulse">Analyzing...</span>
                </div>
              )}
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm flex items-center gap-2 mb-4">
                <AlertTriangle size={16} /> {error}
              </div>
            )}

            {result && (
              <div className="space-y-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">{result.name}</h4>
                    <p className="text-sm text-gray-500 italic">{result.scientificName}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                    ${result.dangerLevel === 'Critical' || result.dangerLevel === 'High' ? 'bg-red-100 text-red-700' : 
                      result.dangerLevel === 'Moderate' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {result.dangerLevel} Risk
                  </span>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h5 className="flex items-center gap-2 font-bold text-blue-900 text-sm mb-2">
                    <Info size={16} /> Local Insight
                  </h5>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    {result.localInsight}
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-gray-900 text-sm mb-2">Prevention Tips</h5>
                  <ul className="space-y-2">
                    {result.preventionTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={onQuoteClick}
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-brand-200"
                  >
                    Get Quote to Remove {result.name}
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-2">
                    Professional removal recommended for this pest.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};