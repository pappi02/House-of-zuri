export class CreateProductDto {
  name!: string;
  slug?: string;
  description?: string;
  shortDescription?: string;
  categoryId?: string;
  collectionId?: string;
  productType!: 'READY_MADE' | 'MADE_TO_ORDER' | 'CUSTOM';
  status?: 'DRAFT' | 'ACTIVE' | 'ARCHIVED' | 'OUT_OF_STOCK';
  basePrice!: number;
  currency?: string;
  featured?: boolean;
  newArrival?: boolean;
  careInstructions?: string;
  estimatedProductionDays?: number;
  seoTitle?: string;
  seoDescription?: string;
}
