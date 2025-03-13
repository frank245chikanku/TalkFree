import { Router, NextFunction, Request, Response } from "express";  
import post from '../../models/post';  

const router = Router();   

router.post('/api/post/update/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;  
    const { content, title } = req.body; 

    if (!id) {
        const error = new Error('Post ID is required') as CustomError; 
        error.status = 400; 
        return next(error);
    }

    try {
        const updatedPost = await post.findOneAndUpdate(    
            { _id: id }, 
            { $set: { content, title } }, 
            { new: true }
        );

        if (!updatedPost) {
            const error = new Error('Post not found') as CustomError;
            error.status = 404;
            return next(error);
        }

        res.status(200).send(updatedPost);
    } catch (err) {
        const error = new Error('Post cannot be updated') as CustomError;  
        error.status = 400; 
        next(error);
    }
});

export { router as updatedPostRouter };
