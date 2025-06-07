import { Module } from '@nestjs/common';
import { DishIngredientsService } from './dish-ingredients.service';
import { DishIngredientsController } from './dish-ingredients.controller';

@Module({
  controllers: [DishIngredientsController],
  providers: [DishIngredientsService],
})
export class DishIngredientsModule {}
