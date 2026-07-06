export type PaymentStatus = 'PENDING' | 'INITIALIZED' | 'PROCESSING' | 'SUCCESS' | 'FAILED' | 'CANCELLED' | 'REFUNDED' | 'PARTIALLY_REFUNDED';
export type PaymentGateway = 'PAYSTACK';

export interface PaymentProps {
  id?: string;
  paymentNumber?: string;
  orderId: string;
  customerId?: string | null;
  gateway?: PaymentGateway;
  currency?: string;
  amount: number;
  status?: PaymentStatus;
  gatewayReference?: string | null;
  authorizationReference?: string | null;
  paidAt?: Date | null;
  failureReason?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Payment {
  private readonly props: PaymentProps & { status: PaymentStatus };

  constructor(props: PaymentProps) {
    this.props = {
      ...props,
      status: props.status ?? 'PENDING',
      gateway: props.gateway ?? 'PAYSTACK',
      currency: props.currency ?? 'USD',
      gatewayReference: props.gatewayReference ?? null,
      authorizationReference: props.authorizationReference ?? null,
      paidAt: props.paidAt ?? null,
      failureReason: props.failureReason ?? null,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  get id(): string | undefined { return this.props.id; }
  get paymentNumber(): string { return this.props.paymentNumber ?? 'PAY-000001'; }
  get orderId(): string { return this.props.orderId; }
  get customerId(): string | null | undefined { return this.props.customerId; }
  get gateway(): PaymentGateway { return this.props.gateway ?? 'PAYSTACK'; }
  get currency(): string { return this.props.currency ?? 'USD'; }
  get amount(): number { return this.props.amount; }
  get status(): PaymentStatus { return this.props.status; }
  get gatewayReference(): string | null { return this.props.gatewayReference ?? null; }
  get authorizationReference(): string | null { return this.props.authorizationReference ?? null; }
  get paidAt(): Date | null { return this.props.paidAt ?? null; }
  get failureReason(): string | null { return this.props.failureReason ?? null; }
  get createdAt(): Date { return this.props.createdAt ?? new Date(); }
  get updatedAt(): Date { return this.props.updatedAt ?? new Date(); }

  initialize(): void {
    if (this.props.status === 'SUCCESS') {
      throw new Error('A successful payment cannot be modified.');
    }

    this.props.status = 'INITIALIZED';
    this.props.updatedAt = new Date();
  }

  markProcessing(): void {
    if (this.props.status === 'SUCCESS') {
      throw new Error('A successful payment cannot be modified.');
    }

    this.props.status = 'PROCESSING';
    this.props.updatedAt = new Date();
  }

  markSuccessful(gatewayReference: string): void {
    if (this.props.status === 'SUCCESS') {
      throw new Error('A successful payment cannot be modified.');
    }

    this.props.gatewayReference = gatewayReference;
    this.props.status = 'SUCCESS';
    this.props.paidAt = new Date();
    this.props.updatedAt = new Date();
  }

  markFailed(reason: string): void {
    if (this.props.status === 'SUCCESS') {
      throw new Error('A successful payment cannot be modified.');
    }

    this.props.status = 'FAILED';
    this.props.failureReason = reason;
    this.props.updatedAt = new Date();
  }

  cancel(): void {
    if (this.props.status === 'SUCCESS') {
      throw new Error('A successful payment cannot be modified.');
    }

    this.props.status = 'CANCELLED';
    this.props.updatedAt = new Date();
  }

  requestRefund(): void {
    if (this.props.status !== 'SUCCESS') {
      throw new Error('Only successful payments can be refunded.');
    }

    this.props.status = 'REFUNDED';
    this.props.updatedAt = new Date();
  }

  completeRefund(): void {
    if (this.props.status !== 'REFUNDED') {
      throw new Error('Refund has not been requested.');
    }

    this.props.status = 'REFUNDED';
    this.props.updatedAt = new Date();
  }
}
