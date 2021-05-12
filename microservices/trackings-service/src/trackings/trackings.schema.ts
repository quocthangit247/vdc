import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ActionTracking } from './typing';

export const TRACKINGS = 'trackings';
export type TrackingDocument = Tracking & Document;

@Schema()
export class Tracking {
  @Prop()
  productId: string;

  @Prop()
  searching: ActionTracking[];

  @Prop()
  filtering: ActionTracking[];

  @Prop()
  viewing: ActionTracking[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const TrackingSchema = SchemaFactory.createForClass(Tracking);
