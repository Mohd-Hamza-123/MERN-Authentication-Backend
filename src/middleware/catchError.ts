import { request, type NextFunction, type Request, type Response } from "express"

export const catchError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.name)
  res.status(500).json({
    message: "Internal Server Error",
    success: false,
    error: err.message
  })
}

export const asyncHandler = (handler: (req: Request, res: Response) => Promise<any>) => {
  return async(req: Request, res: Response) => {
    try {
      await handler(req, res)
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Internal Server Error"
      })
    }
  }
}