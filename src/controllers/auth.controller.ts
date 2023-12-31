import { CookieOptions, NextFunction, Request, Response } from "express";
import config from "../config/config";
import { CreateUserInput, LoginUserInput } from "../schemas/user.schema";
import {
  createUser,
  findUserByEmail,
  findUserById,
  signTokens,
} from "../services/user.service";
import { User } from "../entities/user.entity";
import { signJwt, verifyJwt } from "../utils/jwt";
import { KafkaTopic, produce } from "../utils/kafka";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
};

if (config.nodeEnv === "production") cookieOptions.secure = true;

const accessTokenCookieOptions: CookieOptions = {
  ...cookieOptions,
  expires: new Date(
    Date.now() + config.accessTokenExpiresInMinutes * 60 * 1000,
  ),
  maxAge: config.accessTokenExpiresInMinutes * 60 * 1000,
};

const refreshTokenCookieOptions: CookieOptions = {
  ...cookieOptions,
  expires: new Date(
    Date.now() + config.refreshTokenExpiresInMinutes * 60 * 1000,
  ),
  maxAge: config.refreshTokenExpiresInMinutes * 60 * 90,
};

export const registerUserHandler = async (
  req: Request<Record<string, never>, Record<string, never>, CreateUserInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { first_name, last_name, username, email, password } = req.body;

    const registeredUser = await createUser({
      first_name,
      last_name,
      username,
      email: email.toLowerCase(),
      password,
    });
    await produce(KafkaTopic.USER_REGISTER, [
      {
        key: "user",
        value: JSON.stringify(registeredUser),
      },
    ]);

    res.status(201).json({
      status: "success",
    });
  } catch (err: any) {
    if ((err.code = "23505")) {
      return res.status(409).json({
        status: "error",
        message: "user with that email already exists",
      });
    }
    next(err);
  }
};

export const loginUserHandler = async (
  req: Request<Record<string, never>, Record<string, never>, LoginUserInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail({ email: email.toLowerCase() });
    if (!user) {
      return res.status(409).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    if (!(await User.comparePasswords(password, user.password))) {
      return res.status(409).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    const { access_token, refresh_token } = await signTokens(user);

    res.cookie("access_token", access_token, accessTokenCookieOptions);
    res.cookie("refresh_token", refresh_token, refreshTokenCookieOptions);
    res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    res.status(200).json({
      status: "success",
    });
  } catch (err: any) {
    if ((err.code = "23505")) {
      return res.status(409).json({
        status: "error",
        message: "Invalid email or password",
      });
    }
    next(err);
  }
};

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const refresh_token = req.cookies.refresh_token;

    const message = "Could not refresh access token";

    if (!refresh_token) {
      res.status(401).json({
        status: "fail",
        message,
      });
    }

    const decoded = verifyJwt<{ sub: string }>(refresh_token, "refreshToken");

    if (!decoded) {
      res.status(401).json({
        status: "fail",
        message,
      });
    }

    const user = await findUserById(decoded.sub);

    if (!user) {
      res.status(401).json({
        status: "fail",
        message,
      });
    }

    const access_token = signJwt({ sub: user.id }, "accessToken", {
      expiresIn: `${config.accessTokenExpiresInMinutes}m`,
    });

    res.cookie("access_token", access_token, accessTokenCookieOptions);
    res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    res.status(200).json({
      status: "success",
    });
  } catch (err: any) {
    next(err);
  }
};

const logout = (res: Response) => {
  res.cookie("access_token", "", { maxAge: 1 });
  res.cookie("refresh_token", "", { maxAge: 1 });
  res.cookie("logged_in", "", { maxAge: 1 });
};

export const logoutHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    logout(res);

    res.status(200).json({
      status: "success",
    });
  } catch (err: any) {
    next(err);
  }
};
