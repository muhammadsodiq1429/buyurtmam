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
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Role } from "./models/role.model";

@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({ summary: "Yangi role qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi qo'shilgan role qaytaradi",
    type: Role,
  })
  @ApiResponse({
    status: 409,
    description: "Role already exists with name ${createRoleDto.name}",
  })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha rollarni ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Role ro'yxati",
    type: [Role],
  })
  @ApiResponse({ status: 404, description: "Roles not found" })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha bitta role olish" })
  @ApiResponse({ status: 200, description: "Bitta role", type: Role })
  @ApiResponse({ status: 404, description: "Role not found with ID ${id}" })
  findOne(@Param("id", ParseIntPipe) id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Role ma'lumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Yangilangan role",
    type: Role,
  })
  @ApiResponse({ status: 404, description: "Role not found with ID ${id}" })
  @ApiResponse({
    status: 409,
    description: "Role with this name already exists",
  })
  update(
    @Param("id", ParseIntPipe) id: string,
    @Body() updateRoleDto: UpdateRoleDto
  ) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Roleni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "O'chirilgan role ID'si",
  })
  @ApiResponse({ status: 404, description: "Role not found with ID ${id}" })
  remove(@Param("id", ParseIntPipe) id: string) {
    return this.rolesService.remove(+id);
  }
}
