import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackingsController } from './trackings.controller';
import { TRACKINGS, TrackingSchema } from './trackings.schema';
import { TrackingsService } from './trackings.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: TRACKINGS, schema: TrackingSchema, collection: 'trackings' }])],
  controllers: [TrackingsController],
  providers: [TrackingsService],
})
export class TrackingsModule {}
