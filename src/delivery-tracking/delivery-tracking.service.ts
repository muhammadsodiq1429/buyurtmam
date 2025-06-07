import { Injectable } from '@nestjs/common';
import { CreateDeliveryTrackingDto } from './dto/create-delivery-tracking.dto';
import { UpdateDeliveryTrackingDto } from './dto/update-delivery-tracking.dto';

@Injectable()
export class DeliveryTrackingService {
  create(createDeliveryTrackingDto: CreateDeliveryTrackingDto) {
    return 'This action adds a new deliveryTracking';
  }

  findAll() {
    return `This action returns all deliveryTracking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deliveryTracking`;
  }

  update(id: number, updateDeliveryTrackingDto: UpdateDeliveryTrackingDto) {
    return `This action updates a #${id} deliveryTracking`;
  }

  remove(id: number) {
    return `This action removes a #${id} deliveryTracking`;
  }
}
