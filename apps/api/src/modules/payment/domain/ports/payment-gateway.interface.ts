export interface PaymentGateway {
  initializePayment(input: { paymentId: string; paymentNumber: string; amount: number; currency: string; orderId: string; customerId?: string | null }): Promise<{ authorizationUrl?: string | null; gatewayReference: string }>;
  verifyPayment(input: { gatewayReference: string }): Promise<{ verified: boolean; amount?: number; currency?: string; status?: string; authorizationReference?: string | null }>;
  requestRefund(input: { paymentId: string; amount?: number }): Promise<{ refunded: boolean; status?: string }>;
  verifyWebhook(input: { signature: string; body: string; secret: string }): boolean;
}
