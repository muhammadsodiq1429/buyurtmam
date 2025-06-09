import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({
    type: "string",
    uniqueItems: true,
    description: "Admin uchun role nomi",
    example: "super_admin",
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  name: string;

  @ApiProperty({
    type: "string",
    uniqueItems: true,
    description: "Role tavsifi",
    example: "Ruxsatlari cheklanmagan shaxs",
  })
  @IsString()
  @IsOptional()
  description?: string;
}
