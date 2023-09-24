import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
} from "typeorm";
import bcrypt from "bcryptjs";
import Model from "./base.entity";

// import { Post } from "./post.entity";
// import { PostComment } from "./comment.entity";

@Entity("users")
export class User extends Model {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Index("username_index")
  @Column()
  username: string;

  @Index("email_index")
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  // @OneToMany(() => Post, (post) => post.user)
  // posts: Post[];
  //
  // @OneToMany(() => PostComment, (postComment) => postComment.user)
  // comments: Post[];

  @ManyToMany(() => User)
  @JoinTable({
    name: "followers",
    joinColumn: { name: "follower" },
    inverseJoinColumn: { name: "followee" },
  })
  following: User[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string,
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  toJSON() {
    return {
      ...this,
      password: undefined,
    };
  }
}
