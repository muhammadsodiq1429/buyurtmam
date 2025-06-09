import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateRestaurantAdminDto } from "./create-restaurant-admin.dto";

export class UpdateRestaurantAdminDto extends OmitType(
  PartialType(CreateRestaurantAdminDto),
  ["confirm_password", "password"]
) {}
