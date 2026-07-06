import { Inject } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { CATALOG_REPOSITORY } from '../../infrastructure/tokens/catalog.tokens';
import { ProductResponseDto } from '../dto/product-response.dto';

export class ListProductsUseCase {
  constructor(@Inject(CATALOG_REPOSITORY) private readonly productRepository: ProductRepository) {}

  async execute(filters?: Record<string, unknown>, pagination?: { page: number; limit: number }): Promise<ProductResponseDto[]> {
    const products = await this.productRepository.list(filters, pagination);

    return products.map((product) => this.toResponse(product));
  }

  private toResponse(product: Product): ProductResponseDto {
    return {
      id: product.id,
      productNumber: product.productNumber,
      name: product.name,
      slug: product.slug,
      description: product.description,
      shortDescription: product.shortDescription,
      categoryId: product.categoryId,
      collectionId: product.collectionId,
      productType: product.productType,
      status: product.status,
      basePrice: product.basePrice,
      currency: product.currency,
      featured: product.featured,
      newArrival: product.newArrival,
      careInstructions: product.careInstructions,
      estimatedProductionDays: product.estimatedProductionDays,
      seoTitle: product.seoTitle,
      seoDescription: product.seoDescription,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
