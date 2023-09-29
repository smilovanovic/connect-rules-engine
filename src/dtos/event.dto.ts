import { IsDefined, IsOptional, IsString } from 'class-validator';

export class EventDto {
  @IsDefined()
  @IsString()
  type: string;

  @IsOptional()
  params?: Record<string, any>;
}
