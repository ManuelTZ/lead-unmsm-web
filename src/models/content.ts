export type EventMode = 'Presencial' | 'Virtual' | 'Híbrido';

export interface LeadEvent {
  slug: string;
  title: string;
  date: string;
  mode: EventMode;
  location: string;
  excerpt: string;
  registrationUrl?: string;
  status: 'upcoming' | 'past';
  isDemo?: boolean;
}

export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  category: string;
  body: string[];
  isDemo?: boolean;
}

export interface ImpactMetric {
  label: string;
  value: string;
  isDemo?: boolean;
}

export interface Partner {
  name: string;
  url?: string;
  isDemo?: boolean;
}

export interface Member {
  name: string;
  role: string;
  area?: string;
  bio?: string;
  imageSrc?: string;
  linkedinUrl?: string;
  isDemo?: boolean;
}
