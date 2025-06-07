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
import { Transaction, WhereOptions } from "sequelize";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}
  async create(
    createUserDto: CreateUserDto,
    transaction: Transaction
  ): Promise<User> {
    const { email, password, phone, confirm_password } = createUserDto;
    if (await this.findByAny({ email }))
      throw new ConflictException(`User with email '${email}' already exists`);
    if (await this.findByAny({ phone }))
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

  findByAny(any: WhereOptions<User>): Promise<User | null> {
    return this.userModel.findOne({ where: any });
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

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    const { email, phone } = updateUserDto;
    if (user.email !== email && (await this.findByAny({ email })))
      throw new ConflictException(`User with email '${email}' already exists`);
    if (user.phone !== phone && (await this.findByAny({ phone })))
      throw new ConflictException(`User with phone '${phone}' already exists`);

    return user.update(updateUserDto);
  }

  async remove(id: number): Promise<Number> {
    const user = await this.findOne(id);
    await user.destroy();

    return id;
  }
}
