import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import { ApplicationException } from 'src/app/app.exception';
import { OperationResult } from 'src/app/common';
import { ActionDto, UpdateByProductIdReqDto } from './req/update-by-product-id.dto';
import { TrackingDto } from './res/tracking.dto';
import { TrackingDocument, TRACKINGS } from './trackings.schema';
import { Action } from './typing';

@Injectable()
export class TrackingsService {
  constructor(@InjectModel(TRACKINGS) private trackingModel: Model<TrackingDocument>) {}

  async findByProductId(productId: string): Promise<OperationResult<TrackingDto>> {
    const foundTracking = await this.trackingModel.findOne({ productId }).lean();
    if (!foundTracking) {
      throw ApplicationException.EntityNotFound();
    }

    return OperationResult.ok(new TrackingDto(foundTracking));
  }

  async updateByProductId(data: UpdateByProductIdReqDto): Promise<boolean> {
    const { productId, actionTime, actions } = data;
    console.log('>>>>>>>>>>>>>>>>>>>', '11111111 - updateByProductId', data);

    let foundTracking = await this.trackingModel.findOne({ productId }).lean();
    if (!foundTracking) {
      foundTracking = new this.trackingModel({
        productId,
        searching: [
          {
            counter: 0,
            updatedAt: new Date(),
            createdAt: new Date(),
          },
        ],
        filtering: [
          {
            counter: 0,
            updatedAt: new Date(),
            createdAt: new Date(),
          },
        ],
        viewing: [
          {
            counter: 0,
            updatedAt: new Date(),
            createdAt: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    this.countAction(foundTracking, Action.filter, actions, actionTime);
    this.countAction(foundTracking, Action.search, actions, actionTime);
    if (actions.viewing) {
      this.countAction(foundTracking, Action.view, actions, actionTime);
    }

    await this.trackingModel.findByIdAndUpdate(foundTracking._id, foundTracking, { upsert: true });

    return true;
  }

  private countAction(
    tracking: LeanDocument<TrackingDocument>,
    updatedField: Action,
    actions: ActionDto,
    actionTime: Date,
  ) {
    tracking[updatedField].forEach(item => {
      if (item.createdAt === actionTime) {
        item.counter += actions[updatedField];
      }
    });
  }
}
