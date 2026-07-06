import { IsString } from 'class-validator';

export class VerifyPaymentRequest {
  @IsString()
  gatewayReference!: string;
}
