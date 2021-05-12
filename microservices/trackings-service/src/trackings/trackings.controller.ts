import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ServiceResponse } from 'src/app/common';
import { UpdateByProductIdReqDto } from './req/update-by-product-id.dto';
import { TrackingDto, TrackingRes } from './res/tracking.dto';
import { TrackingsService } from './trackings.service';

@ApiTags('Tracking')
@Controller('trackings')
export class TrackingsController {
  constructor(private readonly trackingsService: TrackingsService) {}

  @Get(':productId')
  @ApiOperation({ summary: 'Get Tracking By Product Id' })
  @ApiOkResponse({ type: TrackingRes })
  async findByProductId(@Param('productId') productId: string): Promise<ServiceResponse<TrackingDto>> {
    const res = await this.trackingsService.findByProductId(productId);
    return ServiceResponse.fromResult(res);
  }

  @Put(':productId')
  async updateByProductId(
    @Param('productId') productId: string,
    @Body() data: UpdateByProductIdReqDto,
  ): Promise<boolean> {
    const res = await this.trackingsService.updateByProductId(productId, data);
    return res;
  }
}
