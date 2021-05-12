import { ApiProperty } from '@nestjs/swagger';
import { LeanDocument } from 'mongoose';
import { Pagination, ServiceResponse } from '../../app/common';
import { ProductDocument } from '../products.schema';

export class Variant {
  @ApiProperty()
  listPrice: number;

  @ApiProperty()
  salePrice: number;

  @ApiProperty()
  imageLink: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  quantity: number;
}

export class ProductBriefDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  sku: string;

  @ApiProperty({ type: Variant, isArray: true })
  variants: Variant[];

  constructor(product: LeanDocument<ProductDocument>) {
    this.id = product._id;
    this.name = product.name;
    this.brand = product.brand;
    this.category = product.category;
    this.rating = product.rating;
    this.sku = product.sku;
    this.variants = product.variants;
  }
}

class ProductBriefPagination extends Pagination<ProductBriefDto> {
  @ApiProperty({ type: ProductBriefDto, isArray: true })
  data: ProductBriefDto[];

  @ApiProperty()
  total: number;
}

export class ProductBriefListRes extends ServiceResponse<ProductBriefPagination> {
  @ApiProperty({ type: ProductBriefPagination })
  data: ProductBriefPagination;

  @ApiProperty()
  status: string;
}
