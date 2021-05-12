import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

class SearchOption {
  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  price: number;

  @ApiPropertyOptional({ isArray: true, type: String })
  brand: string[];

  @ApiPropertyOptional({ isArray: true, type: String })
  color: string[];
}

class SortOption {
  @ApiPropertyOptional()
  name: number;

  @ApiPropertyOptional()
  price: number;

  @ApiPropertyOptional()
  brand: number;

  @ApiPropertyOptional()
  color: number;
}

export class SearchProductReqDto {
  @ApiPropertyOptional({ type: SortOption })
  @Type(() => SortOption)
  sort: SortOption;

  @ApiPropertyOptional({ type: SearchOption })
  @Type(() => SearchOption)
  search: SearchOption;

  @ApiPropertyOptional()
  @IsNumber()
  limit: number;

  @ApiPropertyOptional()
  @IsNumber()
  skip: number;
}
