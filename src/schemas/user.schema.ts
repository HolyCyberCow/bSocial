import { object, string, TypeOf } from "zod";
/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegisterData:
 *       type: object
 *       properties:
 *         first_name:
 *           type: string
 *           description: User's first name
 *           example: John
 *         last_name:
 *           type: string
 *           description: User's last name
 *           example: Doe
 *         username:
 *           type: string
 *           description: User's username
 *           example: jDoe
 *         email:
 *           type: string
 *           description: User's email
 *           example: jdoe@mail.net
 *         password:
 *           type: string
 *           description: User's password
 *           example: super1secret!2pa55w0rD?
 *         repeat_password:
 *           type: string
 *           description: User's password, repeated
 *           example: super1secret!2pa55w0rD?
 */
export const createUserSchema = object({
  body: object({
    first_name: string({
      required_error: "First Name is required",
    }),
    last_name: string({
      required_error: "Last Name is required",
    }),
    username: string({
      required_error: "Username is required",
    }),
    email: string({
      required_error: "Email address is required",
    }).email("Invalid email address"),
    password: string({
      required_error: "Password is required",
    })
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    password_confirm: string({
      required_error: "Please confirm your password",
    }),
  }).refine((data) => data.password === data.password_confirm, {
    path: ["password_confirm"],
    message: "Passwords do not match",
  }),
});

/**
 * @swagger
 * components:
 *   schemas:
 *     UserLoginData:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: User's email
 *           example: jdoe@mail.net
 *         password:
 *           type: string
 *           description: User's password
 *           example: super1secret!2pa55w0rD?
 */
export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: "Email address is required",
    }).email("Invalid email address"),
    password: string({
      required_error: "Password is required",
    })
      .min(8, "Invalid email or password")
      .max(32, "Password must be less than 32 characters"),
  }),
});

export const followUserSchema = object({
  params: object({
    userId: string({
      required_error: "User id is required",
    }).uuid(),
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>["body"],
  "password_confirm"
>;

export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"];

export type FollowUserInput = TypeOf<typeof followUserSchema>["params"];
