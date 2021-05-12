import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Pagination, ServiceResponse } from 'src/app/common';
import { ProductsService } from './products.service';
import { SearchProductReqDto } from './req/search-product.dto';
import { ProductBriefDto, ProductBriefListRes, ProductDto, ProductRes } from './res';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

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
    return ServiceResponse.fromResult(res);
  }
}
