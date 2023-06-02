import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index, JoinColumn, ManyToMany, ManyToOne, OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Avatar } from "./avatar.entity";
import { BaseModel } from "libs/entities/baseModel";
import { MeasurementUnitEntity } from "./measurementUnit.entity";
import { CategoryEntity } from "./category.entity";
import { EssentialGoodSupplier } from "./EssentialGoodSupplier.entity";
import { Supplier } from "./suppliers.entity";

@Index("essential_good_pkey", ["id"], { unique: true })
@Entity("essential_good", { schema: "public" })
export class EssentialGood extends BaseModel {
  @Column("varchar", { name: "name", nullable: false, length: 255 })
  name: string;

  @Column("bigint", { name: "stock", nullable: false })
  stock: number;

  @Column("uuid", { name: "category_id", nullable: false })
  category_id: number;

  @Column({ name: "measurement_unit_id", type: "uuid", nullable: false })
  measurementUnitId: number;

  @ManyToOne(() => MeasurementUnitEntity,
    (measurementUnit) => measurementUnit.essentialGoods)
  @JoinColumn({ name: "measurement_unit_id", referencedColumnName: "id" })
  measurementUnit: MeasurementUnitEntity;

  @ManyToMany(() => CategoryEntity,
    (category) => category.essentialGoods)
  categories: CategoryEntity[];

  @OneToMany(() => EssentialGoodSupplier,
    (essentialGoodSupplier) => essentialGoodSupplier.essentialGood)
  suppliers: Supplier[];
}
