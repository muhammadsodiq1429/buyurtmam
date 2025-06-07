import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CouriersService } from './couriers.service';
import { CreateCourierDto } from './dto/create-courier.dto';
import { UpdateCourierDto } from './dto/update-courier.dto';

@Controller('couriers')
export class CouriersController {
  constructor(private readonly couriersService: CouriersService) {}

  @Post()
  create(@Body() createCourierDto: CreateCourierDto) {
    return this.couriersService.create(createCourierDto);
  }

  @Get()
  findAll() {
    return this.couriersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couriersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourierDto: UpdateCourierDto) {
    return this.couriersService.update(+id, updateCourierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couriersService.remove(+id);
  }
}
