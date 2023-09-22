import { object, string, TypeOf } from "zod";

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

export const deletePostSchema = object({
  ...params,
});

export type CreatePostInput = TypeOf<typeof createPostSchema>["body"];
export type GetPostInput = TypeOf<typeof getPostSchema>["params"];
export type DeletePostInput = TypeOf<typeof deletePostSchema>["params"];
