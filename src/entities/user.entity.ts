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

/**
 * @swagger
 * components:
 *   schemas:
 *     UserData:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: User id
 *           example: e27b82aa-8e3b-4e69-b1de-a1c10e769e05
 *         created_at:
 *           type: date
 *           description: User created at timestamp
 *           example: 2023-09-24T16:24:18.322Z
 *         updated_at:
 *           type: date
 *           description: User last update timestamp
 *           example: 2023-09-24T16:24:18.322Z
 *         first_name:
 *           type: string
 *           description: User's first name
 *           example: John
 *         last_name:
 *           type: string
 *           description: User's last name
 *           example: Doe
 *         username:
 *           type: string
 *           description: User's username
 *           example: jDoe
 *         email:
 *           type: string
 *           description: User's email
 *           example: jdoe@mail.net
 */
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
