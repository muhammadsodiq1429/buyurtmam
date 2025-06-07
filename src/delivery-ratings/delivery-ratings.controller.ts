import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeliveryRatingsService } from './delivery-ratings.service';
import { CreateDeliveryRatingDto } from './dto/create-delivery-rating.dto';
import { UpdateDeliveryRatingDto } from './dto/update-delivery-rating.dto';

@Controller('delivery-ratings')
export class DeliveryRatingsController {
  constructor(private readonly deliveryRatingsService: DeliveryRatingsService) {}

  @Post()
  create(@Body() createDeliveryRatingDto: CreateDeliveryRatingDto) {
    return this.deliveryRatingsService.create(createDeliveryRatingDto);
  }

  @Get()
  findAll() {
    return this.deliveryRatingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveryRatingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeliveryRatingDto: UpdateDeliveryRatingDto) {
    return this.deliveryRatingsService.update(+id, updateDeliveryRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryRatingsService.remove(+id);
  }
}
