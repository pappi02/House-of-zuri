import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CustomerService } from '../../application/services/customer.service';
import { CreateCustomerRequest } from '../requests/create-customer.request';
import { CustomerPresenter } from '../presenters/customer.presenter';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    const parsedPage = Number(page) || 1;
    const parsedLimit = Number(limit) || 20;

    const customers = await this.customerService.listCustomers({
      page: parsedPage,
      limit: parsedLimit,
    });

    return customers;
  }

  @Post()
  async create(@Body() body: CreateCustomerRequest) {
    const customer = await this.customerService.createCustomer(body);
    return CustomerPresenter.toResponse(customer);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const customer = await this.customerService.getCustomer(id);
    return customer ? CustomerPresenter.toResponse(customer) : null;
  }
}
