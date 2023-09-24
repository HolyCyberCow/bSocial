import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import Model from "./base.entity";
import { User } from "./user.entity";

@Entity("posts")
export class Post extends Model {
  @Column({
    unique: true,
  })
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ "name": "user_id" })
  user: User;
}
