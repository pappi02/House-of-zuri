export abstract class PaymentDomainEvent {
  constructor(readonly occurredAt: Date = new Date()) {}
}

export class PaymentInitializedEvent extends PaymentDomainEvent {
  constructor(readonly paymentId: string, readonly paymentNumber: string) {
    super();
  }
}

export class PaymentSucceededEvent extends PaymentDomainEvent {
  constructor(readonly paymentId: string, readonly paymentNumber: string, readonly gatewayReference: string) {
    super();
  }
}

export class PaymentFailedEvent extends PaymentDomainEvent {
  constructor(readonly paymentId: string, readonly paymentNumber: string, readonly reason: string) {
    super();
  }
}

export class PaymentRefundedEvent extends PaymentDomainEvent {
  constructor(readonly paymentId: string, readonly paymentNumber: string) {
    super();
  }
}
