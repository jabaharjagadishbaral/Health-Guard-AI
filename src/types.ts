export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedFollowups?: string[];
  isStreaming?: boolean;
}

export interface SymptomCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  sampleQuestions: string[];
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge: string;
  gradient: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  comment: string;
  verified: boolean;
  symptomTag: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  rating: number;
  reviewsCount: number;
  nextAvailable: string;
  image: string;
  location: string;
}
