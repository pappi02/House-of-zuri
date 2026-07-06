export const CustomerStatusValues = ['ACTIVE', 'INACTIVE', 'BLOCKED'] as const;

export type CustomerStatus = (typeof CustomerStatusValues)[number];
