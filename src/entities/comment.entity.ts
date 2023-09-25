import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import Model from "./base.entity";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@Entity("comments")
export class PostComment extends Model {
  @Column()
  content: string;

  @ManyToOne(() => Post, { nullable: false })
  @JoinColumn({ name: "post_id" })
  post: Post;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user: User;
}
