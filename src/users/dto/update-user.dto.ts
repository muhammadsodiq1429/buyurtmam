import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends OmitType(PartialType(CreateUserDto), [
  "confirm_password",
  "password" as const,
]) {}
