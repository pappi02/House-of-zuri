import { IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreateOrderRequest {
  @IsOptional()
  @IsString()
  customerId?: string;

  @IsOptional()
  @IsString()
  guestEmail?: string;

  @IsOptional()
  @IsString()
  guestPhone?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
