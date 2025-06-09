import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateCourierDto } from "./create-courier.dto";

export class UpdateCourierDto extends OmitType(PartialType(CreateCourierDto), [
  "password",
  "confirm_password",
] as const) {}
