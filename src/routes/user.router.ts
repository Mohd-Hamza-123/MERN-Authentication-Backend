import authMiddleware from "../middleware/auth.js"
import express, { type Response, type Request } from "express"
import signInRateLimiter from "../middleware/signInRateLimiter.js"
import registerRateLimiter from "../middleware/registerRateLimiter.js"
import {
    forgotPassword,
    logout,
    myProfile,
    registerUser,
    resetPassword,
    signInUser,
    verifyUser
} from "../controllers/user.js"

const router = express.Router()

router.post("/logout", logout)
router.post("/verify-email", verifyUser)
router.post("/reset-password", resetPassword)
router.get("/me", authMiddleware, myProfile)
router.post("/forgot-password", forgotPassword)
router.post("/register", registerRateLimiter, registerUser)
router.post("/sign-in", signInRateLimiter, signInUser)

export default router