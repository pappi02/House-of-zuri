import { Payment } from '../../domain/entities/payment.entity';
import { HandleWebhookUseCase } from './handle-webhook.use-case';

describe('HandleWebhookUseCase', () => {
  it('ignores a webhook that has already been processed', async () => {
    const repository = {
      isWebhookProcessed: jest.fn().mockResolvedValue(true),
      saveWebhookEvent: jest.fn().mockResolvedValue(undefined),
      appendOutboxEvent: jest.fn().mockResolvedValue(undefined),
    };

    const useCase = new HandleWebhookUseCase(repository as any);
    const payment = new Payment({ orderId: 'order-1', amount: 100 });
    payment.markSuccessful('gateway-ref');

    const result = await useCase.execute(payment, { eventId: 'evt-1', gatewayReference: 'gateway-ref', status: 'success' });

    expect(result.status).toBe('SUCCESS');
    expect(repository.saveWebhookEvent).not.toHaveBeenCalled();
  });
});
