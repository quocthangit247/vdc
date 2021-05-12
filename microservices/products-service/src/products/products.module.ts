import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { PRODUCTS, ProductSchema } from './products.schema';
import { ProductsService } from './products.service';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: PRODUCTS, schema: ProductSchema, collection: 'products' }])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
