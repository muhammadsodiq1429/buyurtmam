import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { User } from "../users/models/user.model";
import { Customer } from "../customers/models/customer.model";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(customer: Customer, user: User) {
    const url = `${process.env.API_URL}/api/customers/activate/${customer.activation_link}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: "Welcome to Buyurtmam app",
      template: "./confirmation",
      context: {
        name: user.first_name,
        url,
        year: new Date().getFullYear(),
      },
    });
  }
}
