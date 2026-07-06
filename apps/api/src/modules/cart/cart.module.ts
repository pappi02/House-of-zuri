import { Module } from '@nestjs/common';
import { CartController } from './presentation/controllers/cart.controller';
import { CreateCartUseCase } from './application/use-cases/create-cart.use-case';
import { GetCartUseCase } from './application/use-cases/get-cart.use-case';
import { AddItemUseCase } from './application/use-cases/add-item.use-case';
import { UpdateQuantityUseCase } from './application/use-cases/update-quantity.use-case';
import { RemoveItemUseCase } from './application/use-cases/remove-item.use-case';
import { CartService } from './application/services/cart.service';

@Module({
  controllers: [CartController],
  providers: [CartService, CreateCartUseCase, GetCartUseCase, AddItemUseCase, UpdateQuantityUseCase, RemoveItemUseCase],
})
export class CartModule {}
