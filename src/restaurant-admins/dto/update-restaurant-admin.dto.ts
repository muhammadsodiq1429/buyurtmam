import { PartialType } from '@nestjs/swagger';
import { CreateRestaurantAdminDto } from './create-restaurant-admin.dto';

export class UpdateRestaurantAdminDto extends PartialType(CreateRestaurantAdminDto) {}
