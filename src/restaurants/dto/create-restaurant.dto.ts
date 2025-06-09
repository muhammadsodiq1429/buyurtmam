import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsLatitude,
  IsLongitude,
  IsPhoneNumber,
  IsOptional,
} from "class-validator";
import { Transform, Type } from "class-transformer";

export class CreateRestaurantDto {
  @ApiProperty({
    example: "Oqtepa Lavash",
    description: "Restoran nomi",
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  name: string;

  @ApiProperty({
    example: "Mazali lavash va donarlari bilan mashhur",
    description: "Restoran haqida qisqacha ma'lumot",
    type: String,
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    example: "Toshkent, Chilonzor-9",
    description: "Restoran manzili",
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: 41.311081,
    description: "Latitude koordinatasi",
    type: Number,
  })
  @IsLatitude()
  @IsNotEmpty()
  lat: number;

  @ApiProperty({
    example: 69.240562,
    description: "Longitude koordinatasi",
    type: Number,
  })
  @IsLongitude()
  @IsNotEmpty()
  lng: number;

  @ApiProperty({
    example: "+998901234567",
    description: "Restoran telefon raqami",
    type: String,
  })
  @IsPhoneNumber("UZ")
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({
    example: true,
    description: "Restoran faolmi yo‘qmi",
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  is_active: boolean;
}
