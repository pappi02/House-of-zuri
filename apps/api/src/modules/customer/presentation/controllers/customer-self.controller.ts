import { Body, Controller, Delete, Get, Patch, UseFilters, UseInterceptors } from '@nestjs/common';
import { CustomerService } from '../../application/services/customer.service';
import { UpdateCustomerRequest } from '../dto/update-customer.request';
import { CustomerProfilePresenter } from '../presenters/customer-profile.presenter';
import { CustomerExceptionFilter } from '../filters/customer-exception.filter';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';

@Controller('customers/me')
@UseFilters(CustomerExceptionFilter)
@UseInterceptors(LoggingInterceptor)
export class CustomerSelfController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getMe() {
    return {
      message: 'Authenticated customer profile endpoint is ready.',
    };
  }

  @Patch()
  async updateMe(@Body() body: UpdateCustomerRequest) {
    return {
      message: 'Authenticated customer update endpoint is ready.',
      payload: body,
    };
  }

  @Delete()
  async deleteMe() {
    return {
      message: 'Authenticated customer deletion endpoint is ready.',
    };
  }
}
