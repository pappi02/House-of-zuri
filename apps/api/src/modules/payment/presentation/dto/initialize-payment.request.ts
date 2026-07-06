import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class InitializePaymentRequest {
  @IsString()
  orderId!: string;

  @IsOptional()
  @IsString()
  customerId?: string;

  @IsNumber()
  @Min(0)
  amount!: number;

  @IsOptional()
  @IsString()
  currency?: string;
}
