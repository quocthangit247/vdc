import { ApiProperty } from '@nestjs/swagger';
import { LeanDocument } from 'mongoose';
import { ServiceResponse } from 'src/app/common';
import { ProductDocument } from '../products.schema';
import { ProductBriefDto } from './product-brief.dto';

class Specification {
  @ApiProperty()
  name: string;

  @ApiProperty()
  value: string;
}

export class ProductDto extends ProductBriefDto {
  @ApiProperty({ type: Specification, isArray: true })
  specifications: Specification[];

  @ApiProperty()
  description: string;

  constructor(product: LeanDocument<ProductDocument>) {
    super(product);
    this.specifications = product.specifications;
    this.description = product.description;
  }
}

export class ProductRes extends ServiceResponse<ProductDto> {
  @ApiProperty({ type: ProductDto })
  data: ProductDto;

  @ApiProperty()
  status: string;
}
