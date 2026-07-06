export const ProductStatusValues = ['DRAFT', 'ACTIVE', 'ARCHIVED', 'OUT_OF_STOCK'] as const;

export type ProductStatus = (typeof ProductStatusValues)[number];