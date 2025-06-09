// export class RestaurantRestaurantAdminsService
import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateRestaurantAdminDto } from "./dto/create-restaurant-admin.dto";
import { UpdateRestaurantAdminDto } from "./dto/update-restaurant-admin.dto";
import { InjectModel } from "@nestjs/sequelize";
import { RestaurantAdmin } from "./models/restaurant-admin.model";
import { Sequelize } from "sequelize-typescript";
import { UsersService } from "../users/users.service";
import { UserRole } from "../common/enums/user.enum";
import { UpdatePasswordDto } from "../users/dto/update-password.dto";
import { RestaurantsService } from "../restaurants/restaurants.service";

@Injectable()
export class RestaurantAdminsService {
  constructor(
    @InjectModel(RestaurantAdmin)
    private readonly restaurantAdminModel: typeof RestaurantAdmin,
    private readonly userService: UsersService,
    private readonly restaurantsService: RestaurantsService,
    private readonly sequelize: Sequelize
  ) {}

  async create(createRestaurantAdminDto: CreateRestaurantAdminDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const { restaurant_id, ...userData } = createRestaurantAdminDto;

      await this.restaurantsService.findOne(restaurant_id);

      const user = await this.userService.create(
        { ...userData, is_active: true, role: UserRole.RESTAURANT_ADMIN },
        transaction
      );

      const restaurantAdmin = await this.restaurantAdminModel.create(
        {
          user_id: user.id,
          restaurant_id,
        },
        { transaction }
      );

      await transaction.commit();
      return {
        success: true,
        message: "RestaurantAdmin added successfully",
        newRestaurantAdminId: restaurantAdmin.user_id,
      };
    } catch (error) {
      await transaction.rollback();
      throw new InternalServerErrorException(
        "Error on add restaurantAdmin: " + error.message
      );
    }
  }

  async findAll() {
    const allRestaurantAdmins = await this.restaurantAdminModel.findAll({
      include: { all: true },
    });
    if (allRestaurantAdmins.length === 0)
      throw new NotFoundException(`RestaurantAdmins not found`);

    return { success: true, allRestaurantAdmins };
  }

  async findOne(id: number) {
    const restaurantAdmin = await this.restaurantAdminModel.findByPk(id, {
      include: { all: true },
    });
    if (!restaurantAdmin)
      throw new NotFoundException(`RestaurantAdmin not found with ID ${id}`);

    return { success: true, restaurantAdmin };
  }

  async update(id: number, updateRestaurantAdminDto: UpdateRestaurantAdminDto) {
    const { restaurantAdmin } = await this.findOne(id);
    const transaction = await this.sequelize.transaction();
    try {
      const { restaurant_id, ...userData } = updateRestaurantAdminDto;

      if (restaurant_id) {
        await this.restaurantsService.findOne(restaurant_id);
        await restaurantAdmin.update({ restaurant_id }, { transaction });
      }

      await this.userService.update(id, userData, transaction);

      await transaction.commit();
      return {
        success: true,
        message: "RestaurantAdmin updated successfully",
        updatedRestaurantAdminId: restaurantAdmin.user_id,
      };
    } catch (error) {
      await transaction.rollback();
      throw new InternalServerErrorException(
        "Error on update restaurantAdmin: " + error.message
      );
    }
  }

  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    const restaurantAdmin = await this.userService.findByAny({
      where: {
        id,
        role: UserRole.RESTAURANT_ADMIN,
      },
      include: { all: true },
    });
    if (!restaurantAdmin)
      throw new NotFoundException(`RestaurantAdmin not found with ID ${id}`);

    await this.userService.updatePassword(restaurantAdmin, updatePasswordDto);

    return {
      success: true,
      message: "RestaurantAdmin password updated successfully",
      id,
    };
  }

  async remove(id: number) {
    const { restaurantAdmin } = await this.findOne(id);
    await restaurantAdmin.destroy();
    await this.userService.remove(id);

    return {
      success: true,
      message: "RestaurantAdmin deleted successfully",
      deletedRestaurantAdminId: restaurantAdmin.user_id,
    };
  }
}
