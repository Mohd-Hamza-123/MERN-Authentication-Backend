import type { NextFunction, Request, Response } from "express";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const sessionUserId = req.session?.userId
    console.log(req.user);
    console.log("user", req.session);

    if (!sessionUserId && !req?.user) {
        return res.status(401).json({
            success: false,
            message: "Not authenticated"
        });
    }

    next()

}

export default authMiddleware