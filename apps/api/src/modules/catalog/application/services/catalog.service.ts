import { Injectable } from '@nestjs/common';
import { CreateProductUseCase } from '../use-cases/create-product.use-case';
import { GetProductUseCase } from '../use-cases/get-product.use-case';
import { ListProductsUseCase } from '../use-cases/list-products.use-case';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductResponseDto } from '../dto/product-response.dto';

@Injectable()
export class CatalogService {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly listProductsUseCase: ListProductsUseCase,
  ) {}

  async createProduct(input: CreateProductDto): Promise<ProductResponseDto> {
    return this.createProductUseCase.execute(input);
  }

  async getProduct(idOrSlug: string): Promise<ProductResponseDto> {
    return this.getProductUseCase.execute(idOrSlug);
  }

  async listProducts(filters?: Record<string, unknown>, pagination?: { page: number; limit: number }): Promise<ProductResponseDto[]> {
    return this.listProductsUseCase.execute(filters, pagination);
  }
}
