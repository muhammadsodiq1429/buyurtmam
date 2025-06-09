import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Customer } from "./models/customer.model";
import { Sequelize } from "sequelize-typescript";
import { UsersService } from "../users/users.service";
import { UserRole } from "../common/enums/user.enum";
import { MailService } from "../mail/mail.service";
import { iif } from "rxjs";
import { UpdatePasswordDto } from "../users/dto/update-password.dto";
import { User } from "../users/models/user.model";

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer) private readonly customerModel: typeof Customer,
    private readonly userService: UsersService,
    private readonly mailService: MailService,
    private readonly sequelize: Sequelize
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const user = await this.userService.create(
        { ...createCustomerDto, is_active: false, role: UserRole.CUSTOMER },
        transaction
      );
      const customer = await this.customerModel.create(
        {
          ...createCustomerDto,
          user_id: user.id,
        },
        { transaction }
      );

      try {
        await this.mailService.sendMail(customer, user);
      } catch (error) {
        console.log(error);
        throw new ServiceUnavailableException(
          "Error on send email",
          error.message
        );
      }

      await transaction.commit();
      return {
        success: true,
        message: "Customer added successfully",
        newCustomerId: customer.user_id,
      };
    } catch (error) {
      await transaction.rollback();
      throw new InternalServerErrorException(error);
    }
  }

  async activate(activation_link: string) {
    if (!activation_link)
      throw new BadRequestException("Activation link not found");
    const customer = await this.customerModel.findOne({
      where: { activation_link },
    });
    if (!customer)
      throw new NotFoundException(`Customer not found with activation link`);

    const user = await this.userService.findOne(customer.user_id);

    if (user.is_active) {
      throw new BadRequestException("Customer already activated");
    }

    await user.update({ is_active: true });

    return {
      success: true,
      message: "Customer activated successfully",
      activatedCustomerId: customer.id,
    };
  }

  async findAll() {
    const allCustomers = await this.customerModel.findAll({
      include: { all: true },
    });
    if (allCustomers.length === 0)
      throw new NotFoundException(`Customers not found`);

    return { success: true, allCustomers };
  }

  async findOne(id: number) {
    const customer = await this.customerModel.findByPk(id, {
      include: { all: true },
    });
    if (!customer)
      throw new NotFoundException(`Customer not found with ID ${id}`);

    return { success: true, customer };
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const { customer } = await this.findOne(id);
    const transaction = await this.sequelize.transaction();
    try {
      await customer.update(updateCustomerDto, { transaction });
      await this.userService.update(id, updateCustomerDto, transaction);

      await transaction.commit();

      return {
        success: true,
        message: "Customer updated successfully",
        updatedCustomerId: customer.user_id,
      };
    } catch (error) {
      await transaction.rollback();
      throw new InternalServerErrorException(
        "Error on update customer: " + error.message
      );
    }
  }

  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    const customer = await this.userService.findByAny({
      where: {
        id,
        role: UserRole.CUSTOMER,
      },
      include: { all: true },
    });
    if (!customer)
      throw new NotFoundException(`Customer not found with ID ${id}`);
    await this.userService.updatePassword(customer, updatePasswordDto);

    return {
      success: true,
      message: "Customer password updated successfully",
      id,
    };
  }

  async remove(id: number) {
    const { customer } = await this.findOne(id);
    await customer.destroy();
    await this.userService.remove(id);

    return {
      success: true,
      message: "Customer delete successfully",
      deletedCustomerId: customer.user_id,
    };
  }
}
