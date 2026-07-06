import { Module } from '@nestjs/common';
import { InventoryModule } from '../inventory/inventory.module';
import { ManufacturingModule } from '../manufacturing/manufacturing.module';
import { OrderController } from './presentation/controllers/order.controller';
import { AdminOrdersController } from './presentation/admin-orders.controller';
import { CreateOrderFromCartUseCase } from './application/use-cases/create-order-from-cart.use-case';
import { GetOrderUseCase } from './application/use-cases/get-order.use-case';
import { ListCustomerOrdersUseCase } from './application/use-cases/list-customer-orders.use-case';
import { CancelOrderUseCase } from './application/use-cases/cancel-order-use-case';
import { UpdateOrderNotesUseCase } from './application/use-cases/update-order-notes.use-case';
import { OrderService } from './application/services/order.service';
import { ListAdminOrdersUseCase } from './application/use-cases/list-admin-orders.use-case';
import { PrismaOrderRepository } from './infrastructure/persistence/prisma/prisma-order.repository';

@Module({
  imports: [InventoryModule, ManufacturingModule],
  controllers: [OrderController, AdminOrdersController],
  providers: [
    OrderService,
    CreateOrderFromCartUseCase,
    GetOrderUseCase,
    ListCustomerOrdersUseCase,
    CancelOrderUseCase,
    UpdateOrderNotesUseCase,
    ListAdminOrdersUseCase,
    { provide: 'OrderRepository', useClass: PrismaOrderRepository },
  ],
})
export class OrderModule {}
