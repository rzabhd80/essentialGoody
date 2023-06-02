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
import { EssentialGood } from "./essentialGood.entity";

@Index("category_pkey", ["id"], { unique: true })
@Entity("category", { schema: "public" })
export class CategoryEntity extends BaseModel {
  @Column("varchar", { name: "name", nullable: false, length: 255 })
  name: string;

  @Column({ name: "parent_category", type: "uuid", nullable: true })
  parentCategoryId: string;

  @OneToOne(() => CategoryEntity, (category) =>
    category.parentCategory)
  @JoinColumn({ name: "parent_category_id", referencedColumnName: "id" })
  parentCategory: CategoryEntity;

  @ManyToMany(() => EssentialGood, (essentialGood) => essentialGood.categories)
  essentialGoods: EssentialGood[];
}
