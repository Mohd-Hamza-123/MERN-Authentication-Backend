import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
    },
    githubId: {
        type: String,
    },
    avatar: {
        type: String,
    },
    username: {
        type: String,
        required: [true, "username is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        select: false,
    },
    role: {
        type: String,
        default: "user",
        enum: ["admin", "user"]
    },
    verified: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

export default User