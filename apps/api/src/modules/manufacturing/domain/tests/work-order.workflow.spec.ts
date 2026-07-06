import { WorkOrder } from '../entities/work-order.entity';
import { WorkflowError } from '../errors/workflow-error';

describe('WorkOrder workflow engine', () => {
  it('allows the happy path from measurements to completion', () => {
    const wo = new WorkOrder('wo-1', null, 'job-1', 'item-1', 'product-1', 'variant-1');

    expect(wo.status).toBe('CREATED');
    expect(wo.verifyMeasurements().event).toBe('MEASUREMENTS_VERIFIED');
    expect(wo.status).toBe('READY_TO_START');

    expect(wo.startCutting().event).toBe('CUTTING_STARTED');
    expect(wo.status).toBe('CUTTING');

    expect(wo.completeCutting().event).toBe('CUTTING_COMPLETED');
    expect(wo.status).toBe('SEWING');

    expect(wo.startSewing().event).toBe('SEWING_STARTED');
    expect(wo.status).toBe('SEWING');

    expect(wo.completeSewing().event).toBe('SEWING_COMPLETED');
    expect(wo.status).toBe('FINISHING');

    expect(wo.startFinishing().event).toBe('FINISHING_STARTED');
    expect(wo.status).toBe('FINISHING');

    expect(wo.completeFinishing().event).toBe('FINISHING_COMPLETED');
    expect(wo.status).toBe('QUALITY_CONTROL');

    expect(wo.startQualityControl().event).toBe('QUALITY_CONTROL_STARTED');
    expect(wo.status).toBe('QUALITY_CONTROL');

    expect(wo.passQualityControl().event).toBe('QUALITY_PASSED');
    expect(wo.status).toBe('READY_FOR_FULFILLMENT');

    expect(wo.complete().event).toBe('WORK_ORDER_COMPLETED');
    expect(wo.status).toBe('COMPLETED');
  });

  it('rejects invalid direct transition to ready for fulfillment', () => {
    const wo = new WorkOrder('wo-2', null, 'job-2', 'item-2', 'product-2', 'variant-2');
    expect(() => wo.markReadyForFulfillment()).toThrow(WorkflowError);
  });

  it('supports QC fail and rework loop back to sewing', () => {
    const wo = new WorkOrder('wo-3', null, 'job-3', 'item-3', 'product-3', 'variant-3');
    wo.verifyMeasurements();
    wo.startCutting();
    wo.completeCutting();
    wo.startSewing();
    wo.completeSewing();
    wo.startFinishing();
    wo.completeFinishing();
    wo.startQualityControl();

    expect(wo.failQualityControl().event).toBe('QUALITY_FAILED');
    expect(wo.status).toBe('REWORK_REQUIRED');

    expect(wo.startSewing().event).toBe('SEWING_STARTED');
    expect(wo.status).toBe('SEWING');
  });
});
