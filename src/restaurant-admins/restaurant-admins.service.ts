import { Injectable } from '@nestjs/common';
import { CreateRestaurantAdminDto } from './dto/create-restaurant-admin.dto';
import { UpdateRestaurantAdminDto } from './dto/update-restaurant-admin.dto';

@Injectable()
export class RestaurantAdminsService {
  create(createRestaurantAdminDto: CreateRestaurantAdminDto) {
    return 'This action adds a new restaurantAdmin';
  }

  findAll() {
    return `This action returns all restaurantAdmins`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurantAdmin`;
  }

  update(id: number, updateRestaurantAdminDto: UpdateRestaurantAdminDto) {
    return `This action updates a #${id} restaurantAdmin`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurantAdmin`;
  }
}
