export enum FoundingPartnerStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ARCHIVED = 'ARCHIVED',
}

export interface IFoundingPartner {
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
  createdAt: Date;
  updatedAt: Date;
}

export interface FoundingPartnerStats {
  total: number;
  new: number;
  contacted: number;
  approved: number;
  rejected: number;
  archived: number;
}

export interface PaginatedFoundingPartners {
  data: IFoundingPartner[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
