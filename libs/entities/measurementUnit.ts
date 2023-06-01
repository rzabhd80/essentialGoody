import {
  Column,
  Entity,
  Index, OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Avatar } from "./avatar.entity";
import { BaseModel } from "helpers/baseModel";
import { EssentialGood } from "./essentialGood.entity";

@Index("measurement_unit_pkey", ["id"], { unique: true })
@Entity("measurement_unit", { schema: "public" })
export class MeasurementUnit extends BaseModel {
  @Column("varchar", { name: "name", nullable: false, length: 255 })
  name: string;

  @Column({ name: "symbol", type: "varchar", nullable: false, length: 255 })
  symbol: string;

  @OneToMany(() => EssentialGood,
    (essentialGood) => essentialGood.measurementUnit)
  essentialGoods: EssentialGood[];
}
