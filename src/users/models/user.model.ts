import { Column, DataType, Model, Table } from "sequelize-typescript";
import { UserRole } from "../../common/enums/user.enum";
import { ApiProperty } from "@nestjs/swagger";

interface IUserCreationAttr {
  first_name: string;
  last_name?: string;
  email: string;
  phone: string;
  hashed_password: string;
  is_active: boolean;
  two_factor_enabled: boolean;
  role: UserRole;
}

@Table
export class User extends Model<User, IUserCreationAttr> {
  @ApiProperty({
    type: "string",
    description: "Foydalanuvchining ismi",
    example: "Muhammadsodiq",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare first_name: string;

  @ApiProperty({
    type: "string",
    description: "Foydalanuvchi otasining ismi",
    example: "Muhammad Rosul",
    required: false,
  })
  @Column({ type: DataType.STRING })
  declare last_name?: string;

  @ApiProperty({
    type: "string",
    description: "Foydanaluvchining elektron manzili",
    uniqueItems: true,
    example: "muhammadsodiqmuhammadjanov@gmail.com",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: { name: "email", msg: "Email must be unique" },
  })
  declare email: string;

  @ApiProperty({
    type: "string",
    description: "Foydanaluvchining telefon raqami",
    example: "+998903128777",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: { name: "phone", msg: "Phone must be unique" },
  })
  declare phone: string;

  @ApiProperty({
    type: "string",
    description: "Foydanaluvchining hashlangan refresh tokeni",
    required: false,
  })
  @Column({ type: DataType.STRING })
  declare hashed_refresh_token: string;

  @ApiProperty({
    type: "string",
    description: "Foydanaluvchining hashlangan paroli",
    required: false,
  })
  @Column({ type: DataType.STRING })
  declare hashed_password: string;

  @ApiProperty({
    type: "string",
    description: "Foydanaluvchining faolligi",
    example: false,
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare is_active: boolean;

  @ApiProperty({
    type: "string",
    description: "Foydanaluvchining ikki bosqichlik tekshiruvining xolati",
    example: false,
    required: false,
  })
  @Column({ type: DataType.STRING, defaultValue: false })
  declare two_factor_enabled: boolean;

  @ApiProperty({
    type: "string",
    description: "Foydanaluvchining ro‘li",
    example: "customer",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare role: UserRole;
}
