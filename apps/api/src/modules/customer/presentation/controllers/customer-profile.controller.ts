import { Controller, Get, Param, UseFilters, UseInterceptors } from '@nestjs/common';
import { CustomerService } from '../../application/services/customer.service';
import { CustomerProfilePresenter } from '../presenters/customer-profile.presenter';
import { CustomerExceptionFilter } from '../filters/customer-exception.filter';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';

@Controller('customers')
@UseFilters(CustomerExceptionFilter)
@UseInterceptors(LoggingInterceptor)
export class CustomerProfileController {
  constructor(private readonly customerService: CustomerService) {}

  @Get(':id')
  async getCustomer(@Param('id') id: string) {
    const customer = await this.customerService.getCustomer(id);

    if (!customer) {
      throw new Error('Customer not found');
    }

    return CustomerProfilePresenter.toResponse(customer);
  }
}
