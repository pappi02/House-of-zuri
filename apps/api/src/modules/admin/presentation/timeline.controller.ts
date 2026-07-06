import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { prisma } from '../../../database/client';

@ApiTags('admin/timeline')
@Controller('admin/timeline')
export class TimelineController {
  @Get()
  @ApiOperation({ summary: 'Get timeline entries for an entity' })
  @ApiResponse({ status: 200, description: 'Timeline entries returned.' })
  async list(@Query('entity') entity?: string, @Query('id') id?: string) {
    if (!entity || !id) return [];

    if (entity === 'fulfillment') {
      const rows = await prisma.$queryRaw`SELECT * FROM fulfillment.fulfillment_timelines WHERE fulfillment_id = ${id}::uuid ORDER BY created_at ASC`;
      return Array.isArray(rows) ? rows : rows ? [rows] : [];
    }

    if (entity === 'work-order' || entity === 'workOrder' || entity === 'manufacturing') {
      const rows = await prisma.$queryRaw`SELECT * FROM manufacturing.timeline WHERE work_order_id = ${id}::uuid ORDER BY created_at ASC`;
      return Array.isArray(rows) ? rows : rows ? [rows] : [];
    }

    // orders timeline not implemented yet
    return [];
  }
}
