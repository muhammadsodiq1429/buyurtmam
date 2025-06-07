import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DishIngredientsService } from './dish-ingredients.service';
import { CreateDishIngredientDto } from './dto/create-dish-ingredient.dto';
import { UpdateDishIngredientDto } from './dto/update-dish-ingredient.dto';

@Controller('dish-ingredients')
export class DishIngredientsController {
  constructor(private readonly dishIngredientsService: DishIngredientsService) {}

  @Post()
  create(@Body() createDishIngredientDto: CreateDishIngredientDto) {
    return this.dishIngredientsService.create(createDishIngredientDto);
  }

  @Get()
  findAll() {
    return this.dishIngredientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dishIngredientsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDishIngredientDto: UpdateDishIngredientDto) {
    return this.dishIngredientsService.update(+id, updateDishIngredientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dishIngredientsService.remove(+id);
  }
}
