import crypto from "crypto"
import bcrypt from "bcrypt"
import User from "../models/user.model.js";
import type { Request, Response } from "express";
import { redisClient } from "../config/redis.js";
import { sendEmail } from "../services/email.services.js";
import { asyncHandler } from "../middleware/catchError.js";
import { verifyHTML } from "../templates/email/verifyEmail.template.js";
import { signInSchema, UserSchema } from "../validators/user.validator.js";
import forgotPasswordTemplate from "../templates/email/forgotPassword.template.js";
import { email as emailSchema, password as passwordSchema } from "../validators/user.validator.js";

export const registerUser = asyncHandler(async (req: Request, res: Response) => {

    const { username, email, password } = req.body

    const validation = UserSchema.safeParse({ username, email, password });

    if (!validation.success) {

        const errors = validation.error.issues.map((issue) => ({ field: issue.path[0], message: issue.message }))

        // console.log(errors)

        return res.status(400).json({
            success: false,
            message: "Validation Failed",
            errors
        })
    }

    const userAlreadyExist = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (userAlreadyExist) {
        return res.status(400).json({ success: false, message: "user with provided email or username already exists" })
    }

    // console.log(userAlreadyExist)

    const saltRounds = 11
    const hashedPassword = await bcrypt.hash(validation.data.password, saltRounds)

    const user = await User.create({
        username: validation.data.username,
        email: validation.data.email,
        password: hashedPassword
    })

    if (!user) return res.status(400).json({
        success: false,
        message: "registration failed"
    })

    const token = crypto.randomBytes(32).toString("hex");

    const mail = await sendEmail({
        to: user.email,
        subject: "Verify your email",
        text: "Please verify your email by clicking the link below",
        html: verifyHTML(token, username)
    })

    const verifyKey = `verify:${token}`
    await redisClient.set(verifyKey, user._id.toString(), { EX: 360 }) // 6 minutes

    return res.status(201).json({
        isEmailSend: mail.success,
        success: true,
        message: "Registration successfully done"
    })

})
export const signInUser = asyncHandler(async (req: Request, res: Response) => {

    const { email, password } = req.body

    const validation = signInSchema.safeParse({ email, password })

    if (!validation.success) {
        const errors = validation.error.issues.map((issue) => ({ message: issue.message, field: issue.path[0] }))
        return res.status(400).json({
            success: false,
            message: "Validation Failed",
            errors
        })
    }

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid Credentials"
        })
    }

    // console.log(password,user.password)
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        return res.status(400).json({
            success: false,
            message: "Invalid Credentials"
        })
    }

    req.session.userId = user._id.toString()
    req.session.userAgent = req.get("user-agent") || ""

    return res.status(200).json({
        success: true,
        message: "login successfully"
    })
})
export const verifyUser = asyncHandler(async (req: Request, res: Response) => {

    const { token } = req.query;

    if (!token || Array.isArray(token)) {
        return res.status(400).json({
            success: false,
            message: "invalid verification token"
        })
    }

    const verifyKey = `verify:${token}`

    const userId = await redisClient.getDel(verifyKey);

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "Verification link expired or already used"
        })
    }

    const updatedUser = await User.updateOne(
        { _id: userId, verified: false },
        { $set: { verified: true } })

    if (updatedUser.modifiedCount === 0) {
        return res.status(409).json({
            success: false,
            message: "Email already verified or user not found",
        });
    }

    return res.status(200).json({
        success: true,
        message: "Your email has been successfully verified"
    })
})
export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {

    const { email } = req.body

    const validation = emailSchema.safeParse(email)

    if (!validation.success) {

        const errMessage = validation.error.issues[0]?.message

        return res.status(400).json({
            success: false,
            message: errMessage || "Invalid Email"
        })
    }

    const user = await User.findOne({ email })

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid Credentials"
        });
    }

    const token = crypto.randomBytes(32).toString("hex")
    const link = `http://localhost/reset-password/?token=${token}`

    const redis = await redisClient.set(`reset-${token}`, user._id.toString(), { EX: 60 * 5 });

    await sendEmail({
        to: validation.data,
        subject: "Forgot Password",
        text: "Reset password clicking the link below",
        html: forgotPasswordTemplate(link)
    })

    return res.status(200).json({ success: true, message: "email sent" })

})
export const resetPassword = asyncHandler(async (req: Request, res: Response) => {

    const { token } = req.query

    if (!token || Array.isArray(token)) {
        return res.status(400).json({
            success: true,
            message: "token missing"
        })
    }

    const { password } = req.body

    const validation = passwordSchema.safeParse(password)

    if (!validation.success) {
        const errMessage = validation.error.issues[0]?.message
        return res.status(400).json({ success: false, message: errMessage || "Invalid password" })
    }

    const userId = await redisClient.getDel(`reset-${token}`)

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "Verification link expired or already used"
        })
    }

    console.log(token)
    console.log(userId);
    console.log(password);

    const hashedPassword = await bcrypt.hash(password, 10)

    const updatePassword = await User.updateOne(
        { _id: userId },
        { $set: { password: hashedPassword } }
    )

    if (updatePassword.modifiedCount === 0) {
        return res.status(400).json({
            success: true,
            message: "password reset failed"
        })
    }

    return res.status(200).json({
        success: true,
        message: "password reset successfully"
    })


})
export const logout = asyncHandler(async (req: Request, res: Response) => {

    req.session.destroy((err) => { // Deletes session data from Redis (or your store)

        if (err) {
            console.error("Error in logout:", err instanceof Error ? err.message : err);
            return res.status(400).json({
                success: false,
                message: "Logout Failed"
            });
        }

        res.clearCookie("connect.sid", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/"
        })

        return res.status(200).json({
            success: true,
            message: "Logout successfully"
        });
    });

});
export const myProfile = asyncHandler(async (req: Request, res: Response) => {

    const userId = req.session.userId

    const user = await User.findById(userId)

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "User not found"
        });
    }

    return res.status(200).json({
        success: true,
        data: user
    })

})