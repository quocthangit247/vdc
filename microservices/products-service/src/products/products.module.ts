import { Global, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { grpcTrackingClientOption } from 'src/config/tracking-client-option';
import { ProductsController } from './products.controller';
import { PRODUCTS, ProductSchema } from './products.schema';
import { ProductsService } from './products.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: PRODUCTS, schema: ProductSchema, collection: 'products' }]),
    ClientsModule.register([
      {
        name: 'TRACKING_PACKAGE',
        ...grpcTrackingClientOption,
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
