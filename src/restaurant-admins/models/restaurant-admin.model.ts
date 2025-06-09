import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Restaurant } from "../../restaurants/models/restaurant.model";
import { User } from "../../users/models/user.model";

interface IRestaurantAdminCreationAttr {
  user_id: number;
  is_superadmin?: boolean;
  restaurant_id: number;
}

@Table
export class RestaurantAdmin extends Model<
  RestaurantAdmin,
  IRestaurantAdminCreationAttr
> {
  @ApiProperty({
    description:
      "RestaurantAdminining takrorlanmas ID'si, User table'siga bog‘langan.",
    example: 1,
    type: "number",
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true })
  declare user_id: number;

  @ApiProperty({
    description: "RestaurantAdmin super adminligi",
    example: false,
    type: "boolean",
    default: false,
    required: false,
  })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_superadmin: boolean;

  @ApiProperty({
    description:
      "RestaurantAdmin ishlaydigan restaurant ID'si, Restaurant table'siga bog‘langan.",
    example: 1,
    type: "number",
  })
  @ForeignKey(() => Restaurant)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare restaurant_id: number;

  @BelongsTo(() => Restaurant)
  declare restaurant: Restaurant;

  @BelongsTo(() => User)
  declare user: User;
}
