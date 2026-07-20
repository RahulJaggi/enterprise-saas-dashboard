export type Role = 'Super Admin' | 'Admin' | 'Manager' | 'Analyst' | 'Support';

export type Status = 'Active' | 'Inactive' | 'Pending' | 'Suspended';

export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
