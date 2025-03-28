import { CustomError } from "./custom-error";   
import { ValidationError } from 'express-validator'  

export class RequestValidationError extends CustomError {
    statusCode = 400;  

    constructor(public errors: ValidationError []) {
        super('invalid request')  

    }

    generateErrors() {
        return this.errors.map(error => {
            return { message: error.msg, field: (error as any).param }
        }) 
    }
        
    }
