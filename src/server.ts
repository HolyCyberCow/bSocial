import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import AppError from "./utils/appError";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import postRouter from "./routes/post.routes";
import config from "./config/config";
import {
  serve as serveSwagger,
  setup as setupSwagger,
} from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const swaggerUiOptions = {
  explorer: true,
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerJsDocOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "bSocial API",
      version: "0.0.1",
      description: "bSocial API Documentation",
    },
    servers: [
      {
        url: `http://localhost:${config.appPort}`,
        description: "Development server",
      },
    ],
  },
  apis: ["./src/{routes,schemas,entities}/*.ts"],
};
const swaggerSpec = swaggerJSDoc(swaggerJsDocOptions);
app.use("/api/docs", serveSwagger, setupSwagger(swaggerSpec, swaggerUiOptions));

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
