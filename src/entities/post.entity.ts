import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import Model from "./base.entity";
import { User } from "./user.entity";

// import { PostComment } from "./comment.entity";

@Entity("posts")
export class Post extends Model {
  @Column({
    unique: true,
  })
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, { "nullable": false })
  @JoinColumn({ "name": "user_id" })
  user: User;

  // @OneToMany(() => PostComment)
  // post_comments: PostComment[];
}
