import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsEnum,
} from "class-validator";
import { PaymentMethodTypeEnum } from "../../common/enums/payment-method-type.enum";

export class CreatePaymentMethodDto {
  @ApiProperty({ example: "Click", description: "Payment method name" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: true,
    description: "Is this method currently active?",
  })
  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;

  @ApiProperty({
    example: "Click payment integration",
    description: "Details about the payment method",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: "online",
    description: "Payment type, e.g., 'online', 'cash'",
  })
  @IsEnum(PaymentMethodTypeEnum)
  @IsNotEmpty()
  type: PaymentMethodTypeEnum;
}
