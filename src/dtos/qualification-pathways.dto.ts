import { Type } from 'class-transformer';
import { IsArray, IsDefined, ValidateNested } from 'class-validator';
import { TopLevelConditionDto } from './conditions.dto';
import { EventDto } from './event.dto';
import { ApiProperty } from '@nestjs/swagger';

export class QualificationPathwayDto {
  @ApiProperty({
    type: TopLevelConditionDto,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => TopLevelConditionDto)
  conditions: TopLevelConditionDto;

  @ApiProperty({
    type: EventDto,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => EventDto)
  event: EventDto;
}

export class QualificationPathwaysDto {
  @ApiProperty({
    type: QualificationPathwayDto,
    isArray: true,
  })
  @IsDefined()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => QualificationPathwayDto)
  qualificationPathways: QualificationPathwayDto[];

  @ApiProperty()
  @IsDefined()
  facts: Record<string, any>;
}
