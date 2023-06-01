import { profile } from "console";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Avatar } from "./avatar.entity";
import { BaseModel } from "helpers/baseModel";

@Index("user_pkey", ["id"], { unique: true })
@Entity("user", { schema: "public" })
export class User extends BaseModel {
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

  @OneToOne(() => Avatar, (avatar) => avatar.user)
  avatar?: Avatar;
}
