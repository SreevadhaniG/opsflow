import { Request, Response, NextFunction } from "express";
import AppError from "../error/appError";
import { ZodError } from "zod";

function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction){
    if(err instanceof ZodError){
        const errors = err.issues.map((issue) => {
            const path = issue.path;
            const message = issue.message;
            return {
                path,
                message
            };
        });

        for(const err of errors){
            console.log(err);
        }

        return res.status(400).json({
            message: "Validation Error"
        });
    }
    else if(err instanceof AppError){
        return res.status(err.statusCode).json({
            message: err.message
        });
    }
    else{
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export default errorMiddleware;