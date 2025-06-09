import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { VehicleType } from "../../common/enums/courier.enum";
import { User } from "../../users/models/user.model";

interface ICourierCreationAttr {
  user_id: number;
  vehicle_type: VehicleType;
  license_plate?: string;
  passport_id?: string;
  birth_date: Date;
  is_available: boolean;
  current_lat?: number;
  current_lng?: number;
  hired_at?: Date;
}

@Table
export class Courier extends Model<Courier, ICourierCreationAttr> {
  @ApiProperty({
    description: "Courierning takrorlanmas ID'si, User table'siga bog‘langan.",
    example: 1,
    type: "number",
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  declare user_id: number;

  @ApiProperty({
    enum: VehicleType,
    description: "Kuryerning transport turi",
    example: VehicleType.BICYCLE,
  })
  @Column({
    type: DataType.ENUM(...Object.values(VehicleType)),
    allowNull: false,
  })
  declare vehicle_type: VehicleType;

  @ApiProperty({
    description: "Avtomobil raqami yoki transport identifikatori",
    example: "01A123BC",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare license_plate: string;

  @ApiProperty({
    description: "Pasport seriyasi yoki identifikator",
    example: "AB1234567",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare passport_id: string;

  @ApiProperty({
    description: "Tug‘ilgan sana",
    example: "1995-07-12",
  })
  @Column({ type: DataType.DATEONLY, allowNull: false })
  declare birth_date: Date;

  @ApiProperty({
    description: "Profil rasmi URL manzili",
    example: "https://example.com/images/avatar.jpg",
  })
  @Column({ type: DataType.STRING })
  declare profile_photo_url: string;

  @ApiProperty({
    description: "Kuryer hozirda mavjudmi",
    example: true,
  })
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  declare is_available: boolean;

  @ApiProperty({
    description: "Hozirgi joylashuvi - kenglik",
    example: 41.32,
  })
  @Column({ type: DataType.DECIMAL })
  declare current_lat: number;

  @ApiProperty({
    description: "Hozirgi joylashuvi - uzunlik",
    example: 69.25,
  })
  @Column({ type: DataType.DECIMAL })
  declare current_lng: number;

  @ApiProperty({
    description: "Ishga kirgan sanasi",
    example: "2024-04-01T09:00:00Z",
  })
  @Column({ type: DataType.DATE, defaultValue: DataType.NOW() })
  declare hired_at: Date;

  @BelongsTo(() => User)
  declare user: User;
}
