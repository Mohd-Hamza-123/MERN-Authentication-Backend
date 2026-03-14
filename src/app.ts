import cors from 'cors';
import "./config/passport.js";
import express from "express";
import passport from 'passport';
import env from './config/env.js';
import session from "express-session";
import { RedisStore } from "connect-redis";
import { redisClient } from './config/redis.js';
import authRouter from "./routes/auth.router.js";
import userRouter from "./routes/user.router.js"
import { catchError } from "./middleware/catchError.js";

export const app = express()

app.set("trust proxy", true)
app.use(express.json({ limit: "16kb" }));
app.use(
  cors({
    origin: [env.CORS_ORIGIN],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if using cookies/auth headers
  })
);

app.use(catchError)

const store = new RedisStore({
  client: redisClient,
  prefix: "session:"
})

app.use(
  session({
    store,
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24, // 1 day 
    }
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use("/api/v1/users", authRouter)
app.use("/api/v1/users", userRouter)
