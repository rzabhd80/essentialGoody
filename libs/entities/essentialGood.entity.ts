import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index, JoinColumn, ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Avatar } from "./avatar.entity";
import { BaseModel } from "helpers/baseModel";
import { MeasurementUnit } from "./measurementUnit";

@Index("essential_good_pkey", ["id"], { unique: true })
@Entity("essential_good", { schema: "public" })
export class EssentialGood extends BaseModel {
  @Column("varchar", { name: "name", nullable: false, length: 255 })
  name: string;

  @Column({ name: "price", type: "money", nullable: false, length: 255 })
  price: number;

  @Column("bigint", { name: "stock", nullable: false })
  stock: number;

  @Column("uuid", { name: "category_id", nullable: false })
  category_id: number;

  @Column({ name: "measurement_unit_id", type: "uuid", nullable: false })
  measurementUnitId: number;

  @ManyToOne(() => MeasurementUnit,
    (measurementUnit) => measurementUnit.essentialGoods)
  @JoinColumn({ name: "measurement_unit_id", referencedColumnName: "id" })
  measurementUnit: MeasurementUnit;

}
