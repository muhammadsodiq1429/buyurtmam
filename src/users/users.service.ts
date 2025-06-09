import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import * as bcrypt from "bcrypt";
import { FindOptions, Transaction, WhereOptions } from "sequelize";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { Admin } from "../admins/models/admin.model";
import { Customer } from "../customers/models/customer.model";
import { Courier } from "../couriers/models/courier.model";
import { RestaurantAdmin } from "../restaurant-admins/models/restaurant-admin.model";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}
  async create(
    createUserDto: CreateUserDto,
    transaction?: Transaction
  ): Promise<User> {
    const { email, password, phone, confirm_password } = createUserDto;
    if (await this.findByAny({ where: { email } }))
      throw new ConflictException(`User with email '${email}' already exists`);
    if (await this.findByAny({ where: { phone } }))
      throw new ConflictException(`User with phone '${phone}' already exists`);
    if (password !== confirm_password)
      throw new BadRequestException(
        "Password and confirm password do not match"
      );

    return this.userModel.create(
      {
        ...createUserDto,
        hashed_password: await bcrypt.hash(createUserDto.password, 7),
      },
      { transaction }
    );
  }

  findByAny(any: FindOptions<User>): Promise<User | null> {
    return this.userModel.findOne(any);
  }

  async findAll(): Promise<User[]> {
    const allUser = await this.userModel.findAll({ include: { all: true } });
    if (allUser.length === 0) throw new NotFoundException("Users not found");

    return allUser;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id, { include: { all: true } });
    if (!user) throw new NotFoundException(`User not found with ID ${id}`);

    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    transaction?: Transaction
  ): Promise<User> {
    const user = await this.findOne(id);
    const { email, phone } = updateUserDto;
    if (
      email &&
      user.email !== email &&
      (await this.findByAny({ where: { email } }))
    )
      throw new ConflictException(`User with email '${email}' already exists`);
    if (
      phone &&
      user.phone !== phone &&
      (await this.findByAny({ where: { phone } }))
    )
      throw new ConflictException(`User with phone '${phone}' already exists`);

    await user.update(updateUserDto, { transaction });

    return user;
  }

  async updatePassword(
    user: User /* | Admin | Courier | RestaurantAdmin */,
    updatePasswordDto: UpdatePasswordDto
  ): Promise<User> {
    const { current_password, new_password, confirm_password } =
      updatePasswordDto;
    if (!(await bcrypt.compare(current_password, user.hashed_password)))
      throw new BadRequestException("Incorrect current password");

    if (new_password !== confirm_password)
      throw new BadRequestException(
        "New password and confirm password do not match"
      );

    return user.update({ hashed_password: await bcrypt.hash(new_password, 7) });
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    await user.destroy();

    return user;
  }
}
