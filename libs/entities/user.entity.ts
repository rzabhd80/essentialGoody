import {
  BaseEntity, Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string;

  @Column("varchar", { name: "email", nullable: false, length: 255 })
  email: string;

  @Column("varchar", { name: "firstName", nullable: false, length: 255 })
  firstName: string;

  @Column("varchar", { name: "lastName", nullable: false, length: 255 })
  lastName: string;

  @Column("varchar", { name: "password", nullable: false })
  password: string;

  @CreateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP(6)",
    name: "created_at",
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
    name: "updated_at",
  })
  public updatedAt: Date;

  @DeleteDateColumn({
    type: "timestamptz",
    default: () => `null`,
    name: "deleted_at",
  })
  public deletedAt: Date | null;
}