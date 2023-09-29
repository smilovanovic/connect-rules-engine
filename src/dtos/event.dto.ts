import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsString } from 'class-validator';

export class EventDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  type: string;

  @ApiProperty()
  @IsOptional()
  params?: Record<string, any>;
}
