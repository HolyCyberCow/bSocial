import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import Model from "./base.entity";
import { User } from "./user.entity";

/**
 * @swagger
 * components:
 *   schemas:
 *     PostData:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Post id
 *           example: cef06ef9-a519-4918-976c-1120ee47e090
 *         created_at:
 *           type: date
 *           description: Post created at timestamp
 *           example: 2023-09-24T16:24:18.322Z
 *         updated_at:
 *           type: date
 *           description: Post last update timestamp
 *           example: 2023-09-24T16:24:18.322Z
 *         title:
 *           type: string
 *           description: Post title
 *           example: The Lorem Ipsum
 *         content:
 *           type: string
 *           description: Post content
 *           example: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc elit magna, gravida sit amet lectus non, sollicitudin volutpat risus. Proin nisl dolor, sodales in metus eget, ornare hendrerit velit.
 *     PostWithUserData:
 *       allOf:
 *         - $ref: '#components/schemas/PostData'
 *         - type: object
 *           properties:
 *             user:
 *               $ref: '#components/schemas/UserData'
 */

@Entity("posts")
export class Post extends Model {
  @Column({
    unique: true,
  })
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user: User;
}
