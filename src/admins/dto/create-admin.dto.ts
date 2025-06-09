import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateUserDto } from "../../users/dto/create-user.dto";

export class CreateAdminDto extends OmitType(CreateUserDto, [
  "role",
  "last_name",
] as const) {
  @ApiProperty({
    description: "Admin rolening ID'si, Role table'siga bog‘langan.",
    example: 1,
    type: "number",
  })
  @IsNumber()
  @IsNotEmpty()
  role_id: number;
}
