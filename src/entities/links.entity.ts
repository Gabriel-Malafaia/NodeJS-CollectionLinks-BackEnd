import { User } from "./user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { FavoriteLinks } from "./favorite_links.entity";

@Entity("links")
export class Link {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column({ nullable: true, default: false })
  favorite: boolean;

  @OneToMany(() => FavoriteLinks, (favorite) => favorite.link)
  mainTopics: FavoriteLinks[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.links)
  @JoinColumn({ name: "user_id" })
  user: User;
}
