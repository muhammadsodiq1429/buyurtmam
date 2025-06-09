import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IRoleCreationAttr {
  name: string;
  description?: string;
}

@Table
export class Role extends Model<Role, IRoleCreationAttr> {
  @ApiProperty({
    type: "string",
    uniqueItems: true,
    description: "Admin uchun role nomi",
    example: "super_admin",
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare name: string;

  @ApiProperty({
    type: "string",
    uniqueItems: true,
    description: "Role tavsifi",
    example: "Ruxsatlari cheklanmagan shaxs",
  })
  @Column({ type: DataType.STRING })
  declare description?: string;
}
