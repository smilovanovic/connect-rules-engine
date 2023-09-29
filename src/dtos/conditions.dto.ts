import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export class TopLevelConditionDto {
  @ValidateIf((o) => !o.any)
  @IsDefined()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ConditionDto)
  all?: ConditionDto[];

  @ValidateIf((o) => !o.all)
  @IsDefined()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ConditionDto)
  any?: ConditionDto[];
}

export class ConditionDto {
  @ValidateIf((o) => !o.any && !o.all && !o.fact)
  @IsDefined()
  @ValidateNested()
  @Type(() => ConditionDto)
  not?: ConditionDto;

  @ValidateIf((o) => !o.any && !o.fact && !o.not)
  @IsDefined()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ConditionDto)
  all?: ConditionDto[];

  @ValidateIf((o) => !o.all && !o.fact && !o.not)
  @IsDefined()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ConditionDto)
  any?: ConditionDto[];

  @ValidateIf((o) => !o.all && !o.any && !o.not)
  @IsDefined()
  @IsString()
  fact?: string;

  @ValidateIf((o) => o.fact)
  @IsDefined()
  @IsString()
  operator?: string;

  @ValidateIf((o) => o.fact)
  @IsDefined()
  value?: any;
}
