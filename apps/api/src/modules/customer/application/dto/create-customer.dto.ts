export interface CreateCustomerDto {
  firstName: string;
  lastName: string;
  middleName?: string;
  preferredName?: string;
  email: string;
  phone: string;
  isGuest?: boolean;
  accountId?: string;
  notes?: string;
}
