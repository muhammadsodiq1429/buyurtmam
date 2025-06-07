import { PartialType } from '@nestjs/swagger';
import { CreateDishIngredientDto } from './create-dish-ingredient.dto';

export class UpdateDishIngredientDto extends PartialType(CreateDishIngredientDto) {}
