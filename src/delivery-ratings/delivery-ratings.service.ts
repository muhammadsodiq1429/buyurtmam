import { Injectable } from '@nestjs/common';
import { CreateDeliveryRatingDto } from './dto/create-delivery-rating.dto';
import { UpdateDeliveryRatingDto } from './dto/update-delivery-rating.dto';

@Injectable()
export class DeliveryRatingsService {
  create(createDeliveryRatingDto: CreateDeliveryRatingDto) {
    return 'This action adds a new deliveryRating';
  }

  findAll() {
    return `This action returns all deliveryRatings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deliveryRating`;
  }

  update(id: number, updateDeliveryRatingDto: UpdateDeliveryRatingDto) {
    return `This action updates a #${id} deliveryRating`;
  }

  remove(id: number) {
    return `This action removes a #${id} deliveryRating`;
  }
}
