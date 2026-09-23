export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string | null;
  published: boolean;
  tagline?: string;
  category?: string;
  categoryLabel?: string;
  method?: string;
  origin?: string;
  unit?: string;
  packaging?: { retail: string; pro: string };
  characteristics?: { label: string; value: string }[];
  featured?: boolean;
};

export type Service = {
  id: string;
  name: string;
  slug: string;
  description: string;
  duration: string;
  priceFrom: number;
  published: boolean;
  tagline?: string;
  category?: string;
  targetAudience?: string;
  currency?: string;
  imageUrl?: string;
  syllabusOrFeatures?: string[];
  featured?: boolean;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message?: string;
  interestType?: string;
  status: 'NEW' | 'IN_PROGRESS' | 'DONE';
  createdAt: string;
};

export type CurrentUser = {
  name: string;
  email: string;
};
