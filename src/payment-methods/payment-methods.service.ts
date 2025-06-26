import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreatePaymentMethodDto } from "./dto/create-payment-method.dto";
import { UpdatePaymentMethodDto } from "./dto/update-payment-method.dto";
import { PaymentMethod } from "./models/payment-method.model";

@Injectable()
export class PaymentMethodsService {
  constructor(
    @InjectModel(PaymentMethod)
    private readonly paymentMethodModel: typeof PaymentMethod
  ) {}

  async create(createPaymentMethodDto: CreatePaymentMethodDto) {
    const newPaymentMethod = await this.paymentMethodModel.create(
      createPaymentMethodDto
    );
    return {
      success: true,
      message: "Payment method added successfully",
      newPaymentMethod,
    };
  }

  async findAll() {
    const allPaymentMethods = await this.paymentMethodModel.findAll({
      include: { all: true },
    });
    if (allPaymentMethods.length === 0)
      throw new NotFoundException("Payment methods not found");
    return { success: true, allPaymentMethods };
  }

  async findOne(id: number) {
    const paymentMethod = await this.paymentMethodModel.findByPk(id, {
      include: { all: true },
    });
    if (!paymentMethod)
      throw new NotFoundException(`Payment method not found with ID ${id}`);
    return { success: true, paymentMethod };
  }

  async update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    const { paymentMethod } = await this.findOne(id);
    await paymentMethod.update(updatePaymentMethodDto);
    return {
      success: true,
      message: "Payment method updated successfully",
      paymentMethod,
    };
  }

  async remove(id: number) {
    const { paymentMethod } = await this.findOne(id);
    await paymentMethod.destroy();
    return {
      success: true,
      message: "Payment method deleted successfully",
      id,
    };
  }
}
