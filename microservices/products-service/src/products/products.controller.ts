import { Body, Controller, Get, Inject, OnModuleInit, Param, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Pagination, ServiceResponse } from 'src/app/common';
import { TrackingService } from 'src/config/tracking-client-option';
import { ProductsService } from './products.service';
import { SearchProductReqDto } from './req/search-product.dto';
import { ProductBriefDto, ProductBriefListRes, ProductDto, ProductRes } from './res';

@ApiTags('Products')
@Controller('products')
export class ProductsController implements OnModuleInit {
  constructor(
    private readonly productsService: ProductsService,
    @Inject('TRACKING_PACKAGE') private readonly client: ClientGrpc,
  ) {}

  trackingService: TrackingService;
  onModuleInit() {
    this.trackingService = this.client.getService<TrackingService>('TrackingsService');
  }

  @Post('/search')
  @ApiOperation({ summary: 'Get Products By Many Conditions' })
  @ApiOkResponse({ type: ProductBriefListRes })
  async findAll(
    @Body() searchProductReqDto: SearchProductReqDto,
  ): Promise<ServiceResponse<Pagination<ProductBriefDto>>> {
    const res = await this.productsService.findAll(searchProductReqDto);
    return ServiceResponse.fromResult(res);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Product Details' })
  @ApiOkResponse({ type: ProductRes })
  async getProductDetails(@Param('id') id: string): Promise<ServiceResponse<ProductDto>> {
    const res = await this.productsService.getProductDetails(id);
    console.log('>>>>>>>>>>>>>>>>>>>', '111111111111');
    this.trackingService.updateByProductId({
      productId: id,
      actionTime: new Date(),
      actions: {
        filtering: 0,
        searching: 0,
        viewing: 1,
      },
    });
    return ServiceResponse.fromResult(res);
  }
}
