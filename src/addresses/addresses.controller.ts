import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Address } from "./models/address.model";
import { AddressesService } from "./addresses.service";

@Controller("addresses")
export class AddressesController {
  constructor(private readonly addresssService: AddressesService) {}

  @Post()
  @ApiOperation({ summary: "Yangi address qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi qo'shilgan address qaytaradi",
    type: Address,
  })
  @ApiResponse({
    status: 404,
    description: "Customer not found with ID ${id}",
  })
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addresssService.create(createAddressDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha address ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Address ro'yxati",
    type: [Address],
  })
  @ApiResponse({ status: 404, description: "Addresss not found" })
  findAll() {
    return this.addresssService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha bitta address olish" })
  @ApiResponse({ status: 200, description: "Bitta address", type: Address })
  @ApiResponse({ status: 404, description: "Address not found with ID ${id}" })
  findOne(@Param("id", ParseIntPipe) id: string) {
    return this.addresssService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Address ma'lumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Yangilangan address",
    type: Address,
  })
  @ApiResponse({ status: 404, description: "Address not found with ID ${id}" })
  @ApiResponse({ status: 404, description: "Customer not found with ID ${id}" })
  update(
    @Param("id", ParseIntPipe) id: string,
    @Body() updateAddressDto: UpdateAddressDto
  ) {
    return this.addresssService.update(+id, updateAddressDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Addressni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "O'chirilgan address ID'si",
  })
  @ApiResponse({ status: 404, description: "Address not found with ID ${id}" })
  remove(@Param("id", ParseIntPipe) id: string) {
    return this.addresssService.remove(+id);
  }
}
