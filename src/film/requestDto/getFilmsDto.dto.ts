import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { OrderOrientationEnum } from 'src/enums/orderOrientationEnum';
import { OrderTypeEnum } from 'src/enums/orderTypeEnum';

export class GetFilmsDto {
  @ApiProperty({
    example: 'США',
  })
  @IsOptional()
  @IsString()
  public country?: string;

  @ApiProperty({
    example: ['ужасы'],
  })
  @IsOptional()
  public genres?: string[];

  @ApiProperty({
    example: 1,
  })
  @IsOptional()
  public offset?: string;

  @ApiProperty({
    example: 'Люди',
  })
  @IsOptional()
  @IsString()
  public nameFilm?: string;

  @ApiProperty({
    example: 'nameRu',
  })
  @IsEnum(OrderTypeEnum)
  public orderType: OrderTypeEnum;

  @ApiProperty({
    example: 'ASC',
  })
  @IsEnum(OrderOrientationEnum)
  public orderOrientation: OrderOrientationEnum;
}
