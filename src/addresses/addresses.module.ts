import { Module } from "@nestjs/common";
import { AddressesService } from "./addresses.service";
import { AddressesController } from "./addresses.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Address } from "./models/address.model";
import { CustomersModule } from "../customers/customers.module";

@Module({
  imports: [SequelizeModule.forFeature([Address]), CustomersModule],
  controllers: [AddressesController],
  providers: [AddressesService],
  exports: [AddressesService],
})
export class AddressesModule {}
