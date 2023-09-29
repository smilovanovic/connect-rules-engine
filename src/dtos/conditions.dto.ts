import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export class ConditionDto {
  @ApiProperty({
    description: 'Required if "all", "any" and "fact" are undefined',
    type: ConditionDto,
  })
  @ValidateIf((o) => !o.any && !o.all && !o.fact)
  @IsDefined()
  @ValidateNested()
  @Type(() => ConditionDto)
  not?: ConditionDto;

  @ApiProperty({
    description: 'Required if "any", "not" and "fact" are undefined',
    type: ConditionDto,
    isArray: true,
  })
  @ValidateIf((o) => !o.any && !o.fact && !o.not)
  @IsDefined()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ConditionDto)
  all?: ConditionDto[];

  @ApiProperty({
    description: 'Required if "all", "not" and "fact" are undefined',
    type: ConditionDto,
    isArray: true,
  })
  @ValidateIf((o) => !o.all && !o.fact && !o.not)
  @IsDefined()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ConditionDto)
  any?: ConditionDto[];

  @ApiProperty({
    description: 'Required if "all", "any" and "not" are undefined',
  })
  @ValidateIf((o) => !o.all && !o.any && !o.not)
  @IsDefined()
  @IsString()
  fact?: string;

  @ApiProperty({
    description: 'Required if "fact" is defined',
  })
  @ValidateIf((o) => o.fact)
  @IsDefined()
  @IsString()
  operator?: string;

  @ApiProperty({
    description: 'Required if "fact" is defined',
  })
  @ValidateIf((o) => o.fact)
  @IsDefined()
  value?: boolean | number | string;
}

export class TopLevelConditionDto {
  @ApiProperty({
    description: 'Required if "any" is undefined',
    type: ConditionDto,
    isArray: true,
  })
  @ValidateIf((o) => !o.any)
  @IsDefined()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ConditionDto)
  all?: ConditionDto[];

  @ApiProperty({
    description: 'Required if "all" is undefined',
    type: ConditionDto,
    isArray: true,
  })
  @ValidateIf((o) => !o.all)
  @IsDefined()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ConditionDto)
  any?: ConditionDto[];
}
