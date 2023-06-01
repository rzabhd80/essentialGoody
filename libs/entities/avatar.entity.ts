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
import { BaseModel } from "helpers/baseModel";

@Index("avatar_pkey", ["id"], { unique: true })
@Entity("avatar", { schema: "public" })
export class Avatar extends BaseModel {
  @Column({ type: "uuid", name: "user_id", nullable: true })
  userId?: string;

  @Column({ type: "varchar", name: "link", nullable: false })
  link: string;

  @Column({ type: "varchar", name: "hash", nullable: true })
  hash: string;

  @OneToOne(() => User, (user) => user.avatar)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user?: User;
}
