export interface UpdateCustomerCommand {
  id: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  preferredName?: string;
  phone?: string;
  marketingOptIn?: boolean;
  notes?: string | null;
}
