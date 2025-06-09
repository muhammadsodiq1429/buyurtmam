import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { CreateUserDto } from "../../users/dto/create-user.dto";

export class CreateRestaurantAdminDto extends OmitType(CreateUserDto, [
  "last_name",
  "role",
]) {
  @ApiProperty({
    description: "RestaurantAdmin super adminligi",
    example: false,
    type: "boolean",
    default: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  is_superadmin: boolean;

  @ApiProperty({
    description:
      "RestaurantAdmin ishlaydigan restaurant ID'si, Restaurant table'siga bog‘langan.",
    example: 1,
    type: "number",
  })
  @IsNumber()
  @IsNotEmpty()
  restaurant_id: number;
}
