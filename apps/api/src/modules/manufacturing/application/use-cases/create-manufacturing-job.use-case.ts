import { Inject, Injectable } from '@nestjs/common';
import { ManufacturingRepository } from '../../domain/repositories/manufacturing.repository';
import { ManufacturingJob } from '../../domain/entities/manufacturing-job.entity';
import { TimelineEvent } from '../../domain/entities/timeline-event.entity';

@Injectable()
export class CreateManufacturingJobUseCase {
  constructor(@Inject('ManufacturingRepository') private readonly repo: ManufacturingRepository) {}

  async execute(input: { orderId: string; priority?: number }): Promise<ManufacturingJob> {
    const job = new ManufacturingJob(input.orderId, null, input.orderId, 'CREATED', input.priority);
    return this.repo.createJob(job);
  }
}
