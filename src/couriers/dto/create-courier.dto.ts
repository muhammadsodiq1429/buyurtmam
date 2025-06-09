import { ApiProperty, OmitType } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsBoolean,
  IsDateString,
  IsNumber,
  Matches,
  IsLatitude,
  IsLongitude,
  IsOptional,
} from "class-validator";
import { VehicleType } from "../../common/enums/courier.enum";
import { CreateUserDto } from "../../users/dto/create-user.dto";

export class CreateCourierDto extends OmitType(CreateUserDto, [
  "role",
] as const) {
  @ApiProperty({
    enum: VehicleType,
    description: "Kuryerning transport turi",
    example: VehicleType.BICYCLE,
  })
  @IsEnum(VehicleType)
  @IsNotEmpty()
  vehicle_type: VehicleType;

  @ApiProperty({
    description: "Avtomobil raqami yoki transport identifikatori",
    example: "01A123BC",
    required: false,
    type: "string",
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Matches(/^[0-9]{2}[A-Z]{1}[0-9]{3}[A-Z]{2}$/, {
    message: "Avtomobil raqami noto‘g‘ri formatda (masalan: 01A123BC)",
  })
  license_plate?: string;

  @ApiProperty({
    description: "Pasport seriyasi yoki identifikator",
    example: "AB1234567",
    required: false,
    type: "string",
  })
  @IsString()
  @IsOptional()
  @Matches(/^[A-Z]{2}[0-9]{7}$/, {
    message: "Pasport raqami noto‘g‘ri formatda (masalan: AB1234567)",
  })
  passport_id?: string;

  @ApiProperty({
    description: "Tug‘ilgan sana",
    example: "1995-07-12",
    type: "string",
  })
  @IsDateString()
  @IsNotEmpty()
  birth_date: Date;

  //   @ApiProperty({
  //     description: "Profil rasmi URL manzili",
  //     example: "https://example.com/images/avatar.jpg",
  //   })
  //   @IsNotEmpty()
  //   @IsString()
  //   profile_photo_url: string;

  @ApiProperty({
    description: "Kuryer hozirda mavjudmi",
    example: true,
    type: "boolean",
  })
  @IsBoolean()
  @IsNotEmpty()
  is_available: boolean;

  @ApiProperty({
    description: "Hozirgi joylashuvi - kenglik",
    example: 41.32,
    type: "number",
    required: false,
  })
  @IsNumber()
  @IsLatitude()
  @IsOptional()
  current_lat?: number;

  @ApiProperty({
    description: "Hozirgi joylashuvi - uzunlik",
    example: 69.25,
    type: "number",
    required: false,
  })
  @IsNumber()
  @IsLongitude()
  @IsOptional()
  current_lng?: number;

  @ApiProperty({
    description: "Ishga kirgan sanasi",
    example: "2024-04-01T09:00:00Z",
    type: "string",
    required: false,
  })
  @IsOptional()
  @IsDateString()
  hired_at: Date;
}
