import { type NextFunction, type Request, type RequestHandler, type Response } from "express"

export const catchError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.name)
  res.status(500).json({
    message: "Internal Server Error",
    success: false,
    error: err.message
  })
}

export const asyncHandler = (handler: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next)
    } catch (error) {
      console.log(error instanceof Error ? error.message : error)
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      })
    }
  }
}