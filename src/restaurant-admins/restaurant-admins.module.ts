import { Module } from '@nestjs/common';
import { RestaurantAdminsService } from './restaurant-admins.service';
import { RestaurantAdminsController } from './restaurant-admins.controller';

@Module({
  controllers: [RestaurantAdminsController],
  providers: [RestaurantAdminsService],
})
export class RestaurantAdminsModule {}
