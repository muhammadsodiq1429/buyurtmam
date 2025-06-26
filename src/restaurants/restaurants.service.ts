import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";
import { Restaurant } from "./models/restaurant.model";

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant)
    private readonly restaurantModel: typeof Restaurant
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    const existing = await this.restaurantModel.findOne({
      where: { name: createRestaurantDto.name },
    });

    if (existing) {
      throw new ConflictException("A restaurant with this name already exists");
    }
    const phoneExists = await this.restaurantModel.findOne({
      where: { phone_number: createRestaurantDto.phone_number },
    });
    if (phoneExists) {
      throw new ConflictException(
        "A restaurant with this phone number already exists"
      );
    }
    const newRestaurant =
      await this.restaurantModel.create(createRestaurantDto);
    return {
      success: true,
      message: "Restaurant successfully created",
      newRestaurant,
    };
  }

  async findAll() {
    const restaurants = await this.restaurantModel.findAll({
      include: { all: true },
    });
    if (restaurants.length === 0)
      throw new NotFoundException("Restaurants not found");

    return {
      success: true,
      data: restaurants,
    };
  }

  async findOne(id: number) {
    const restaurant = await this.restaurantModel.findByPk(id, {
      include: { all: true },
    });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant not found with ID ${id}`);
    }
    return {
      success: true,
      restaurant,
    };
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    const { restaurant } = await this.findOne(id);

    const name = updateRestaurantDto.name;
    if (name && name !== restaurant.name) {
      const existing = await this.restaurantModel.findOne({
        where: { name },
      });
      if (existing) {
        throw new ConflictException(
          "Another restaurant with this name already exists"
        );
      }
    }
    const phoneNumber = updateRestaurantDto.phone_number;
    if (phoneNumber && phoneNumber !== restaurant.phone_number) {
      const phoneExists = await this.restaurantModel.findOne({
        where: { phone_number: phoneNumber },
      });
      if (phoneExists) {
        throw new ConflictException(
          "Another restaurant with this phone number already exists"
        );
      }
    }
    await restaurant.update(updateRestaurantDto);

    return {
      success: true,
      message: "Restaurant successfully updated",
      restaurant,
    };
  }

  async remove(id: number) {
    const { restaurant } = await this.findOne(id);

    await restaurant.destroy();

    return {
      success: true,
      message: "Restaurant successfully deleted",
      id,
    };
  }
}
