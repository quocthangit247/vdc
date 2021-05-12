import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackingsModule } from 'src/trackings/trackings.module';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MongooseModule.forRoot(process.env.MONGO_URL), TrackingsModule],
})
export class AppModule {
  constructor() {}
}
