import { Request,Response,NextFunction } from "express"

export const CentralErrorHandler=(err:any, req:Request, res:Response, next:NextFunction)=>{
   res.status(err.statusCode || 500).json({
    success:false, message:err.message || "Internal applicaiton server error", statusCode:err.statusCode
   })
}



