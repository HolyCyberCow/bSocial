import { coerce, object, string, TypeOf } from "zod";

/**
 * @swagger
 * components:
 *   schemas:
 *     CreatePostData:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Post title.
 *           example: The Lorem Ipsum
 *         content:
 *           type: string
 *           description:  Post content
 *           example: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc elit magna, gravida sit amet lectus non, sollicitudin volutpat risus. Proin nisl dolor, sodales in metus eget, ornare hendrerit velit.
 */
export const createPostSchema = object({
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    content: string({
      required_error: "Content is required",
    }),
  }),
});

const params = {
  params: object({
    postId: string(),
  }),
};

export const getPostSchema = object({
  ...params,
});

export const getPostListSchema = object({
  query: object({
    page: coerce.number().default(1),
    perPage: coerce.number().default(30),
  }),
});

/**
 * @swagger
 * components:
 *   schemas:
 *     CreatePostCommentData:
 *       type: object
 *       properties:
 *         content:
 *           type: string
 *           description: Post comment content
 *           example: Such exquisite, much wow! :o
 */
export const createPostCommentSchema = object({
  body: object({
    content: string({
      required_error: "Content is required",
    }),
  }),
});

export type CreatePostInput = TypeOf<typeof createPostSchema>["body"];
export type GetPostInput = TypeOf<typeof getPostSchema>["params"];
export type GetPostListInput = TypeOf<typeof getPostListSchema>["query"];
export type CreatePostCommentInput = TypeOf<
  typeof createPostCommentSchema
>["body"];
