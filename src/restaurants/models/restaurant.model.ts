import { flatten } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IRestaurantCreationAttr {
  name: string;
  description?: string;
  address: string;
  lat: number;
  lng: number;
  phone_number: string;
  is_active?: boolean;
}

@Table
export class Restaurant extends Model<Restaurant, IRestaurantCreationAttr> {
  @ApiProperty({
    example: "Oqtepa Lavash",
    description: "Restoran nomi",
    type: String,
    uniqueItems: true,
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare name: string;

  @ApiProperty({
    example: "Mazali lavash va donarlari bilan mashhur",
    description: "Restoran haqida qisqacha ma'lumot",
    type: String,
  })
  @Column({ type: DataType.STRING })
  declare description: string;

  @ApiProperty({
    example: "Toshkent, Chilonzor-9",
    description: "Restoran manzili",
    type: String,
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare address: string;

  @ApiProperty({
    example: 41.311081,
    description: "Latitude koordinatasi",
    type: Number,
  })
  @Column({ type: DataType.DECIMAL, allowNull: false })
  declare lat: number;

  @ApiProperty({
    example: 69.240562,
    description: "Longitude koordinatasi",
    type: Number,
  })
  @Column({ type: DataType.DECIMAL, allowNull: false })
  declare lng: number;

  @ApiProperty({
    example: "+998901234567",
    description: "Restoran telefon raqami",
    type: String,
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare phone_number: string;

  @ApiProperty({
    example: true,
    description: "Restoran faolmi yo‘qmi",
    type: Boolean,
  })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare is_active: boolean;
}
