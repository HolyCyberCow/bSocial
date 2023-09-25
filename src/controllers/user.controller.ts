import AppError from "../utils/appError";
import { NextFunction, Request, Response } from "express";
import { FollowUserInput } from "src/schemas/user.schema";
import {
  findUserById,
  findUserWithRelations,
  followUser,
} from "../services/user.service";

export const getMeHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = res.locals.user;

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const followUserHanlder = async (
  req: Request<FollowUserInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await findUserWithRelations(res.locals.user.id);
    const requestedFollowUser = await findUserById(req.params.userId);
    if (!requestedFollowUser) {
      return next(new AppError(404, "User with that ID not found"));
    }
    if (user.following.find((val) => val.id === requestedFollowUser.id)) {
      return next(new AppError(404, "Already following that user"));
    }

    await followUser(user, requestedFollowUser);
    res.status(200).json({
      status: "success",
      message: `You are now following user ${requestedFollowUser.username}`,
    });
  } catch (err: any) {
    next(err);
  }
};
