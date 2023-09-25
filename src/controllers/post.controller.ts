import { NextFunction, Request, Response } from "express";
import {
  CreatePostCommentInput,
  CreatePostInput,
  GetPostInput,
  GetPostListInput,
} from "../schemas/post.schema";
import {
  createPost,
  createPostComment,
  findPosts,
  getPost,
  getPostComments,
} from "../services/post.service";
import { findUserById } from "../services/user.service";
import AppError from "../utils/appError";

export const createPostHandler = async (
  req: Request<Record<string, never>, Record<string, never>, CreatePostInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await findUserById(res.locals.user.id as string);

    const post = await createPost(req.body, user!);

    res.status(201).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err: any) {
    if (err.code === "23505") {
      return res.status(409).json({
        status: "fail",
        message: "Post with that title already exist",
      });
    }
    next(err);
  }
};

export const getPostsHandler = async (
  req: Request<
    Record<string, never>,
    Record<string, never>,
    Record<string, never>,
    GetPostListInput
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page, perPage } = req.query;
    const user = res.locals.user;
    const postsList = await findPosts(user, page, perPage);
    res.status(200).json({
      status: "success",
      ...postsList,
    });
  } catch (err: any) {
    next(err);
  }
};

export const createPostCommentHandler = async (
  req: Request<GetPostInput, Record<string, never>, CreatePostCommentInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await findUserById(res.locals.user.id as string);
    const post = await getPost(req.params.postId);

    if (!post) {
      return next(new AppError(404, "Post with that ID not found"));
    }

    const postComment = await createPostComment(req.body, post, user);

    res.status(200).json({
      status: "success",
      comment: postComment,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getPostCommentsHandler = async (
  req: Request<GetPostInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const postComments = await getPostComments(req.params.postId);

    res.status(200).json({
      status: "success",
      data: postComments,
    });
  } catch (err: any) {
    next(err);
  }
};
