import { ApiProperty, OmitType } from "@nestjs/swagger";
import { CustomerGender } from "../../common/enums/customer.enum";
import { IsDateString, IsEnum, IsOptional } from "class-validator";
import { CreateUserDto } from "../../users/dto/create-user.dto";

export class CreateCustomerDto extends OmitType(CreateUserDto, [
  "is_active",
  "role",
] as const) {
  @ApiProperty({
    description: "Customerning tug‘ilgan sanasi",
    type: "string",
    example: "2008-02-10",
    required: false,
  })
  @IsOptional()
  @IsDateString()
  date_of_birth?: Date;

  @ApiProperty({
    description: "Customerning jinsi",
    example: CustomerGender.MALE,
    type: "string",
    required: false,
  })
  @IsEnum(CustomerGender)
  @IsOptional()
  gender?: CustomerGender;
}
