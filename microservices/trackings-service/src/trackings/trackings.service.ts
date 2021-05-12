import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import { ApplicationException } from 'src/app/app.exception';
import { OperationResult } from 'src/app/common';
import { checkEqualDate } from 'src/common';
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

  async updateByProductId(productId: string, data: UpdateByProductIdReqDto): Promise<boolean> {
    const { actionTime, actions } = data;

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

    this.countAction(foundTracking, Action.filter, actions, new Date(actionTime));
    this.countAction(foundTracking, Action.search, actions, new Date(actionTime));
    if (actions.viewing) {
      this.countAction(foundTracking, Action.view, actions, new Date(actionTime));
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
    let hasCompleted = false;
    tracking[updatedField].forEach(item => {
      if (checkEqualDate(actionTime.toISOString(), item.createdAt.toISOString())) {
        item.counter += actions[updatedField];
        hasCompleted = true;
      }
    });
    if (hasCompleted) return;
    tracking[updatedField].push({ counter: actions[updatedField], updatedAt: new Date(), createdAt: new Date() });
  }
}
