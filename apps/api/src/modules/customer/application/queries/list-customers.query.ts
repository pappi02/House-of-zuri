export interface ListCustomersQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filter?: {
    isGuest?: boolean;
    status?: string;
    marketingOptIn?: boolean;
  };
}
