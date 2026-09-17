import { Request, Response, NextFunction } from "express";

function authMiddleware(req: Request, res: Response, next: NextFunction){
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).send();
    }

    next();
}

export default authMiddleware;