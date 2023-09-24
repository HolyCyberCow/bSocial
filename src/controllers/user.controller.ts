import AppError from "../utils/appError";
import { NextFunction, Request, Response } from "express";
import { FollowUserInput } from "src/schemas/user.schema";
import {
  findUser,
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
    // const user = res.locals.user;
    const user = await findUserWithRelations(res.locals.user.id);
    console.log("USER_W_RELATIONS", user);
    const requestedFollowUser = await findUserById(req.params.userId);
    if (!requestedFollowUser) {
      return next(new AppError(404, "User with that ID not found"));
    }
    console.log("REQ_FOLLOW_USEr", requestedFollowUser);
    console.log(
      "SANITY_CHECK",
      user.following.includes(requestedFollowUser, 0),
    );
    console.log(
      "DOUBLE ASNITY CHECK",
      user.following.find((val) => val.id === requestedFollowUser.id),
    );
    if (user.following.find((val) => val.id === requestedFollowUser.id)) {
      return next(new AppError(404, "Already following that user"));
    }

    const followedUser = await followUser(user, requestedFollowUser);
    console.log(followedUser);
    res.status(200).json({
      status: "success",
      message: `You are now following user ${requestedFollowUser.username}`,
    });
  } catch (err: any) {
    next(err);
  }
};
