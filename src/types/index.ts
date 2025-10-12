// Product Types
export interface Product {
  id: string;
  name: string;
  partNumber: string;
  oemNumber?: string;
  category: string;
  brand: string;
  price: number;
  description: string;
  specifications: Record<string, string>;
  compatibility: VehicleCompatibility[];
  images: string[];
  inStock: boolean;
  featured?: boolean;
}

export interface VehicleCompatibility {
  make: string;
  model: string;
  yearStart: number;
  yearEnd: number;
  engineType?: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

// Filter Types
export interface FilterOptions {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  inStock?: boolean;
  makes?: string[];
  models?: string[];
  years?: number[];
}

export interface SearchFilters {
  query?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  make?: string;
  model?: string;
  year?: number;
  sortBy?: 'relevance' | 'price-asc' | 'price-desc' | 'newest';
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface RFQFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  productId: string;
  productName: string;
  quantity: number;
  message?: string;
}

// UI Types
export type ViewMode = 'grid' | 'list';

export interface Breadcrumb {
  label: string;
  href: string;
}