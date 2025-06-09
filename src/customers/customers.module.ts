import { Module } from "@nestjs/common";
import { CustomersService } from "./customers.service";
import { CustomersController } from "./customers.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Customer } from "./models/customer.model";
import { UsersModule } from "../users/users.module";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [SequelizeModule.forFeature([Customer]), UsersModule, MailModule],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
