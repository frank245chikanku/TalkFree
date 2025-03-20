import { Router, Request, Response, NextFunction } from 'express';   
import { User } from '../../models/user'
import jwt from  'jsonwebtoken'  
import { BadRequestError } from '../../../common /src';

const router = Router();

router.post('/signup', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
        const { email, password } = req.body;

        const user = await User.findOne({ email }); 

        if(user) return next (new BadRequestError('user with the same email already exits')) 

            const newUser = User.build({
                email,
                password
            })

            await newUser.save()

          req.session = {
            jwt: jwt.sign({ email, userId: newUser._id }, process.env.JWT_KEY!)
          }

            res.status(201).send(newUser)

    })      

export { router as signupRouter }
