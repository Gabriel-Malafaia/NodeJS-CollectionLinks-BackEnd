import { Link } from "./links.entity";
import { getRounds, hashSync } from "bcryptjs";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 72 })
  name: string;

  @Column({ length: 256 })
  email: string;

  @Column({ length: 65 })
  password: string;

  @OneToMany(() => Link, (link) => link.user, { onDelete: "CASCADE" })
  links: Link[];

  @CreateDateColumn()
  createdAt: Date;

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    const isEncrypted = getRounds(this.password);
    if (!isEncrypted) {
      this.password = hashSync(this.password, 10);
    }
  }
}
