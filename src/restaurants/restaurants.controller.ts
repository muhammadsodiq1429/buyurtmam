import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { RestaurantsService } from "./restaurants.service";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";

@ApiTags("Restaurants")
@Controller("restaurants")
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi restaurant qo‘shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi qo‘shilgan restaurant",
  })
  @ApiResponse({ status: 409, description: "Restaurant name already exists" })
  @ApiResponse({
    status: 409,
    description: "Restaurant phone number already exists",
  })
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha restaurantlar ro‘yxati" })
  @ApiResponse({
    status: 200,
    description: "Restaurantlar ro‘yxati",
  })
  @ApiResponse({ status: 404, description: "Restaurants not found" })
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha bitta restaurant olish" })
  @ApiResponse({
    status: 200,
    description: "Bitta restaurant",
  })
  @ApiResponse({
    status: 404,
    description: "Restaurant not found with ID ${id}",
  })
  findOne(@Param("id", ParseIntPipe) id: string) {
    return this.restaurantsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "ID bo‘yicha restaurant ma'lumotlarini yangilash" })
  @ApiParam({ name: "id", type: Number, description: "Restaurant ID" })
  @ApiResponse({
    status: 200,
    description: "Yangilangan restaurant",
  })
  @ApiResponse({
    status: 404,
    description: "Restaurant not found with ID ${id}",
  })
  @ApiResponse({
    status: 409,
    description: "Another restaurant with same name exists",
  })
  @ApiResponse({
    status: 409,
    description: "Another restaurant with same phone number exists",
  })
  update(
    @Param("id", ParseIntPipe) id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto
  ) {
    return this.restaurantsService.update(+id, updateRestaurantDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "ID bo‘yicha restaurantni o‘chirish" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "O'chirilgan restaurant ID'si",
  })
  @ApiResponse({
    status: 200,
    description: "Restaurant successfully deleted",
  })
  @ApiResponse({
    status: 404,
    description: "Restaurant not found with ID ${id}",
  })
  remove(@Param("id", ParseIntPipe) id: string) {
    return this.restaurantsService.remove(+id);
  }
}
