import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import AppError from "./utils/appError";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import postRouter from "./routes/post.routes";
import config from "./config/config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

app.get("/ping", (_, res: Response) => {
  res.status(StatusCodes.OK).json({ status: "success", message: "pong" });
});

app.all("*", (req: Request, _, next: NextFunction) => {
  next(new AppError(404, `Route ${req.originalUrl} not found`));
});

export default app;

app.use((error: AppError, _req: Request, res: Response) => {
  error.status = error.status || "error";
  error.statusCode = error.statusCode || 500;

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
});
