export class WorkflowError extends Error {
  constructor(public id: string, public currentStatus: string | undefined, public action: string) {
    super(`Invalid workflow transition for ${id}: cannot perform ${action} from status ${currentStatus}`);
    this.name = 'WorkflowError';
  }
}

export default WorkflowError;
