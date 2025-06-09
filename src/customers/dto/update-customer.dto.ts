import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateCustomerDto } from "./create-customer.dto";

export class UpdateCustomerDto extends OmitType(
  PartialType(CreateCustomerDto),
  ["confirm_password", "password"] as const
) {}
