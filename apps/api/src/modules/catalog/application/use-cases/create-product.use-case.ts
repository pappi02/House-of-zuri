import { Inject } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity';
import { DuplicateProductException } from '../../domain/exceptions/duplicate-product.exception';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { CATALOG_REPOSITORY } from '../../infrastructure/tokens/catalog.tokens';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductResponseDto } from '../dto/product-response.dto';

export class CreateProductUseCase {
  constructor(@Inject(CATALOG_REPOSITORY) private readonly productRepository: ProductRepository) {}

  async execute(input: CreateProductDto): Promise<ProductResponseDto> {
    const existing = await this.productRepository.findBySlug(input.slug ?? input.name);

    if (existing) {
      throw new DuplicateProductException(input.slug ?? input.name);
    }

    const product = new Product({
      name: input.name,
      slug: input.slug,
      description: input.description,
      shortDescription: input.shortDescription,
      categoryId: input.categoryId,
      collectionId: input.collectionId,
      productType: input.productType,
      status: input.status,
      basePrice: input.basePrice,
      currency: input.currency,
      featured: input.featured,
      newArrival: input.newArrival,
      careInstructions: input.careInstructions,
      estimatedProductionDays: input.estimatedProductionDays,
      seoTitle: input.seoTitle,
      seoDescription: input.seoDescription,
    });

    const saved = await this.productRepository.save(product);

    return this.toResponse(saved);
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
