import { IsInt, Min } from 'class-validator';

export class UpdateQuantityRequest {
  @IsInt()
  @Min(1)
  quantity!: number;
}
