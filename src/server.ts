import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
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
  apis: ["./src/**/*.ts"],
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

/**
 * @swagger
 *
 * /ping:
 *   get:
 *     summary: Ping
 *     description: Ping the backend server / Health check
 *     tags: [Global]
 *     responses:
 *       200:
 *         description: A successfull ping response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/SimpleMessageResponse'
 */
app.get("/ping", (_, res: Response) => {
  res.status(200).json({ status: "success", message: "pong" });
});

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.originalUrl} not found`,
  });
});

export default app;

/**
 * @swagger
 * components:
 *   responses:
 *     ValidationErrorResponse:
 *       description: Invlaid request, validation error.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: Operation/Request status.
 *                 example: "fail"
 *               errors:
 *                 type: array
 *                 description: Validation errors
 *                 items:
 *                   type: object
 *                   $ref: '#components/schemas/ValidationError'
 *     UnauthorizedResponse:
 *       description: User not authorized to perform action; missing authentication cookies.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/SimpleMessageResponse'
 *   schemas:
 *     SimpleResponse:
 *       type: object
 *       description: Simple response for common responses and simple error cases
 *       properties:
 *         status:
 *           type: string
 *           description: Operation/Request status.
 *           example: success|fail|error
 *     SimpleMessageResponse:
 *       type: object
 *       description: Simple response for common responses and simple error cases
 *       properties:
 *         status:
 *           type: string
 *           description: Request/Operation status
 *           example: success|fail|error
 *         message:
 *           type: string
 *           description: Resulting operation message
 *           example: Success message | Fail message | Error message
 *     ValidationError:
 *       type: object
 *       description: Valdiation error object (Zod)
 *       properties:
 *         code:
 *           type: string
 *           description: Error code.
 *           example: invalid_type
 *         expected:
 *           type: string
 *           description: The expected value
 *           example: string
 *         recieved:
 *           type: string
 *           description: Recieved value
 *           example: "undefined"
 *         path:
 *           type: array
 *           description: Path to the invalid value
 *           example: ["body|path|query", "field"]
 *           items:
 *             type: string
 *         message:
 *           type: string
 *           description: Error message
 *           example: Field is required
 */
