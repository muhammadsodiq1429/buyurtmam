import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { PaymentMethodTypeEnum } from "../../common/enums/payment-method-type.enum";

interface IPaymentMethodCreationAttr {
  name: string;
  is_active: boolean;
  description?: string;
  type: string;
}

@Table
export class PaymentMethod extends Model<
  PaymentMethod,
  IPaymentMethodCreationAttr
> {
  @ApiProperty({ example: "Click", description: "Payment method name" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @ApiProperty({
    example: true,
    description: "Is this method currently active?",
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  declare is_active: boolean;

  @ApiProperty({
    example: "Click payment integration",
    description: "Details about the payment method",
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description?: string;

  @ApiProperty({
    example: "online",
    description: "Payment type, e.g., 'online', 'cash'",
  })
  @Column({
    type: DataType.ENUM(...Object.values(PaymentMethodTypeEnum)),
    allowNull: false,
  })
  declare type: PaymentMethodTypeEnum;
}
