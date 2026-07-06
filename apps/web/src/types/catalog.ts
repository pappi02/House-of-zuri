export type ProductType = "READY_MADE" | "MADE_TO_ORDER" | "CUSTOM";
export type ProductStatus = "ACTIVE" | "DRAFT" | "OUT_OF_STOCK" | "ARCHIVED";

export type CatalogProduct = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  shortDescription?: string | null;
  price: number;
  currency: string;
  productType: ProductType;
  status: ProductStatus;
  collectionId?: string | null;
  collection?: string | null;
  categoryId?: string | null;
  category?: string | null;
  featured?: boolean;
  newArrival?: boolean;
  careInstructions?: string | null;
  estimatedProductionDays?: number | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  images?: string[];
  colors?: string[];
  sizes?: string[];
  availability?: "In Stock" | "Made to Order" | "Custom";
  sku?: string;
  fabric?: string;
};

export type CatalogCollection = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  productCount?: number;
  featuredProduct?: CatalogProduct;
  isActive?: boolean;
};

export type CatalogCategory = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
};
