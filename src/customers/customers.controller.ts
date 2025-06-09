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
import { CustomersService } from "./customers.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { UpdatePasswordDto } from "../users/dto/update-password.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Customer } from "./models/customer.model";

@Controller("customers")
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: "Yangi customer qo‘shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi qo‘shilgan customer ID'sini qaytaradi",
  })
  @ApiResponse({
    status: 500,
    description: "Error on create customer: + error.message",
  })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha customerlarni ro‘yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Customer ro‘yxati",
    type: [Customer],
  })
  @ApiResponse({ status: 404, description: "Customers not found" })
  findAll() {
    return this.customersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha bitta customer olish" })
  @ApiResponse({ status: 200, description: "Bitta customer" })
  @ApiResponse({ status: 404, description: "Customer not found with ID ${id}" })
  findOne(@Param("id", ParseIntPipe) id: string) {
    return this.customersService.findOne(+id);
  }

  @Get("activate/:activation_link")
  @ApiOperation({ summary: "Customer hisobini aktivlashtirish" })
  @ApiResponse({
    status: 200,
    description: "Activete qilingan customer ID'si",
  })
  @ApiResponse({
    status: 400,
    description: "Customer already activated",
  })
  @ApiResponse({
    status: 400,
    description: "Activation link not found",
  })
  @ApiResponse({
    status: 404,
    description: "Customer not found with activation link",
  })
  activete(@Param("activation_link") activation_link: string) {
    return this.customersService.activate(activation_link);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Customer ma’lumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Yangilangan customer ID'si",
  })
  @ApiResponse({ status: 404, description: "Customer not found with ID ${id}" })
  @ApiResponse({
    status: 500,
    description: "Error on update customer: + error.message",
  })
  update(
    @Param("id", ParseIntPipe) id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Patch("update-password/:id")
  @ApiOperation({ summary: "Customer parolini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Paroli yangilangan customer ID'si",
  })
  @ApiResponse({ status: 404, description: "Customer not found with ID ${id}" })
  updatePassword(
    @Param("id", ParseIntPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto
  ) {
    return this.customersService.updatePassword(+id, updatePasswordDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Customerni o‘chirish" })
  @ApiResponse({
    status: 200,
    description: "O‘chirish customer ID'si",
  })
  @ApiResponse({ status: 404, description: "Customer not found with ID ${id}" })
  remove(@Param("id", ParseIntPipe) id: string) {
    return this.customersService.remove(+id);
  }
}
