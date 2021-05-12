import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApplicationException } from 'src/app/app.exception';
import { OperationResult, Pagination } from 'src/app/common';
import { removeUndefined } from 'src/common';
import { ProductDocument, PRODUCTS } from './products.schema';
import { SearchProductReqDto } from './req/search-product.dto';
import { ProductBriefDto, ProductDto } from './res';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(PRODUCTS) private productModel: Model<ProductDocument>) {}

  async findAll(req: SearchProductReqDto): Promise<OperationResult<Pagination<ProductBriefDto>>> {
    const { skip, limit, search, sort } = req;
    const condition = removeUndefined({
      brand: search?.brand ? { $in: search.brand } : undefined,
      name: search?.name || undefined,
      'variants.listPrice': search?.price || undefined,
      'variants.color': search?.color ? { $in: search.color } : undefined,
      isActive: true,
    });

    const sortObj = removeUndefined({
      brand: sort?.brand ? { $in: sort.brand } : undefined,
      name: sort?.name || undefined,
      'variants.listPrice': sort?.price || undefined,
      'variants.color': sort?.color ? { $in: sort.color } : undefined,
    });

    const [products, total] = await Promise.all([
      this.productModel.find(condition).sort(sortObj).skip(skip).limit(limit).lean(),
      this.productModel.countDocuments(condition),
    ]);

    // products.map(product => {
    //   this.trackingService.updateByProductId({
    //     productId: product._id,
    //     actionTime: new Date(),
    //     actions: {
    //       filtering: 1,
    //       searching: 1,
    //     },
    //   });
    // });

    return OperationResult.ok(new Pagination({ data: products.map(i => new ProductBriefDto(i)), total }));
  }

  async getProductDetails(id: string): Promise<OperationResult<ProductDto>> {
    const foundProduct = await this.productModel.findById(id).lean();
    if (!foundProduct) {
      throw ApplicationException.EntityNotFound(id);
    }

    // await this.trackingService.updateByProductId({
    //   productId: foundProduct._id,
    //   actionTime: new Date(),
    //   actions: {
    //     filtering: 0,
    //     searching: 0,
    //     viewing: 1,
    //   },
    // });

    return OperationResult.ok(new ProductDto(foundProduct));
  }
}
