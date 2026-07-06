export const ProductTypeValues = ['READY_MADE', 'MADE_TO_ORDER', 'CUSTOM'] as const;

export type ProductType = (typeof ProductTypeValues)[number];