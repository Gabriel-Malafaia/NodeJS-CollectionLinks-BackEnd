import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Link } from "./links.entity";

@Entity("favorite_links")
export class FavoriteLinks {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @ManyToOne(() => Link, (link) => link.mainTopics)
  @JoinColumn({ name: "link_id" })
  link: Link;
}
