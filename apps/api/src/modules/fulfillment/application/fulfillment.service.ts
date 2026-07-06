import { Inject, Injectable } from '@nestjs/common';
import { CreateFulfillmentUseCase } from './use-cases/create-fulfillment.use-case';
import { AddItemUseCase } from './use-cases/add-item.use-case';
import { VerifyReadinessUseCase } from './use-cases/verify-readiness.use-case';
import { StartPackingUseCase } from './use-cases/start-packing.use-case';
import { CompletePackingUseCase } from './use-cases/complete-packing.use-case';
import { MarkReadyForDispatchUseCase } from './use-cases/mark-ready-for-dispatch.use-case';
import { DispatchFulfillmentUseCase } from './use-cases/dispatch-fulfillment.use-case';
import { CompleteFulfillmentUseCase } from './use-cases/complete-fulfillment.use-case';
import { FulfillmentRepository } from '../domain/repositories/fulfillment.repository';
import { FulfillmentItem } from '../domain/entities/fulfillment-item.entity';
import { Fulfillment } from '../domain/entities/fulfillment.entity';

@Injectable()
export class FulfillmentService {
  constructor(
    @Inject('FulfillmentRepository') private readonly repo: FulfillmentRepository,
    private readonly createFulfillmentUseCase: CreateFulfillmentUseCase,
    private readonly addItemUseCase: AddItemUseCase,
    private readonly verifyReadinessUseCase: VerifyReadinessUseCase,
    private readonly startPackingUseCase: StartPackingUseCase,
    private readonly completePackingUseCase: CompletePackingUseCase,
    private readonly markReadyForDispatchUseCase: MarkReadyForDispatchUseCase,
    private readonly dispatchFulfillmentUseCase: DispatchFulfillmentUseCase,
    private readonly completeFulfillmentUseCase: CompleteFulfillmentUseCase,
  ) {}

  async createFulfillment(orderId: string, items: FulfillmentItem[]): Promise<Fulfillment> {
    return this.createFulfillmentUseCase.execute(orderId, items);
  }

  async addItem(fulfillmentId: string, item: FulfillmentItem) {
    return this.addItemUseCase.execute(fulfillmentId, item);
  }

  async verifyReadiness(fulfillmentId: string) {
    return this.verifyReadinessUseCase.execute(fulfillmentId);
  }

  async startPacking(fulfillmentId: string) {
    return this.startPackingUseCase.execute(fulfillmentId);
  }

  async completePacking(fulfillmentId: string, items: Array<{ orderItemId: string; productId: string; variantId?: string | null; quantity: number }>) {
    return this.completePackingUseCase.execute(fulfillmentId, items);
  }

  async markReadyForDispatch(fulfillmentId: string) {
    return this.markReadyForDispatchUseCase.execute(fulfillmentId);
  }

  async dispatchFulfillment(fulfillmentId: string, carrier?: string | null, trackingNumber?: string | null) {
    return this.dispatchFulfillmentUseCase.execute(fulfillmentId, carrier, trackingNumber);
  }

  async completeFulfillment(fulfillmentId: string) {
    return this.completeFulfillmentUseCase.execute(fulfillmentId);
  }

  async getPackingSlips(fulfillmentId: string) {
    return this.repo.findPackingSlipsByFulfillmentId(fulfillmentId);
  }

  async getDispatchRecords(fulfillmentId: string) {
    return this.repo.findDispatchRecordsByFulfillmentId(fulfillmentId);
  }

  async getTimeline(fulfillmentId: string) {
    return this.repo.listTimelineByFulfillmentId(fulfillmentId);
  }

  async getFulfillment(id: string) {
    return this.repo.findById(id);
  }

  async listFulfillments(orderId?: string) {
    return orderId ? this.repo.findByOrderId(orderId) : this.repo.findAll();
  }
}
