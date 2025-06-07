import { Injectable } from '@nestjs/common';
import { CreateDishIngredientDto } from './dto/create-dish-ingredient.dto';
import { UpdateDishIngredientDto } from './dto/update-dish-ingredient.dto';

@Injectable()
export class DishIngredientsService {
  create(createDishIngredientDto: CreateDishIngredientDto) {
    return 'This action adds a new dishIngredient';
  }

  findAll() {
    return `This action returns all dishIngredients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dishIngredient`;
  }

  update(id: number, updateDishIngredientDto: UpdateDishIngredientDto) {
    return `This action updates a #${id} dishIngredient`;
  }

  remove(id: number) {
    return `This action removes a #${id} dishIngredient`;
  }
}
