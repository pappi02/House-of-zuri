export class ProductResponseDto {
  id!: string;
  productNumber!: string;
  name!: string;
  slug!: string;
  description!: string | null;
  shortDescription!: string | null;
  categoryId!: string | null;
  collectionId!: string | null;
  productType!: string;
  status!: string;
  basePrice!: number;
  currency!: string;
  featured!: boolean;
  newArrival!: boolean;
  careInstructions!: string | null;
  estimatedProductionDays!: number | null;
  seoTitle!: string | null;
  seoDescription!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}
