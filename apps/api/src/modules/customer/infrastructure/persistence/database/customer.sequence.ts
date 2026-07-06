export const CUSTOMER_NUMBER_SEQUENCE = 'customer.customer_number_seq';

export function formatCustomerNumber(value: number | bigint): string {
  return `CUS-${String(Number(value)).padStart(6, '0')}`;
}
