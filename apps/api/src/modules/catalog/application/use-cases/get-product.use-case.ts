import { Inject } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity';
import { ProductNotFoundException } from '../../domain/exceptions/product-not-found.exception';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { CATALOG_REPOSITORY } from '../../infrastructure/tokens/catalog.tokens';
import { ProductResponseDto } from '../dto/product-response.dto';

export class GetProductUseCase {
  constructor(@Inject(CATALOG_REPOSITORY) private readonly productRepository: ProductRepository) {}

  async execute(idOrSlug: string): Promise<ProductResponseDto> {
    const product = (await this.productRepository.findById(idOrSlug)) ?? (await this.productRepository.findBySlug(idOrSlug));

    if (!product) {
      throw new ProductNotFoundException(idOrSlug);
    }

    return this.toResponse(product);
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
