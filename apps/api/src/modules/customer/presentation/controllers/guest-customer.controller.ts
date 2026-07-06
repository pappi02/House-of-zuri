import { Body, Controller, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { CustomerService } from '../../application/services/customer.service';
import { CreateGuestCustomerRequest } from '../dto/create-guest-customer.request';
import { ConvertGuestRequest } from '../dto/convert-guest.request';
import { CustomerProfilePresenter } from '../presenters/customer-profile.presenter';
import { CustomerExceptionFilter } from '../filters/customer-exception.filter';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';

@Controller('customers/guest')
@UseFilters(CustomerExceptionFilter)
@UseInterceptors(LoggingInterceptor)
export class GuestCustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async createGuest(@Body() body: CreateGuestCustomerRequest) {
    const customer = await this.customerService.createCustomer({
      ...body,
      isGuest: true,
    });

    return CustomerProfilePresenter.toResponse(customer);
  }

  @Post('convert')
  async convertGuest(@Body() body: ConvertGuestRequest) {
    const customer = await this.customerService.getCustomer(body.customerId);

    if (!customer) {
      throw new Error('Customer not found');
    }

    return CustomerProfilePresenter.toResponse(customer);
  }
}
