import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateSettingDto {
  @ApiProperty({ example: 1, description: "Customer ID" })
  @IsNumber()
  @IsNotEmpty()
  customer_id: number;

  @ApiProperty({ example: true, description: "Are notifications enabled" })
  @IsBoolean()
  @IsOptional()
  notifications_enabled: boolean;

  @ApiProperty({ example: true, description: "SMS notifications" })
  @IsBoolean()
  @IsOptional()
  sms_notifications: boolean;

  @ApiProperty({ example: true, description: "Email notifications" })
  @IsBoolean()
  @IsOptional()
  email_notifications: boolean;

  @ApiProperty({ example: true, description: "Push notifications" })
  @IsBoolean()
  @IsOptional()
  push_notifications: boolean;

  @ApiProperty({ example: true, description: "Promo notifications" })
  @IsBoolean()
  @IsOptional()
  promo_notifications: boolean;

  @ApiProperty({ example: true, description: "Order notifications" })
  @IsBoolean()
  @IsOptional()
  order_notifications: boolean;

  @ApiProperty({
    example: 2,
    description: "Default payment method ID for the user",
  })
  @IsNumber()
  @IsNotEmpty()
  default_payment_method_id: number;

  @ApiProperty({
    example: 5,
    description: "Default address ID for delivery",
  })
  @IsNumber()
  @IsOptional()
  default_address_id: number;

  @ApiProperty({
    example: "Leave at the door",
    description: "Delivery instructions",
  })
  @IsString()
  @IsOptional()
  delivery_instructions: string;

  @ApiProperty({
    example: "auto",
    description: "UI theme preference (dark, light, auto)",
  })
  @IsEnum(["dark", "light", "auto"])
  @IsOptional()
  ui_theme_mode: "dark" | "light" | "auto";
}
