export interface UpdateCustomerDto {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  preferredName?: string;
  phone?: string;
  marketingOptIn?: boolean;
  notes?: string | null;
}
