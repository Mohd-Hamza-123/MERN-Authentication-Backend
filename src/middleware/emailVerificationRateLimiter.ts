import { asyncHandler } from "./catchError.js";
import { redisClient } from "../config/redis.js";
import type { NextFunction, Request, Response } from "express";

const MAX_REQUESTS = 1
const EXPIRY_TIME = 30

const emailVerificationRateLimiter = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const ip = req.ip
    const { email } = req.body

    const key = `emailVerification:rate:limit:${ip}:${email}`
    const count = await redisClient.incr(key)

    if (count == 1) {
        await redisClient.expire(key, EXPIRY_TIME)
    }

    if (count > MAX_REQUESTS) {
        const sec = Math.max(await redisClient.ttl(key), 0)
        return res.status(429).json({
            success: false,
            message: `too many attempts. wait ${sec} seconds`
        })
    }

    next()

})

export default emailVerificationRateLimiter