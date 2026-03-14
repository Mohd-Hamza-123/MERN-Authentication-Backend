import express from "express"
import passport from "passport"
import authMiddleware from "../middleware/auth.js"
import signInRateLimiter from "../middleware/signInRateLimiter.js"
import registerRateLimiter from "../middleware/registerRateLimiter.js"
import emailVerificationRateLimiter from "../middleware/emailVerificationRateLimiter.js"
import {
  logout,
  signInUser,
  verifyUser,
  registerUser,
  resetPassword,
  forgotPassword,
  emailVerification,
} from "../controllers/user.js"
import env from "../config/env.js"

const router = express.Router();
// Register
router.post("/register", registerRateLimiter, registerUser);
// signIn
router.post("/sign-in", signInRateLimiter, signInUser)
// forgot password
router.post("/forgot-password", forgotPassword)
// reset password
router.post("/reset-password", resetPassword)
// logout
router.post("/logout", logout)
// verify-email
router.post("/verify-email", authMiddleware, verifyUser)
//
router.post("/send-email-verification", authMiddleware, emailVerificationRateLimiter, emailVerification)
// new device login email 
// router.post("/login-detected")

router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}))

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login"
  }),
  (req: any, res) => {
    // console.log("GOOOOOOGLE")
    res.redirect(`${env.CORS_ORIGIN}/dashboard`)
  }
)

router.get("/github", passport.authenticate("github", {
  scope: ["user:email"]
}))

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login"
  }),
  (req, res) => {
    console.log("github")
    res.redirect(`${env.CORS_ORIGIN}/dashboard`)
  }
)

export default router