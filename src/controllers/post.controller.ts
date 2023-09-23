import { NextFunction, Request, Response } from "express";
import { CreatePostInput, GetPostInput } from "../schemas/post.schema";
import { createPost, findPosts, getPost } from "../services/post.service";
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

export const getPostHandler = async (
  req: Request<GetPostInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const post = await getPost(req.params.postId);

    if (!post) {
      return next(new AppError(404, "Post with that ID not found"));
    }

    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getPostsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const posts = await findPosts(req);

    res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
