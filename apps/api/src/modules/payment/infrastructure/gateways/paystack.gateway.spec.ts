import { ConfigService } from '@nestjs/config';
import { PaystackGateway } from './paystack.gateway';

describe('PaystackGateway', () => {
  it('verifies webhook signatures using the configured secret', () => {
    const mockConfig = { get: jest.fn().mockReturnValue('secret') } as unknown as ConfigService;
    const mockHttp = { post: jest.fn(), get: jest.fn() } as unknown as any;
    const gateway = new PaystackGateway(mockConfig, mockHttp);
    const payload = JSON.stringify({ event: 'charge.success' });
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha512', 'secret');
    hmac.update(payload);
    const signature = hmac.digest('hex');

    expect(gateway.verifyWebhookSignature({ signature, payload, secret: 'secret' })).toBe(true);
  });
});
