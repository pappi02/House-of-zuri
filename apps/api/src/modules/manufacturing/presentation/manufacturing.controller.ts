import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ManufacturingService } from '../application/manufacturing.service';
import { QualityInspection } from '../domain/entities/quality-inspection.entity';

@ApiTags('admin/manufacturing')
@Controller('admin/manufacturing')
export class ManufacturingController {
  constructor(private readonly manufacturingService: ManufacturingService) {}

  @Get('jobs')
  @ApiOperation({ summary: 'List manufacturing jobs' })
  listJobs(@Query('orderId') orderId?: string) {
    return this.manufacturingService.listJobs(orderId);
  }

  @Get('jobs/:id')
  @ApiOperation({ summary: 'Get manufacturing job details' })
  getJob(@Param('id') id: string) {
    return this.manufacturingService.getJob(id);
  }

  @Post('jobs')
  @ApiOperation({ summary: 'Create a new manufacturing job' })
  @ApiResponse({ status: 201, description: 'Manufacturing job created.' })
  createJob(@Body() body: { orderId: string; priority?: number }) {
    return this.manufacturingService.createJob(body.orderId, body.priority);
  }

  @Post('work-orders')
  @ApiOperation({ summary: 'Create a new work order' })
  createWorkOrder(@Body() body: { manufacturingJobId: string; orderItemId: string; productId: string; variantId: string; assignedTailorId?: string }) {
    return this.manufacturingService.createWorkOrder({
      manufacturingJobId: body.manufacturingJobId,
      orderItemId: body.orderItemId,
      productId: body.productId,
      variantId: body.variantId,
      assignedTailorId: body.assignedTailorId ?? null,
    });
  }

  @Patch('work-orders/:id/start-cutting')
  startCutting(@Param('id') id: string) {
    return this.manufacturingService.startCutting(id);
  }

  @Patch('work-orders/:id/start-sewing')
  startSewing(@Param('id') id: string) {
    return this.manufacturingService.startSewing(id);
  }

  @Patch('work-orders/:id/finish')
  finish(@Param('id') id: string) {
    return this.manufacturingService.finishWorkOrder(id);
  }

  @Post('work-orders/:id/measurements')
  @ApiOperation({ summary: 'Capture measurements and verify a custom work order' })
  captureMeasurements(
    @Param('id') id: string,
    @Body()
    body: {
      bust?: number;
      waist?: number;
      hip?: number;
      shoulder?: number;
      sleeve?: number;
      height?: number;
      inseam?: number;
      notes?: string;
    },
  ) {
    return this.manufacturingService.captureMeasurements({
      workOrderId: id,
      bust: body.bust ?? null,
      waist: body.waist ?? null,
      hip: body.hip ?? null,
      shoulder: body.shoulder ?? null,
      sleeve: body.sleeve ?? null,
      height: body.height ?? null,
      inseam: body.inseam ?? null,
      notes: body.notes ?? null,
    });
  }

  @Post('work-orders/:id/quality-inspection')
  @ApiOperation({ summary: 'Create a quality inspection for a work order' })
  addQualityInspection(@Param('id') id: string, @Body() body: { status: 'PASSED' | 'FAILED'; notes?: string | null; inspectedBy?: string | null }) {
    return this.manufacturingService.addQualityInspection({
      workOrderId: id,
      status: body.status,
      notes: body.notes ?? undefined,
      inspectedBy: body.inspectedBy ?? null,
    });
  }
}
