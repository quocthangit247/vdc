import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from 'src/products/products.module';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MongooseModule.forRoot(process.env.MONGO_URL), ProductsModule],
})
export class AppModule {
  constructor() {}
}
