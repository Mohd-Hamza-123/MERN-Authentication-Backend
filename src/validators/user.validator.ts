import * as z from "zod";

const username = z
    .string()
    .trim()
    .min(3, "username must be at least 3 characters")
    .max(30, "username must be at most 30 characters")
    .regex(
        /^[a-z0-9_-]+$/,
        "username can contain only lowercase letters, numbers, underscores, and hyphens"
    )

export const email = z
    .email("invalid email format")
    .trim()
    .max(254, "email must be less than 100 letters")
    .refine((val) => val === val.toLowerCase(), { message: "email must be in lowercase" })

export const password = z
    .string()
    .max(128, "maximum length 128")
    .min(10, "minimum length 10")
    .trim()

export const UserSchema = z.object({
    username,
    email,
    password,
})

const identifier = z
    .string()
    .min(3, "Email or username is required")
    .refine((value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[a-z0-9_-]+$/;
        return emailRegex.test(value) || usernameRegex.test(value)
    }, "Enter a valid email or username")

export const signInSchema = z.object({
    identifier,
    password
})
export type UserType = z.infer<typeof UserSchema>