import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasOne,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Customer } from "../../customers/models/customer.model";
import { Setting } from "../../settings/models/setting.model";

interface IAddressCreationAttr {
  name: string;
  address: string;
  lat: number;
  lng: number;
  customer_id: number;
}

@Table
export class Address extends Model<Address, IAddressCreationAttr> {
  @ApiProperty({ example: "Home", description: "Address name" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @ApiProperty({
    example: "123 Main St, Tashkent",
    description: "Full address",
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare address: string;

  @ApiProperty({ example: 41.3, description: "Latitude coordinate" })
  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  declare lat: number;

  @ApiProperty({ example: 69.24, description: "Longitude coordinate" })
  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  declare lng: number;

  @ApiProperty({
    example: 123,
    description: "Customer ID this address belongs to",
  })
  @ForeignKey(() => Customer)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "customer_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  declare customer_id: number;

  @BelongsTo(() => Customer)
  declare customer: Customer;

  @HasOne(() => Setting)
  declare setting: Setting;
}
