import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateProductRequest {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  shortDescription?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  collectionId?: string;

  @IsEnum(['READY_MADE', 'MADE_TO_ORDER', 'CUSTOM'])
  productType!: 'READY_MADE' | 'MADE_TO_ORDER' | 'CUSTOM';

  @IsOptional()
  @IsEnum(['DRAFT', 'ACTIVE', 'ARCHIVED', 'OUT_OF_STOCK'])
  status?: 'DRAFT' | 'ACTIVE' | 'ARCHIVED' | 'OUT_OF_STOCK';

  @IsNumber()
  @Min(0)
  basePrice!: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  featured?: boolean;

  @IsOptional()
  newArrival?: boolean;

  @IsOptional()
  @IsString()
  careInstructions?: string;

  @IsOptional()
  @IsNumber()
  estimatedProductionDays?: number;

  @IsOptional()
  @IsString()
  seoTitle?: string;

  @IsOptional()
  @IsString()
  seoDescription?: string;
}
