import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "./models/role.model";
import { FindOptions } from "sequelize";
import { BOOLEAN } from "sequelize";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private readonly roleModel: typeof Role) {}

  async create(createRoleDto: CreateRoleDto) {
    if (await this.roleModel.findOne({ where: { name: createRoleDto.name } }))
      throw new ConflictException(
        `Role already exists with name ${createRoleDto.name}`
      );
    const newRole = await this.roleModel.create(createRoleDto);

    return {
      success: true,
      message: "Role added successfully",
      newRole,
    };
  }

  async findAll() {
    const allRoles = await this.roleModel.findAll({ include: { all: true } });
    if (allRoles.length === 0) throw new NotFoundException(`Roles not found`);

    return { success: true, allRoles };
  }

  async findOne(id: number) {
    const role = await this.roleModel.findByPk(id, { include: { all: true } });
    if (!role) throw new NotFoundException(`Role not found with ID ${id}`);

    return { success: true, role };
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const { role } = await this.findOne(id);
    const { name } = updateRoleDto;
    if (
      name &&
      name !== role.name &&
      (await this.roleModel.findOne({ where: { name } }))
    )
      throw new ConflictException(`Role already exists with name ${name}`);
    await role.update(updateRoleDto);

    return {
      success: true,
      message: "Role updated successfully",
      role,
    };
  }

  async remove(id: number) {
    const { role } = await this.findOne(id);
    await role.destroy();

    return {
      success: true,
      message: "Role deleted successfully",
      deletedRoleId: role.id,
    };
  }
}
