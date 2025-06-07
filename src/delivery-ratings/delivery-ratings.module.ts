import { Module } from '@nestjs/common';
import { DeliveryRatingsService } from './delivery-ratings.service';
import { DeliveryRatingsController } from './delivery-ratings.controller';

@Module({
  controllers: [DeliveryRatingsController],
  providers: [DeliveryRatingsService],
})
export class DeliveryRatingsModule {}
