import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index, JoinColumn, ManyToMany, ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Avatar } from "./avatar.entity";
import { BaseModel } from "libs/entities/baseModel";
import { MeasurementUnitEntity } from "./measurementUnit.entity";
import { CategoryEntity } from "./category.entity";
import { EssentialGood } from "./essentialGood.entity";
import { Supplier } from "./suppliers.entity";

@Index("essential_good_supplier_pkey", ["id"], { unique: true })
@Entity("essential_good_supplier", { schema: "public" })
export class EssentialGoodSupplier extends BaseModel {
  @Column({ name: "essential_good_id", type: "uuid", nullable: false })
  essentialGoodId: string;

  @Column({ name: "supplier_id", type: "uuid", nullable: false })
  supplierId: string;

  @Column({ name: "price", type: "money", nullable: false })
  price: number;

  @ManyToOne(() => EssentialGood,
    (essentialGood) => essentialGood.suppliers)
  @JoinColumn({ name: "essential_good_id", referencedColumnName: "id" })
  essentialGood: EssentialGood;

  @ManyToOne(() => Supplier,
    (supplier) => supplier.essentialGoods)
  supplier: Supplier;
}
