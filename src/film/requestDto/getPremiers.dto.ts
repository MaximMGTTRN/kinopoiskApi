import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEnum,
  IsOptional,
  IsPositive,
  Max,
  Min,
} from 'class-validator';
import { MonthsEnum } from 'src/enums/monthsEnum';

export class GetPremiersDto {
  @ApiProperty({
    example: 2022,
  })
  @IsDefined()
  readonly year: number;

  @ApiProperty({
    example: 'DECEMBER',
    type: MonthsEnum,
  })
  @IsDefined()
  @IsEnum(MonthsEnum)
  readonly month: MonthsEnum;
}
