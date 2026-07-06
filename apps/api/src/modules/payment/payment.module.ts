import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentController } from './presentation/controllers/payment.controller';
import { PaymentService } from './application/services/payment.service';
import { CreatePaymentUseCase } from './application/use-cases/create-payment.use-case';
import { HandleWebhookUseCase } from './application/use-cases/handle-webhook.use-case';
import { InitializePaymentUseCase } from './application/use-cases/initialize-payment.use-case';
import { RequestRefundUseCase } from './application/use-cases/request-refund.use-case';
import { VerifyPaymentUseCase } from './application/use-cases/verify-payment.use-case';
import { PaystackGateway } from './infrastructure/gateways/paystack.gateway';
import { FetchHttpClient } from './infrastructure/http/fetch-http-client';
import { PrismaPaymentRepository } from './infrastructure/persistence/prisma/prisma-payment.repository';

@Module({
  imports: [ConfigModule],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    CreatePaymentUseCase,
    InitializePaymentUseCase,
    VerifyPaymentUseCase,
    HandleWebhookUseCase,
    RequestRefundUseCase,
    PaystackGateway,
    FetchHttpClient,
    {
      provide: 'PaymentRepository',
      useFactory: (prismaClient: any) => new PrismaPaymentRepository(prismaClient),
      inject: ['PRISMA_CLIENT'],
    },
  ],
  exports: ['PaymentRepository'],
})
export class PaymentModule {}
