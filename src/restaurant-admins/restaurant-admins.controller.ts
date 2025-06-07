import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestaurantAdminsService } from './restaurant-admins.service';
import { CreateRestaurantAdminDto } from './dto/create-restaurant-admin.dto';
import { UpdateRestaurantAdminDto } from './dto/update-restaurant-admin.dto';

@Controller('restaurant-admins')
export class RestaurantAdminsController {
  constructor(private readonly restaurantAdminsService: RestaurantAdminsService) {}

  @Post()
  create(@Body() createRestaurantAdminDto: CreateRestaurantAdminDto) {
    return this.restaurantAdminsService.create(createRestaurantAdminDto);
  }

  @Get()
  findAll() {
    return this.restaurantAdminsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantAdminsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestaurantAdminDto: UpdateRestaurantAdminDto) {
    return this.restaurantAdminsService.update(+id, updateRestaurantAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantAdminsService.remove(+id);
  }
}
