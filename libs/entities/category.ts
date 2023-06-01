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
import { BaseModel } from "helpers/baseModel";
import { MeasurementUnit } from "./measurementUnit";
import { EssentialGood } from "./essentialGood.entity";
import { JoinTable } from "typeorm/browser";

@Index("category_pkey", ["id"], { unique: true })
@Entity("category", { schema: "public" })
export class Category extends BaseModel {
  @Column("varchar", { name: "name", nullable: false, length: 255 })
  name: string;

  @Column({ name: "parent_category", type: "uuid", nullable: true })
  parentCategoryId: number;

  @OneToOne(() => Category, (category) =>
    category.parentCategory)
  @JoinColumn({ name: "parent_category_id", referencedColumnName: "id" })
  parentCategory: number;

  @ManyToMany(() => EssentialGood, (essentialGood) => essentialGood.categories)
  @JoinTable()
  essentialGoods: EssentialGood[];
}
