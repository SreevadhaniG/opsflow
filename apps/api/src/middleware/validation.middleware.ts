import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

type RequestLocation = "body" | "params" | "query";

export function validate(schema: ZodType, location: RequestLocation){
    return function(req: Request, _res: Response, next: NextFunction){
        try{
            if(location === "body"){
                req.body = schema.parse(req.body);
            }
            else if(location === "params"){
                schema.parse(req.params);
            }
            else if(location === "query"){
                schema.parse(req.query);
            }
            next();
        }
        catch(error){
            next(error);
        }
    }
}