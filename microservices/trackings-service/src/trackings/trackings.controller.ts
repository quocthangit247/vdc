import { Controller, Get, Logger, Param } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ServiceResponse } from 'src/app/common';
import { UpdateByProductIdReqDto } from './req/update-by-product-id.dto';
import { TrackingDto, TrackingRes } from './res/tracking.dto';
import { TrackingsService } from './trackings.service';

@ApiTags('Tracking')
@Controller()
export class TrackingsController {
  private logger = new Logger('TrackingsController');
  constructor(private readonly trackingsService: TrackingsService) {}

  @Get('/trackings/:productId')
  @ApiOperation({ summary: 'Get Tracking By Product Id' })
  @ApiOkResponse({ type: TrackingRes })
  async findByProductId(@Param('productId') productId: string): Promise<ServiceResponse<TrackingDto>> {
    const res = await this.trackingsService.findByProductId(productId);
    return ServiceResponse.fromResult(res);
  }

  @GrpcMethod('TrackingsService', 'UpdateByProductId')
  async updateByProductId(data: UpdateByProductIdReqDto): Promise<boolean> {
    this.logger.log('UpdateByProductId ' + data);
    const res = await this.trackingsService.updateByProductId(data);
    return res;
  }
}
