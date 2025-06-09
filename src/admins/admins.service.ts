import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "./models/admin.model";
import { Sequelize } from "sequelize-typescript";
import { UsersService } from "../users/users.service";
import { UserRole } from "../common/enums/user.enum";
import { UpdatePasswordDto } from "../users/dto/update-password.dto";
import { RolesService } from "../roles/roles.service";

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin) private readonly adminModel: typeof Admin,
    private readonly userService: UsersService,
    private readonly rolesService: RolesService,
    private readonly sequelize: Sequelize
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const { role_id, ...userData } = createAdminDto;

      await this.rolesService.findOne(role_id);

      const user = await this.userService.create(
        { ...userData, is_active: true, role: UserRole.ADMIN },
        transaction
      );

      const admin = await this.adminModel.create(
        {
          user_id: user.id,
          role_id,
        },
        { transaction }
      );

      await transaction.commit();
      return {
        success: true,
        message: "Admin added successfully",
        newAdminId: admin.user_id,
      };
    } catch (error) {
      await transaction.rollback();
      throw new InternalServerErrorException(
        "Error on add admin: " + error.message
      );
    }
  }

  async findAll() {
    const allAdmins = await this.adminModel.findAll({
      include: { all: true },
    });
    if (allAdmins.length === 0) throw new NotFoundException(`Admins not found`);

    return { success: true, allAdmins };
  }

  async findOne(id: number) {
    const admin = await this.adminModel.findByPk(id, {
      include: { all: true },
    });
    if (!admin) throw new NotFoundException(`Admin not found with ID ${id}`);

    return { success: true, admin };
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const { admin } = await this.findOne(id);
    const transaction = await this.sequelize.transaction();
    try {
      const { role_id, ...userData } = updateAdminDto;

      if (role_id) {
        await this.rolesService.findOne(role_id);
        await admin.update({ role_id }, { transaction });
      }

      await this.userService.update(id, userData, transaction);

      await transaction.commit();
      return {
        success: true,
        message: "Admin updated successfully",
        updatedAdminId: admin.user_id,
      };
    } catch (error) {
      await transaction.rollback();
      throw new InternalServerErrorException(
        "Error on update admin: " + error.message
      );
    }
  }

  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    const admin = await this.userService.findByAny({
      where: {
        id,
        role: UserRole.ADMIN,
      },
      include: { all: true },
    });
    if (!admin) throw new NotFoundException(`Admin not found with ID ${id}`);

    await this.userService.updatePassword(admin, updatePasswordDto);

    return {
      success: true,
      message: "Admin password updated successfully",
      id,
    };
  }

  async remove(id: number) {
    const { admin } = await this.findOne(id);
    await admin.destroy();
    await this.userService.remove(id);

    return {
      success: true,
      message: "Admin deleted successfully",
      deletedAdminId: admin.user_id,
    };
  }
}
