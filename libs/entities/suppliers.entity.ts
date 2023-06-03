import { profile } from "console";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index, OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Avatar } from "./avatar.entity";
import { BaseModel } from "libs/entities/baseModel";
import { EssentialGoodSupplier } from "./EssentialGoodSupplier.entity";

@Index("supplier_pkey", ["id"], { unique: true })
@Entity("supplier", { schema: "public" })
export class Supplier extends BaseModel {
  @Column("varchar", { name: "name", nullable: false, length: 255 })
  name: string;

  @OneToMany(() => EssentialGoodSupplier,
    (essentialGoodSupplier) => essentialGoodSupplier.supplier,
    { onDelete: "CASCADE" })
  essentialGoods: EssentialGoodSupplier[];
}
