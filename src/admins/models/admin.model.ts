import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { Role } from "../../roles/models/role.model";
import { ApiProperty } from "@nestjs/swagger";

interface IAdminCreationAttr {
  user_id: number;
  role_id: number;
  last_sign_in?: Date;
}

@Table
export class Admin extends Model<Admin, IAdminCreationAttr> {
  @ApiProperty({
    description: "Adminning takrorlanmas ID'si, User table'siga bog‘langan.",
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
    description: "Admin rolening ID'si, Role table'siga bog‘langan.",
    example: 1,
    type: "number",
  })
  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: "SET NULL",
    onUpdate: "SET NULL",
  })
  declare role_id: number;

  @ApiProperty({
    description: "Admin qachon oxirgi marta sign in qilgani",
    example: "2025-06-08T14:39:21.363Z",
    type: "string",
  })
  @Column({ type: DataType.DATE })
  declare last_sign_in?: Date;

  @BelongsTo(() => User)
  declare user: User;

  @BelongsTo(() => Role)
  declare role: Role;
}
