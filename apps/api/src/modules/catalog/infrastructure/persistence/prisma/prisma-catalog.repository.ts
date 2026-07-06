import { PrismaClient } from '@prisma/client';
import { Product } from '../../../domain/entities/product.entity';
import { ProductRepository } from '../../../domain/repositories/product.repository';

export class PrismaCatalogRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Product | null> {
    const record = await this.prisma.product.findUnique({ where: { id } });

    return record ? this.toDomain(record) : null;
  }

  async findBySlug(slug: string): Promise<Product | null> {
    const record = await this.prisma.product.findUnique({ where: { slug } });

    return record ? this.toDomain(record) : null;
  }

  async findByProductNumber(number: string): Promise<Product | null> {
    const record = await this.prisma.product.findUnique({ where: { productNumber: number } });

    return record ? this.toDomain(record) : null;
  }

  async list(filters?: Record<string, unknown>, pagination?: { page: number; limit: number }): Promise<Product[]> {
    const records = await this.prisma.product.findMany({
      where: this.buildWhere(filters),
      skip: pagination ? (pagination.page - 1) * pagination.limit : undefined,
      take: pagination?.limit,
      orderBy: { createdAt: 'desc' },
    });

    return records.map((record) => this.toDomain(record));
  }

  async save(product: Product): Promise<Product> {
    const created = await this.prisma.product.create({
      data: {
        id: product.id,
        productNumber: product.productNumber,
        name: product.name,
        slug: product.slug,
        description: product.description,
        shortDescription: product.shortDescription,
        categoryId: product.categoryId ?? '',
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
      },
    });

    return this.toDomain(created);
  }

  async update(product: Product): Promise<Product> {
    const updated = await this.prisma.product.update({
      where: { id: product.id },
      data: {
        productNumber: product.productNumber,
        name: product.name,
        slug: product.slug,
        description: product.description,
        shortDescription: product.shortDescription,
        categoryId: product.categoryId ?? undefined,
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
      },
    });

    return this.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }

  private buildWhere(filters?: Record<string, unknown>) {
    if (!filters) {
      return {};
    }

    const where: Record<string, unknown> = {};

    if (typeof filters.keyword === 'string' && filters.keyword.trim()) {
      where.OR = [
        { name: { contains: filters.keyword, mode: 'insensitive' as const } },
        { description: { contains: filters.keyword, mode: 'insensitive' as const } },
      ];
    }

    if (typeof filters.category === 'string') {
      where.categoryId = filters.category;
    }

    if (typeof filters.collection === 'string') {
      where.collectionId = filters.collection;
    }

    return where;
  }

  private toDomain(record: {
    id: string;
    productNumber: string;
    name: string;
    slug: string;
    description: string | null;
    shortDescription: string | null;
    categoryId: string | null;
    collectionId: string | null;
    productType: string;
    status: string;
    basePrice: number | string | { toString(): string };
    currency: string;
    featured: boolean;
    newArrival: boolean;
    careInstructions: string | null;
    estimatedProductionDays: number | null;
    seoTitle: string | null;
    seoDescription: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): Product {
    return new Product({
      id: record.id,
      productNumber: record.productNumber,
      name: record.name,
      slug: record.slug,
      description: record.description,
      shortDescription: record.shortDescription,
      categoryId: record.categoryId,
      collectionId: record.collectionId,
      productType: record.productType as 'READY_MADE' | 'MADE_TO_ORDER' | 'CUSTOM',
      status: record.status as 'DRAFT' | 'ACTIVE' | 'ARCHIVED' | 'OUT_OF_STOCK',
      basePrice: typeof record.basePrice === 'number' ? record.basePrice : Number(record.basePrice),
      currency: record.currency,
      featured: record.featured,
      newArrival: record.newArrival,
      careInstructions: record.careInstructions,
      estimatedProductionDays: record.estimatedProductionDays,
      seoTitle: record.seoTitle,
      seoDescription: record.seoDescription,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
}
