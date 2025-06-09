import { Module } from "@nestjs/common";
import { CouriersService } from "./couriers.service";
import { CouriersController } from "./couriers.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Courier } from "./models/courier.model";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [SequelizeModule.forFeature([Courier]), UsersModule],
  controllers: [CouriersController],
  providers: [CouriersService],
})
export class CouriersModule {}
