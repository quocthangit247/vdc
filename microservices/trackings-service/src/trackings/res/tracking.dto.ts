import { ApiProperty } from '@nestjs/swagger';
import { ServiceResponse } from 'src/app/common';
import { Tracking } from '../trackings.schema';

class Variant {
  @ApiProperty()
  list_price: number;

  @ApiProperty()
  sale_price: number;

  @ApiProperty()
  image_link: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  quantity: number;
}

export class TrackingDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  rating: string;

  @ApiProperty()
  sku: string;

  @ApiProperty({ type: Variant, isArray: true })
  variants: Variant[];

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  constructor(product: Tracking) {
    Object.assign(this, product);
  }
}

export class TrackingRes extends ServiceResponse<Tracking> {
  @ApiProperty({ type: Tracking })
  data: Tracking;

  @ApiProperty()
  status: string;
}
