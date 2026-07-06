import { ManufacturingJob } from '../entities/manufacturing-job.entity';

describe('ManufacturingJob workflow', () => {
  it('creates a job and completes it', () => {
    const job = new ManufacturingJob('job-1', null, 'order-1');
    expect(job.status).toBe('CREATED');
    expect(job.complete().event).toBe('MANUFACTURING_COMPLETED');
    expect(job.status).toBe('COMPLETED');
  });

  it('rejects cancelling a completed job', () => {
    const job = new ManufacturingJob('job-2', null, 'order-2');
    job.complete();
    expect(() => job.cancel('No longer needed')).toThrow();
  });
});
