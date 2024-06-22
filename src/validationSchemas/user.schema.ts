import { z } from "zod";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+{}|:"<>?`\-=[\]\\;',./]).{8,}$/;

export const LoginSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .regex(emailRegex, {
      message: "Invalid email format",
    })
    .min(5, { message: "Invalid email format" })
    .max(100, { message: "Invalid email format" }),
  password: z
    .string({ required_error: "password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password must not exceed 50 characters" })
    .regex(passwordRegex, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
    }),
});

export const SignupSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name cannot be empty" }),
  lastName: z
    .string()
    .min(1, { message: "Last name cannot be empty" }),
  email: z
    .string({ required_error: "Email is required" })
    .regex(emailRegex, {
      message: "Invalid email format",
    })
    .min(5, { message: "Invalid email format" })
    .max(100, { message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password must not exceed 50 characters" })
    .regex(passwordRegex, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
    }),
});

export type LoginCredentials = z.infer<typeof LoginSchema>;
export type signUpCredentials = z.infer<typeof SignupSchema>;