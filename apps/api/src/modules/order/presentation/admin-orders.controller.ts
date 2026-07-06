import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListAdminOrdersUseCase } from '../../application/use-cases/list-admin-orders.use-case';

type Paginated<T> = { items: T[]; page: number; pageSize: number; totalItems: number; totalPages: number };

type Paginated<T> = { items: T[]; page: number; pageSize: number; totalItems: number; totalPages: number };

@ApiTags('admin/orders')
@Controller('admin/orders')
export class AdminOrdersController {
  constructor(private readonly listAdminOrdersUseCase: ListAdminOrdersUseCase) {}

  @Get()
  @ApiOperation({ summary: 'List orders (admin)' })
  @ApiResponse({ status: 200, description: 'Orders returned.' })
  async list(
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '20',
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('customerId') customerId?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortDir') sortDir?: 'asc' | 'desc',
  ): Promise<Paginated<any>> {
    const p = Number(page) || 1;
    const ps = Number(pageSize) || 20;
    return this.listAdminOrdersUseCase.execute({ page: p, pageSize: ps, search, status, startDate, endDate, customerId, sortBy, sortDir });
  }

  @Get(':id/timeline')
  @ApiOperation({ summary: 'Get timeline for an order' })
  async timeline(@Query('id') id?: string) {
    // For now, return empty or suggest using OrderService timeline use-case
    return [];
  }
}
