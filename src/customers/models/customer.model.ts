import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { CustomerGender } from "../../common/enums/customer.enum";
import { User } from "../../users/models/user.model";
import { ApiProperty } from "@nestjs/swagger";

interface ICustomerCreationAttr {
  user_id: number;
  avatar_url?: string;
  date_of_birth?: Date;
  gender?: CustomerGender;
}

@Table
export class Customer extends Model<Customer, ICustomerCreationAttr> {
  @ApiProperty({
    description: "Customerning takrorlanmas Id'si, User table'siga bog‘langan.",
    example: 1,
    type: "number",
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  declare user_id: number;

  @ApiProperty({
    description: "Customerning profil uchun rasmi havolasi",
    type: "string",
  })
  @Column({ type: DataType.STRING })
  declare avatar_url?: string;

  @ApiProperty({
    description: "Customerni faol qilish uchun kerak bo‘ladigan UUID",
    type: "string",
  })
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare activation_link?: string;

  @ApiProperty({
    description: "Customerning tug‘ilgan sanasi",
    type: "string",
  })
  @Column({ type: DataType.DATEONLY })
  declare date_of_birth?: Date;

  @ApiProperty({
    description: "Customerning jinsi",
    type: "string",
  })
  @Column({ type: DataType.ENUM(...Object.values(CustomerGender)) })
  declare gender?: CustomerGender;
}
