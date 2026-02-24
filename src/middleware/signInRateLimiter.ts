import type { NextFunction, Response, Request } from "express";
import { redisClient } from "../config/redis.js";

const MAX_REQUESTS = 5
const WINDOW_SIZE = 60 // 1 minute

const signInRateLimiter = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ip = req.ip
        const key = `signIn-rate-limit:${ip}`
        const count = await redisClient.incr(key)

        if (count === 1) {
            await redisClient.expire(key, WINDOW_SIZE)
        }

        if (count > MAX_REQUESTS) {
            const remainingTime = await redisClient.ttl(key)
            return res.status(429).json({
                success: false,
                message: `Too many signIn attempts. Try again after ${remainingTime} seconds`
            })
        }

        next()

    } catch (error) {
        console.log("SignIn Rate Limiter Error : ", error)
        next()
    }
}


export default signInRateLimiter