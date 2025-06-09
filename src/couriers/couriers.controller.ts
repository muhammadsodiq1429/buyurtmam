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
import { CouriersService } from "./couriers.service";
import { CreateCourierDto } from "./dto/create-courier.dto";
import { UpdateCourierDto } from "./dto/update-courier.dto";
import { UpdatePasswordDto } from "../users/dto/update-password.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Courier } from "./models/courier.model";

@Controller("couriers")
export class CouriersController {
  constructor(private readonly couriersService: CouriersService) {}

  @Post()
  @ApiOperation({ summary: "Yangi courier qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi qo'shilgan courier ID'sini qaytaradi",
  })
  @ApiResponse({
    status: 500,
    description: "Error on create courier: + error.message",
  })
  create(@Body() createCourierDto: CreateCourierDto) {
    return this.couriersService.create(createCourierDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha courierlarni ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Courier ro'yxati",
    type: [Courier],
  })
  @ApiResponse({ status: 404, description: "Couriers not found" })
  findAll() {
    return this.couriersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha bitta courier olish" })
  @ApiResponse({ status: 200, description: "Bitta courier" })
  @ApiResponse({ status: 404, description: "Courier not found with ID ${id}" })
  findOne(@Param("id", ParseIntPipe) id: string) {
    return this.couriersService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Courier ma'lumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Yangilangan courier ID'si",
  })
  @ApiResponse({ status: 404, description: "Courier not found with ID ${id}" })
  @ApiResponse({
    status: 500,
    description: "Error on update courier: + error.message",
  })
  update(
    @Param("id", ParseIntPipe) id: string,
    @Body() updateCourierDto: UpdateCourierDto
  ) {
    return this.couriersService.update(+id, updateCourierDto);
  }

  @Patch("update-password/:id")
  @ApiOperation({ summary: "Courier parolini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Paroli yangilangan courier ID'si",
  })
  @ApiResponse({ status: 404, description: "Courier not found with ID ${id}" })
  updatePassword(
    @Param("id", ParseIntPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto
  ) {
    return this.couriersService.updatePassword(+id, updatePasswordDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Courierni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "O'chirilgan courier ID'si",
  })
  @ApiResponse({ status: 404, description: "Courier not found with ID ${id}" })
  remove(@Param("id", ParseIntPipe) id: string) {
    return this.couriersService.remove(+id);
  }
}
