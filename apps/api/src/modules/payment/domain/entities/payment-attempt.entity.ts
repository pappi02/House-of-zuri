export interface PaymentAttemptProps {
  id?: string;
  paymentId: string;
  attemptNumber: number;
  gatewayReference?: string | null;
  status?: string;
  requestPayload?: unknown;
  responsePayload?: unknown;
  createdAt?: Date;
}

export class PaymentAttempt {
  constructor(private readonly props: PaymentAttemptProps) {}

  get id(): string | undefined { return this.props.id; }
  get paymentId(): string { return this.props.paymentId; }
  get attemptNumber(): number { return this.props.attemptNumber; }
  get gatewayReference(): string | null | undefined { return this.props.gatewayReference; }
  get status(): string { return this.props.status ?? 'PENDING'; }
  get requestPayload(): unknown { return this.props.requestPayload; }
  get responsePayload(): unknown { return this.props.responsePayload; }
  get createdAt(): Date | undefined { return this.props.createdAt; }
}
