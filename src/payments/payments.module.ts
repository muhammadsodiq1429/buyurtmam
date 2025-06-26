import { Module } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { PaymentsController } from "./payments.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { PaymentMethod } from "../payment-methods/models/payment-method.model";

@Module({
  // imports: [SequelizeModule.forFeature([])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
