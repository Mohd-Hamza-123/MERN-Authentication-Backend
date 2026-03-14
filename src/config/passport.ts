import env from "./env.js";
import passport from "passport"
import type { User as UserType } from "../types/user.type.js";
import User from "../models/user.model.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { Strategy as GithubStrategy } from "passport-github2"

passport.use(new GoogleStrategy({
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${env.BACKEND_URL}/api/v1/users/google/callback`
},// http://localhost:8000/api/v1/users/google/callback
    // This function runs after Google successfully authenticates the user
    async (accessToken, refreshToken, profile, cb) => {
        // cb : cb (callback) function is how you tell Passport what happened after authentication.
        try {

            const email = profile.emails?.[0]?.value
            const avatar = profile.photos?.[0]?.value

            if (!email) throw new Error("Google account has no email")

            let user = await User.findOne({ email });

            if (!user) {
                user = await User.create({
                    googleId: profile.id,
                    username: profile.displayName,
                    email,
                    avatar: avatar || "",
                    verified: true,
                })
            }

            return cb(null, user)
        } catch (error) {
            return cb(error, undefined)
        }
    }
));

passport.use(new GithubStrategy({
    clientID: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
    callbackURL: `${env.BACKEND_URL}/api/v1/users/github/callback`,
    scope: ["user:email"],
}, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {

        const email = profile.emails?.[0]?.value
        const avatar = profile.photos?.[0]?.value

        if (!email) throw new Error("Github account has no email")

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                githubId: profile.id,
                username: profile.displayName,
                email,
                avatar: avatar || "",
                verified: true,
            })
        }

        return done(null, user)
    } catch (error) {
        // console.log(error instanceof Error ? error.message : error)
        return done(error, undefined)
    }
}));

passport.serializeUser((user: any, done) => {
    // Decide what data should be stored in the session after login.
    // console.log(user)
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        done(error, null)
    }

})