import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Customer } from "../../customers/models/customer.model";
import { Address } from "../../addresses/models/address.model";

interface ISettingCreationAttr {
  customer_id: number;
  notifications_enabled?: boolean;
  sms_notifications?: boolean;
  email_notifications?: boolean;
  push_notifications?: boolean;
  promo_notifications?: boolean;
  order_notifications?: boolean;
  default_payment_method_id: number;
  default_address_id?: number;
  delivery_instructions?: string;
  ui_theme_mode?: "dark" | "light" | "auto";
}

@Table
export class Setting extends Model<Setting, ISettingCreationAttr> {
  @ForeignKey(() => Customer)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    field: "customer_id",
  })
  @ApiProperty({ example: 1, description: "Customer ID" })
  declare customer_id: number;

  @BelongsTo(() => Customer)
  declare customer: Customer;

  @ApiProperty({ example: true, description: "Are notifications enabled" })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare notifications_enabled: boolean;

  @ApiProperty({ example: true, description: "SMS notifications" })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare sms_notifications: boolean;

  @ApiProperty({ example: true, description: "Email notifications" })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare email_notifications: boolean;

  @ApiProperty({ example: true, description: "Push notifications" })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare push_notifications: boolean;

  @ApiProperty({ example: true, description: "Promo notifications" })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare promo_notifications: boolean;

  @ApiProperty({ example: true, description: "Order notifications" })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare order_notifications: boolean;

  @ApiProperty({
    example: 2,
    description: "Default payment method ID for the user",
  })
  @Column({ type: DataType.BIGINT, allowNull: false })
  declare default_payment_method_id: number;

  @ApiProperty({
    example: 5,
    description: "Default address ID for delivery",
  })
  @ForeignKey(() => Address)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  declare default_address_id: number;

  @BelongsTo(() => Address)
  declare address: Address;

  @ApiProperty({
    example: "Leave at the door",
    description: "Delivery instructions",
  })
  @Column({ type: DataType.TEXT, allowNull: true })
  declare delivery_instructions: string;

  @ApiProperty({
    example: "auto",
    description: "UI theme preference (dark, light, auto)",
  })
  @Column({
    type: DataType.ENUM("dark", "light", "auto"),
    allowNull: true,
    defaultValue: "auto",
  })
  declare ui_theme_mode: "dark" | "light" | "auto";
}
