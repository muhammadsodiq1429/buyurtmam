import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateCourierDto } from "./dto/create-courier.dto";
import { UpdateCourierDto } from "./dto/update-courier.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Courier } from "./models/courier.model";
import { Sequelize } from "sequelize-typescript";
import { UsersService } from "../users/users.service";
import { UserRole } from "../common/enums/user.enum";
import { MailService } from "../mail/mail.service";
import { UpdatePasswordDto } from "../users/dto/update-password.dto";

@Injectable()
export class CouriersService {
  constructor(
    @InjectModel(Courier) private readonly courierModel: typeof Courier,
    private readonly userService: UsersService,
    private readonly sequelize: Sequelize
  ) {}

  async create(createCourierDto: CreateCourierDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const user = await this.userService.create(
        { ...createCourierDto, is_active: false, role: UserRole.COURIER },
        transaction
      );
      const courier = await this.courierModel.create(
        {
          ...createCourierDto,
          user_id: user.id,
        },
        { transaction }
      );

      await transaction.commit();
      return {
        success: true,
        message: "Courier added successfully",
        newCourierId: courier.user_id,
      };
    } catch (error) {
      await transaction.rollback();
      throw new InternalServerErrorException(
        "Error on add courier: ",
        error.message
      );
    }
  }

  async findAll() {
    const allCouriers = await this.courierModel.findAll({
      include: { all: true },
    });
    if (allCouriers.length === 0)
      throw new NotFoundException(`Couriers not found`);

    return { success: true, allCouriers };
  }

  async findOne(id: number) {
    const courier = await this.courierModel.findByPk(id, {
      include: { all: true },
    });
    if (!courier)
      throw new NotFoundException(`Courier not found with ID ${id}`);

    return { success: true, courier };
  }

  async update(id: number, updateCourierDto: UpdateCourierDto) {
    const { courier } = await this.findOne(id);
    const transaction = await this.sequelize.transaction();
    try {
      await courier.update(updateCourierDto, { transaction });
      await this.userService.update(id, updateCourierDto, transaction);

      await transaction.commit();

      return {
        success: true,
        message: "Courier updated successfully",
        updatedCourierId: courier.user_id,
      };
    } catch (error) {
      await transaction.rollback();
      throw new InternalServerErrorException(
        "Error on update courier: " + error.message
      );
    }
  }

  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    const courier = await this.userService.findByAny({
      where: {
        id,
        role: UserRole.COURIER,
      },
      include: { all: true },
    });
    if (!courier)
      throw new NotFoundException(`Courier not found with ID ${id}`);
    await this.userService.updatePassword(courier, updatePasswordDto);

    return {
      success: true,
      message: "Courier password updated successfully",
      id,
    };
  }

  async remove(id: number) {
    const { courier } = await this.findOne(id);
    await courier.destroy();
    await this.userService.remove(id);

    return {
      success: true,
      message: "Courier delete successfully",
      deletedCourierId: courier.user_id,
    };
  }
}
