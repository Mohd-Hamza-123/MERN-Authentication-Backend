
import express from "express"
import { myProfile } from "../controllers/user.js"
import authMiddleware from "../middleware/auth.js"

const router = express.Router()
router.get("/me", authMiddleware, myProfile)


export default router