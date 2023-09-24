import { object, string, TypeOf } from "zod";

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
    passwordConfirm: string({
      required_error: "Please confirm your password",
    }),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  }),
});

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
    }),
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>["body"],
  "passwordConfirm"
>;

export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"];

export type FollowUserInput = TypeOf<typeof followUserSchema>["params"];