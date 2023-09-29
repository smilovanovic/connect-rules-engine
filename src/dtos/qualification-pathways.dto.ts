import { Type } from 'class-transformer';
import { IsArray, IsDefined, ValidateNested } from 'class-validator';
import { TopLevelConditionDto } from './conditions.dto';
import { EventDto } from './event.dto';

export class QualificationPathwayDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => TopLevelConditionDto)
  conditions: TopLevelConditionDto;

  @IsDefined()
  @ValidateNested()
  @Type(() => EventDto)
  event: EventDto;
}

export class QualificationPathwaysDto {
  @IsDefined()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => QualificationPathwayDto)
  qualificationPathways: QualificationPathwayDto[];

  @IsDefined()
  facts: Record<string, any>;
}
