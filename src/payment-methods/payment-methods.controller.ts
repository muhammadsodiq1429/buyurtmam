import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { CreatePaymentMethodDto } from "./dto/create-payment-method.dto";
import { UpdatePaymentMethodDto } from "./dto/update-payment-method.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { PaymentMethod } from "./models/payment-method.model";
import { PaymentMethodsService } from "./payment-methods.service";

@Controller("payment-methods")
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi paymentMethod qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi qo'shilgan paymentMethod qaytaradi",
    type: PaymentMethod,
  })
  @ApiResponse({
    status: 404,
    description: "Customer not found with ID ${id}",
  })
  create(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.paymentMethodsService.create(createPaymentMethodDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha paymentMethod ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "PaymentMethod ro'yxati",
    type: [PaymentMethod],
  })
  @ApiResponse({ status: 404, description: "PaymentMethods not found" })
  findAll() {
    return this.paymentMethodsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha bitta paymentMethod olish" })
  @ApiResponse({
    status: 200,
    description: "Bitta paymentMethod",
    type: PaymentMethod,
  })
  @ApiResponse({
    status: 404,
    description: "PaymentMethod not found with ID ${id}",
  })
  findOne(@Param("id", ParseIntPipe) id: string) {
    return this.paymentMethodsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "PaymentMethod ma'lumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Yangilangan paymentMethod",
    type: PaymentMethod,
  })
  @ApiResponse({
    status: 404,
    description: "PaymentMethod not found with ID ${id}",
  })
  @ApiResponse({ status: 404, description: "Customer not found with ID ${id}" })
  update(
    @Param("id", ParseIntPipe) id: string,
    @Body() updatePaymentMethodDto: UpdatePaymentMethodDto
  ) {
    return this.paymentMethodsService.update(+id, updatePaymentMethodDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "PaymentMethodni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "O'chirilgan paymentMethod ID'si",
  })
  @ApiResponse({
    status: 404,
    description: "PaymentMethod not found with ID ${id}",
  })
  remove(@Param("id", ParseIntPipe) id: string) {
    return this.paymentMethodsService.remove(+id);
  }
}
