import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import Model from "./base.entity";
import { Post } from "./post.entity";
import { User } from "./user.entity";

/**
 * @swagger
 * components:
 *   schemas:
 *     PostCommentListData:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Post comment id
 *           example: 5859662e-c48e-441d-8dcd-967aa102ee92
 *         created_at:
 *           type: date
 *           description: Post comment created at timestamp
 *           example: 2023-09-24T16:24:18.322Z
 *         updated_at:
 *           type: date
 *           description: Post comment last update timestamp
 *           example: 2023-09-24T16:24:18.322Z
 *         content:
 *           type: string
 *           description: Post comment content
 *           example: Such exquisite, much wow! :o
 *         user:
 *           type: object
 *           description: Post comment's creator
 *           $ref: '#components/schemas/UserData'
 *     PostCommentData:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Post comment id
 *           example: 5859662e-c48e-441d-8dcd-967aa102ee92
 *         created_at:
 *           type: date
 *           description: Post comment created at timestamp
 *           example: 2023-09-24T16:24:18.322Z
 *         updated_at:
 *           type: date
 *           description: Post comment last update timestamp
 *           example: 2023-09-24T16:24:18.322Z
 *         content:
 *           type: string
 *           description: Post comment content
 *           example: Such exquisite, much wow! :o
 *         user:
 *           type: object
 *           description: Post comment's creator
 *           $ref: '#components/schemas/UserData'
 *         post:
 *           type: object
 *           description: Post that was commented
 *           $ref: '#components/schemas/PostData'
 */
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
