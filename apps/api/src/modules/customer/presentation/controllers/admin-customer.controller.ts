import { Controller, Get, Param, Patch, UseFilters, UseInterceptors } from '@nestjs/common';
import { CustomerService } from '../../application/services/customer.service';
import { CustomerProfilePresenter } from '../presenters/customer-profile.presenter';
import { CustomerExceptionFilter } from '../filters/customer-exception.filter';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';

@Controller('admin/customers')
@UseFilters(CustomerExceptionFilter)
@UseInterceptors(LoggingInterceptor)
export class AdminCustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async listCustomers() {
    const customers = await this.customerService.listCustomers();
    return customers.map((customer) => CustomerProfilePresenter.toResponse(customer));
  }

  @Get(':id')
  async getCustomer(@Param('id') id: string) {
    const customer = await this.customerService.getCustomer(id);

    if (!customer) {
      throw new Error('Customer not found');
    }

    return CustomerProfilePresenter.toResponse(customer);
  }

  @Patch(':id')
  async updateCustomer(@Param('id') id: string) {
    return {
      message: `Admin update endpoint for ${id} is ready.`,
    };
  }

  @Patch(':id/block')
  async blockCustomer(@Param('id') id: string) {
    return {
      message: `Block endpoint for ${id} is ready.`,
    };
  }

  @Patch(':id/activate')
  async activateCustomer(@Param('id') id: string) {
    return {
      message: `Activate endpoint for ${id} is ready.`,
    };
  }
}
