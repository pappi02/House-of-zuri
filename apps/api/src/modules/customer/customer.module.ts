import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CustomerService } from './application/services/customer.service';
import { CustomerPersistenceModule } from './infrastructure/persistence/database/customer.persistence.module';
import { CUSTOMER_REPOSITORY } from './infrastructure/tokens/customer.tokens';
import { AdminCustomerController } from './presentation/controllers/admin-customer.controller';
import { CustomerProfileController } from './presentation/controllers/customer-profile.controller';
import { CustomerSelfController } from './presentation/controllers/customer-self.controller';
import { GuestCustomerController } from './presentation/controllers/guest-customer.controller';
import { RolesGuard } from './presentation/guards/roles.guard';

@Module({
  imports: [CustomerPersistenceModule],
  controllers: [GuestCustomerController, CustomerSelfController, CustomerProfileController, AdminCustomerController],
  providers: [
    CustomerService,
    {
      provide: 'CustomerRepository',
      useExisting: CUSTOMER_REPOSITORY,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class CustomerModule {}
