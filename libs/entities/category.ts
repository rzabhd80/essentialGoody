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

@Index("category_pkey", ["id"], { unique: true })
@Entity("category", { schema: "public" })
export class Category extends BaseModel {
  @Column("varchar", { name: "name", nullable: false, length: 255 })
  name: string;

  @Column({ name: "parent_category", type: "uuid", nullable: true })
  parentCategoryId: number;

  @Column("bigint", { name: "stock", nullable: false })
  stock: number;

  @Column("uuid", { name: "category_id", nullable: false })
  category_id: number;

  @Column({ name: "measurement_unit_id", type: "uuid", nullable: false })
  measurementUnitId: number;

  @ManyToOne(() => MeasurementUnit,
    (measurementUnit) => measurementUnit.essentialGoods)
  measurementUnit: MeasurementUnit;

  @OneToOne(() => Category, (category) =>
    category.parentCategory)
  @JoinColumn({ name: "parent_category_id", referencedColumnName: "id" })
  parentCategory: number;
}
