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

export const SignUpSchema = z.object({
    email: z
        .string({ required_error: 'email is required' })
        .refine(value => emailRegex.test(value), { message: 'Invalid email address' }),
    lastName: z
        .string({required_error: "last name is required" })
        .min(4, { message: 'Minimum 4 Characters' })
        .max(8, { message: 'Maximum 8 Characters' })
        .refine(value => !/\s/.test(value), { message: 'Cannot contain spaces' }),
    firstName: z
        .string({required_error: "first name is required" })
        .min(4, { message: 'Minimum 4 Characters' })
        .max(8, { message: 'Maximum 8 Characters' })
        .refine(value => !/\s/.test(value), { message: 'Cannot contain spaces' }),
    password: z
        .string({required_error: "password is required"})
        .min(8, { message: 'Minimum 8 characters' })
        .max(32, { message: 'Maximum 32 Characters' })
        .refine(value => /[A-Z]/.test(value), { message: 'Must Contain Uppercase Letter' })
        .refine(value => /[a-z]/.test(value), { message: 'Must Contain Lowercase Letter' })
        .refine(value => /[0-9]/.test(value), { message: 'Must Contain Number' })
        .refine(value => /[\W_]/.test(value), { message: 'Must Contain Special character (e.g. !?<>@#$%)' })
});

export type SignUpCredentials = z.infer<typeof SignUpSchema>;
export type LoginCredentials = z.infer<typeof LoginSchema>;
