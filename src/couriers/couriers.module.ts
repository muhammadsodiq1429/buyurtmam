import { Module } from '@nestjs/common';
import { CouriersService } from './couriers.service';
import { CouriersController } from './couriers.controller';

@Module({
  controllers: [CouriersController],
  providers: [CouriersService],
})
export class CouriersModule {}
