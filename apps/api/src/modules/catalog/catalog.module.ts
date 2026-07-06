import { Module } from '@nestjs/common';
import { CatalogPersistenceModule } from './infrastructure/persistence/database/catalog.persistence.module';
import { CatalogService } from './application/services/catalog.service';
import { CreateProductUseCase } from './application/use-cases/create-product.use-case';
import { GetProductUseCase } from './application/use-cases/get-product.use-case';
import { ListProductsUseCase } from './application/use-cases/list-products.use-case';
import { CatalogController } from './presentation/controllers/catalog.controller';

@Module({
  imports: [CatalogPersistenceModule],
  controllers: [CatalogController],
  providers: [CatalogService, CreateProductUseCase, GetProductUseCase, ListProductsUseCase],
})
export class CatalogModule {}
