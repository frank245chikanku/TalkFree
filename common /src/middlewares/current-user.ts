import { Request, Response, NextFunction } from 'express' 
import jwt from 'jsonwebtoken' 

declare global {
     interface Jwtpayload {
        email:string,
        userId: string
     }
     namespace Express {
         interface Request{
             currentUser?: Jwtpayload
     }
     }
} 

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if(!req.session?.jwt) {
        return next()
    }

    try {

        const payload = (jwt.verify(req.session?.jwt, process.env.JWT_KEY!)) as Jwtpayload; 
        req.currentUser = payload;  
    } catch(err) {
        return next(err)

    
    }

    next()

}

