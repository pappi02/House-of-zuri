import { IsString } from 'class-validator';

export class WebhookRequest {
  @IsString()
  signature!: string;

  @IsString()
  body!: string;
}
