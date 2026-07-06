export class ProductResponse {
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
  createdAt!: Date;
  updatedAt!: Date;
}
