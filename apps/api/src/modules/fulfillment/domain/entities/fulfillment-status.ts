export type FulfillmentStatus =
  | 'CREATED'
  | 'WAITING_FOR_ITEMS'
  | 'READY_TO_PACK'
  | 'PACKING'
  | 'PACKED'
  | 'READY_FOR_DISPATCH'
  | 'DISPATCHED'
  | 'COMPLETED'
  | 'CANCELLED';

export const FULFILLMENT_INITIAL_STATUS: FulfillmentStatus = 'CREATED';
