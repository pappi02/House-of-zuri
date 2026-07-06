export type WorkOrderWorkflowStatus =
  | 'CREATED'
  | 'WAITING_FOR_MEASUREMENTS'
  | 'READY_TO_START'
  | 'CUTTING'
  | 'SEWING'
  | 'FINISHING'
  | 'QUALITY_CONTROL'
  | 'REWORK_REQUIRED'
  | 'READY_FOR_FULFILLMENT'
  | 'COMPLETED';

export const WORK_ORDER_INITIAL_STATUS: WorkOrderWorkflowStatus = 'CREATED';
