import { redisClient } from "../config/redis.js";
import type { Request, Response, NextFunction } from "express";

const MAX_REQUESTS = 2
const EXPIRY_TIME = 60 // 1 minute

const registerRateLimiter = async (request: Request, response: Response, next: NextFunction) => {

    try {

        const ip = request.ip
        const email = request.body.email

        const key = `register-rate-limit:${ip}:${email}`
        console.log("Ip ", ip)
        const count = await redisClient.incr(key)

        if (count === 1) {
            await redisClient.expire(key, EXPIRY_TIME)
        }

        if (count > MAX_REQUESTS) {

            const remainingTime = Math.max(await redisClient.ttl(key),0)

            return response.status(429).json({
                success: false,
                message: `Too many registration attempts. Try again after ${remainingTime} seconds.`
            })
        }

        next()

    } catch (error) {
        console.log("Registration Rate Limiter Error : ", error)
        next() //  If rate limiting fails → allow the request this is called fail-open.
    }

}


export default registerRateLimiter