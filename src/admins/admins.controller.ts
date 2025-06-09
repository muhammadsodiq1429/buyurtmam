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
import { AdminsService } from "./admins.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { UpdatePasswordDto } from "../users/dto/update-password.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Admin } from "./models/admin.model";

@Controller("admins")
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi admin qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi qo'shilgan admin ID'sini qaytaradi",
  })
  @ApiResponse({
    status: 500,
    description: "Error on add admin: + error.message",
  })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha adminlarni ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Admin ro'yxati",
    type: [Admin],
  })
  @ApiResponse({ status: 404, description: "Admins not found" })
  findAll() {
    return this.adminsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha bitta admin olish" })
  @ApiResponse({ status: 200, description: "Bitta admin" })
  @ApiResponse({ status: 404, description: "Admin not found with ID ${id}" })
  findOne(@Param("id", ParseIntPipe) id: string) {
    return this.adminsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Admin ma'lumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Yangilangan admin ID'si",
  })
  @ApiResponse({ status: 404, description: "Admin not found with ID ${id}" })
  @ApiResponse({
    status: 500,
    description: "Error on update admin: + error.message",
  })
  update(
    @Param("id", ParseIntPipe) id: string,
    @Body() updateAdminDto: UpdateAdminDto
  ) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @Patch("update-password/:id")
  @ApiOperation({ summary: "Admin parolini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Paroli yangilangan admin ID'si",
  })
  @ApiResponse({ status: 404, description: "Admin not found with ID ${id}" })
  updatePassword(
    @Param("id", ParseIntPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto
  ) {
    return this.adminsService.updatePassword(+id, updatePasswordDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Adminni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "O'chirilgan admin ID'si",
  })
  @ApiResponse({ status: 404, description: "Admin not found with ID ${id}" })
  remove(@Param("id", ParseIntPipe) id: string) {
    return this.adminsService.remove(+id);
  }
}
