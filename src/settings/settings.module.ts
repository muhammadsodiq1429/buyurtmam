import { Module } from "@nestjs/common";
import { SettingsService } from "./settings.service";
import { SettingsController } from "./settings.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Setting } from "./models/setting.model";
import { CustomersModule } from "../customers/customers.module";
import { PaymentsModule } from "../payments/payments.module";
import { PaymentMethodsModule } from "../payment-methods/payment-methods.module";
import { AddressesModule } from "../addresses/addresses.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Setting]),
    CustomersModule,
    PaymentMethodsModule,
    AddressesModule
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
