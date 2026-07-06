import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ConvertGuestRequest {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  customerId!: string;
}
