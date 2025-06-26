import { Module } from "@nestjs/common";
import { PaymentMethodsService } from "./payment-methods.service";
import { PaymentMethodsController } from "./payment-methods.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { PaymentMethod } from "./models/payment-method.model";

@Module({
  imports: [SequelizeModule.forFeature([PaymentMethod])],
  controllers: [PaymentMethodsController],
  providers: [PaymentMethodsService],
  exports: [PaymentMethodsService],
})
export class PaymentMethodsModule {}
