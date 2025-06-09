import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class UpdatePasswordDto {
  @ApiProperty({
    type: "string",
    description: "Customerning joriy paroli",
    example: "3128777m-M",
  })
  @IsString()
  @IsNotEmpty()
  current_password: string;

  @ApiProperty({
    type: "string",
    description: "Customerning yangi paroli",
    example: "3505630m-M",
  })
  @IsStrongPassword()
  @IsNotEmpty()
  new_password: string;

  @ApiProperty({
    type: "string",
    description: "Customerning yangi paroli tasdiqlovchi parol",
    example: "3505630m-M",
  })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;
}
