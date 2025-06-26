import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Setting } from "./models/setting.model";
import { CreateSettingDto } from "./dto/create-setting.dto";
import { UpdateSettingDto } from "./dto/update-setting.dto";
import { CustomersService } from "../customers/customers.service";
import { AddressesService } from "../addresses/addresses.service";
import { PaymentMethodsService } from "../payment-methods/payment-methods.service";

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Setting) private readonly settingModel: typeof Setting,
    private readonly customersService: CustomersService,
    private readonly addressesService: AddressesService,
    private readonly paymentMethodsService: PaymentMethodsService
  ) {}

  async create(createSettingDto: CreateSettingDto) {
    await this.customersService.findOne(createSettingDto.customer_id);
    await this.paymentMethodsService.findOne(
      createSettingDto.default_payment_method_id
    );
    await this.addressesService.findOne(createSettingDto.default_address_id);
    const newSetting = await this.settingModel.create(createSettingDto);

    return {
      success: true,
      message: "Setting added successfully",
      newSetting,
    };
  }

  async findAll() {
    const allSettings = await this.settingModel.findAll({
      include: { all: true },
    });
    if (allSettings.length === 0)
      throw new NotFoundException("Settings not found");

    return { success: true, allSettings };
  }

  async findOne(id: number) {
    const setting = await this.settingModel.findByPk(id, {
      include: { all: true },
    });
    if (!setting)
      throw new NotFoundException(`Setting not found with ID ${id}`);

    return { success: true, setting };
  }

  async update(id: number, updateSettingDto: UpdateSettingDto) {
    const { customer_id } = updateSettingDto;
    if (customer_id) await this.customersService.findOne(customer_id);

    const { setting } = await this.findOne(id);
    await setting.update(updateSettingDto);

    return {
      success: true,
      message: "Setting updated successfully",
      setting,
    };
  }

  async remove(id: number) {
    const { setting } = await this.findOne(id);
    await setting.destroy();

    return {
      success: true,
      message: "Setting deleted successfully",
      id,
    };
  }
}
