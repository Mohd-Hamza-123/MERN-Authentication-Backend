import type { NextFunction, Request , Response } from "express";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.session.userId

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Not authenticated"
        });
    }

    next()

}

export default authMiddleware