import * as dotenv from 'dotenv' 
dotenv.config(); 

import  { Request, Response, NextFunction } from 'express';
import { json, urlencoded } from 'body-parser'
import mongoose from 'mongoose'
import express from 'express'  
import cors from  'cors'
import cookieSession from 'cookie-session';  

import { newPostRouter, deletepostRouter, updatedPostRouter, showpostRouter, newCommentRouter, deleteCommentRouter } from './routers';

import { currentUser, requireAuth } from '../common /src';

const app  = express()     
app.use(cors(

{   
    origin: "*", 
    optionsSuccessStatus: 200,          
}

))

app.set('trust proxy', true); 

app.use(urlencoded({
    extended: false
})) 
app.use( json())   
app.use(cookieSession({ 
    signed: false,  
    secure: false,  

}))

app.use(currentUser)

app.use(requireAuth, newPostRouter)
app.use(requireAuth, deletepostRouter)  
app.use(requireAuth, updatedPostRouter)   
app.use(showpostRouter)

app.use(requireAuth,newCommentRouter)   
app.use(requireAuth,deleteCommentRouter) 


app.all('*', (req, res, next ) => {
    const error = new Error('not found!') as CustomError;  
    error.status = 404
    next(error)  
})

declare global {
    interface CustomError extends Error {   
         status?: number
    }
}
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: error.message });

    res.status(500).json({ message: 'something went wrong'})
});

const start =  async () => {
    if(!process.env.MONGO_URI)throw new Error('MONGO_URI is required!') 

    if(!process.env.JWT_KEY)throw new Error('JWT_KEY is required!')  
        
        try{
       await mongoose.connect(process.env.MONGO_URI)
    }  catch(err) {
        throw new Error('database error')
    }
    app.listen(8080,() => console.log ('server is  up  and  running on port 8080'))
}

start()  