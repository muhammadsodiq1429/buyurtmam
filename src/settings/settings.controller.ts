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
import { CreateSettingDto } from "./dto/create-setting.dto";
import { UpdateSettingDto } from "./dto/update-setting.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Setting } from "./models/setting.model";
import { SettingsService } from "./settings.service";

@Controller("settings")
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi setting qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi qo'shilgan setting qaytaradi",
    type: Setting,
  })
  @ApiResponse({
    status: 404,
    description: "Customer not found with ID ${id}",
  })
  create(@Body() createSettingDto: CreateSettingDto) {
    return this.settingsService.create(createSettingDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha setting ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Setting ro'yxati",
    type: [Setting],
  })
  @ApiResponse({ status: 404, description: "Settings not found" })
  findAll() {
    return this.settingsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha bitta setting olish" })
  @ApiResponse({ status: 200, description: "Bitta setting", type: Setting })
  @ApiResponse({ status: 404, description: "Setting not found with ID ${id}" })
  findOne(@Param("id", ParseIntPipe) id: string) {
    return this.settingsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Setting ma'lumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Yangilangan setting",
    type: Setting,
  })
  @ApiResponse({ status: 404, description: "Setting not found with ID ${id}" })
  @ApiResponse({ status: 404, description: "Customer not found with ID ${id}" })
  update(
    @Param("id", ParseIntPipe) id: string,
    @Body() updateSettingDto: UpdateSettingDto
  ) {
    return this.settingsService.update(+id, updateSettingDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Settingni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "O'chirilgan setting ID'si",
  })
  @ApiResponse({ status: 404, description: "Setting not found with ID ${id}" })
  remove(@Param("id", ParseIntPipe) id: string) {
    return this.settingsService.remove(+id);
  }
}
