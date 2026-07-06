export interface Customer {
  id: string;
  email: string;
  phone?: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}
