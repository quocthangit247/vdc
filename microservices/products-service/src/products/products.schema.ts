import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Specification, Variant } from './typing';

export const PRODUCTS = 'products';
export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  brand: string;

  @Prop()
  category: string;

  @Prop()
  isActive: boolean;

  @Prop()
  specifications: Specification[];

  @Prop()
  rating: number;

  @Prop()
  sku: string;

  @Prop()
  variants: Variant[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
