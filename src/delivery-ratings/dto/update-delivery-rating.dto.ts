import { PartialType } from '@nestjs/swagger';
import { CreateDeliveryRatingDto } from './create-delivery-rating.dto';

export class UpdateDeliveryRatingDto extends PartialType(CreateDeliveryRatingDto) {}
