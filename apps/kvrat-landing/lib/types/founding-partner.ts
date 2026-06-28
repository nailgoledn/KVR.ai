export type FoundingPartnerStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'APPROVED'
  | 'REJECTED'
  | 'ARCHIVED';

export interface FoundingPartner {
  id: number;
  companyName: string;
  fullName: string;
  country: string;
  city: string;
  phone: string;
  email: string;
  website?: string;
  businessType: string;
  industry: string;
  products?: string;
  message?: string;
  preferredLanguage: string;
  communicationMethod: string;
  status: FoundingPartnerStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FoundingPartnerStats {
  total: number;
  new: number;
  contacted: number;
  approved: number;
  rejected: number;
  archived: number;
}

export interface FoundingPartnerFilter {
  search?: string;
  country?: string;
  businessType?: string;
  status?: FoundingPartnerStatus;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'companyName' | 'fullName' | 'country' | 'status';
  sortOrder?: 'ASC' | 'DESC';
}

export interface PaginatedFoundingPartners {
  data: FoundingPartner[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateFoundingPartnerPayload {
  companyName: string;
  fullName: string;
  country: string;
  city: string;
  phone: string;
  email: string;
  website?: string;
  businessType: string;
  industry: string;
  products?: string;
  message?: string;
  preferredLanguage: string;
  communicationMethod: string;
}

export const FOUNDING_PARTNER_STATUSES: FoundingPartnerStatus[] = [
  'NEW',
  'CONTACTED',
  'APPROVED',
  'REJECTED',
  'ARCHIVED',
];

export const STATUS_LABELS: Record<FoundingPartnerStatus, string> = {
  NEW: 'جديد',
  CONTACTED: 'تم التواصل',
  APPROVED: 'موافق عليه',
  REJECTED: 'مرفوض',
  ARCHIVED: 'مؤرشف',
};

export const STATUS_COLORS: Record<FoundingPartnerStatus, string> = {
  NEW: '#38bdf8',
  CONTACTED: '#a78bfa',
  APPROVED: '#34d399',
  REJECTED: '#f87171',
  ARCHIVED: '#94a3b8',
};
