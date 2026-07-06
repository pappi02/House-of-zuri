export interface CustomerResponseDto {
  id: string;
  customerNumber: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  preferredName: string | null;
  email: string;
  phone: string;
  isGuest: boolean;
  status: string;
  marketingOptIn: boolean;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}
