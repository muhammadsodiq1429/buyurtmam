import { Module } from '@nestjs/common';
import { DeliveryTrackingService } from './delivery-tracking.service';
import { DeliveryTrackingController } from './delivery-tracking.controller';

@Module({
  controllers: [DeliveryTrackingController],
  providers: [DeliveryTrackingService],
})
export class DeliveryTrackingModule {}
