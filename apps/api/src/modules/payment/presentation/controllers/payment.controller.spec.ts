jest.mock('@nestjs/swagger', () => ({
  ApiOperation: () => () => undefined,
  ApiResponse: () => () => undefined,
  ApiTags: () => () => undefined,
}));

import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentService } from '../../application/services/payment.service';

describe('PaymentController', () => {
  let controller: PaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        {
          provide: PaymentService,
          useValue: {
            createPayment: jest.fn(),
            initializePayment: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get(PaymentController);
  });

  it('initializes a payment from a valid request', () => {
    const service = controller['paymentService'];
    service.createPayment = jest.fn().mockReturnValue({ status: 'PENDING' });
    service.initializePayment = jest.fn().mockReturnValue({ status: 'INITIALIZED' });

    const result = controller.initializePayment({ orderId: 'order-1', amount: 100, currency: 'USD' });

    expect(result.status).toBe('INITIALIZED');
  });
});
