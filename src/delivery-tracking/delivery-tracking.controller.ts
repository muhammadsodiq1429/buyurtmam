import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeliveryTrackingService } from './delivery-tracking.service';
import { CreateDeliveryTrackingDto } from './dto/create-delivery-tracking.dto';
import { UpdateDeliveryTrackingDto } from './dto/update-delivery-tracking.dto';

@Controller('delivery-tracking')
export class DeliveryTrackingController {
  constructor(private readonly deliveryTrackingService: DeliveryTrackingService) {}

  @Post()
  create(@Body() createDeliveryTrackingDto: CreateDeliveryTrackingDto) {
    return this.deliveryTrackingService.create(createDeliveryTrackingDto);
  }

  @Get()
  findAll() {
    return this.deliveryTrackingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveryTrackingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeliveryTrackingDto: UpdateDeliveryTrackingDto) {
    return this.deliveryTrackingService.update(+id, updateDeliveryTrackingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryTrackingService.remove(+id);
  }
}
