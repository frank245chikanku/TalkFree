import { Router, Request, Response, NextFunction } from 'express';   
import { User } from '../../models/user'

const router = Router();

router.post('/signup', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
        const { email, password } = req.body;

        const user = await User.findOne({ email }); 

        if(user) return next (new Error('user with the same email already exits')) 

            const newUser = new User({
                email,
                password
            })

            await newUser.save()

            res.status(201).send(newUser)

    })      

export { router as signupRouter }
