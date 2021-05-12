import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcTrackingClientOption: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:34343',
    package: 'tracking',
    protoPath: join(__dirname, './tracking.proto'),
  },
};

console.log('>>>>>>>>>>>>>>>>>>>', '234678934567', join(__dirname, './tracking.proto'));

export interface ActionDto {
  searching: number;
  filtering: number;
  viewing?: number;
}

export interface UpdateByProductIdReqDto {
  actions: ActionDto;
  actionTime: Date;
  productId: string;
}

export interface TrackingService {
  updateByProductId(request: UpdateByProductIdReqDto): any;
}
