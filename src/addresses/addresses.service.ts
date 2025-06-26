import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Address } from "./models/address.model";
import { CustomersService } from "../customers/customers.service";

@Injectable()
export class AddressesService {
  constructor(
    @InjectModel(Address) private readonly addressModel: typeof Address,
    private readonly customersService: CustomersService
  ) {}
  async create(createAddressDto: CreateAddressDto) {
    await this.customersService.findOne(createAddressDto.customer_id);
    const newAddress = await this.addressModel.create(createAddressDto);

    return { success: true, message: "Address added successfully", newAddress };
  }

  async findAll() {
    const allAddresses = await this.addressModel.findAll({
      include: { all: true },
    });
    if (allAddresses.length === 0)
      throw new NotFoundException("Addresses not found");

    return { success: true, allAddresses };
  }

  async findOne(id: number) {
    const address = await this.addressModel.findByPk(id, {
      include: { all: true },
    });
    if (!address)
      throw new NotFoundException(`Address not found with ID ${id}`);

    return { success: true, address };
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    const { customer_id } = updateAddressDto;
    if (customer_id) await this.customersService.findOne(customer_id);
    const { address } = await this.findOne(id);
    await address.update(updateAddressDto);

    return { success: true, message: "Address updated successfully", address };
  }

  async remove(id: number) {
    const { address } = await this.findOne(id);
    await address.destroy();

    return { success: true, message: "Address deleted successfully", id };
  }
}
