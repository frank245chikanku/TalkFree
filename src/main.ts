import * as dotenv from 'dotenv' 
dotenv.config(); 

import  { Request, Response, NextFunction } from 'express';
import { json, urlencoded } from 'body-parser'
import mongoose from 'mongoose'
import express from 'express'  
import cors from  'cors'

import { newPostRouter, deletepostRouter, updatedPostRouter, showpostRouter, newCommentRouter, deleteCommentRouter } from './routers';



const app  = express()     
app.use(cors(

{   
    origin: "*", 
    optionsSuccessStatus: 200,          
}

))

app.use(urlencoded({
    extended: true
})) 
app.use( json())    
app.use(newPostRouter)
app.use(deletepostRouter)  
app.use(updatedPostRouter)   
app.use(showpostRouter)

app.use(newCommentRouter)   
app.use(deleteCommentRouter)  

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
});

const start =  async () => {
    if(!process.env.MONGO_URI)throw new Error('MONGO_URI is required!')  
        try{
       await mongoose.connect(process.env.MONGO_URI)
    }  catch(err) {
        throw new Error('database error')
    }
    app.listen(8080,() => console.log ('server is  up  and  running on port 8080'))
}

start()  