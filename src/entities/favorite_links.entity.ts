import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
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

  @ManyToOne(() => Link, (link) => link.mainTopics, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "link_id" })
  link: Link;
}
