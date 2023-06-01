import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Index("avatar_pkey", ["id"], { unique: true })
@Entity("avatar", { schema: "public" })
export class Avatar extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string;

  @Column({ type: "uuid", name: "user_id", nullable: true })
  userId?: string;

  @Column({ type: "varchar", name: "link", nullable: false })
  link: string;

  @Column({ type: "varchar", name: "hash", nullable: true })
  hash: string;

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

  @OneToOne(() => User, (user) => user.avatar)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user?: User;
}
