export type PestType = 'Ants' | 'Roaches' | 'Rodents' | 'Termites' | 'Bed Bugs' | 'Mosquitoes' | 'Spiders' | 'Other';

export type UrgencyLevel = 'Today' | 'Next 2-3 Days' | 'Just Planning';

export interface PestIdentificationResult {
  name: string;
  scientificName: string;
  dangerLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  description: string;
  localInsight: string;
  preventionTips: string[];
  recommendedAction: string;
}

export interface QuoteFormData {
  pestType: PestType | null;
  urgency: UrgencyLevel | null;
  zipCode: string;
  isCommercial: boolean;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  identifiedPestDetails?: PestIdentificationResult;
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
  location: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}