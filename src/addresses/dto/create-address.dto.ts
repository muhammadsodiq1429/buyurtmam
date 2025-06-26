import { ApiProperty } from "@nestjs/swagger";
import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

export class CreateAddressDto {
  @ApiProperty({ example: "Home", description: "Address name" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "123 Main St, Tashkent",
    description: "Full address",
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 41.3, description: "Latitude coordinate" })
  @IsLatitude()
  @IsNotEmpty()
  lat: number;

  @ApiProperty({ example: 69.24, description: "Longitude coordinate" })
  @IsLongitude()
  @IsNotEmpty()
  lng: number;

  @ApiProperty({
    example: 123,
    description: "Customer ID this address belongs to",
  })
  @IsNumber()
  @IsNotEmpty()
  customer_id: number;
}
