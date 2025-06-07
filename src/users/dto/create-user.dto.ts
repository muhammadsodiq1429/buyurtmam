import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from "class-validator";
import { UserRole } from "../../common/enums/user.enum";

export class CreateUserDto {
  @ApiProperty({
    type: "string",
    description: "Foydalanuvchining ismi",
    example: "Muhammadsodiq",
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    type: "string",
    description: "Foydalanuvchi otasining ismi",
    example: "Muhammad Rosul",
    required: false,
  })
  @IsString()
  @IsOptional()
  last_name?: string;

  @ApiProperty({
    type: "string",
    description: "Foydanaluvchining elektron manzili",
    uniqueItems: true,
    example: "muhammadsodiqmuhammadjanov@gmail.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: "string",
    description: "Foydanaluvchining telefon raqami",
    example: "+998903128777",
  })
  @IsPhoneNumber("UZ")
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    type: "string",
    description: "Foydanaluvchining paroli",
    example: "3128777m-M",
  })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: "string",
    description: "Foydanaluvchining tasdiqlovchi paroli",
    example: "3128777m-M",
  })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @ApiProperty({
    type: "string",
    description: "Foydanaluvchining faolligi",
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;

  @ApiProperty({
    type: "string",
    description: "Foydanaluvchining ikki bosqichlik tekshiruvining xolati",
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  two_factor_enabled: boolean;

  @ApiProperty({
    type: "string",
    description: "Foydanaluvchining ro‘li",
    example: "customer",
  })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
