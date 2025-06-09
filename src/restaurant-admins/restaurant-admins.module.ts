import { Module } from "@nestjs/common";
import { RestaurantAdminsService } from "./restaurant-admins.service";
import { RestaurantAdminsController } from "./restaurant-admins.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { RestaurantAdmin } from "./models/restaurant-admin.model";
import { UsersModule } from "../users/users.module";
import { RestaurantsModule } from "../restaurants/restaurants.module";

@Module({
  imports: [
    SequelizeModule.forFeature([RestaurantAdmin]),
    UsersModule,
    RestaurantsModule,
  ],
  controllers: [RestaurantAdminsController],
  providers: [RestaurantAdminsService],
})
export class RestaurantAdminsModule {}
